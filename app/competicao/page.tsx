"use client";
import Botao from "@/components/Botao";
import Layout from "@/components/template/Layout";
import useAuth from "@/data/hook/useAuth";
import { criarNovaSala, getSalaEmEspera } from "@/model/firebase";
import Sala from "@/model/sala";
import Usuario from "@/model/usuario";
import styles from "@/styles/Competicao.module.css";
import { useState } from "react";

export default function Competicao() {
  const { usuario } = useAuth();

  const [sala, setSala] = useState<Sala>();

  function buscarSala() {
    getSalaEmEspera().then((sala) => {
      if (sala.length == 0) {
        const primeiroParcicipante = {
          uid: usuario.uid,
          email: usuario.email,
          nome: usuario.nome,
          imagemUrl: usuario.imagemUrl,
        } as Usuario;

        criarNovaSala(primeiroParcicipante, setSala).then((novaSala) => {

        });
      }
    });
  }

  return (
    <Layout>
      <div className={styles.competicao}>
        <h1>Modo Competição</h1>
        {sala && <div>{sala.primeiroJogador.nome}</div>}
        <Botao texto="Buscar oponente" onClick={() => buscarSala()} />
      </div>
    </Layout>
  );
}
