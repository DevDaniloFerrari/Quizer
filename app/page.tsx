import Questao from "@/components/Questao";
import QuestaoModel from "@/model/questao";
import RespostaModel from "@/model/resposta";

export default function Home() {
  const questao = new QuestaoModel(1, "Melhor cor?", [
    RespostaModel.errada("Verde"),
    RespostaModel.errada("Vermelha"),
    RespostaModel.errada("Azul"),
    RespostaModel.certa("Preta"),
  ]);
  return <Questao valor={questao} />;
}
