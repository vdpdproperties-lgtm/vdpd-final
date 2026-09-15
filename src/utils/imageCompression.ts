/**
 * Client-side image compression utility to ensure uploaded images
 * stay crisp while remaining safely under Firestore's 1 MiB document size limit.
 */
export async function compressImageFile(
  fileOrDataUrl: File | string,
  maxWidth = 1600,
  maxHeight = 1080,
  quality = 0.78
): Promise<string> {
  return new Promise((resolve) => {
    // If it's a regular http(s) URL, no compression needed
    if (typeof fileOrDataUrl === 'string' && !fileOrDataUrl.startsWith('data:')) {
      resolve(fileOrDataUrl);
      return;
    }

    const processDataUrl = (dataUrl: string) => {
      // If already small (< 300KB), return as-is
      if (dataUrl.length < 300000) {
        resolve(dataUrl);
        return;
      }

      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Maintain aspect ratio while bounding dimensions
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(dataUrl);
          return;
        }

        // Draw with high quality smoothing
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        // Try WebP first, fallback to JPEG
        let result = canvas.toDataURL('image/webp', quality);
        
        // If webp isn't supported or still too large, compress further as jpeg
        if (result.length > 600000) {
          result = canvas.toDataURL('image/jpeg', 0.65);
        }
        
        if (result.length > 800000) {
          // Extreme fallback scaling for very large initial images
          const smallCanvas = document.createElement('canvas');
          smallCanvas.width = Math.round(width * 0.7);
          smallCanvas.height = Math.round(height * 0.7);
          const sCtx = smallCanvas.getContext('2d');
          if (sCtx) {
            sCtx.drawImage(img, 0, 0, smallCanvas.width, smallCanvas.height);
            result = smallCanvas.toDataURL('image/jpeg', 0.6);
          }
        }

        resolve(result);
      };

      img.onerror = () => {
        resolve(dataUrl);
      };

      img.src = dataUrl;
    };

    if (fileOrDataUrl instanceof File) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          processDataUrl(reader.result);
        } else {
          resolve('');
        }
      };
      reader.onerror = () => resolve('');
      reader.readAsDataURL(fileOrDataUrl);
    } else {
      processDataUrl(fileOrDataUrl);
    }
  });
}
