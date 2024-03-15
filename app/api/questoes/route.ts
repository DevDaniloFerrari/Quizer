import { db } from "@/firebase";
import QuestaoModel from "@/model/questao";
import axios from "axios";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export async function POST() {
  const querySnapshot = await getDocs(collection(db, "questoes"));
  const questoesFirebase = querySnapshot.docs.map((doc) =>
    QuestaoModel.criarUsandoObjeto(JSON.parse(JSON.stringify(doc.data())))
  );

  const id = Math.max(...questoesFirebase.map((questao) => questao.id)) + 1;

  const jsonExample =
    "{id:1,enunciado:'QualfrutoéconhecidonoNorteeNordestecomo jerimum?',respostas:[{valor:'Caju',certa:false,revelada:false},{valor:'Côco',certa:false,revelada:false},{valor:'Chuchu',certa:false,revelada:false},{valor:'Abóbora',certa:true,revelada:false}],respondida:false,acertou:false}";

  const requestData = {
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant designed to output JSON.",
      },
      {
        role: "user",
        content: `Generate complete diferente and randon question in portuguese in this format ${jsonExample} and replace the values in this json and finally change the id to this ${id}}`,
      },
    ],
    model: "gpt-3.5-turbo-0125",
    response_format: { type: "json_object" },
  };

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      requestData,
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const questao = JSON.parse(response.data.choices[0].message.content);

    await addDoc(collection(db, "questoes"), questao);
  } catch (error) {
    console.error("Error: ", error);
  }

  return NextResponse.json([]);
}
