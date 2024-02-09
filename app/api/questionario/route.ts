import questoes from "@/data/bancoDeQuestoes";
import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json(questoes.map((questao) => questao.id));
}
