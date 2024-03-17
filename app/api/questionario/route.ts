import questoesLocal from "@/data/bancoDeQuestoes";
import { embaralhar } from "@/functions/arrays";
import { getQuestoesFirebase } from "@/model/firebase";
import QuestaoModel from "@/model/questao";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export async function GET() {
  if (process.env.USAR_ARQUIVO_DE_DADOS) return embaralharQuestoes(questoesLocal);

  return embaralharQuestoes(await getQuestoesFirebase());
}

function embaralharQuestoes(questoes: QuestaoModel[]) {
  const ids = questoes.map((questao) => questao.id);
  return NextResponse.json(embaralhar(ids));
}