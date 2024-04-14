"use client";
import { useCallback, useEffect, useState } from "react";
import domtoimage from "dom-to-image";
import Botao from "@/components/Botao";
import Estatistica from "@/components/Estatistica";
import IconeGithub from "@/components/IconeGithub";
import styles from "@/styles/Resultado.module.css";
import GenericDrawer from "@/components/GenericDrawer";
import Historico from "@/components/Historico";
import { Classificacao, QuizRespondido } from "@/model/classificacao";
import useAuth from "@/data/hook/useAuth";
import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
} from "firebase/firestore";
import { db } from "@/firebase";
import { escutarSala } from "@/model/firebase";
import Sala from "@/model/sala";
import { CircularProgress } from "@mui/material";
import Image from "next/image";
import { navegarPorLink } from "@/functions/utils";
import ResultadoModoCompeticao from "@/components/ResultadoModoCompeticao";
import ResultadoModoNormal from "@/components/ResultadoModoNormal";

export default function Resultado({
  searchParams,
}: {
  searchParams: { total: number; certas: number; idSala: string };
}) {
  const { total, certas } = searchParams;
  const [loading, setLoading] = useState(false);
  const [historicoAberto, setHistoricoAberto] = useState(false);
  const { usuario } = useAuth();
  const [sala, setSala] = useState<Sala>();

  useEffect(() => {
    if (searchParams.idSala) {
      obterSalaAtual();
    }
  }, []);

  async function obterSalaAtual() {
    await escutarSala(searchParams.idSala, setSala);
  }

  useEffect(() => {
    async function computarQuizRespondido() {
      const querySnapshot = await getDocs(
        query(collection(db, "classificacoes"), where("uid", "==", usuario.uid))
      );
      const classificacao = querySnapshot.docs.map((doc) =>
        Classificacao.criarUsandoObjeto(JSON.parse(JSON.stringify(doc.data())))
      )[0];

      const quizRespondido = new QuizRespondido(+certas, total - certas);

      if (!classificacao) {
        let primeiraClassificao = new Classificacao(usuario.uid, [
          quizRespondido,
        ]);

        await addDoc(
          collection(db, "classificacoes"),
          primeiraClassificao.converterParaObjeto()
        );
        return;
      }

      classificacao.adicionarQuizResponido(quizRespondido);
      const docRef = querySnapshot.docs[0].ref;
      await deleteDoc(docRef);
      await addDoc(
        collection(db, "classificacoes"),
        classificacao.converterParaObjeto()
      );
    }

    if (usuario?.uid) computarQuizRespondido();
  }, [usuario]);

  useEffect(() => {
    if (loading) {
      capturarScreenshot();
    }
  }, [loading]);

  const capturarScreenshot = async () => {
    try {
      const node = document.body;
      const imageDataUrl = await domtoimage.toJpeg(node);
      const downloadLink = document.createElement("a");
      downloadLink.href = imageDataUrl;
      downloadLink.download = "resultado.jpg";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } catch (error) {
      console.log("Erro ao obter a imagem do resultado", error);
    } finally {
      setLoading(false);
    }
  };

  const loadingScreenshot = useCallback(() => {
    setLoading(!loading);
  }, [loading]);

  const abrirHistoricoPartida = useCallback(() => {
    setHistoricoAberto(!historicoAberto);
  }, [historicoAberto]);

  return searchParams.idSala ? (
    <ResultadoModoCompeticao />
  ) : (
    <ResultadoModoNormal total={total} certas={certas}/>
  );
}
