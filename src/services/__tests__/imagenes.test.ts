import { describe, expect, it } from 'vitest';
import { dimensionesReducidas, pesoBase64, TOPE_FOTOS_BASE64 } from '../imagenes';

describe('reducción de fotos del candidato', () => {
  it('reduce el lado mayor a 1.600 px conservando la proporción', () => {
    expect(dimensionesReducidas(4032, 3024)).toEqual({ ancho: 1600, alto: 1200 });
    expect(dimensionesReducidas(3024, 4032)).toEqual({ ancho: 1200, alto: 1600 });
  });
  it('no agranda una foto pequeña', () => {
    expect(dimensionesReducidas(800, 600)).toEqual({ ancho: 800, alto: 600 });
  });
  it('mide el base64 sin el encabezado y el tope deja margen bajo los 15 MB del servidor', () => {
    expect(pesoBase64(['data:image/jpeg;base64,AAAA', 'data:image/png;base64,BB'])).toBe(6);
    expect(TOPE_FOTOS_BASE64).toBeLessThan(15 * 1024 * 1024);
  });
});

describe('límite de subida de videos', () => {
  it('queda bajo los 100 MB de Cloudflare y el mensaje propone YouTube', async () => {
    const { SUBIDA_MAX, mensajeSubidaMax, INLINE_MAX } = await import('../analisisPiezas/analisis');
    expect(SUBIDA_MAX).toBeLessThan(100 * 1024 * 1024);
    expect(SUBIDA_MAX).toBeGreaterThan(INLINE_MAX);
    expect(mensajeSubidaMax(150 * 1024 * 1024)).toMatch(/150 MB.*YouTube/);
  });
});
