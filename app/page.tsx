"use client";
import Botao from "@/components/Botao";
import IconeGithub from "@/components/IconeGithub";
import styles from "@/styles/Home.module.css";
import { useState } from "react";

export default function Home() {
  const [quantidadePerguntas, setQuantidadePerguntas] = useState(10);
  const [duracaoPerguntas, setDuracaoPerguntas] = useState(10);

  return (
    <div className={styles.home}>
      <h1>Quizer</h1>
      <div className={styles.separador}>
        <label className={styles.input}>
          Quantidade de Perguntas:
          <input
            className={styles.quantidade}
            type="number"
            min={1}
            max={30}
            value={quantidadePerguntas}
            onChange={(event) => setQuantidadePerguntas(+event.target.value)}
          />
        </label>
        <label className={styles.input}>
          Duração das questões:
          <input
            className={styles.quantidade}
            type="number"
            min={10}
            max={60}
            value={duracaoPerguntas}
            onChange={(event) => setDuracaoPerguntas(+event.target.value)}
          />
        </label>
      </div>
      <Botao
        texto="Iniciar"
        href={`/perguntas?quantidadePerguntas=${quantidadePerguntas}&duracaoPerguntas=${duracaoPerguntas}`}
      />
      <IconeGithub />
    </div>
  );
}
