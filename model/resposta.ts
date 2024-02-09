export default class RespostaModel {
  #valor: string;
  #certa: boolean;
  #revelada: boolean;

  constructor(valor: string, certa: boolean, revelada = false) {
    this.#valor = valor;
    this.#certa = certa;
    this.#revelada = revelada;
  }

  get valor() {
    return this.#valor;
  }

  get certa() {
    return this.#certa;
  }

  get revelada() {
    return this.#revelada;
  }
}
