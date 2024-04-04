import { db } from "@/firebase";
import QuestaoModel from "@/model/questao";
import {
  collection,
  getDocs,
  query,
  where,
  addDoc,
  doc,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import { Classificacao } from "./classificacao";
import Sala from "./sala";
import Usuario from "./usuario";

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

export const getSalaEmEspera = async () => {
  const querySnapshot = await getDocs(
    query(collection(db, "salas"), where("segundoJogador", "==", null))
  );
  const salas = querySnapshot.docs.map((doc) =>
    Sala.criarUsandoObjeto(JSON.parse(JSON.stringify(doc.data())))
  );

  return salas;
};

export const criarNovaSala = async (
  usuario: Usuario,
  callback: (sala: Sala) => void
) => {
  const sala = new Sala(usuario);
  const novaSala = await addDoc(
    collection(db, "salas"),
    JSON.parse(JSON.stringify(sala.converterParaObjeto()))
  );

  console.log(novaSala.id);

  const docRef = doc(db, "salas", novaSala.id);

  const unsubscribe = onSnapshot(docRef, (doc) => {
    callback(Sala.criarUsandoObjeto(JSON.parse(JSON.stringify(doc.data()))));
  });
};
