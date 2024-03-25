export class Classificacao {
  #uid: string;
  #quizesRespondidos: QuizRespondido[];

  constructor(uid: string, quizRespondido: QuizRespondido[]) {
    this.#uid = uid;
    this.#quizesRespondidos = quizRespondido;
  }

  adicionarQuizResponido(quizRespondido: QuizRespondido) {
    this.#quizesRespondidos.push(quizRespondido);
  }

  static criarUsandoObjeto(objeto: Classificacao): Classificacao {
    const quizes = objeto.quizesRespondidos.map((quiz) =>
      QuizRespondido.criarUsandoObjeto(quiz)
    );
    return new Classificacao(objeto.uid, quizes);
  }

  get uid() {
    return this.#uid;
  }

  get quizesRespondidos() {
    return this.#quizesRespondidos;
  }
}

export class QuizRespondido {
  #certas: number;
  #erradas: number;

  constructor(certas: number, erradas: number) {
    this.#certas = certas;
    this.#erradas = erradas;
  }

  static criarUsandoObjeto(quiz: QuizRespondido): QuizRespondido {
    return new QuizRespondido(quiz.certas, quiz.erradas);
  }

  get certas() {
    return this.#certas;
  }

  get erradas() {
    return this.#erradas;
  }
}
