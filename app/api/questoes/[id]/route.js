import { NextResponse } from "next/server";
import questoes from "@/data/bancoDeQuestoes";

export function GET(request, { params }) {
  const id = +params.id;
  const questoesFiltradas = questoes.filter((questao) => questao.id === id);
  if (questoesFiltradas.length === 1)
    return NextResponse.json(questoesFiltradas[0].converterParaObjeto());
  return NextResponse.json([]);
}
