"use client";
import { useCallback, useEffect, useState } from "react";
import domtoimage from 'dom-to-image';
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

export default function Resultado({
  searchParams,
}: {
  searchParams: { total: number; certas: number };
}) {
  const { total, certas } = searchParams;
  const percentual = Math.round((certas / total) * 100);
  const [loading, setLoading] = useState(false);
  const [historicoAberto, setHistoricoAberto] = useState(false);
  const { usuario } = useAuth();

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
  
  useEffect(() => {
    if (usuario?.uid) computarQuizRespondido();
  }, [usuario, computarQuizRespondido]);

  useEffect(() => {
    if (loading) {
      capturarScreenshot();
    }
  }, [loading]);

  const capturarScreenshot = async () => {
    try {
      const node = document.body;
      const imageDataUrl = await domtoimage.toJpeg(node);
      const downloadLink = document.createElement('a');
      downloadLink.href = imageDataUrl;
      downloadLink.download = 'resultado.jpg';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } catch (error) {
      console.log('Erro ao obter a imagem do resultado', error);
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

  const renderizarBotoes = () => {
    return (
      <>
        <Botao texto="Tentar Novamente" href="/" />
        <Botao texto="Histórico de Partida" onClick={abrirHistoricoPartida} />
        <Botao
          texto="Baixar Resultado"
          onClick={loadingScreenshot}
        />
      </>
    )
  };

  return (
    <div className={styles.resultado}>
      <h1>Resultado Final</h1>
      <div style={{ display: "flex" }}>
        <Estatistica texto="Perguntas" valor={total} />
        <Estatistica texto="Certas" valor={certas} corFundo="#9CD2A4" />
        <Estatistica
          texto="Percentual"
          valor={`${percentual}%`}
          corFundo="#DE6A33"
        />
      </div>
      {!loading ? renderizarBotoes() : null}
      {historicoAberto ? (
        <GenericDrawer
          variant={"temporary"}
          title="Histórico da Partida"
          status={historicoAberto}
          onClose={abrirHistoricoPartida}
          otherProps={{
            PaperProps: { sx: { backgroundColor: "#5e44d5", width: "30%" } },
          }}
        >
          <Historico />
        </GenericDrawer>
      ) : null}
      <IconeGithub />
    </div>
  );
}
