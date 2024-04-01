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

  converterParaObjeto() {
    return {
      uid: this.#uid,
      quizesRespondidos: this.#quizesRespondidos.map((quiz) =>
        quiz.converterParaObjeto()
      ),
    };
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

  get totalQuizesRespondidos() {
    return this.#quizesRespondidos.length;
  }

  get totalRespostasCertas() {
    return this.#quizesRespondidos.reduce((total, { certas }) => {
      return total + certas;
    }, 0);
  }

  get totalRespostasErradas() {
    return this.#quizesRespondidos.reduce((total, { erradas }) => {
      return total + erradas;
    }, 0);
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

  converterParaObjeto() {
    return {
      certas: this.#certas,
      erradas: this.#erradas,
    };
  }

  get certas() {
    return this.#certas;
  }

  get erradas() {
    return this.#erradas;
  }
}
