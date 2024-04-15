"use client";
import { useCallback, useEffect, useState } from "react";
import domtoimage from "dom-to-image";
import Estatistica from "@/components/Estatistica";
import IconeGithub from "@/components/IconeGithub";
import styles from "@/styles/Resultado.module.css";
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

export default function Resultado({
  searchParams,
}: {
  searchParams: { total: number; certas: number; idSala: string };
}) {
  const { total, certas } = searchParams;
  const percentual = Math.round((certas / total) * 100);
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

  function obterNomeVencedor() {
    const totalPrimeiroJogador = sala?.historicoPrimeiroJogador?.filter(
      (x) => x.acertou
    )?.length;

    const totalSegundoJogador = sala?.historicoSegundoJogador?.filter(
      (x) => x.acertou
    )?.length;

    if (totalPrimeiroJogador > totalSegundoJogador)
      return sala?.primeiroJogador.nome;

    if (totalPrimeiroJogador < totalSegundoJogador)
      return sala?.segundoJogador.nome;

    return "Empate";
  }

  function renderizarAguardandoResponder() {
    return (
      <>
        <span className="text-sm mb-3">
          Aguardando seu oponente terminar...
        </span>
        <CircularProgress
          style={{
            height: 50,
            width: 50,
            color: "#33ccff",
          }}
        />
      </>
    );
  }


  return (
    <div className={styles.resultado}>
      <h1>Resultado Final</h1>
      <div className={`flex items-center gap-10`}>
        <div className={`flex flex-col items-center`}>
          {sala?.historicoPrimeiroJogador.length > 0 ? (
            <>
              <Image
                src={sala?.primeiroJogador?.imagemUrl ?? "/images/avatar.svg"}
                alt="Avatar do Primeiro Jogador"
                className={`rounded-full`}
                width={60}
                height={60}
              />
              <div className={`flex`}>
                <Estatistica texto="Perguntas" valor={total} />
                <Estatistica
                  texto="Certas"
                  valor={
                    sala?.historicoPrimeiroJogador?.filter((x) => x.acertou)
                      ?.length
                  }
                  corFundo="#9CD2A4"
                />
                <Estatistica
                  texto="Percentual"
                  valor={`${percentual}%`}
                  corFundo="#DE6A33"
                />
              </div>
            </>
          ) : (
            renderizarAguardandoResponder()
          )}
        </div>
        <div className={`flex flex-col items-center`}>
          {sala?.historicoSegundoJogador?.length > 0 ? (
            <>
              <Image
                src={sala?.segundoJogador?.imagemUrl ?? "/images/avatar.svg"}
                alt="Avatar do Segundo Jogador"
                className={`rounded-full`}
                width={60}
                height={60}
              />
              <div className={`flex`}>
                <Estatistica texto="Perguntas" valor={total} />
                <Estatistica
                  texto="Certas"
                  valor={
                    sala?.historicoSegundoJogador?.filter((x) => x.acertou)
                      ?.length
                  }
                  corFundo="#9CD2A4"
                />
                <Estatistica
                  texto="Percentual"
                  valor={`${percentual}%`}
                  corFundo="#DE6A33"
                />
              </div>
            </>
          ) : (
            renderizarAguardandoResponder()
          )}
        </div>
      </div>
      {sala?.historicoPrimeiroJogador.length !== 0 &&
        sala?.historicoSegundoJogador.length !== 0 && (
          <div>O vencedor foi: {obterNomeVencedor()}</div>
        )}
      <button onClick={() => navegarPorLink("/")}>Tentar novamente</button>
      <IconeGithub />
    </div>
  );
}
