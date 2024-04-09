"use client";
import CardClassificacao from "@/components/CardClassificacao";
import Botao from "@/components/Botao";
import styles from "@/styles/Classificacao.module.css";
import { useEffect, useState } from "react";
import { Classificacao } from "@/model/classificacao";
import Layout from "@/components/template/Layout";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function ClassificacaoPage() {
  const [classificacoes, setClassificacoes] = useState<Classificacao[]>([]);
  const [carregando, setCarregando] = useState<boolean>(true);

  async function obterClassificacoes() {
    try {
      const resposta = await fetch(`${BASE_URL}/classificacao`);
      const valores = await resposta.json();

      setClassificacoes(valores.map(Classificacao.criarUsandoObjeto));
    } catch (error) {
      alert(`Ocorreu um erro ao carregar as questões: ${error}`);
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    obterClassificacoes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout carregando={carregando} selecionado={'classificacao'}>
      <div className={styles.classificacao}>
        <div className={styles.titulo}>Classificação</div>
        <div className={styles.cabecalho}>
          <div>posição</div>
          <div>perfil</div>
          <div>nome</div>
          <div>certas</div>
          <div>erradas</div>
        </div>
        {classificacoes.map((classificacao, index) => (
          <CardClassificacao
            key={classificacao.uid}
            classificacao={classificacao}
            posicao={index + 1}
          />
        ))}
        <Botao texto="Voltar" loading={false} href="/" />
      </div>
    </Layout>
  );
}
