"use client";
import Botao from "@/components/Botao";
import Temporizador from "@/components/Temporizador";
import Layout from "@/components/template/Layout";
import useAuth from "@/data/hook/useAuth";
import { navegarPorLink } from "@/functions/utils";
import {
  criarNovaSala,
  alterarSala,
  getSalaEmEspera,
  deletarSala,
} from "@/model/firebase";
import Sala from "@/model/sala";
import Usuario from "@/model/usuario";
import styles from "@/styles/Competicao.module.css";
import { CircularProgress } from "@mui/material";
import { Unsubscribe } from "firebase/firestore";
import Image from "next/image";
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

    alterarSala(salaEmEspera);
  }

  function cancelar(sala: Sala) {
    desinscrever();
    deletarSala(sala);
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
          size={90}
          key={Math.random()}
          duracao={10}
          tempoEsgotado={() =>
            navegarPorLink(
              `/perguntas?quantidadePerguntas=${10}&duracaoPerguntas=${10}&idSala=${
                sala.id
              }`
            )
          }
        />
      </>
    );
  }

  return (
    <Layout selecionado={"competicao"}>
      <div className={styles.competicao}>
        <h1>Modo Competição</h1>
        <div className={`flex m-5 gap-5`}>
          {sala && (
            <Image
              alt="Imagem primeiro jogador"
              className={`rounded-full`}
              src={sala.primeiroJogador?.imagemUrl}
              width={60}
              height={60}
            />
          )}
          {sala && (
            <Image
              alt="Imagem segundo jogador"
              className={`rounded-full`}
              src={sala.segundoJogador?.imagemUrl || "/images/avatar.svg"}
              width={60}
              height={60}
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
