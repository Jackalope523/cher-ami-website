export function formatPhotoDate(date: Date) {
  if (!(date instanceof Date)) date = new Date(date);

  const month = date.toLocaleString('en-US', { month: 'short' });
  const day = date.getDate();
  const year = date.getFullYear();

  const suffix =
    day % 10 === 1 && day !== 11
      ? 'st'
      : day % 10 === 2 && day !== 12
      ? 'nd'
      : day % 10 === 3 && day !== 13
      ? 'rd'
      : 'th';

  return `Photo uploaded on ${month} ${day}${suffix}, ${year}`;
}

export function getNextMonthName() {
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  const today = new Date();
  const nextMonthIndex = (today.getMonth() + 1) % 12;

  return monthNames[nextMonthIndex];
}

export function splitName(fullName: string) {
  if (!fullName) {
    return { firstName: '', lastName: '' };
  }

  const parts = fullName.trim().split(/\s+/);
  const firstName = parts.shift() ?? '';
  const lastName = parts.join(' ');

  return { firstName, lastName };
}

export function mapDateToText(date: Date): string {
  if (!(date instanceof Date)) date = new Date(date);

  const now = new Date();
  const diffTime = now.getTime() - date.getTime();
  const diffSeconds = Math.floor(diffTime / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMinutes < 1) return 'Just Now';
  if (diffMinutes < 60) return `${diffMinutes} Minutes Ago`;
  if (diffHours < 24) return `${diffHours} Hours Ago`;

  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} Days Ago`;

  const diffWeeks = Math.floor(diffDays / 7);
  if (diffWeeks === 1) return 'Last Week';
  if (diffWeeks < 4) return `${diffWeeks} Weeks Ago`;

  const diffMonths =
    (now.getFullYear() - date.getFullYear()) * 12 +
    (now.getMonth() - date.getMonth());
  if (diffMonths === 0) return 'This Month';
  if (diffMonths === 1) return 'Last Month';
  if (diffMonths < 12) return `${diffMonths} Months Ago`;

  const diffYears = now.getFullYear() - date.getFullYear();
  if (diffYears === 1) return 'Last Year';
  return `${diffYears} Years Ago`;
}

export async function compressImage(file: File, maxSizeBytes: number = 5 * 1024 * 1024): Promise<File> {
  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(img, 0, 0);

      let quality = 0.9;
      const tryCompress = () => {
        canvas.toBlob(
          (blob) => {
            if (blob && (blob.size <= maxSizeBytes || quality <= 0.1)) {
              resolve(new File([blob], file.name, { type: 'image/jpeg' }));
            } else {
              quality -= 0.1;
              tryCompress();
            }
          },
          'image/jpeg',
          quality,
        );
      };
      tryCompress();
    };

    img.src = url;
  });
}

export function cropImageToAspectRatio(
  file: File,
  targetWidth: number,
  targetHeight: number,
): Promise<File> {
  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);

      const targetRatio = targetWidth / targetHeight;
      const imgRatio = img.width / img.height;

      let cropWidth: number, cropHeight: number, offsetX: number, offsetY: number;

      if (imgRatio > targetRatio) {
        cropHeight = img.height;
        cropWidth = img.height * targetRatio;
        offsetX = (img.width - cropWidth) / 2;
        offsetY = 0;
      } else {
        cropWidth = img.width;
        cropHeight = img.width / targetRatio;
        offsetX = 0;
        offsetY = (img.height - cropHeight) / 2;
      }

      const canvas = document.createElement('canvas');
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(img, offsetX, offsetY, cropWidth, cropHeight, 0, 0, targetWidth, targetHeight);

      canvas.toBlob(
        (blob) => {
          resolve(new File([blob!], file.name, { type: 'image/jpeg' }));
        },
        'image/jpeg',
        0.9,
      );
    };

    img.src = url;
  });
}
