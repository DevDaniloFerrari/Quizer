export default class RespostaModel {
  #valor: string;
  #certa: boolean;
  #revelada: boolean;

  constructor(valor: string, certa: boolean, revelada = false) {
    this.#valor = valor;
    this.#certa = certa;
    this.#revelada = revelada;
  }

  static certa(valor: string) {
    return new RespostaModel(valor, true);
  }

  static errada(valor: string) {
    return new RespostaModel(valor, false);
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

  converterParaObjeto() {
    return {
      valor: this.#valor,
      certa: this.#certa,
      revelada: this.#revelada,
    };
  }
}
