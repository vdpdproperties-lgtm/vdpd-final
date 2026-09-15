import { 
  collection, 
  doc, 
  setDoc, 
  deleteDoc, 
  onSnapshot, 
  getDocs, 
  writeBatch
} from 'firebase/firestore';
import { db, isFirebaseConnected } from './firebase';
import { 
  Property, 
  Project, 
  Blog, 
  Lead, 
  SiteSettings, 
  SitePhotoItem 
} from '../types';
import { 
  initialProperties, 
  initialProjects, 
  initialBlogs, 
  initialLeads, 
  initialSiteSettings, 
  initialSitePhotos 
} from '../data/seedData';
import { compressImageFile } from '../utils/imageCompression';

// Local storage key constants matching store.ts
const STORAGE_KEYS = {
  PROPERTIES: 'vdpd_properties_v1',
  PROJECTS: 'vdpd_projects_v1',
  BLOGS: 'vdpd_blogs_v1',
  LEADS: 'vdpd_leads_v1',
  SETTINGS: 'vdpd_settings_v1',
  PHOTOS: 'vdpd_photos_v2'
};

export interface FirebaseSyncStatus {
  connected: boolean;
  syncing: boolean;
  lastSyncedAt: Date | null;
  error: string | null;
  totalProperties: number;
  totalProjects: number;
  totalBlogs: number;
  totalLeads: number;
}

let syncStatus: FirebaseSyncStatus = {
  connected: isFirebaseConnected,
  syncing: false,
  lastSyncedAt: null,
  error: null,
  totalProperties: 0,
  totalProjects: 0,
  totalBlogs: 0,
  totalLeads: 0,
};

const statusListeners: Array<(status: FirebaseSyncStatus) => void> = [];

export function subscribeFirebaseStatus(listener: (status: FirebaseSyncStatus) => void): () => void {
  statusListeners.push(listener);
  listener({ ...syncStatus });
  return () => {
    const idx = statusListeners.indexOf(listener);
    if (idx >= 0) statusListeners.splice(idx, 1);
  };
}

function updateStatus(updates: Partial<FirebaseSyncStatus>) {
  syncStatus = { ...syncStatus, ...updates };
  statusListeners.forEach(l => l({ ...syncStatus }));
}

export function getFirebaseSyncStatus(): FirebaseSyncStatus {
  return { ...syncStatus };
}

let initialized = false;

/**
 * Initialize real-time synchronization with Firestore
 */
export function initFirebaseSync(onDataChanged: () => void) {
  if (initialized || !db || !isFirebaseConnected) {
    return;
  }
  initialized = true;
  updateStatus({ syncing: true });

  try {
    // 1. Properties collection listener
    const propertiesCol = collection(db, 'properties');
    onSnapshot(propertiesCol, async (snapshot) => {
      if (snapshot.empty) {
        // Seed initial data if Firestore collection is fresh
        await seedPropertiesToFirestore();
      } else {
        const loaded: Property[] = [];
        snapshot.forEach((docSnap) => {
          loaded.push(docSnap.data() as Property);
        });
        localStorage.setItem(STORAGE_KEYS.PROPERTIES, JSON.stringify(loaded));
        updateStatus({ 
          connected: true, 
          syncing: false, 
          lastSyncedAt: new Date(), 
          totalProperties: loaded.length 
        });
        onDataChanged();
      }
    }, (err) => {
      console.warn('Firestore properties snapshot warning:', err.message);
      updateStatus({ error: err.message, syncing: false });
    });

    // 2. Projects collection listener
    const projectsCol = collection(db, 'projects');
    onSnapshot(projectsCol, async (snapshot) => {
      if (snapshot.empty) {
        await seedProjectsToFirestore();
      } else {
        const loaded: Project[] = [];
        snapshot.forEach((docSnap) => {
          loaded.push(docSnap.data() as Project);
        });
        localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(loaded));
        updateStatus({ 
          connected: true, 
          lastSyncedAt: new Date(), 
          totalProjects: loaded.length 
        });
        onDataChanged();
      }
    }, (err) => {
      console.warn('Firestore projects snapshot warning:', err.message);
    });

    // 3. Blogs collection listener
    const blogsCol = collection(db, 'blogs');
    onSnapshot(blogsCol, async (snapshot) => {
      if (snapshot.empty) {
        await seedBlogsToFirestore();
      } else {
        const loaded: Blog[] = [];
        snapshot.forEach((docSnap) => {
          loaded.push(docSnap.data() as Blog);
        });
        localStorage.setItem(STORAGE_KEYS.BLOGS, JSON.stringify(loaded));
        updateStatus({ 
          connected: true, 
          lastSyncedAt: new Date(), 
          totalBlogs: loaded.length 
        });
        onDataChanged();
      }
    }, (err) => {
      console.warn('Firestore blogs snapshot warning:', err.message);
    });

    // 4. Leads collection listener
    const leadsCol = collection(db, 'leads');
    onSnapshot(leadsCol, async (snapshot) => {
      if (snapshot.empty) {
        await seedLeadsToFirestore();
      } else {
        const loaded: Lead[] = [];
        snapshot.forEach((docSnap) => {
          loaded.push(docSnap.data() as Lead);
        });
        // Sort leads newest first
        loaded.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
        localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(loaded));
        updateStatus({ 
          connected: true, 
          lastSyncedAt: new Date(), 
          totalLeads: loaded.length 
        });
        onDataChanged();
      }
    }, (err) => {
      console.warn('Firestore leads snapshot warning:', err.message);
    });

    // 5. Site Settings listener
    const settingsDoc = doc(db, 'site_settings', 'main');
    onSnapshot(settingsDoc, async (snap) => {
      if (!snap.exists()) {
        await setDoc(settingsDoc, initialSiteSettings);
      } else {
        const settingsData = snap.data() as SiteSettings;
        localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settingsData));
        onDataChanged();
      }
    }, (err) => {
      console.warn('Firestore settings snapshot warning:', err.message);
    });

    // 6. Site Photos listener
    const photosCol = collection(db, 'site_photos');
    onSnapshot(photosCol, async (snapshot) => {
      if (snapshot.empty) {
        await seedPhotosToFirestore();
      } else {
        const loaded: SitePhotoItem[] = [];
        snapshot.forEach((docSnap) => {
          loaded.push(docSnap.data() as SitePhotoItem);
        });
        localStorage.setItem(STORAGE_KEYS.PHOTOS, JSON.stringify(loaded));
        onDataChanged();
      }
    }, (err) => {
      console.warn('Firestore photos snapshot warning:', err.message);
    });

  } catch (error) {
    console.error('Error in initFirebaseSync:', error);
    updateStatus({ error: error instanceof Error ? error.message : 'Unknown sync error', syncing: false });
  }
}

// --- Cloud Write Helpers ---

export async function pushPropertyToFirestore(property: Property): Promise<void> {
  if (!db) return;
  try {
    await setDoc(doc(db, 'properties', property.id), property);
    updateStatus({ lastSyncedAt: new Date() });
  } catch (e) {
    console.error('Error pushing property to Firestore:', e);
  }
}

export async function removePropertyFromFirestore(propertyId: string): Promise<void> {
  if (!db) return;
  try {
    await deleteDoc(doc(db, 'properties', propertyId));
    updateStatus({ lastSyncedAt: new Date() });
  } catch (e) {
    console.error('Error removing property from Firestore:', e);
  }
}

export async function pushProjectToFirestore(project: Project): Promise<void> {
  if (!db) return;
  try {
    await setDoc(doc(db, 'projects', project.id), project);
    updateStatus({ lastSyncedAt: new Date() });
  } catch (e) {
    console.error('Error pushing project to Firestore:', e);
  }
}

export async function removeProjectFromFirestore(projectId: string): Promise<void> {
  if (!db) return;
  try {
    await deleteDoc(doc(db, 'projects', projectId));
    updateStatus({ lastSyncedAt: new Date() });
  } catch (e) {
    console.error('Error removing project from Firestore:', e);
  }
}

export async function pushBlogToFirestore(blog: Blog): Promise<void> {
  if (!db) return;
  try {
    await setDoc(doc(db, 'blogs', blog.id), blog);
    updateStatus({ lastSyncedAt: new Date() });
  } catch (e) {
    console.error('Error pushing blog to Firestore:', e);
  }
}

export async function removeBlogFromFirestore(blogId: string): Promise<void> {
  if (!db) return;
  try {
    await deleteDoc(doc(db, 'blogs', blogId));
    updateStatus({ lastSyncedAt: new Date() });
  } catch (e) {
    console.error('Error removing blog from Firestore:', e);
  }
}

export async function pushLeadToFirestore(lead: Lead): Promise<void> {
  if (!db) return;
  try {
    await setDoc(doc(db, 'leads', lead.id), lead);
    updateStatus({ lastSyncedAt: new Date() });
  } catch (e) {
    console.error('Error pushing lead to Firestore:', e);
  }
}

export async function removeLeadFromFirestore(leadId: string): Promise<void> {
  if (!db) return;
  try {
    await deleteDoc(doc(db, 'leads', leadId));
    updateStatus({ lastSyncedAt: new Date() });
  } catch (e) {
    console.error('Error removing lead from Firestore:', e);
  }
}

export async function pushSettingsToFirestore(settings: SiteSettings): Promise<void> {
  if (!db) return;
  try {
    await setDoc(doc(db, 'site_settings', 'main'), settings);
    updateStatus({ lastSyncedAt: new Date() });
  } catch (e) {
    console.error('Error pushing settings to Firestore:', e);
  }
}

export async function pushPhotoToFirestore(photo: SitePhotoItem): Promise<void> {
  if (!db) return;
  try {
    const safePhoto = { ...photo };
    if (safePhoto.url && safePhoto.url.startsWith('data:') && safePhoto.url.length > 500000) {
      try {
        const compressed = await compressImageFile(safePhoto.url, 1600, 1080, 0.75);
        if (compressed && compressed.length < 800000) {
          safePhoto.url = compressed;
        } else {
          safePhoto.url = safePhoto.defaultUrl || '';
        }
      } catch {
        safePhoto.url = safePhoto.defaultUrl || '';
      }
    }
    await setDoc(doc(db, 'site_photos', safePhoto.id), safePhoto);
    updateStatus({ lastSyncedAt: new Date() });
  } catch (e) {
    console.error('Error pushing photo to Firestore:', e);
  }
}

// --- Initial Seeding Helpers ---

async function seedPropertiesToFirestore() {
  if (!db) return;
  try {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEYS.PROPERTIES) || 'null') || initialProperties;
    const batch = writeBatch(db);
    existing.forEach((p: Property) => {
      batch.set(doc(db, 'properties', p.id), p);
    });
    await batch.commit();
  } catch (e) {
    console.error('Error seeding properties:', e);
  }
}

async function seedProjectsToFirestore() {
  if (!db) return;
  try {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEYS.PROJECTS) || 'null') || initialProjects;
    const batch = writeBatch(db);
    existing.forEach((proj: Project) => {
      batch.set(doc(db, 'projects', proj.id), proj);
    });
    await batch.commit();
  } catch (e) {
    console.error('Error seeding projects:', e);
  }
}

async function seedBlogsToFirestore() {
  if (!db) return;
  try {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEYS.BLOGS) || 'null') || initialBlogs;
    const batch = writeBatch(db);
    existing.forEach((b: Blog) => {
      batch.set(doc(db, 'blogs', b.id), b);
    });
    await batch.commit();
  } catch (e) {
    console.error('Error seeding blogs:', e);
  }
}

async function seedLeadsToFirestore() {
  if (!db) return;
  try {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEYS.LEADS) || 'null') || initialLeads;
    const batch = writeBatch(db);
    existing.forEach((l: Lead) => {
      batch.set(doc(db, 'leads', l.id), l);
    });
    await batch.commit();
  } catch (e) {
    console.error('Error seeding leads:', e);
  }
}

async function seedPhotosToFirestore() {
  if (!db) return;
  try {
    const rawList: SitePhotoItem[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.PHOTOS) || 'null') || initialSitePhotos;
    const cleanedPhotos: SitePhotoItem[] = [];
    let hadOversized = false;

    for (const ph of rawList) {
      const item = { ...ph };
      if (item.url && item.url.startsWith('data:') && item.url.length > 500000) {
        hadOversized = true;
        try {
          const compressed = await compressImageFile(item.url, 1600, 1080, 0.75);
          if (compressed && compressed.length < 800000) {
            item.url = compressed;
          } else {
            item.url = item.defaultUrl || initialSitePhotos.find(p => p.id === item.id)?.url || '';
          }
        } catch {
          item.url = item.defaultUrl || initialSitePhotos.find(p => p.id === item.id)?.url || '';
        }
      }
      cleanedPhotos.push(item);
    }

    if (hadOversized) {
      localStorage.setItem(STORAGE_KEYS.PHOTOS, JSON.stringify(cleanedPhotos));
    }

    // Write each photo item with per-document protection and fallback
    for (const ph of cleanedPhotos) {
      try {
        await setDoc(doc(db, 'site_photos', ph.id), ph);
      } catch (err) {
        console.warn(`Firestore write warning for photo ${ph.id}, using default preset:`, err);
        const fallback = { 
          ...ph, 
          url: ph.defaultUrl || initialSitePhotos.find(p => p.id === ph.id)?.url || '' 
        };
        try {
          await setDoc(doc(db, 'site_photos', ph.id), fallback);
        } catch (innerErr) {
          console.error(`Failed fallback write for photo ${ph.id}:`, innerErr);
        }
      }
    }
  } catch (e) {
    console.error('Error seeding photos:', e);
  }
}
