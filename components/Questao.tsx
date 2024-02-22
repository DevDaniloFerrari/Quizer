'use client'
import QuestaoModel from "@/model/questao";
import styles from "@/styles/Questao.module.css";
import Enunciado from "./Enunciado";
import Resposta from "./Resposta";

const letras = [
  { valor: "A", cor: "#F2C886" },
  { valor: "B", cor: "#F266BA" },
  { valor: "C", cor: "#85D4F2" },
  { valor: "D", cor: "#BCE596" },
];

interface QuestaoProps {
  valor: QuestaoModel;
  respostaFornecida: (indice: number) => void
}

export default function Questao(props: QuestaoProps) {
  const questao = props.valor;

  function renderizarResposta() {
    return questao.respostas.map((resposta, i) => {
      const letra = letras[i];
      return (
        <Resposta
          key={i}
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
      {renderizarResposta()}
    </div>
  );
}
