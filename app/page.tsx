"use client";
import Questionario from "@/components/Questionario";
import QuestaoModel from "@/model/questao";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "url";

const BASE_URL = "http://localhost:3000/api";

export default function Home() {
  const router = useRouter();
  const [idsDasQuestoes, setIdsDasQuestoes] = useState<number[]>([]);
  const [questao, setQuestao] = useState<QuestaoModel>();
  const [respostasCertas, setRespostasCertas] = useState<number>(0);

  async function carregarIdsDasQuestoes() {
    const resposta = await fetch(`${BASE_URL}/questionario`);
    const idsDasQuestoes = await resposta.json();
    setIdsDasQuestoes(idsDasQuestoes);
  }

  async function carregarQuestao(idQuestao: number) {
    const resposta = await fetch(`${BASE_URL}/questoes/${idQuestao}`);
    const json = await resposta.json();
    const novaQuestao = QuestaoModel.criarUsandoObjeto(json);
    setQuestao(novaQuestao);
  }

  useEffect(() => {
    carregarIdsDasQuestoes();
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
    if(questao){
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
    <Questionario
      questao={questao}
      ultima={idProximaPergunta() === undefined}
      questaoRespondida={questaoRespondida}
      irParaProximoPasso={irParaProximoPasso}
    />
  ) : (
    false
  );
}
