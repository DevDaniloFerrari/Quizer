import { IHistoricoQuestoes } from "./historicoQuestoes";
import Usuario from "./usuario";

export default class Sala {
  #id: string;
  #primeiroJogador: Usuario;
  #segundoJogador: Usuario;
  #historicoPrimeiroJogador: IHistoricoQuestoes[];
  #historicoSegundoJogador: IHistoricoQuestoes[];

  constructor(
    primeiroJogador: Usuario,
    segundoJogador?: Usuario,
    id?: string,
    historicoPrimeiroJogador?: IHistoricoQuestoes[],
    historicoSegundoJogador?: IHistoricoQuestoes[]
  ) {
    this.#primeiroJogador = primeiroJogador;
    this.#segundoJogador = segundoJogador;
    this.#id = id;
    this.#historicoPrimeiroJogador = historicoPrimeiroJogador || [];
    this.#historicoSegundoJogador = historicoSegundoJogador || [];
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

  get historicoPrimeiroJogador() {
    return this.#historicoPrimeiroJogador;
  }

  get historicoSegundoJogador() {
    return this.#historicoSegundoJogador;
  }

  get aguardandoJogador() {
    return this.#segundoJogador === undefined;
  }

  set historicoPrimeiroJogador(historico: IHistoricoQuestoes[]) {
    this.#historicoPrimeiroJogador = historico;
  }

  set historicoSegundoJogador(historico: IHistoricoQuestoes[]) {
    this.#historicoSegundoJogador = historico;
  }

  static criarUsandoObjeto(objeto: Sala): Sala {
    const salaNova = new Sala(
      objeto.primeiroJogador,
      objeto.segundoJogador,
      objeto.id,
      objeto.historicoPrimeiroJogador,
      objeto.historicoSegundoJogador
    );
    console.log(salaNova);
    return salaNova;
  }

  adicionarSegundoJogador(usuario: Usuario) {
    this.#segundoJogador = usuario;
  }

  converterParaObjeto() {
    return {
      id: this.#id,
      primeiroJogador: this.#primeiroJogador,
      segundoJogador: this.#segundoJogador,
      historicoPrimeiroJogador: this.#historicoPrimeiroJogador,
      historicoSegundoJogador: this.#historicoSegundoJogador,
    };
  }
}
