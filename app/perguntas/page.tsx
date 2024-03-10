"use client";
import Questionario from "@/components/Questionario";
import QuestaoModel from "@/model/questao";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { format } from "url";
import IconeGithub from "@/components/IconeGithub";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

interface PerguntaProps {
  searchParams: {
    quantidadePerguntas: number;
    duracaoPerguntas: number;
  };
}

export default function Perguntas(props: PerguntaProps) {
  const carregarIdsRef = useRef(carregarIdsDasQuestoes);
  const { quantidadePerguntas, duracaoPerguntas } = props.searchParams;
  const router = useRouter();
  const [idsDasQuestoes, setIdsDasQuestoes] = useState<number[]>([]);
  const [questao, setQuestao] = useState<QuestaoModel>();
  const [respostasCertas, setRespostasCertas] = useState<number>(0);
  const [numeroQuestao, setNumeroQuestao] = useState<number>(1);

  async function carregarIdsDasQuestoes() {
    const resposta = await fetch(`${BASE_URL}/questionario`);
    const idsDasQuestoes = await resposta.json();
    setIdsDasQuestoes(idsDasQuestoes.slice(0, quantidadePerguntas));
  }

  async function carregarQuestao(idQuestao: number) {
    const resposta = await fetch(`${BASE_URL}/questoes/${idQuestao}`);
    const json = await resposta.json();
    const novaQuestao = QuestaoModel.criarUsandoObjeto(json);
    setQuestao(novaQuestao);
  }

  useEffect(() => {
   carregarIdsRef.current();
  }, []);

  useEffect(() => {
    idsDasQuestoes.length > 0 && carregarQuestao(idsDasQuestoes[0]);
  }, [idsDasQuestoes]);

  function questaoRespondida(questaoRespondida: QuestaoModel) {
    setQuestao(questaoRespondida);
    const acertou = questaoRespondida.acertou;
    setRespostasCertas(respostasCertas + (acertou ? 1 : 0));
  }

  function idProximaPergunta() {
    if (questao) {
      const proximoIndice = idsDasQuestoes.indexOf(questao.id) + 1;
      return idsDasQuestoes[proximoIndice];
    }
  }

  function irParaProximoPasso() {
    const proximoId = idProximaPergunta();
    proximoId ? irParaProximaQuestao(proximoId) : finalizar();
  }

  function irParaProximaQuestao(proximoId: number) {
    carregarQuestao(proximoId);
    const novoNumero = numeroQuestao + 1;
    setNumeroQuestao(novoNumero);
  }

  function finalizar() {
    const url = format({
      pathname: "/resultado",
      query: {
        total: idsDasQuestoes.length,
        certas: respostasCertas,
      },
    });

    router.push(url);
  }

  return questao ? (
    <>
      <Questionario
        numero={{ atual: numeroQuestao, total: quantidadePerguntas }}
        questao={questao}
        tempo={Number(duracaoPerguntas)}
        ultima={idProximaPergunta() === undefined}
        questaoRespondida={questaoRespondida}
        irParaProximoPasso={irParaProximoPasso}
      />
      <IconeGithub />
    </>
  ) : (
    false
  );
}
