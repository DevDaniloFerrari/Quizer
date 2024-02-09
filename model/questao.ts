import RespostaModel from "./resposta";

export default class QuestaoModel {
  #id: number;
  #enunciado: string;
  #respostas: RespostaModel[];
  #acertou: boolean;

  constructor(
    id: number,
    enunciado: string,
    respostas: RespostaModel[],
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
    this.#respostas.forEach((resposta) => {
      if (resposta.revelada) return true;
    });

    return false;
  }
}
