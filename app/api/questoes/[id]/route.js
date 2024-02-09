import { NextResponse } from "next/server";
import questoes from "@/data/bancoDeQuestoes";

export function GET(request, params) {
  return NextResponse.json(questoes[0].converterParaObjeto());
}
