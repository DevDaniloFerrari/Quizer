"use client";
import { db } from "@/firebase";
import { Classificacao } from "@/model/classificacao";
import Usuario from "@/model/usuario";
import styles from "@/styles/CardClassificacao.module.css";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";

interface CardClassificacaoProps {
  classificacao: Classificacao;
  posicao: number;
}

export default function CardClassificacao(props: CardClassificacaoProps) {
  const [usuario, setUsuario] = useState<Usuario>();

  async function obterUsuario() {
    const querySnapshot = await getDocs(
      query(
        collection(db, "usuarios"),
        where("uid", "==", props.classificacao.uid)
      )
    );
    const usuarioEncontrado = JSON.parse(
      JSON.stringify(querySnapshot.docs[0].data())
    ) as Usuario;

    setUsuario(usuarioEncontrado);
  }

  useEffect(() => {
    obterUsuario();
  }, []);

  return (
    <div className={styles.card}>
      <div>{props.posicao}</div>
      <img
        src={usuario.imagemUrl || "/images/avatar.svg"}
        alt=""
        className={styles.avatar}
      />
      <div>{usuario.nome}</div>
      <div>{props.classificacao.totalRespostasCertas}</div>
      <div>{props.classificacao.totalRespostasErradas}</div>
    </div>
  );
}
