"use client";
import { db } from "@/firebase";
import { Classificacao } from "@/model/classificacao";
import Usuario from "@/model/usuario";
import styles from "@/styles/CardClassificacao.module.css";
import { collection, getDocs, query, where } from "firebase/firestore";
import Image from "next/image";
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
    usuario && (
      <div className={styles.card}>
        <div>{props.posicao}</div>
        <Image
          src={usuario.imagemUrl || "/images/avatar.svg"}
          alt="Avatar do usuário"
          className={styles.avatar}
          width={30}
          height={30}
        />
        <div>{usuario.nome}</div>
        <div>{props.classificacao.totalRespostasCertas}</div>
        <div>{props.classificacao.totalRespostasErradas}</div>
      </div>
    )
  );
}
