/**
 * Fotos del candidato: se reducen al subirlas (lado mayor 1.600 px, JPEG 0,9) para que quepan en el límite de 15 MB
 * por petición del servidor (express.json) y en el perfil guardado. A ese tamaño Gemini sigue viendo piel, cabello,
 * vestuario e iluminación; una foto de teléfono sin reducir pesa 4-8 MB y tres ya superaban el límite (413).
 */
export const LADO_MAX = 1600;
/** Tope del total en base64 de una llamada con fotos (deja margen para el texto y las macrofuentes). */
export const TOPE_FOTOS_BASE64 = 12 * 1024 * 1024;

export function dimensionesReducidas(ancho: number, alto: number, max = LADO_MAX): { ancho: number; alto: number } {
  const lado = Math.max(ancho, alto);
  if (!lado || lado <= max) return { ancho, alto };
  const f = max / lado;
  return { ancho: Math.round(ancho * f), alto: Math.round(alto * f) };
}

const leer = (f: Blob) => new Promise<string>((ok, mal) => {
  const r = new FileReader();
  r.onload = () => ok(String(r.result));
  r.onerror = () => mal(new Error('No se pudo leer la imagen.'));
  r.readAsDataURL(f);
});

/** Data URL de la imagen reducida. Si el navegador no puede decodificarla, devuelve la original. */
export async function reducirImagen(archivo: Blob, max = LADO_MAX, calidad = 0.9): Promise<string> {
  try {
    const bmp = await createImageBitmap(archivo);
    const { ancho, alto } = dimensionesReducidas(bmp.width, bmp.height, max);
    if (ancho === bmp.width && archivo.size < 1.5 * 1024 * 1024) { bmp.close(); return leer(archivo); }
    const c = document.createElement('canvas');
    c.width = ancho; c.height = alto;
    const ctx = c.getContext('2d');
    if (!ctx) { bmp.close(); return leer(archivo); }
    ctx.fillStyle = '#ffffff'; // PNG con transparencia: fondo blanco en vez de negro
    ctx.fillRect(0, 0, ancho, alto);
    ctx.drawImage(bmp, 0, 0, ancho, alto);
    bmp.close();
    return c.toDataURL('image/jpeg', calidad);
  } catch {
    return leer(archivo);
  }
}

/** Bytes aproximados de una lista de data URL en base64. */
export const pesoBase64 = (dataUrls: string[]) => dataUrls.reduce((a, d) => a + (d.length - d.indexOf(',') - 1), 0);
