"use client";
import Botao from "@/components/Botao";
import Temporizador from "@/components/Temporizador";
import Layout from "@/components/template/Layout";
import useAuth from "@/data/hook/useAuth";
import { navegarPorLink } from "@/functions/utils";
import {
  criarNovaSala,
  entrarNaSala,
  getSalaEmEspera,
  sairDaSala,
} from "@/model/firebase";
import Sala from "@/model/sala";
import Usuario from "@/model/usuario";
import styles from "@/styles/Competicao.module.css";
import { CircularProgress } from "@mui/material";
import { Unsubscribe } from "firebase/firestore";
import { useState } from "react";

export default function Competicao() {
  const { usuario } = useAuth();
  const [sala, setSala] = useState<Sala>();
  const [desinscrever, setDesinscrever] = useState<Unsubscribe>();

  async function buscarSala() {
    const salaEmEspera = await getSalaEmEspera();

    const parcicipante = {
      uid: usuario.uid,
      email: usuario.email,
      nome: usuario.nome,
      imagemUrl: usuario.imagemUrl,
    } as Usuario;

    if (salaEmEspera == null) {
      const callback = await criarNovaSala(parcicipante, setSala);
      setDesinscrever(() => callback);
      return;
    }

    salaEmEspera.adicionarSegundoJogador(parcicipante);

    setSala(salaEmEspera);

    entrarNaSala(salaEmEspera);
  }

  function cancelar(sala: Sala) {
    desinscrever();
    sairDaSala(sala);
    setSala(undefined);
  }

  function renderizarCarregando() {
    return (
      <div className={`flex flex-col justify-center items-center mt-5`}>
        <CircularProgress
          style={{
            height: 50,
            width: 50,
            color: "#33ccff",
          }}
        />
        <div className={`mt-5`}>Buscando um oponente digno!</div>
        <Botao texto="Cancelar" onClick={() => cancelar(sala)} />
      </div>
    );
  }

  function renderizarTemporizador() {
    return (
      <>
        <span>Prepare-se... a partida já vai começar!</span>
        <Temporizador
          key={Math.random()}
          duracao={10}
          tempoEsgotado={() =>
            navegarPorLink(
              `/perguntas?quantidadePerguntas=${10}&duracaoPerguntas=${10}`
            )
          }
        />
      </>
    );
  }

  return (
    <Layout>
      <div className={styles.competicao}>
        <h1>Modo Competição</h1>
        <div className={`flex m-5 gap-5`}>
          {sala && (
            <img
              className={`h-20 w-20 rounded-full`}
              src={sala.primeiroJogador?.imagemUrl}
            />
          )}
          {sala && (
            <img
              className={`h-20 w-20 rounded-full`}
              src={sala.segundoJogador?.imagemUrl}
            />
          )}
        </div>
        {sala === undefined ? (
          <Botao texto="Buscar oponente" onClick={() => buscarSala()} />
        ) : sala?.segundoJogador === undefined ? (
          renderizarCarregando()
        ) : (
          renderizarTemporizador()
        )}
      </div>
    </Layout>
  );
}
