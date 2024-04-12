"use client";
import React, { useState } from "react";
import Layout from "@/components/template/Layout";
import CircularProgress from "@mui/material/CircularProgress";
import { Login } from "@/components/Login";
import { Cadastro } from "@/components/Cadastro";

export type IComponents = {
  mudarComponenteAutenticacao: () => void;
};

export default function Autenticacao() {
  const [renderizaLogin, setRenderizaLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const mudarComponenteAutenticacao = () => {
    setRenderizaLogin(!renderizaLogin);
  };

  const LoadingComponent = () => {
    return (
      <div>
        <CircularProgress
          style={{ height: 100, width: 100, color: "#33ccff" }}
        />
      </div>
    );
  };

  const MainComponent = () => {
    if (renderizaLogin) {
      return (
        <Login mudarComponenteAutenticacao={mudarComponenteAutenticacao} />
      );
    }

    return (
      <Cadastro mudarComponenteAutenticacao={mudarComponenteAutenticacao} />
    );
  };

  return (
    <Layout selecionado={"autenticacao"}>
      <div
        className={`flex flex-row items-center justify-center h-screen font`}
      >
        {loading ? <LoadingComponent /> : <MainComponent />}
      </div>
    </Layout>
  );
}
