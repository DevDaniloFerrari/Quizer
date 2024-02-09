import QuestaoModel from "@/model/questao";
import RespostaModel from "@/model/resposta";

const questoes: QuestaoModel[] = [
  new QuestaoModel(306, "Qual bicho transmite a Doença de Chagas?", [
    RespostaModel.errada("Abelha"),
    RespostaModel.errada("Barata"),
    RespostaModel.errada("Pulga"),
    RespostaModel.certa("Barbeiro"),
  ]),
  new QuestaoModel(202, 'Qual fruto é conhecido no Norte e Nordeste como "jerimum"?', [
    RespostaModel.errada("Caju"),
    RespostaModel.errada("Côco"),
    RespostaModel.errada("Chuchu"),
    RespostaModel.certa("Abóbora"),
  ]),
  new QuestaoModel(203, 'Qual é o coletivo de cães?', [
    RespostaModel.errada("Manada"),
    RespostaModel.errada("Alcateira"),
    RespostaModel.errada("Rebanho"),
    RespostaModel.certa("Matilha"),
  ]),
  new QuestaoModel(204, 'Qual é o triângulo que tem todos os lados diferentes?', [
    RespostaModel.errada("Equilátero"),
    RespostaModel.errada("Isóceles"),
    RespostaModel.errada("Trapézio"),
    RespostaModel.certa("Escaleno"),
  ]),
];

export default questoes;
