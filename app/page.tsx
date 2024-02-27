'use client'
import Botao from "@/components/Botao";
import styles from "@/styles/Home.module.css";
import { useState } from "react";

export default function Home() {
  const [quantidadePerguntas, setQuantidadePerguntas] = useState(10);

  return (
    <div className={styles.home}>
      <h1>Quizer</h1>
      <label>
        Quantidade de Perguntas
        <input
          type="number"
          min={1}
          max={30}
          value={quantidadePerguntas}
          onChange={(event) => setQuantidadePerguntas(+event.target.value)}
        />
      </label>
      <Botao
        texto="Iniciar"
        href={`/perguntas?quantidadePerguntas=${quantidadePerguntas}`}
      />
    </div>
  );
}
