"use client";
import Botao from "@/components/Botao";
import IconeGithub from "@/components/IconeGithub";
import styles from "@/styles/Home.module.css";
import { useState } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function Home() {
  const [quantidadePerguntas, setQuantidadePerguntas] = useState(10);
  const [duracaoPerguntas, setDuracaoPerguntas] = useState(10);

  async function gerarQuestao() {
    const resposta = await fetch(`${BASE_URL}/questoes`, { method: "POST" });
    const response = await resposta.json();
  }

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
          Duração das Perguntas:
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
      <Botao texto="Gerar questão" onClick={() => gerarQuestao()} />
      <IconeGithub />
    </div>
  );
}
