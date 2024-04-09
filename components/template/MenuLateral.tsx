"use client";
import useAuth from "@/data/hook/useAuth";
import MenuItem from "./MenuItem";
import { toast } from "react-toastify";
import { useState } from "react";
import AvatarUsuario from "../AvatarUsuario";
import { Divider } from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import LeaderboardOutlinedIcon from '@mui/icons-material/LeaderboardOutlined';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

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
    <aside className={`flex flex-col w-96 bg-violet-700`}>
      <ul className={`flex-grow`}>
        <div className={`flex justify-center items-center mt-10 mb-5`}>
          <AvatarUsuario />
        </div>
        <p className={`text-center`}>Olá, {usuario?.nome || 'Jogador!'}</p>
        {
          !usuario && (
            <div className={`mt-6`}>
              <Divider />
              <MenuItem
                url={'/autenticacao'}
                texto="Login"
                value="autenticacao"
                icone={LoginIcon}
                className={"justify-start"}
                selecionado={selecionado}
              />
              <Divider />
            </div>
          )
        }
        <div className="mt-10">
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
        </div>
      </ul>
      <Divider />
      <MenuItem
        texto="Sair"
        value="logout"
        icone={LogoutOutlinedIcon}
        onClick={logout}
        somenteParaUsuarioAutenticado
        className={"justify-center mr-6"}
      />
    </aside>
  );
}