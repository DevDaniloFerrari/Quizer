"use client";
import styles from '@/styles/Resultado.module.css'

export default function resultado({
  searchParams,
}: {
  searchParams: { total: number; certas: number };
}) {
  const { total, certas } = searchParams;
  const percentual = Math.round((certas / total) * 100);

  return (
    <div className={styles.resultado}>
      <h1>Resultado Final</h1>
      <div>{total}</div>
      <div>{certas}</div>
      <div>{`${percentual}%`}</div>
    </div>
  );
}
