"use client";
import CardClassificacao from "@/components/CardClassificacao";
import Botao from "@/components/Botao";
import styles from "@/styles/Classificacao.module.css";
import { useEffect, useState } from "react";
import { Classificacao } from "@/model/classificacao";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function ClassificacaoPage() {
  const [classificacoes, setClassificacoes] = useState<Classificacao[]>([]);

  async function obterClassificacoes() {
    try {
      const resposta = await fetch(`${BASE_URL}/classificacao`);
      const valores = await resposta.json();

      setClassificacoes(
        valores.map(Classificacao.criarUsandoObjeto)
      );
    } catch (error) {
      alert(`Ocorreu um erro ao carregar as questões: ${error}`);
    }
  }

  useEffect(() => {
    obterClassificacoes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.classificacao}>
      <h1>Classificação</h1>
      {classificacoes.map((classificacao) => (
        <CardClassificacao
          key={classificacao.uid}
          classificacao={classificacao}
        />
      ))}
      <Botao texto="Voltar" loading={false} href="/" />
    </div>
  );
}
