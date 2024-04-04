import Usuario from "./usuario";

export default class Sala {
  #id: string;
  #primeiroJogador: Usuario;
  #segundoJogador: Usuario;

  constructor(primeiroJogador: Usuario) {
    this.#primeiroJogador = primeiroJogador;
  }

  get id() {
    return this.#id;
  }

  get primeiroJogador() {
    return this.#primeiroJogador;
  }

  get segundoJogador() {
    return this.#segundoJogador;
  }

  static criarUsandoObjeto(objeto: Sala): Sala {
    return new Sala(objeto.primeiroJogador);
  }

  converterParaObjeto() {
    return {
      id: this.#id,
      primeiroJogador: this.#primeiroJogador,
      segundoJogador: this.#segundoJogador,
    };
  }
}
