"use client";
import useAuth from "@/data/hook/useAuth";
import MenuItem from "./MenuItem";
import { toast } from "react-toastify";
import { useState } from "react";
import AvatarUsuario from "../AvatarUsuario";
import { Divider } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import LeaderboardOutlinedIcon from "@mui/icons-material/LeaderboardOutlined";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

interface IMenuLateral {
  selecionado: string;
}

export default function MenuLateral({ selecionado }: IMenuLateral) {
  const { logout, usuario } = useAuth();
  const [loadingGerarQuestoes, setLoadingGerarQuestoes] = useState(false);

  const gerarQuestao = async () => {
    try {
      setLoadingGerarQuestoes(true);
      const resposta = await fetch(`${BASE_URL}/questoes`, { method: "POST" });
      const response = await resposta.json();

      if (!process.env.OPENAI_API_KEY) {
        notificar(response.mensagem);
      }
    } catch {
      alert("Erro ao gerar questão!");
    } finally {
      setLoadingGerarQuestoes(false);
    }
  };

  const notificar = (mensagem: string) =>
    toast(mensagem, {
      type: "info",
      style: { fontSize: "1rem" },
    });

  return (
    <div
      className={`flex flex-grow bg-violet-700 justify-around sm:justify-normal sm:flex-col sm:w-96`}
    >
      <div
        className={`flex justify-center items-center ml-3 mt-3 mb-3 sm:ml-0`}
      >
        <AvatarUsuario />
      </div>
      <p className={`hidden sm:flex sm:justify-center sm:mb-6`}>
        Olá, {usuario?.nome || "Jogador!"}
      </p>
      {!usuario && (
        <MenuItem
          url={"/autenticacao"}
          texto="Login"
          value="autenticacao"
          icone={LoginIcon}
          className={"justify-start"}
          selecionado={selecionado}
        />
      )}
      <MenuItem
        url="/"
        texto="Início"
        value="inicio"
        icone={HomeOutlinedIcon}
        selecionado={selecionado}
      />
      <MenuItem
        onClick={gerarQuestao}
        texto="Gerar Questão"
        value="gerarquestoes"
        icone={HelpOutlineOutlinedIcon}
      />
      <MenuItem
        url="/classificacao"
        texto="Classificação"
        value="classificacao"
        icone={LeaderboardOutlinedIcon}
        selecionado={selecionado}
      />
      <MenuItem
        url="/competicao"
        texto="Modo Competição"
        value="competicao"
        icone={PeopleOutlineIcon}
        somenteParaUsuarioAutenticado
        selecionado={selecionado}
      />
      <MenuItem
        onClick={() => notificar("Funcionalidade em desenvolvimento.")}
        texto="Seja um Apoiador"
        value="apoiador"
        icone={FavoriteBorderIcon}
      />
      <div className={`mt-auto`}>
        <Divider />
        <MenuItem
          texto="Sair"
          value="logout"
          icone={LogoutOutlinedIcon}
          onClick={logout}
          somenteParaUsuarioAutenticado
          className={"justify-center"}
        />
      </div>
    </div>
  );
}
