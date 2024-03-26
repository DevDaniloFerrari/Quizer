import { db } from "@/firebase";
import QuestaoModel from "@/model/questao";
import { collection, getDocs } from "firebase/firestore";
import { Classificacao } from "./classificacao";

export const getQuestoesFirebase = async () => {
  const querySnapshot = await getDocs(collection(db, "questoes"));
  const questoes = querySnapshot.docs.map((doc) =>
    QuestaoModel.criarUsandoObjeto(JSON.parse(JSON.stringify(doc.data())))
  );

  return questoes;
};

export const getClassificacoesFirebase = async () => {
  const querySnapshot = await getDocs(collection(db, "classificacoes"));
  const classificacoes = querySnapshot.docs.map((doc) =>
    Classificacao.criarUsandoObjeto(JSON.parse(JSON.stringify(doc.data())))
  );

  return classificacoes;
};
