export interface NBIDetails {
  nbi: number;
  miseria: number;
  vivienda: number;
  servicios: number;
  hacinamiento: number;
  inasistencia: number;
  dependencia: number;
}

export interface MunicipalityNBI {
  code: string;
  name: string;
  department: string;
  region: string;
  subregion: string;
  total: NBIDetails;
  urban: NBIDetails;
  rural: NBIDetails;
}

export const DEPARTMENT_NBI_SUMMARY: Record<string, { total: NBIDetails; urban: NBIDetails; rural: NBIDetails }> = {
  "ANTIOQUIA": {
    total: { nbi: 10.73, miseria: 2.50, vivienda: 3.53, servicios: 1.89, hacinamiento: 2.77, inasistencia: 1.73, dependencia: 4.15 },
    urban: { nbi: 6.73, miseria: 0.84, vivienda: 1.08, servicios: 0.77, hacinamiento: 1.76, inasistencia: 1.45, dependencia: 2.66 },
    rural: { nbi: 26.86, miseria: 9.18, vivienda: 13.40, servicios: 6.37, hacinamiento: 6.80, inasistencia: 2.83, dependencia: 10.15 }
  },
  "ATLÁNTICO": {
    total: { nbi: 11.37, miseria: 2.18, vivienda: 2.16, servicios: 1.49, hacinamiento: 4.07, inasistencia: 2.95, dependencia: 3.39 },
    urban: { nbi: 10.76, miseria: 2.01, vivienda: 2.04, servicios: 1.40, hacinamiento: 3.89, inasistencia: 2.94, dependencia: 2.96 },
    rural: { nbi: 22.98, miseria: 5.38, vivienda: 4.50, servicios: 3.06, hacinamiento: 7.46, inasistencia: 3.12, dependencia: 11.56 }
  },
  "BOGOTÁ, D.C.": {
    total: { nbi: 3.47, miseria: 0.25, vivienda: 0.36, servicios: 0.10, hacinamiento: 1.43, inasistencia: 1.04, dependencia: 0.81 },
    urban: { nbi: 3.45, miseria: 0.25, vivienda: 0.36, servicios: 0.10, hacinamiento: 1.42, inasistencia: 1.04, dependencia: 0.80 },
    rural: { nbi: 11.17, miseria: 1.58, vivienda: 3.12, servicios: 0.30, hacinamiento: 4.80, inasistencia: 0.97, dependencia: 3.82 }
  },
  "BOLÍVAR": {
    total: { nbi: 26.73, miseria: 8.11, vivienda: 13.16, servicios: 9.55, hacinamiento: 4.82, inasistencia: 3.20, dependencia: 6.22 },
    urban: { nbi: 21.84, miseria: 5.82, vivienda: 9.22, servicios: 8.70, hacinamiento: 3.72, inasistencia: 3.21, dependencia: 4.19 },
    rural: { nbi: 41.62, miseria: 15.07, vivienda: 25.17, servicios: 12.13, hacinamiento: 8.18, inasistencia: 3.16, dependencia: 12.39 }
  },
  "BOYACÁ": {
    total: { nbi: 10.15, miseria: 1.90, vivienda: 2.33, servicios: 1.80, hacinamiento: 3.21, inasistencia: 1.32, dependencia: 4.53 },
    urban: { nbi: 5.00, miseria: 0.46, vivienda: 0.92, servicios: 0.30, hacinamiento: 1.47, inasistencia: 0.72, dependencia: 2.14 },
    rural: { nbi: 17.98, miseria: 4.09, vivienda: 4.49, servicios: 4.07, hacinamiento: 5.85, inasistencia: 2.23, dependencia: 8.15 }
  },
  "CALDAS": {
    total: { nbi: 8.95, miseria: 1.54, vivienda: 1.74, servicios: 1.55, hacinamiento: 2.07, inasistencia: 1.22, dependencia: 4.37 },
    urban: { nbi: 6.95, miseria: 1.32, vivienda: 1.47, servicios: 1.82, hacinamiento: 1.46, inasistencia: 0.99, dependencia: 2.98 },
    rural: { nbi: 15.06, miseria: 2.22, vivienda: 2.56, servicios: 0.73, hacinamiento: 3.93, inasistencia: 1.91, dependencia: 8.62 }
  },
  "CAQUETÁ": {
    total: { nbi: 23.62, miseria: 6.21, vivienda: 10.12, servicios: 5.91, hacinamiento: 4.71, inasistencia: 2.93, dependencia: 7.68 },
    urban: { nbi: 16.75, miseria: 3.69, vivienda: 6.71, servicios: 1.82, hacinamiento: 4.89, inasistencia: 2.10, dependencia: 5.75 },
    rural: { nbi: 39.12, miseria: 11.91, vivienda: 17.79, servicios: 15.15, hacinamiento: 4.30, inasistencia: 4.79, dependencia: 12.01 }
  },
  "CAUCA": {
    total: { nbi: 18.81, miseria: 3.28, vivienda: 5.99, servicios: 5.88, hacinamiento: 4.09, inasistencia: 1.58, dependencia: 5.18 },
    urban: { nbi: 12.63, miseria: 1.78, vivienda: 4.25, servicios: 4.27, hacinamiento: 2.32, inasistencia: 0.98, dependencia: 2.84 },
    rural: { nbi: 22.85, miseria: 4.27, vivienda: 7.13, servicios: 6.94, hacinamiento: 5.25, inasistencia: 1.96, dependencia: 6.71 }
  },
  "CESAR": {
    total: { nbi: 23.04, miseria: 7.27, vivienda: 9.31, servicios: 5.04, hacinamiento: 8.06, inasistencia: 3.12, dependencia: 7.73 },
    urban: { nbi: 18.73, miseria: 4.91, vivienda: 9.23, servicios: 2.06, hacinamiento: 5.91, inasistencia: 2.38, dependencia: 5.37 },
    rural: { nbi: 36.72, miseria: 14.73, vivienda: 9.58, servicios: 14.49, hacinamiento: 14.88, inasistencia: 5.48, dependencia: 15.21 }
  },
  "CÓRDOBA": {
    total: { nbi: 35.08, miseria: 11.41, vivienda: 25.99, servicios: 6.17, hacinamiento: 7.20, inasistencia: 1.86, dependencia: 8.67 },
    urban: { nbi: 21.87, miseria: 5.58, vivienda: 14.98, servicios: 3.84, hacinamiento: 3.87, inasistencia: 1.39, dependencia: 4.81 },
    rural: { nbi: 51.98, miseria: 18.87, vivienda: 40.06, servicios: 9.15, hacinamiento: 11.47, inasistencia: 2.46, dependencia: 13.60 }
  },
  "CUNDINAMARCA": {
    total: { nbi: 6.36, miseria: 0.74, vivienda: 1.41, servicios: 0.63, hacinamiento: 1.93, inasistencia: 1.35, dependencia: 1.87 },
    urban: { nbi: 4.70, miseria: 0.44, vivienda: 0.71, servicios: 0.38, hacinamiento: 1.52, inasistencia: 1.36, dependencia: 1.23 },
    rural: { nbi: 10.93, miseria: 1.57, vivienda: 3.36, servicios: 1.33, hacinamiento: 3.05, inasistencia: 1.34, dependencia: 3.64 }
  },
  "CHOCÓ": {
    total: { nbi: 65.51, miseria: 20.37, vivienda: 8.52, servicios: 57.47, hacinamiento: 12.80, inasistencia: 4.57, dependencia: 10.98 },
    urban: { nbi: 68.37, miseria: 9.90, vivienda: 2.16, servicios: 65.12, hacinamiento: 3.18, inasistencia: 2.45, dependencia: 7.22 },
    rural: { nbi: 62.73, miseria: 30.53, vivienda: 14.69, servicios: 50.04, hacinamiento: 22.13, inasistencia: 6.63, dependencia: 14.63 }
  },
  "HUILA": {
    total: { nbi: 12.86, miseria: 1.98, vivienda: 4.02, servicios: 1.70, hacinamiento: 2.80, inasistencia: 1.41, dependencia: 5.24 },
    urban: { nbi: 9.37, miseria: 1.46, vivienda: 3.96, servicios: 0.62, hacinamiento: 2.19, inasistencia: 1.04, dependencia: 3.25 },
    rural: { nbi: 18.35, miseria: 2.78, vivienda: 4.10, servicios: 3.40, hacinamiento: 3.75, inasistencia: 2.00, dependencia: 8.35 }
  },
  "LA GUAJIRA": {
    total: { nbi: 53.33, miseria: 30.56, vivienda: 29.24, servicios: 15.23, hacinamiento: 32.69, inasistencia: 6.80, dependencia: 18.19 },
    urban: { nbi: 29.13, miseria: 10.84, vivienda: 12.77, servicios: 13.42, hacinamiento: 10.77, inasistencia: 3.31, dependencia: 4.73 },
    rural: { nbi: 75.40, miseria: 48.55, vivienda: 44.27, servicios: 16.89, hacinamiento: 52.70, inasistencia: 9.99, dependencia: 30.47 }
  },
  "MAGDALENA": {
    total: { nbi: 26.71, miseria: 8.72, vivienda: 11.54, servicios: 8.04, hacinamiento: 7.76, inasistencia: 3.30, dependencia: 8.07 },
    urban: { nbi: 21.79, miseria: 6.46, vivienda: 9.24, servicios: 6.45, hacinamiento: 6.31, inasistencia: 2.78, dependencia: 5.46 },
    rural: { nbi: 38.81, miseria: 14.26, vivienda: 17.18, servicios: 11.93, hacinamiento: 11.34, inasistencia: 4.58, dependencia: 14.50 }
  },
  "META": {
    total: { nbi: 13.45, miseria: 3.65, vivienda: 6.99, servicios: 2.67, hacinamiento: 3.46, inasistencia: 1.76, dependencia: 3.87 },
    urban: { nbi: 8.07, miseria: 1.22, vivienda: 2.71, servicios: 0.55, hacinamiento: 2.39, inasistencia: 1.31, dependencia: 2.60 },
    rural: { nbi: 31.90, miseria: 11.97, vivienda: 21.67, servicios: 9.98, hacinamiento: 7.15, inasistencia: 3.30, dependencia: 8.24 }
  },
  "NARIÑO": {
    total: { nbi: 21.98, miseria: 4.49, vivienda: 3.30, servicios: 10.11, hacinamiento: 6.52, inasistencia: 1.91, dependencia: 5.72 },
    urban: { nbi: 16.43, miseria: 2.36, vivienda: 3.08, servicios: 7.88, hacinamiento: 3.83, inasistencia: 1.10, dependencia: 3.28 },
    rural: { nbi: 27.16, miseria: 6.48, vivienda: 3.51, servicios: 12.20, hacinamiento: 9.02, inasistencia: 2.66, dependencia: 8.00 }
  },
  "NORTE DE SANTANDER": {
    total: { nbi: 18.43, miseria: 4.73, vivienda: 5.65, servicios: 3.29, hacinamiento: 6.54, inasistencia: 2.57, dependencia: 6.52 },
    urban: { nbi: 13.44, miseria: 2.43, vivienda: 3.54, servicios: 0.69, hacinamiento: 5.32, inasistencia: 2.21, dependencia: 4.60 },
    rural: { nbi: 37.24, miseria: 13.37, vivienda: 13.57, servicios: 13.07, hacinamiento: 11.16, inasistencia: 3.92, dependencia: 13.76 }
  },
  "QUINDIO": {
    total: { nbi: 6.76, miseria: 0.68, vivienda: 1.14, servicios: 0.34, hacinamiento: 1.35, inasistencia: 1.42, dependencia: 3.32 },
    urban: { nbi: 6.31, miseria: 0.60, vivienda: 0.99, servicios: 0.32, hacinamiento: 1.25, inasistencia: 1.39, dependencia: 3.05 },
    rural: { nbi: 10.05, miseria: 1.32, vivienda: 2.25, servicios: 0.45, hacinamiento: 2.11, inasistencia: 1.64, dependencia: 5.32 }
  },
  "RISARALDA": {
    total: { nbi: 8.19, miseria: 1.68, vivienda: 0.82, servicios: 1.25, hacinamiento: 2.42, inasistencia: 1.79, dependencia: 4.21 },
    urban: { nbi: 5.12, miseria: 0.40, vivienda: 0.44, servicios: 0.31, hacinamiento: 1.00, inasistencia: 1.22, dependencia: 2.61 },
    rural: { nbi: 19.30, miseria: 6.28, vivienda: 2.19, servicios: 4.67, hacinamiento: 7.58, inasistencia: 3.84, dependencia: 10.00 }
  },
  "SANTANDER": {
    total: { nbi: 9.58, miseria: 1.45, vivienda: 2.92, servicios: 0.86, hacinamiento: 2.58, inasistencia: 1.45, dependencia: 3.50 },
    urban: { nbi: 6.38, miseria: 0.80, vivienda: 1.66, servicios: 0.39, hacinamiento: 1.79, inasistencia: 1.24, dependencia: 2.24 },
    rural: { nbi: 20.20, miseria: 3.64, vivienda: 7.10, servicios: 2.40, hacinamiento: 5.20, inasistencia: 2.12, dependencia: 7.71 }
  },
  "SUCRE": {
    total: { nbi: 29.13, miseria: 8.01, vivienda: 16.60, servicios: 4.47, hacinamiento: 6.28, inasistencia: 1.58, dependencia: 10.10 },
    urban: { nbi: 24.19, miseria: 6.71, vivienda: 14.27, servicios: 4.63, hacinamiento: 4.89, inasistencia: 1.45, dependencia: 7.34 },
    rural: { nbi: 38.26, miseria: 10.42, vivienda: 20.91, servicios: 4.18, hacinamiento: 8.85, inasistencia: 1.84, dependencia: 15.20 }
  },
  "TOLIMA": {
    total: { nbi: 12.22, miseria: 2.21, vivienda: 3.26, servicios: 1.61, hacinamiento: 3.53, inasistencia: 1.87, dependencia: 4.63 },
    urban: { nbi: 7.73, miseria: 1.12, vivienda: 1.97, servicios: 0.52, hacinamiento: 2.44, inasistencia: 1.42, dependencia: 2.70 },
    rural: { nbi: 23.10, miseria: 4.86, vivienda: 6.38, servicios: 4.24, hacinamiento: 6.18, inasistencia: 2.96, dependencia: 9.27 }
  },
  "VALLE DEL CAUCA": {
    total: { nbi: 6.25, miseria: 0.69, vivienda: 0.70, servicios: 0.68, hacinamiento: 1.39, inasistencia: 1.61, dependencia: 2.69 },
    urban: { nbi: 5.30, miseria: 0.48, vivienda: 0.45, servicios: 0.53, hacinamiento: 1.15, inasistencia: 1.49, dependencia: 2.22 },
    rural: { nbi: 11.92, miseria: 1.90, vivienda: 2.17, servicios: 1.57, hacinamiento: 2.80, inasistencia: 2.34, dependencia: 5.46 }
  },
  "ARAUCA": {
    total: { nbi: 32.45, miseria: 9.42, vivienda: 24.20, servicios: 2.96, hacinamiento: 8.46, inasistencia: 2.63, dependencia: 6.87 },
    urban: { nbi: 26.03, miseria: 7.16, vivienda: 18.33, servicios: 2.29, hacinamiento: 7.40, inasistencia: 2.11, dependencia: 4.82 },
    rural: { nbi: 45.37, miseria: 13.97, vivienda: 36.02, servicios: 4.30, hacinamiento: 10.61, inasistencia: 3.69, dependencia: 10.98 }
  },
  "CASANARE": {
    total: { nbi: 16.08, miseria: 3.67, vivienda: 7.00, servicios: 1.33, hacinamiento: 6.10, inasistencia: 1.62, dependencia: 4.59 },
    urban: { nbi: 11.96, miseria: 2.22, vivienda: 5.19, servicios: 0.49, hacinamiento: 4.67, inasistencia: 1.14, dependencia: 3.07 },
    rural: { nbi: 27.35, miseria: 7.62, vivienda: 11.92, servicios: 3.62, hacinamiento: 10.00, inasistencia: 2.94, dependencia: 8.72 }
  },
  "PUTUMAYO": {
    total: { nbi: 18.96, miseria: 3.49, vivienda: 3.54, servicios: 7.55, hacinamiento: 5.60, inasistencia: 1.61, dependencia: 4.81 },
    urban: { nbi: 12.27, miseria: 1.88, vivienda: 2.69, servicios: 2.53, hacinamiento: 5.22, inasistencia: 1.01, dependencia: 3.01 },
    rural: { nbi: 27.68, miseria: 5.60, vivienda: 4.65, servicios: 14.09, hacinamiento: 6.10, inasistencia: 2.38, dependencia: 7.17 }
  },
  "ARCHIPIÉLAGO DE SAN ANDRÉS": {
    total: { nbi: 14.89, miseria: 1.09, vivienda: 0.80, servicios: 9.40, hacinamiento: 3.61, inasistencia: 1.85, dependencia: 0.38 },
    urban: { nbi: 19.31, miseria: 1.50, vivienda: 1.01, servicios: 14.00, hacinamiento: 3.68, inasistencia: 1.82, dependencia: 0.38 },
    rural: { nbi: 6.00, miseria: 0.26, vivienda: 0.38, servicios: 0.16, hacinamiento: 3.46, inasistencia: 1.93, dependencia: 0.38 }
  },
  "AMAZONAS": {
    total: { nbi: 35.24, miseria: 10.90, vivienda: 5.72, servicios: 19.13, hacinamiento: 16.18, inasistencia: 3.71, dependencia: 6.15 },
    urban: { nbi: 26.03, miseria: 6.00, vivienda: 3.76, servicios: 10.89, hacinamiento: 13.01, inasistencia: 2.84, dependencia: 3.20 },
    rural: { nbi: 45.84, miseria: 16.53, vivienda: 7.97, servicios: 28.59, hacinamiento: 19.83, inasistencia: 4.72, dependencia: 9.54 }
  },
  "GUAINÍA": {
    total: { nbi: 59.52, miseria: 35.45, vivienda: 32.85, servicios: 39.82, hacinamiento: 22.69, inasistencia: 5.98, dependencia: 14.14 },
    urban: { nbi: 40.13, miseria: 21.32, vivienda: 26.99, servicios: 16.60, hacinamiento: 16.67, inasistencia: 4.64, dependencia: 9.36 },
    rural: { nbi: 79.99, miseria: 50.38, vivienda: 39.03, servicios: 64.34, hacinamiento: 29.05, inasistencia: 7.40, dependencia: 19.18 }
  },
  "GUAVIARE": {
    total: { nbi: 27.91, miseria: 8.97, vivienda: 14.76, servicios: 11.79, hacinamiento: 4.94, inasistencia: 2.25, dependencia: 6.90 },
    urban: { nbi: 15.64, miseria: 2.85, vivienda: 8.12, servicios: 1.78, hacinamiento: 3.72, inasistencia: 1.26, dependencia: 4.46 },
    rural: { nbi: 47.88, miseria: 18.95, vivienda: 25.58, servicios: 28.09, hacinamiento: 6.92, inasistencia: 3.86, dependencia: 10.86 }
  },
  "VAUPÉS": {
    total: { nbi: 68.94, miseria: 43.36, vivienda: 37.33, servicios: 56.68, hacinamiento: 28.44, inasistencia: 8.84, dependencia: 11.84 },
    urban: { nbi: 30.86, miseria: 10.27, vivienda: 17.18, servicios: 15.13, hacinamiento: 8.31, inasistencia: 1.73, dependencia: 2.71 },
    rural: { nbi: 86.14, miseria: 58.32, vivienda: 46.44, servicios: 75.45, hacinamiento: 37.53, inasistencia: 12.05, dependencia: 15.97 }
  },
  "VICHADA": {
    total: { nbi: 67.76, miseria: 50.96, vivienda: 56.59, servicios: 45.70, hacinamiento: 34.02, inasistencia: 10.08, dependencia: 16.75 },
    urban: { nbi: 32.70, miseria: 13.11, vivienda: 22.37, servicios: 6.34, hacinamiento: 13.69, inasistencia: 3.38, dependencia: 7.60 },
    rural: { nbi: 85.26, miseria: 69.86, vivienda: 73.67, servicios: 65.35, hacinamiento: 44.17, inasistencia: 13.42, dependencia: 21.32 }
  },
  "TOTAL NACIONAL": {
    total: { nbi: 14.28, miseria: 3.80, vivienda: 5.31, servicios: 3.59, hacinamiento: 4.17, inasistencia: 1.94, dependencia: 4.44 },
    urban: { nbi: 9.53, miseria: 1.79, vivienda: 2.88, servicios: 2.06, hacinamiento: 2.57, inasistencia: 1.59, dependencia: 2.66 },
    rural: { nbi: 30.48, miseria: 10.64, vivienda: 13.63, servicios: 8.78, hacinamiento: 9.64, inasistencia: 3.16, dependencia: 10.51 }
  }
};

export const MUNICIPALITY_NBI_DATA: MunicipalityNBI[] = [
  {
    code: "44001",
    name: "Riohacha",
    department: "LA GUAJIRA",
    region: "Caribe",
    subregion: "Media Guajira",
    total: { nbi: 36.27, miseria: 12.45, vivienda: 15.20, servicios: 8.40, hacinamiento: 12.10, inasistencia: 2.30, dependencia: 6.50 },
    urban: { nbi: 28.15, miseria: 5.20, vivienda: 8.40, servicios: 4.10, hacinamiento: 7.20, inasistencia: 1.80, dependencia: 4.20 },
    rural: { nbi: 65.40, miseria: 38.10, vivienda: 42.30, servicios: 25.60, hacinamiento: 31.40, inasistencia: 4.50, dependencia: 15.20 }
  },
  {
    code: "44430",
    name: "Maicao",
    department: "LA GUAJIRA",
    region: "Caribe",
    subregion: "Media Guajira",
    total: { nbi: 59.22, miseria: 35.10, vivienda: 28.40, servicios: 18.20, hacinamiento: 35.60, inasistencia: 8.40, dependencia: 12.10 },
    urban: { nbi: 42.10, miseria: 15.40, vivienda: 18.20, servicios: 12.10, hacinamiento: 22.40, inasistencia: 4.50, dependencia: 6.20 },
    rural: { nbi: 82.15, miseria: 58.40, vivienda: 45.60, servicios: 32.10, hacinamiento: 55.40, inasistencia: 15.20, dependencia: 22.10 }
  },
  {
    code: "44847",
    name: "Uribia",
    department: "LA GUAJIRA",
    region: "Caribe",
    subregion: "Alta Guajira",
    total: { nbi: 88.75, miseria: 62.30, vivienda: 55.40, servicios: 42.10, hacinamiento: 78.20, inasistencia: 15.40, dependencia: 25.60 },
    urban: { nbi: 45.20, miseria: 18.40, vivienda: 22.10, servicios: 15.60, hacinamiento: 28.40, inasistencia: 5.20, dependencia: 8.40 },
    rural: { nbi: 92.10, miseria: 75.60, vivienda: 68.40, servicios: 52.30, hacinamiento: 85.20, inasistencia: 18.20, dependencia: 32.10 }
  },
  {
    code: "44560",
    name: "Manaure",
    department: "LA GUAJIRA",
    region: "Caribe",
    subregion: "Alta Guajira",
    total: { nbi: 81.10, miseria: 55.40, vivienda: 42.10, servicios: 32.10, hacinamiento: 65.40, inasistencia: 12.10, dependencia: 18.20 },
    urban: { nbi: 38.40, miseria: 12.10, vivienda: 15.60, servicios: 10.20, hacinamiento: 18.40, inasistencia: 3.20, dependencia: 5.40 },
    rural: { nbi: 88.15, miseria: 68.20, vivienda: 52.30, servicios: 45.60, hacinamiento: 72.10, inasistencia: 15.60, dependencia: 25.40 }
  },
  {
    code: "44279",
    name: "Fonseca",
    department: "LA GUAJIRA",
    region: "Caribe",
    subregion: "Baja Guajira",
    total: { nbi: 19.43, miseria: 4.50, vivienda: 5.20, servicios: 3.10, hacinamiento: 4.20, inasistencia: 1.20, dependencia: 3.50 },
    urban: { nbi: 15.20, miseria: 2.10, vivienda: 3.40, servicios: 1.50, hacinamiento: 2.80, inasistencia: 0.80, dependencia: 2.10 },
    rural: { nbi: 32.40, miseria: 12.10, vivienda: 10.20, servicios: 8.40, hacinamiento: 8.10, inasistencia: 2.40, dependencia: 7.50 }
  },
  {
    code: "44874",
    name: "Villanueva",
    department: "LA GUAJIRA",
    region: "Caribe",
    subregion: "Baja Guajira",
    total: { nbi: 18.60, miseria: 3.80, vivienda: 4.50, servicios: 2.80, hacinamiento: 3.50, inasistencia: 1.10, dependencia: 3.20 },
    urban: { nbi: 14.10, miseria: 1.80, vivienda: 2.90, servicios: 1.20, hacinamiento: 2.40, inasistencia: 0.70, dependencia: 1.90 },
    rural: { nbi: 35.60, miseria: 14.20, vivienda: 12.40, servicios: 10.50, hacinamiento: 9.20, inasistencia: 2.80, dependencia: 8.40 }
  },
  {
    code: "05001",
    name: "Medellín",
    department: "ANTIOQUIA",
    region: "Andina",
    subregion: "Valle de Aburrá",
    total: { nbi: 4.50, miseria: 0.40, vivienda: 0.50, servicios: 0.10, hacinamiento: 1.20, inasistencia: 0.80, dependencia: 1.50 },
    urban: { nbi: 4.30, miseria: 0.35, vivienda: 0.45, servicios: 0.08, hacinamiento: 1.15, inasistencia: 0.75, dependencia: 1.45 },
    rural: { nbi: 12.40, miseria: 2.10, vivienda: 3.20, servicios: 1.50, hacinamiento: 4.20, inasistencia: 1.80, dependencia: 3.50 }
  },
  {
    code: "05045",
    name: "Apartadó",
    department: "ANTIOQUIA",
    region: "Andina",
    subregion: "Urabá",
    total: { nbi: 15.20, miseria: 3.50, vivienda: 4.80, servicios: 2.10, hacinamiento: 3.40, inasistencia: 1.50, dependencia: 4.20 },
    urban: { nbi: 12.40, miseria: 2.10, vivienda: 3.20, servicios: 1.20, hacinamiento: 2.50, inasistencia: 1.10, dependencia: 3.10 },
    rural: { nbi: 28.60, miseria: 10.40, vivienda: 12.50, servicios: 6.40, hacinamiento: 7.80, inasistencia: 3.20, dependencia: 8.50 }
  },
  {
    code: "05154",
    name: "Caucasia",
    department: "ANTIOQUIA",
    region: "Andina",
    subregion: "Bajo Cauca",
    total: { nbi: 22.40, miseria: 6.20, vivienda: 8.50, servicios: 4.10, hacinamiento: 5.20, inasistencia: 2.10, dependencia: 6.40 },
    urban: { nbi: 18.50, miseria: 4.10, vivienda: 6.20, servicios: 2.50, hacinamiento: 3.80, inasistencia: 1.50, dependencia: 4.80 },
    rural: { nbi: 38.20, miseria: 15.40, vivienda: 18.40, servicios: 10.20, hacinamiento: 10.50, inasistencia: 4.20, dependencia: 12.10 }
  },
  {
    code: "20001",
    name: "Valledupar",
    department: "CESAR",
    region: "Caribe",
    subregion: "Norte",
    total: { nbi: 17.8, miseria: 4.2, vivienda: 5.1, servicios: 2.3, hacinamiento: 3.4, inasistencia: 1.2, dependencia: 2.5 },
    urban: { nbi: 14.0, miseria: 2.1, vivienda: 3.2, servicios: 1.1, hacinamiento: 2.4, inasistencia: 0.8, dependencia: 1.8 },
    rural: { nbi: 45.4, miseria: 18.2, vivienda: 22.1, servicios: 12.4, hacinamiento: 15.6, inasistencia: 4.5, dependencia: 8.2 }
  },
  {
    code: "20011",
    name: "Aguachica",
    department: "CESAR",
    region: "Caribe",
    subregion: "Sur",
    total: { nbi: 18.8, miseria: 4.5, vivienda: 5.4, servicios: 2.5, hacinamiento: 3.6, inasistencia: 1.4, dependencia: 2.7 },
    urban: { nbi: 16.1, miseria: 3.2, vivienda: 4.1, servicios: 1.8, hacinamiento: 2.8, inasistencia: 1.1, dependencia: 2.1 },
    rural: { nbi: 38.6, miseria: 15.4, vivienda: 18.2, servicios: 10.1, hacinamiento: 12.4, inasistencia: 3.8, dependencia: 7.5 }
  },
  {
    code: "20013",
    name: "Agustín Codazzi",
    department: "CESAR",
    region: "Caribe",
    subregion: "Norte",
    total: { nbi: 24.2, miseria: 6.1, vivienda: 7.2, servicios: 3.4, hacinamiento: 4.5, inasistencia: 1.8, dependencia: 3.2 },
    urban: { nbi: 18.5, miseria: 4.2, vivienda: 5.1, servicios: 2.1, hacinamiento: 3.2, inasistencia: 1.2, dependencia: 2.4 },
    rural: { nbi: 43.1, miseria: 16.4, vivienda: 19.2, servicios: 11.2, hacinamiento: 14.1, inasistencia: 4.1, dependencia: 7.8 }
  },
  {
    code: "20045",
    name: "Bosconia",
    department: "CESAR",
    region: "Caribe",
    subregion: "Noroccidente",
    total: { nbi: 22.4, miseria: 5.4, vivienda: 6.5, servicios: 3.1, hacinamiento: 4.2, inasistencia: 1.6, dependencia: 2.9 },
    urban: { nbi: 19.2, miseria: 4.1, vivienda: 5.2, servicios: 2.4, hacinamiento: 3.5, inasistencia: 1.3, dependencia: 2.5 },
    rural: { nbi: 48.5, miseria: 19.1, vivienda: 23.4, servicios: 13.2, hacinamiento: 16.4, inasistencia: 4.8, dependencia: 9.1 }
  },
  {
    code: "20178",
    name: "Curumaní",
    department: "CESAR",
    region: "Caribe",
    subregion: "Centro",
    total: { nbi: 25.6, miseria: 6.5, vivienda: 7.8, servicios: 3.8, hacinamiento: 4.9, inasistencia: 2.1, dependencia: 3.6 },
    urban: { nbi: 21.4, miseria: 5.1, vivienda: 6.2, servicios: 2.8, hacinamiento: 3.9, inasistencia: 1.6, dependencia: 2.9 },
    rural: { nbi: 38.2, miseria: 14.2, vivienda: 17.1, servicios: 9.4, hacinamiento: 11.2, inasistencia: 3.5, dependencia: 6.8 }
  },
  {
    code: "20238",
    name: "El Copey",
    department: "CESAR",
    region: "Caribe",
    subregion: "Noroccidente",
    total: { nbi: 28.4, miseria: 7.2, vivienda: 8.5, servicios: 4.1, hacinamiento: 5.2, inasistencia: 2.4, dependencia: 4.1 },
    urban: { nbi: 22.1, miseria: 5.4, vivienda: 6.8, servicios: 3.2, hacinamiento: 4.1, inasistencia: 1.8, dependencia: 3.2 },
    rural: { nbi: 45.6, miseria: 16.2, vivienda: 19.4, servicios: 10.5, hacinamiento: 13.2, inasistencia: 4.5, dependencia: 8.4 }
  },
  {
    code: "20250",
    name: "El Paso",
    department: "CESAR",
    region: "Caribe",
    subregion: "Centro",
    total: { nbi: 32.1, miseria: 8.4, vivienda: 10.2, servicios: 5.1, hacinamiento: 6.4, inasistencia: 2.8, dependencia: 5.2 },
    urban: { nbi: 25.4, miseria: 6.2, vivienda: 8.1, servicios: 3.8, hacinamiento: 5.1, inasistencia: 2.1, dependencia: 4.1 },
    rural: { nbi: 42.1, miseria: 15.6, vivienda: 18.2, servicios: 11.4, hacinamiento: 14.2, inasistencia: 5.2, dependencia: 9.4 }
  },
  {
    code: "20295",
    name: "Gamarra",
    department: "CESAR",
    region: "Caribe",
    subregion: "Sur",
    total: { nbi: 35.6, miseria: 9.2, vivienda: 12.4, servicios: 6.2, hacinamiento: 7.5, inasistencia: 3.1, dependencia: 6.4 },
    urban: { nbi: 28.2, miseria: 7.1, vivienda: 9.4, servicios: 4.5, hacinamiento: 5.8, inasistencia: 2.4, dependencia: 5.1 },
    rural: { nbi: 48.4, miseria: 18.4, vivienda: 22.1, servicios: 13.4, hacinamiento: 16.2, inasistencia: 5.4, dependencia: 10.2 }
  },
  {
    code: "20310",
    name: "González",
    department: "CESAR",
    region: "Caribe",
    subregion: "Sur",
    total: { nbi: 15.2, miseria: 3.1, vivienda: 4.2, servicios: 1.8, hacinamiento: 2.5, inasistencia: 1.1, dependencia: 2.4 },
    urban: { nbi: 12.1, miseria: 2.4, vivienda: 3.1, servicios: 1.2, hacinamiento: 1.8, inasistencia: 0.8, dependencia: 1.9 },
    rural: { nbi: 22.4, miseria: 8.4, vivienda: 10.2, servicios: 5.1, hacinamiento: 6.4, inasistencia: 2.4, dependencia: 5.2 }
  },
  {
    code: "20383",
    name: "La Gloria",
    department: "CESAR",
    region: "Caribe",
    subregion: "Sur",
    total: { nbi: 38.2, miseria: 10.4, vivienda: 14.2, servicios: 7.1, hacinamiento: 8.4, inasistencia: 3.5, dependencia: 7.2 },
    urban: { nbi: 31.4, miseria: 8.2, vivienda: 11.1, servicios: 5.4, hacinamiento: 6.2, inasistencia: 2.8, dependencia: 5.8 },
    rural: { nbi: 45.6, miseria: 16.4, vivienda: 19.2, servicios: 12.1, hacinamiento: 14.2, inasistencia: 5.6, dependencia: 10.4 }
  },
  {
    code: "20400",
    name: "La Jagua de Ibirico",
    department: "CESAR",
    region: "Caribe",
    subregion: "Centro",
    total: { nbi: 22.1, miseria: 5.2, vivienda: 6.4, servicios: 3.1, hacinamiento: 4.2, inasistencia: 1.8, dependencia: 3.2 },
    urban: { nbi: 18.4, miseria: 4.1, vivienda: 5.2, servicios: 2.4, hacinamiento: 3.5, inasistencia: 1.3, dependencia: 2.5 },
    rural: { nbi: 35.6, miseria: 12.4, vivienda: 15.2, servicios: 8.4, hacinamiento: 10.2, inasistencia: 4.1, dependencia: 7.2 }
  },
  {
    code: "20443",
    name: "Manaure Balcón del Cesar",
    department: "CESAR",
    region: "Caribe",
    subregion: "Norte",
    total: { nbi: 12.4, miseria: 2.1, vivienda: 3.2, servicios: 1.4, hacinamiento: 2.1, inasistencia: 0.8, dependencia: 1.8 },
    urban: { nbi: 10.2, miseria: 1.8, vivienda: 2.4, servicios: 1.1, hacinamiento: 1.5, inasistencia: 0.6, dependencia: 1.4 },
    rural: { nbi: 18.4, miseria: 6.2, vivienda: 8.4, servicios: 4.1, hacinamiento: 5.2, inasistencia: 2.1, dependencia: 4.2 }
  },
  {
    code: "20517",
    name: "Pailitas",
    department: "CESAR",
    region: "Caribe",
    subregion: "Sur",
    total: { nbi: 24.5, miseria: 6.2, vivienda: 7.4, servicios: 3.5, hacinamiento: 4.8, inasistencia: 1.9, dependencia: 3.4 },
    urban: { nbi: 20.1, miseria: 5.1, vivienda: 6.2, servicios: 2.8, hacinamiento: 3.9, inasistencia: 1.5, dependencia: 2.8 },
    rural: { nbi: 38.2, miseria: 14.1, vivienda: 17.2, servicios: 9.2, hacinamiento: 11.4, inasistencia: 3.8, dependencia: 6.5 }
  },
  {
    code: "20550",
    name: "Pelaya",
    department: "CESAR",
    region: "Caribe",
    subregion: "Sur",
    total: { nbi: 26.4, miseria: 6.8, vivienda: 8.2, servicios: 3.8, hacinamiento: 5.1, inasistencia: 2.1, dependencia: 3.8 },
    urban: { nbi: 22.1, miseria: 5.4, vivienda: 6.8, servicios: 3.1, hacinamiento: 4.2, inasistencia: 1.8, dependencia: 3.2 },
    rural: { nbi: 35.6, miseria: 13.2, vivienda: 16.1, servicios: 8.4, hacinamiento: 10.4, inasistencia: 4.2, dependencia: 7.1 }
  },
  {
    code: "20570",
    name: "Pueblo Bello",
    department: "CESAR",
    region: "Caribe",
    subregion: "Norte",
    total: { nbi: 45.6, miseria: 15.2, vivienda: 18.4, servicios: 10.2, hacinamiento: 12.4, inasistencia: 5.2, dependencia: 9.4 },
    urban: { nbi: 32.1, miseria: 10.4, vivienda: 12.1, servicios: 7.4, hacinamiento: 8.2, inasistencia: 3.1, dependencia: 6.2 },
    rural: { nbi: 58.4, miseria: 22.1, vivienda: 25.6, servicios: 15.2, hacinamiento: 18.4, inasistencia: 8.4, dependencia: 14.2 }
  },
  {
    code: "20614",
    name: "Rio de Oro",
    department: "CESAR",
    region: "Caribe",
    subregion: "Sur",
    total: { nbi: 18.2, miseria: 4.1, vivienda: 5.2, servicios: 2.4, hacinamiento: 3.5, inasistencia: 1.2, dependencia: 2.8 },
    urban: { nbi: 15.4, miseria: 3.2, vivienda: 4.1, servicios: 1.8, hacinamiento: 2.8, inasistencia: 0.9, dependencia: 2.1 },
    rural: { nbi: 28.4, miseria: 10.2, vivienda: 12.4, servicios: 6.2, hacinamiento: 8.4, inasistencia: 2.8, dependencia: 5.4 }
  },
  {
    code: "20621",
    name: "La Paz",
    department: "CESAR",
    region: "Caribe",
    subregion: "Norte",
    total: { nbi: 21.4, miseria: 5.1, vivienda: 6.2, servicios: 3.1, hacinamiento: 4.2, inasistencia: 1.5, dependencia: 3.1 },
    urban: { nbi: 18.2, miseria: 4.1, vivienda: 5.2, servicios: 2.4, hacinamiento: 3.5, inasistencia: 1.2, dependencia: 2.5 },
    rural: { nbi: 32.1, miseria: 12.4, vivienda: 15.2, servicios: 8.4, hacinamiento: 10.2, inasistencia: 3.1, dependencia: 6.4 }
  },
  {
    code: "20710",
    name: "San Alberto",
    department: "CESAR",
    region: "Caribe",
    subregion: "Sur",
    total: { nbi: 16.4, miseria: 3.8, vivienda: 4.8, servicios: 2.1, hacinamiento: 3.2, inasistencia: 1.1, dependencia: 2.5 },
    urban: { nbi: 14.2, miseria: 3.1, vivienda: 4.1, servicios: 1.8, hacinamiento: 2.8, inasistencia: 0.9, dependencia: 2.1 },
    rural: { nbi: 25.6, miseria: 9.4, vivienda: 11.2, servicios: 5.4, hacinamiento: 7.2, inasistencia: 2.4, dependencia: 5.1 }
  },
  {
    code: "20750",
    name: "San Diego",
    department: "CESAR",
    region: "Caribe",
    subregion: "Norte",
    total: { nbi: 22.1, miseria: 5.4, vivienda: 6.5, servicios: 3.2, hacinamiento: 4.5, inasistencia: 1.8, dependencia: 3.2 },
    urban: { nbi: 18.4, miseria: 4.2, vivienda: 5.1, servicios: 2.1, hacinamiento: 3.2, inasistencia: 1.2, dependencia: 2.4 },
    rural: { nbi: 35.6, miseria: 12.4, vivienda: 15.2, servicios: 8.4, hacinamiento: 10.2, inasistencia: 4.1, dependencia: 7.2 }
  },
  {
    code: "20770",
    name: "San Martín",
    department: "CESAR",
    region: "Caribe",
    subregion: "Sur",
    total: { nbi: 19.2, miseria: 4.5, vivienda: 5.4, servicios: 2.8, hacinamiento: 3.8, inasistencia: 1.4, dependencia: 2.9 },
    urban: { nbi: 16.4, miseria: 3.8, vivienda: 4.5, servicios: 2.1, hacinamiento: 3.1, inasistencia: 1.1, dependencia: 2.4 },
    rural: { nbi: 28.4, miseria: 10.4, vivienda: 12.4, servicios: 6.4, hacinamiento: 8.4, inasistencia: 2.8, dependencia: 5.8 }
  },
  {
    code: "20787",
    name: "Tamalameque",
    department: "CESAR",
    region: "Caribe",
    subregion: "Sur",
    total: { nbi: 42.1, miseria: 12.4, vivienda: 15.2, servicios: 8.4, hacinamiento: 10.2, inasistencia: 4.1, dependencia: 7.2 },
    urban: { nbi: 35.6, miseria: 10.2, vivienda: 12.4, servicios: 6.2, hacinamiento: 8.4, inasistencia: 3.1, dependencia: 5.8 },
    rural: { nbi: 52.3, miseria: 18.4, vivienda: 22.1, servicios: 13.4, hacinamiento: 16.2, inasistencia: 6.2, dependencia: 11.4 }
  },
  {
    code: "08001",
    name: "Barranquilla",
    department: "ATLÁNTICO",
    region: "Caribe",
    subregion: "Metropolitana",
    total: { nbi: 9.1, miseria: 1.2, vivienda: 1.5, servicios: 0.8, hacinamiento: 2.4, inasistencia: 1.1, dependencia: 2.1 },
    urban: { nbi: 8.9, miseria: 1.1, vivienda: 1.4, servicios: 0.7, hacinamiento: 2.3, inasistencia: 1.0, dependencia: 2.0 },
    rural: { nbi: 15.4, miseria: 3.2, vivienda: 4.1, servicios: 2.1, hacinamiento: 4.5, inasistencia: 2.4, dependencia: 4.1 }
  },
  {
    code: "08758",
    name: "Soledad",
    department: "ATLÁNTICO",
    region: "Caribe",
    subregion: "Metropolitana",
    total: { nbi: 12.4, miseria: 2.1, vivienda: 2.4, servicios: 1.2, hacinamiento: 3.5, inasistencia: 1.8, dependencia: 2.8 },
    urban: { nbi: 12.1, miseria: 2.0, vivienda: 2.3, servicios: 1.1, hacinamiento: 3.4, inasistencia: 1.7, dependencia: 2.7 },
    rural: { nbi: 18.2, miseria: 4.5, vivienda: 5.1, servicios: 2.8, hacinamiento: 5.2, inasistencia: 3.1, dependencia: 4.5 }
  },
  {
    code: "13001",
    name: "Cartagena",
    department: "BOLÍVAR",
    region: "Caribe",
    subregion: "Dique",
    total: { nbi: 18.4, miseria: 4.2, vivienda: 5.1, servicios: 2.4, hacinamiento: 4.1, inasistencia: 1.8, dependencia: 3.2 },
    urban: { nbi: 17.2, miseria: 3.8, vivienda: 4.5, servicios: 2.1, hacinamiento: 3.8, inasistencia: 1.6, dependencia: 2.9 },
    rural: { nbi: 35.6, miseria: 12.4, vivienda: 15.2, servicios: 8.4, hacinamiento: 10.2, inasistencia: 4.1, dependencia: 7.2 }
  },
  {
    code: "13430",
    name: "Magangué",
    department: "BOLÍVAR",
    region: "Caribe",
    subregion: "Mojana",
    total: { nbi: 32.1, miseria: 8.4, vivienda: 10.2, servicios: 5.1, hacinamiento: 6.4, inasistencia: 2.8, dependencia: 5.2 },
    urban: { nbi: 25.4, miseria: 6.2, vivienda: 8.1, servicios: 3.8, hacinamiento: 5.1, inasistencia: 2.1, dependencia: 4.1 },
    rural: { nbi: 42.1, miseria: 15.6, vivienda: 18.2, servicios: 11.4, hacinamiento: 14.2, inasistencia: 5.2, dependencia: 9.4 }
  },
  {
    code: "25001",
    name: "Agua de Dios",
    department: "CUNDINAMARCA",
    region: "Andina",
    subregion: "Alto Magdalena",
    total: { nbi: 12.4, miseria: 2.1, vivienda: 3.2, servicios: 1.4, hacinamiento: 2.1, inasistencia: 0.8, dependencia: 1.8 },
    urban: { nbi: 10.2, miseria: 1.8, vivienda: 2.4, servicios: 1.1, hacinamiento: 1.5, inasistencia: 0.6, dependencia: 1.4 },
    rural: { nbi: 18.4, miseria: 6.2, vivienda: 8.4, servicios: 4.1, hacinamiento: 5.2, inasistencia: 2.1, dependencia: 4.2 }
  },
  {
    code: "25175",
    name: "Chía",
    department: "CUNDINAMARCA",
    region: "Andina",
    subregion: "Sabana Centro",
    total: { nbi: 4.2, miseria: 0.3, vivienda: 0.4, servicios: 0.1, hacinamiento: 1.1, inasistencia: 0.7, dependencia: 1.4 },
    urban: { nbi: 3.8, miseria: 0.2, vivienda: 0.3, servicios: 0.05, hacinamiento: 0.9, inasistencia: 0.6, dependencia: 1.2 },
    rural: { nbi: 8.4, miseria: 1.2, vivienda: 1.5, servicios: 0.8, hacinamiento: 2.4, inasistencia: 1.1, dependencia: 2.1 }
  },
  {
    code: "76001",
    name: "Cali",
    department: "VALLE DEL CAUCA",
    region: "Pacífico",
    subregion: "Sur",
    total: { nbi: 7.4, miseria: 0.8, vivienda: 1.1, servicios: 0.4, hacinamiento: 1.8, inasistencia: 0.9, dependencia: 1.6 },
    urban: { nbi: 7.1, miseria: 0.7, vivienda: 1.0, servicios: 0.3, hacinamiento: 1.7, inasistencia: 0.8, dependencia: 1.5 },
    rural: { nbi: 14.2, miseria: 2.8, vivienda: 3.5, servicios: 1.8, hacinamiento: 3.2, inasistencia: 1.5, dependencia: 2.8 }
  },
  {
    code: "76109",
    name: "Buenaventura",
    department: "VALLE DEL CAUCA",
    region: "Pacífico",
    subregion: "Occidente",
    total: { nbi: 35.6, miseria: 12.4, vivienda: 15.2, servicios: 8.4, hacinamiento: 10.2, inasistencia: 4.1, dependencia: 7.2 },
    urban: { nbi: 28.4, miseria: 8.2, vivienda: 10.4, servicios: 5.4, hacinamiento: 7.2, inasistencia: 2.8, dependencia: 5.1 },
    rural: { nbi: 65.4, miseria: 35.6, vivienda: 42.1, servicios: 25.4, hacinamiento: 32.1, inasistencia: 12.4, dependencia: 18.2 }
  }
];
