// src/utils/image.ts
import imageCompression from "browser-image-compression";

const COMPRESSION_OPTIONS = {
  maxSizeMB: 0.9, // Target ukuran di bawah 1MB
  maxWidthOrHeight: 1920, // Resolusi maksimal agar gambar tetap tajam
  useWebWorker: true, // Menggunakan background thread agar UI tidak lag
};

/**
 * Mengompres array dari File secara paralel.
 * Hanya mengompres file yang ukurannya di atas 1MB.
 */
export async function compressImages(files: File[]): Promise<File[]> {
  try {
    return await Promise.all(
      files.map(async (file) => {
        // Jika ukuran file sudah di bawah 1MB (1024 * 1024 bytes), langsung return
        if (file.size < 1024 * 1024) {
          return file;
        }

        const compressedBlob = await imageCompression(
          file,
          COMPRESSION_OPTIONS,
        );

        return new File([compressedBlob], file.name, {
          type: file.type,
          lastModified: Date.now(),
        });
      }),
    );
  } catch (error) {
    console.error("Gagal mengompres beberapa gambar:", error);
    // Jika kompresi gagal, fallback mengembalikan file asli agar user tidak stuck
    return files;
  }
}
