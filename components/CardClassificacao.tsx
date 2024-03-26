import { Classificacao } from "@/model/classificacao";
import styles from "@/styles/CardClassificacao.module.css";

interface CardClassificacaoProps {
  classificacao: Classificacao
}

export default function CardClassificacao(props: CardClassificacaoProps) {
  return (
    <div className={styles.card}>
      <div>1</div>
      <img
        src="/images/avatar.svg"
        alt=""
        className={styles.avatar}
      />
      <div>Danilo Ferrari</div>
      <div>{props.classificacao.totalRespostasCertas}</div>
      <div>{props.classificacao.totalRespostasErradas}</div>
    </div>
  );
}
