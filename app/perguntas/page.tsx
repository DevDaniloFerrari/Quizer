"use client";
import Questionario from "@/components/Questionario";
import QuestaoModel from "@/model/questao";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "url";
import CircularProgress from "@mui/material/CircularProgress";
import IconeGithub from "@/components/IconeGithub";
import styles from "@/styles/Questionario.module.css";
import { IHistoricoQuestoes } from "@/model/historicoQuestoes";
import { alterarSala, getSala } from "@/model/firebase";
import useAuth from "@/data/hook/useAuth";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

interface PerguntaProps {
  searchParams: {
    quantidadePerguntas: string;
    duracaoPerguntas: string;
    idSala?: string;
  };
}

export default function Perguntas(props: PerguntaProps) {
  const router = useRouter();
  const [questao, setQuestao] = useState<QuestaoModel>();
  const [respostasCertas, setRespostasCertas] = useState<number>(0);
  const [numeroQuestao, setNumeroQuestao] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [questoes, setQuestoes] = useState<QuestaoModel[]>([]);
  const [questoesRespondidas, setQuestoesRespondidas] = useState<
    QuestaoModel[]
  >([]);
  const { usuario } = useAuth();

  const quantidadePerguntas = Math.min(
    Math.max(Number(props.searchParams.quantidadePerguntas), 10),
    30
  );
  const duracaoPerguntas = Math.min(
    Math.max(Number(props.searchParams.duracaoPerguntas), 10),
    60
  );

  useEffect(() => {
    obterQuestoes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (questoes.length) {
      setQuestao(questoes[0]);
    }
  }, [questoes]);

  async function setarQuestoes(idsDasQuestoes: number[]) {
    const novasQuestoes = await Promise.all(
      idsDasQuestoes.map(async (id) => {
        const resposta = await fetch(`${BASE_URL}/questoes/${id}`);
        const json = await resposta.json();
        return QuestaoModel.criarUsandoObjeto(json);
      })
    );

    setQuestoes((questoesAntigas) => [...questoesAntigas, ...novasQuestoes]);
  }

  async function obterQuestoes() {
    try {
      const resposta = await fetch(`${BASE_URL}/questionario`);
      const idsDasQuestoes = await resposta.json();

      if (idsDasQuestoes.length) {
        setarQuestoes(idsDasQuestoes.slice(0, quantidadePerguntas));
      }
    } catch (error) {
      alert(`Ocorreu um erro ao carregar as questões: ${error}`);
    }
  }

  function playAudio(audio: HTMLAudioElement) {
    audio.currentTime = 0;
    audio.play();
  };

  function obterAudio(acertou) {
    if(acertou) {
      return playAudio(new Audio("/audio/correct.mp3"));
    }
    return playAudio(new Audio("/audio/error.mp3"))
  }

  function carregarQuestao(questao: QuestaoModel) {
    const idx = questoes.findIndex((item) => item === questao);
    setQuestao(questao);
    setNumeroQuestao(idx + 1);
  }

  function questaoRespondida(questaoRespondida: QuestaoModel) {
    setQuestoesRespondidas((questoesAntigas) => [
      ...questoesAntigas,
      questaoRespondida,
    ]);

    obterAudio(questaoRespondida.acertou);
    setQuestao(questaoRespondida);
    setRespostasCertas(respostasCertas + (questaoRespondida.acertou ? 1 : 0));
  }

  function idProximaPergunta() {
    if (numeroQuestao < questoes.length) {
      return carregarQuestao(questoes[numeroQuestao]);
    }
    finalizar();
  }

  async function formatarQuestoesParaHistorico(
    questoes: QuestaoModel[],
    questoesRespondidas: QuestaoModel[]
  ) {
    const historicoQuestoes: IHistoricoQuestoes[] = questoes.map((questao) => {
      const questaoRespondida =
        questoesRespondidas.find((qr) => qr.id === questao.id) || questao;
      const respostaErrada =
        questaoRespondida.respostas.find((x) => !x.certa && x.revelada)
          ?.valor || "";
      const respostaVerdadeira = questaoRespondida.respostas.find(
        (x) => x.certa
      ).valor;

      return {
        id: questao.id,
        acertou: questaoRespondida.acertou,
        enunciado: questao.enunciado,
        respostaErrada,
        respostaVerdadeira,
      };
    });

    if (props.searchParams.idSala) {
      const sala = await getSala(props.searchParams.idSala);

      if (usuario.uid === sala.primeiroJogador.uid) {
        sala.historicoPrimeiroJogador = historicoQuestoes;
      } else {
        sala.historicoSegundoJogador = historicoQuestoes;
      }

      alterarSala(sala);
    }

    localStorage.setItem("questoes", JSON.stringify(historicoQuestoes));

    return historicoQuestoes;
  }

  async function finalizar() {
    const questoesFormatada = await formatarQuestoesParaHistorico(
      questoes,
      questoesRespondidas
    );

    if (questoesFormatada.length) {
      setLoading(true);
      const url = obterUrl();

      router.push(url);
    }
  }

  function obterUrl() {
    if (props.searchParams.idSala)
      return format({
        pathname: `/resultado/competicao`,
        query: {
          total: questoes.length,
          certas: respostasCertas,
          idSala: props.searchParams.idSala,
        },
      });

    return format({
      pathname: `/resultado/normal`,
      query: {
        total: questoes.length,
        certas: respostasCertas,
      },
    });
  }

  return questao ? (
    <>
      <Questionario
        numero={{ atual: numeroQuestao, total: quantidadePerguntas }}
        questao={questao}
        tempo={Number(duracaoPerguntas)}
        ultima={!(numeroQuestao < questoes.length)}
        loading={loading}
        questaoRespondida={questaoRespondida}
        irParaProximoPasso={idProximaPergunta}
        desistir={finalizar}
      />
      <IconeGithub />
    </>
  ) : (
    <div className={styles.loadingContainer}>
      <CircularProgress style={{ height: 100, width: 100, color: "#33ccff" }} />
    </div>
  );
}
