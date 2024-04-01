import { getClassificacoesFirebase } from "@/model/firebase";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export async function GET() {
  const classificacoes = await getClassificacoesFirebase();

  const classificacoesOrdenadas = classificacoes.sort(
    (a, b) => b.totalRespostasCertas - a.totalRespostasCertas 
  );

  return NextResponse.json(classificacoesOrdenadas.map(x => x.converterParaObjeto()));
}
