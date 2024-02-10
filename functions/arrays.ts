export function embaralhar(elementos: any[]): any[] {
  return elementos
    .map((elemento) => ({ elemento, aleatorio: Math.random() }))
    .sort((x, y) => x.aleatorio - y.aleatorio)
    .map((objeto) => objeto.elemento);
}
