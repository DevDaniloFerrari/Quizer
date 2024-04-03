"use client";
import Botao from "@/components/Botao";
import IconeGithub from "@/components/IconeGithub";
import CircularProgress from "@mui/material/CircularProgress";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomInput from "@/components/Input";
import { getStylesForm } from "@/styles/Input-styles";
import { formInicial } from "./forms/schemas";
import { navegarPorLink } from "@/functions/utils";
import useAuth from "@/data/hook/useAuth";
import Layout from "@/components/template/Layout";

type FormData = {
  perguntas?: number;
  duracao?: number;
};

export default function Home() {
  const [valoresPadroes, setValoresPadroes] = useState(false);
  const [loading, setLoading] = useState(false);
  const { carregando } = useAuth();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(formInicial),
  });

  useEffect(() => {
    localStorage.setItem("questoes", JSON.stringify([]));
  }, []);

  useEffect(() => {
    setValue("perguntas", 10);
    setValue("duracao", 10);
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
    navegarPorLink(
      `/perguntas?quantidadePerguntas=${data.perguntas}&duracaoPerguntas=${data.duracao}`
    );
  };

  if (!valoresPadroes || carregando) {
    return (
      <div className={styles.home}>
        <CircularProgress
          style={{ height: 100, width: 100, color: "#33ccff" }}
        />
      </div>
    );
  }

  return (
    <Layout>
      <div className={styles.home}>
        <div className={styles.cabecalho}>
          <h1>Quizer</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.separador}>
            <>
              <CustomInput
                propsInput={{
                  label: "Quantidade de Perguntas",
                  type: "number",
                  error: errors.perguntas ? true : false,
                  helperText: errors.perguntas?.message,
                  sx: getStylesForm(errors.perguntas),
                }}
                register={register("perguntas")}
              />
              <CustomInput
                propsInput={{
                  label: "Duração das Perguntas",
                  type: "number",
                  error: errors.duracao ? true : false,
                  helperText: errors.duracao?.message,
                  sx: getStylesForm(errors.duracao),
                }}
                register={register("duracao")}
              />
            </>
            <Botao texto="Iniciar" type="submit" loading={loading} />
          </div>
        </form>
        <IconeGithub />
        <ToastContainer />
      </div>
    </Layout>
  );
}
