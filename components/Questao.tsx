import QuestaoModel from "@/model/questao";
import styles from "@/styles/Questao.module.css";
import Enunciado from "./Enunciado";
import Resposta from "./Resposta";

interface QuestaoProps {
  valor: QuestaoModel;
}

export default function Questao(props: QuestaoProps) {
  const questao = props.valor;

  function renderizarResposta() {
    return questao.respostas.map((resposta, i) => {
      return (
        <Resposta valor={resposta} indice={i} letra="A" corLetra="#F2C886" />
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
