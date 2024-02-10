import questoes from "@/data/bancoDeQuestoes";
import { embaralhar } from "@/functions/arrays";
import { NextResponse } from "next/server";

export function GET() {
  const ids = questoes.map((questao) => questao.id);
  return NextResponse.json(embaralhar(ids));
}
