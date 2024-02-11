import styles from "@/styles/Resposta.module.css";
import RespostaModel from "@/model/resposta";

interface RespostaProps {
  valor: RespostaModel;
  indice: number;
  letra: string;
  corLetra: string;
}

export default function Resposta(props: RespostaProps) {
  const resposta = props.valor;

  return (
    <div className={styles.resposta}>
      <div className={styles.conteudoResposta}>
        <div className={styles.frente}>
          <div className={styles.letra}>{props.letra}</div>
          <div className={styles.valor}>{resposta.valor}</div>
        </div>
        <div className={styles.verso}></div>
      </div>
    </div>
  );
}
