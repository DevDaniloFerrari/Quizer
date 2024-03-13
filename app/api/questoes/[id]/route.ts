import { db } from "@/firebase";
import QuestaoModel from "@/model/questao";
import { collection, getDocs } from "firebase/firestore";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic'
export async function GET(request: any, { params }: any) {
  const querySnapshot = await getDocs(collection(db, "questoes"));
  const questoes = querySnapshot.docs.map((doc) =>
    QuestaoModel.criarUsandoObjeto(JSON.parse(JSON.stringify(doc.data())))
  );

  const id = +params.id;
  const questoesFiltradas = questoes.filter((questao) => questao.id === id);
  if (questoesFiltradas.length === 1)
    return NextResponse.json(
      questoesFiltradas[0].embaralharRespostas().converterParaObjeto()
    );
  return NextResponse.json([]);
}
