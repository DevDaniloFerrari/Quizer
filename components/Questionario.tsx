import styles from "@/styles/Questionario.module.css";
import QuestaoModel from "@/model/questao";
import Questao from "./Questao";
import Botao from "./Botao";

interface QuestionarioProps {
  questao: QuestaoModel;
  numero: NumeroQuestoes;
  ultima: boolean;
  loading: boolean;
  tempo: number;
  questaoRespondida: (questao: QuestaoModel) => void;
  irParaProximoPasso: () => void;
  desistir: () => void;
}

type NumeroQuestoes = {
  atual: number,
  total: number
}

export default function Questionario(props: QuestionarioProps) {
  function respostaFornecida(indice: number) {
    if (props.questao.naoRespondida) {
      props.questaoRespondida(props.questao.responderCom(indice));
    }
  }

  return (
    <div className={styles.questionario}>
      {props.questao ? (
        <>
          <Questao
            numero={props.numero}
            valor={props.questao}
            tempoParaResposta={props.tempo}
            respostaFornecida={respostaFornecida}
            tempoEsgotado={props.irParaProximoPasso}
            desistir={props.desistir}
          />
          <Botao
            onClick={props.irParaProximoPasso}
            texto={props.ultima ? "Finalizar" : "Próxima"}
            loading={props.loading}
          />
        </>
      ) : (
        null
      )}
    </div>
  );
}