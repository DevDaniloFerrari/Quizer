import QuestaoModel from "@/model/questao";
import RespostaModel from "@/model/resposta";

const questoes: QuestaoModel[] = [
  new QuestaoModel(
    1,
    'Qual fruto é conhecido no Norte e Nordeste como "jerimum"?',
    [
      RespostaModel.errada("Caju"),
      RespostaModel.errada("Côco"),
      RespostaModel.errada("Chuchu"),
      RespostaModel.certa("Abóbora"),
    ]
  ),
  new QuestaoModel(2, "Qual é o triângulo que tem todos os lados diferentes?", [
    RespostaModel.errada("Equilátero"),
    RespostaModel.errada("Isóceles"),
    RespostaModel.errada("Trapézio"),
    RespostaModel.certa("Escaleno"),
  ]),
  new QuestaoModel(3, "Qual é o maior rio do mundo?", [
    RespostaModel.errada("Nilo"),
    RespostaModel.errada("Mississipi"),
    RespostaModel.errada("Ganges"),
    RespostaModel.certa("Amazonas"),
  ]),
  new QuestaoModel(4, "Em que ano ocorreu a independência do Brasil?", [
    RespostaModel.errada("1800"),
    RespostaModel.errada("1822"),
    RespostaModel.errada("1850"),
    RespostaModel.certa("1822"),
  ]),
  new QuestaoModel(5, "Qual é o símbolo químico do ouro?", [
    RespostaModel.errada("Ag"),
    RespostaModel.errada("Fe"),
    RespostaModel.errada("Cu"),
    RespostaModel.certa("Au"),
  ]),
  new QuestaoModel(6, "Quem foi o primeiro presidente dos Estados Unidos?", [
    RespostaModel.errada("Thomas Jefferson"),
    RespostaModel.errada("Abraham Lincoln"),
    RespostaModel.errada("George Washington"),
    RespostaModel.certa("George Washington"),
  ]),
  new QuestaoModel(7, "Qual é o maior mamífero terrestre?", [
    RespostaModel.errada("Elefante Africano"),
    RespostaModel.errada("Rinoceronte"),
    RespostaModel.errada("Leão"),
    RespostaModel.certa("Elefante Africano"),
  ]),
  new QuestaoModel(8, "Em que continente fica a Austrália?", [
    RespostaModel.errada("Ásia"),
    RespostaModel.errada("Europa"),
    RespostaModel.errada("América do Norte"),
    RespostaModel.certa("Oceania"),
  ]),
  new QuestaoModel(9, "Quem pintou a Mona Lisa?", [
    RespostaModel.errada("Vincent van Gogh"),
    RespostaModel.errada("Pablo Picasso"),
    RespostaModel.errada("Leonardo da Vinci"),
    RespostaModel.certa("Leonardo da Vinci"),
  ]),
  new QuestaoModel(10, "Qual é o maior planeta do nosso sistema solar?", [
    RespostaModel.errada("Vênus"),
    RespostaModel.errada("Marte"),
    RespostaModel.errada("Terra"),
    RespostaModel.certa("Júpiter"),
  ]),
  new QuestaoModel(11, "Qual é o número atômico do carbono?", [
    RespostaModel.errada("10"),
    RespostaModel.errada("15"),
    RespostaModel.errada("20"),
    RespostaModel.certa("6"),
  ]),
  new QuestaoModel(12, "Quantos lados tem um heptágono?", [
    RespostaModel.errada("6"),
    RespostaModel.errada("7"),
    RespostaModel.errada("8"),
    RespostaModel.certa("7"),
  ]),
  new QuestaoModel(13, "Qual é a capital da Austrália?", [
    RespostaModel.errada("Sydney"),
    RespostaModel.errada("Melbourne"),
    RespostaModel.errada("Brisbane"),
    RespostaModel.certa("Canberra"),
  ]),
  new QuestaoModel(14, 'Quem foi o autor de "Dom Quixote"?', [
    RespostaModel.errada("Charles Dickens"),
    RespostaModel.errada("Victor Hugo"),
    RespostaModel.errada("William Shakespeare"),
    RespostaModel.certa("Miguel de Cervantes"),
  ]),
  new QuestaoModel(15, "Quantos planetas existem no sistema solar?", [
    RespostaModel.errada("7"),
    RespostaModel.errada("8"),
    RespostaModel.errada("9"),
    RespostaModel.certa("8"),
  ]),
  new QuestaoModel(16, "Quem foi o primeiro homem a pisar na lua?", [
    RespostaModel.errada("Neil Armstrong"),
    RespostaModel.errada("Buzz Aldrin"),
    RespostaModel.errada("Yuri Gagarin"),
    RespostaModel.certa("Neil Armstrong"),
  ]),
  new QuestaoModel(17, "Qual é o animal mais rápido do mundo?", [
    RespostaModel.errada("Guepardo"),
    RespostaModel.errada("Falcão-peregrino"),
    RespostaModel.errada("Antílope"),
    RespostaModel.certa("Falcão-peregrino"),
  ]),
  new QuestaoModel(18, 'Quem é conhecido como o "pai da computação"?', [
    RespostaModel.errada("Bill Gates"),
    RespostaModel.errada("Steve Jobs"),
    RespostaModel.errada("Charles Babbage"),
    RespostaModel.certa("Alan Turing"),
  ]),
  new QuestaoModel(19, "Qual é o segundo maior oceano do mundo?", [
    RespostaModel.errada("Oceano Atlântico"),
    RespostaModel.errada("Oceano Antártico"),
    RespostaModel.errada("Oceano Pacífico"),
    RespostaModel.certa("Oceano Índico"),
  ]),
  new QuestaoModel(
    20,
    "Quem foi o líder do movimento pelos direitos civis nos EUA?",
    [
      RespostaModel.errada("Malcolm X"),
      RespostaModel.errada("Rosa Parks"),
      RespostaModel.errada("John F. Kennedy"),
      RespostaModel.certa("Martin Luther King Jr."),
    ]
  ),
  new QuestaoModel(21, "Em que ano iniciou a Segunda Guerra Mundial?", [
    RespostaModel.errada("1935"),
    RespostaModel.errada("1939"),
    RespostaModel.errada("1941"),
    RespostaModel.certa("1939"),
  ]),
  new QuestaoModel(22, "Qual é o maior deserto do mundo?", [
    RespostaModel.errada("Deserto do Atacama"),
    RespostaModel.errada("Deserto do Saara"),
    RespostaModel.errada("Deserto de Gobi"),
    RespostaModel.certa("Antártida"),
  ]),
  new QuestaoModel(23, 'Quem escreveu "O Príncipe"?', [
    RespostaModel.errada("Machado de Assis"),
    RespostaModel.errada("Platão"),
    RespostaModel.errada("Aristóteles"),
    RespostaModel.certa("Maquiavel"),
  ]),
  new QuestaoModel(24, "Qual é o maior órgão do corpo humano?", [
    RespostaModel.errada("Coração"),
    RespostaModel.errada("Fígado"),
    RespostaModel.errada("Pulmões"),
    RespostaModel.certa("Pele"),
  ]),
  new QuestaoModel(25, 'Quem pintou a "Noite Estrelada"?', [
    RespostaModel.errada("Pablo Picasso"),
    RespostaModel.errada("Claude Monet"),
    RespostaModel.errada("Leonardo da Vinci"),
    RespostaModel.certa("Vincent van Gogh"),
  ]),
  new QuestaoModel(26, "Qual é a maior cordilheira do mundo?", [
    RespostaModel.errada("Montanhas Rochosas"),
    RespostaModel.errada("Alpes"),
    RespostaModel.errada("Himalaias"),
    RespostaModel.certa("Cordilheira dos Andes"),
  ]),
  new QuestaoModel(27, "Quem foi o inventor do telefone?", [
    RespostaModel.errada("Alexander Graham Bell"),
    RespostaModel.errada("Thomas Edison"),
    RespostaModel.errada("Nikola Tesla"),
    RespostaModel.certa("Alexander Graham Bell"),
  ]),
  new QuestaoModel(28, "Qual é o metal mais abundante na crosta terrestre?", [
    RespostaModel.errada("Ouro"),
    RespostaModel.errada("Prata"),
    RespostaModel.errada("Ferro"),
    RespostaModel.certa("Alumínio"),
  ]),
  new QuestaoModel(29, "Qual é o coletivo de cães?", [
    RespostaModel.errada("Manada"),
    RespostaModel.errada("Alcateira"),
    RespostaModel.errada("Rebanho"),
    RespostaModel.certa("Matilha"),
  ]),
  new QuestaoModel(30, "Qual bicho transmite a Doença de Chagas?", [
    RespostaModel.errada("Abelha"),
    RespostaModel.errada("Barata"),
    RespostaModel.errada("Pulga"),
    RespostaModel.certa("Barbeiro"),
  ]),
];

export default questoes;
