import questoesLocal from "@/data/bancoDeQuestoes";
import { getQuestoesFirebase } from "@/model/firebase";
import QuestaoModel from "@/model/questao";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic'
export async function GET(request: any, { params }: any) {

  const questoes = process.env.USAR_ARQUIVO_DE_DADOS ? questoesLocal : await getQuestoesFirebase();

  const questaoFiltrada = getQuestaoFiltrada(questoes, +params.id);

  return questaoFiltrada;
}

function getQuestaoFiltrada(questoes: QuestaoModel[], id: number) {
  const questaoFiltrada = questoes.find((questao) => questao.id === id);
  if (questaoFiltrada)
    return NextResponse.json(
      questaoFiltrada.embaralharRespostas().converterParaObjeto()
    );
  return NextResponse.json([]);
}