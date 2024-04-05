import Usuario from "./usuario";

export default class Sala {
  #id: string;
  #primeiroJogador: Usuario;
  #segundoJogador: Usuario;

  constructor(primeiroJogador: Usuario, segundoJogador?: Usuario, id?: string) {
    this.#primeiroJogador = primeiroJogador;
    this.#segundoJogador = segundoJogador;
    this.#id = id;
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

  get aguardandoJogador() {
    return this.#segundoJogador === undefined;
  }

  static criarUsandoObjeto(objeto: Sala): Sala {
    return new Sala(objeto.primeiroJogador, objeto.segundoJogador, objeto.id);
  }

  adicionarSegundoJogador(usuario: Usuario) {
    this.#segundoJogador = usuario;
  }

  converterParaObjeto() {
    return {
      id: this.#id,
      primeiroJogador: this.#primeiroJogador,
      segundoJogador: this.#segundoJogador,
    };
  }
}
