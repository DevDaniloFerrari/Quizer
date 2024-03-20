import styles from "@/styles/CardClassificacao.module.css";

export default function CardClassificacao() {
  return (
    <div className={styles.card}>
      <div>1</div>
      <img
        src="/images/avatar.svg"
        alt=""
        className={styles.avatar}
      />
      <div>Danilo Ferrari</div>
      <div>20</div>
      <div>10</div>
    </div>
  );
}
