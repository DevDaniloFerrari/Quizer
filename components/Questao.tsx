"use client";
import QuestaoModel from "@/model/questao";
import styles from "@/styles/Questao.module.css";
import Enunciado from "./Enunciado";
import Resposta from "./Resposta";
import Temporizador from "./Temporizador";

const letras = [
  { valor: "A", cor: "#F2C886" },
  { valor: "B", cor: "#F266BA" },
  { valor: "C", cor: "#85D4F2" },
  { valor: "D", cor: "#BCE596" },
];

interface QuestaoProps {
  valor: QuestaoModel;
  tempoParaResposta?: number;
  respostaFornecida: (indice: number) => void;
  tempoEsgotado: () => void;
}

export default function Questao(props: QuestaoProps) {
  const questao = props.valor;

  function renderizarResposta() {
    return questao.respostas.map((resposta, i) => {
      const letra = letras[i];
      return (
        <Resposta
          key={`${questao.id}-${i}`}
          valor={resposta}
          indice={i}
          letra={letra.valor}
          corFundoLetra={letra.cor}
          respostaFornecida={props.respostaFornecida}
        />
      );
    });
  }

  return (
    <div className={styles.questao}>
      <Enunciado texto={questao.enunciado} />
      <Temporizador
        key={questao.id}
        duracao={props.tempoParaResposta ?? 10}
        tempoEsgotado={props.tempoEsgotado}
      />
      {renderizarResposta()}
    </div>
  );
}
