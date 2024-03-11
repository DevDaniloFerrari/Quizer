import { db } from "@/firebase";
import { embaralhar } from "@/functions/arrays";
import QuestaoModel from "@/model/questao";
import { collection, getDocs } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET() {
  const querySnapshot = await getDocs(collection(db, "questoes"));
  const questoes = querySnapshot.docs.map((doc) =>
    QuestaoModel.criarUsandoObjeto(JSON.parse(JSON.stringify(doc.data())))
  );

  const ids = questoes.map((questao) => questao.id);
  return NextResponse.json(embaralhar(ids));
}
