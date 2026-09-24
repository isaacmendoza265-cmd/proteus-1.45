// Los archivos .geo.json se importan como datos sin tipar (TypeScript no los analiza,
// lo que evita que la revisión de tipos se vuelva lenta con archivos de varios MB).
declare module '*.geo.json' {
  const value: unknown;
  export default value;
}
