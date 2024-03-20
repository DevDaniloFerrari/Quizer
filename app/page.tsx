"use client";
import Botao from "@/components/Botao";
import IconeGithub from "@/components/IconeGithub";
import CircularProgress from "@mui/material/CircularProgress";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useForm, SubmitHandler } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import CustomInput from "@/components/Input";
import { getStylesForm } from "@/styles/Input-styles";
import { formInicial } from "./forms/schemas";
import { navegarPorLink } from "@/functions/utils";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

type FormData = {
  perguntas?: number
  duracao?: number
}

export default function Home() {
  const [valoresPadroes, setValoresPadroes] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingGerarQuestoes, setLoadingGerarQuestoes] = useState(false);

  const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(formInicial),
  });

  useEffect(() => {
    setValue('perguntas', 10);
    setValue('duracao', 10);
  }, [setValue]);

  useEffect(() => {
    const valores = getValues();

    const perguntas = valores.perguntas;
    const duracao = valores.duracao;

    if (perguntas !== undefined && duracao !== undefined) {
      return setValoresPadroes(true);
    }

    return setValoresPadroes(false);

  }, [getValues]);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    setLoading(true);
    navegarPorLink(`/perguntas?quantidadePerguntas=${data.perguntas}&duracaoPerguntas=${data.duracao}`);
  };

  const gerarQuestao = async () => {
    try {
      setLoadingGerarQuestoes(true);
      const resposta = await fetch(`${BASE_URL}/questoes`, { method: "POST" });
      const response = await resposta.json();

      if (!process.env.OPENAI_API_KEY) {
        notificar(response.mensagem);
      }
    } catch {
      alert('Erro ao gerar questão!');
    }
    finally {
      setLoadingGerarQuestoes(false)
    }
  }

  const notificar = (mensagem: string) =>
    toast(
      mensagem,
      {
        type: "info",
        style: { fontSize: "1rem" },
      }
    );

  if (!valoresPadroes) {
    return <div className={styles.home}>
      <CircularProgress style={{ height: 100, width: 100, color: '#33ccff' }} />
    </div>
  }

  return (
    <div className={styles.home}>
      <h1>Quizer</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.separador}>
          <>
            <CustomInput
              propsInput={{
                label: "Quantidade de Perguntas",
                type: "number",
                error: errors.perguntas ? true : false,
                helperText: errors.perguntas?.message,
                sx: getStylesForm(errors.perguntas)
              }}
              register={register("perguntas")}
            />
            <CustomInput
              propsInput={{
                label: "Duração das Perguntas",
                type: "number",
                error: errors.duracao ? true : false,
                helperText: errors.duracao?.message,
                sx: getStylesForm(errors.duracao)
              }}
              register={register("duracao")}
            />
          </>
          <Botao texto="Iniciar" type="submit" loading={loading} />
          <Botao texto="Gerar questão" onClick={gerarQuestao} loading={loadingGerarQuestoes} />
          <Botao texto="Classificação" href="/classificacao" />
        </div>
      </form>
      <IconeGithub />
      <ToastContainer />
    </div>
  );
}