"use client";
import Questionario from "@/components/Questionario";
import QuestaoModel from "@/model/questao";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "url";
import CircularProgress from "@mui/material/CircularProgress";
import IconeGithub from "@/components/IconeGithub";
import styles from "@/styles/Questionario.module.css";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

interface PerguntaProps {
  searchParams: {
    quantidadePerguntas: string;
    duracaoPerguntas: string;
  };
}

export type IQuestoesArr = {
  id: number;
  enunciado: string;
  acertou: boolean;
  respostaVerdadeira: string;
  respostaErrada: string;
}

export default function Perguntas(props: PerguntaProps) {
  const router = useRouter();
  const [questao, setQuestao] = useState<QuestaoModel>();
  const [respostasCertas, setRespostasCertas] = useState<number>(0);
  const [numeroQuestao, setNumeroQuestao] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [questoes, setQuestoes] = useState<QuestaoModel[]>([]);
  const [questoesRespondidas, setQuestoesRespondidas] = useState<QuestaoModel[]>([]);


  const quantidadePerguntas = Math.min(Math.max(Number(props.searchParams.quantidadePerguntas), 10), 30);
  const duracaoPerguntas = Math.min(Math.max(Number(props.searchParams.duracaoPerguntas), 10), 60);

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
        setarQuestoes(idsDasQuestoes.slice(0, quantidadePerguntas))
      }

    } catch (error) {
      alert(`Ocorreu um erro ao carregar as questões: ${error}`);
    }
  }

  function carregarQuestao(questao: QuestaoModel) {
    const idx = questoes.findIndex((item) => item === questao);
    setQuestao(questao);
    setNumeroQuestao(idx + 1);
  }

  function questaoRespondida(questaoRespondida: QuestaoModel) {
    setQuestoesRespondidas((questoesAntigas) => [...questoesAntigas, questaoRespondida]);
    setQuestao(questaoRespondida);
    const acertou = questaoRespondida.acertou;
    setRespostasCertas(respostasCertas + (acertou ? 1 : 0));
  }

  function idProximaPergunta() {
    if (numeroQuestao < questoes.length) {
      return carregarQuestao(questoes[numeroQuestao]);
    }
    finalizar();
  }

  function formatarQuestoesParaHistorico(questoes: QuestaoModel[], questoesRespondidas: QuestaoModel[]) {
    const questoesFormatadas = questoes.map((questao) => {
      const questaoRespondida = questoesRespondidas.find((qr) => qr.id === questao.id);
      if (questaoRespondida) {
        return questaoRespondida;
      } else {
        return questao;
      }
    });

    const questoesParaHistorico: IQuestoesArr[] = [];

    questoesFormatadas.forEach((questao) => {
      questoesParaHistorico.push({
        id: questao.id,
        acertou: questao.acertou,
        enunciado: questao.enunciado,
        respostaErrada: questao.respostas.find((x) => !x.certa && x.revelada)?.valor || '',
        respostaVerdadeira: questao.respostas.find((x) => x.certa).valor,
      })
    });

    localStorage.setItem('questoes', JSON.stringify(questoesParaHistorico));

    return questoesParaHistorico;
  }


  function finalizar() {
    const questoesFormatada = formatarQuestoesParaHistorico(questoes, questoesRespondidas);

    if (questoesFormatada.length) {
      setLoading(true);
      const url = format({
        pathname: "/resultado",
        query: {
          total: questoes.length,
          certas: respostasCertas,
        },
      });

      router.push(url);
    }
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
      <CircularProgress style={{ height: 100, width: 100, color: '#33ccff' }} />
    </div>
  );
}