"use client";
import Botao from "@/components/Botao";
import Layout from "@/components/template/Layout";
import useAuth from "@/data/hook/useAuth";
import { criarNovaSala, entrarNaSala, getSalaEmEspera } from "@/model/firebase";
import Sala from "@/model/sala";
import Usuario from "@/model/usuario";
import styles from "@/styles/Competicao.module.css";
import { useState } from "react";

export default function Competicao() {
  const { usuario } = useAuth();
  const [buscandoOponente, setBuscandoOponente] = useState<boolean>();
  const [sala, setSala] = useState<Sala>();

  function buscarSala() {
    getSalaEmEspera().then((salaEmEspera) => {
      const parcicipante = {
        uid: usuario.uid,
        email: usuario.email,
        nome: usuario.nome,
        imagemUrl: usuario.imagemUrl,
      } as Usuario;

      console.log(salaEmEspera)

      if (salaEmEspera == null) {
        criarNovaSala(parcicipante, setSala).then((unsubscribe) => {});
        return;
      }

      salaEmEspera.adicionarSegundoJogador(parcicipante);

      setSala(salaEmEspera);

      entrarNaSala(salaEmEspera);
    });
  }

  return (
    <Layout>
      <div className={styles.competicao}>
        <h1>Modo Competição</h1>
        {sala && <div>{sala.primeiroJogador.nome}</div>}
        {sala && <div>{sala.segundoJogador?.nome}</div>}
        <Botao
          texto="Buscar oponente"
          onClick={() => buscarSala()}
          loading={buscandoOponente}
        />
      </div>
    </Layout>
  );
}
