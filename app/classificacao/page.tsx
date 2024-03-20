import CardClassificacao from "@/components/CardClassificacao";
import Botao from "@/components/Botao";
import styles from "@/styles/Classificacao.module.css";

export default function Classificacao() {
  return (
    <div className={styles.classificacao}>
      <h1>Classificação</h1>
      <CardClassificacao />
      <CardClassificacao />
      <CardClassificacao />
      <Botao texto="Voltar" loading={false} href="/" />
    </div>
  );
}
