import questoes from "@/data/bancoDeQuestoes";
import { db } from "@/firebase";
import { embaralhar } from "@/functions/arrays";
import QuestaoModel from "@/model/questao";
import { collection, getDocs } from "firebase/firestore";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export async function GET() {
  if (process.env.USAR_ARQUIVO_DE_DADOS) return embaralharQuestoes(questoes);

  const querySnapshot = await getDocs(collection(db, "questoes"));
  const questoesFirebase = querySnapshot.docs.map((doc) =>
    QuestaoModel.criarUsandoObjeto(JSON.parse(JSON.stringify(doc.data())))
  );

  return embaralharQuestoes(questoesFirebase);
}

function embaralharQuestoes(questoes: QuestaoModel[]) {
  const ids = questoes.map((questao) => questao.id);
  return NextResponse.json(embaralhar(ids));
}
