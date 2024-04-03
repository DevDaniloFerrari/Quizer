"use client";
import useAuth from "@/data/hook/useAuth";
import {
  IconeCasa,
  IconeClassificacao,
  IconeCompeticao,
  IconeQuestao,
  IconeSair,
} from "../icons";
import MenuItem from "./MenuItem";
import { toast } from "react-toastify";
import { useState } from "react";
import AvatarUsuario from "../AvatarUsuario";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function MenuLateral() {
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
    <aside className={`flex flex-col bg-violet-700`}>
      <ul className={`flex-grow`}>
        <div className={`flex justify-center items-center mt-5`}>
          <AvatarUsuario />
        </div>
        <MenuItem url="/" texto="Início" icone={IconeCasa} />
        <MenuItem
          onClick={gerarQuestao}
          texto="Gerar Questão"
          icone={IconeQuestao}
        />
        <MenuItem
          url="/classificacao"
          texto="Classificação"
          icone={IconeClassificacao}
        />
        <MenuItem
          onClick={() =>
            notificar(
              "Aguarde. Em breve disponibilizaremos essa funcionalidade! :)"
            )
          }
          texto="Modo Competição"
          icone={IconeCompeticao}
        />
      </ul>
      {usuario && <ul>
        <MenuItem
          texto="Sair"
          icone={IconeSair}
          onClick={logout}
          className={`text-red-600 dark:text-red-400 hover:bg-red-400  hover:text-white`}
        />
      </ul>}
    </aside>
  );
}
