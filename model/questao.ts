export default class QuestaoModel {
  #id: number;
  #enunciado: string;
  #respostas: any[];
  #acertou: boolean;
  //#respondida: boolean;

  constructor(
    id: number,
    enunciado: string,
    respostas: any[],
    acertou = false
  ) {
    this.#id = id;
    this.#enunciado = enunciado;
    this.#respostas = respostas;
    this.#acertou = acertou;
  }

  get id() {
    return this.#id;
  }

  get enunciado() {
    return this.#enunciado;
  }

  get respostas() {
    return this.#respostas;
  }

  get acertou() {
    return this.#acertou;
  }

  get respondida() {
    // TODO: implementar essa função
    return false;
  }
}
