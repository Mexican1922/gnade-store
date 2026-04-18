/**
 * Transforms a Cloudinary URL to serve an optimized version.
 * - f_auto: serves WebP to browsers that support it
 * - q_auto: auto compression quality
 * - w_{width}: resizes to specified width
 */
export function optimizeImage(
  url: string | null | undefined,
  width = 600,
): string {
  if (!url) return "/placeholder.jpg";

  // Only transform Cloudinary URLs
  if (!url.includes("res.cloudinary.com")) return url;

  // Insert transformation after /upload/
  return url.replace("/upload/", `/upload/w_${width},f_auto,q_auto/`);
}
