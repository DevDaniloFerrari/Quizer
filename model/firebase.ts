import { db } from "@/firebase";
import QuestaoModel from "@/model/questao";
import {
  collection,
  getDocs,
  query,
  addDoc,
  doc,
  onSnapshot,
  setDoc,
  deleteDoc,
  Unsubscribe,
  where,
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

export const getSalaEmEspera = async (): Promise<Sala> => {
  const querySnapshot = await getDocs(query(collection(db, "salas")));
  const salas = querySnapshot.docs.map((doc) =>
    Sala.criarUsandoObjeto(
      JSON.parse(JSON.stringify({ ...doc.data(), id: doc.id }))
    )
  );

  return salas.find((sala) => sala.aguardandoJogador);
};

export const getSala = async (idSala: string): Promise<Sala> => {
  const querySnapshot = await getDocs(
    query(collection(db, "salas"), where("id", "==", idSala))
  );

  const doc = querySnapshot.docs[0].data();

  const sala = Sala.criarUsandoObjeto(
    JSON.parse(JSON.stringify({ ...doc, id: doc.id }))
  );

  return sala;
};

export const criarNovaSala = async (
  usuario: Usuario,
  callback: (sala: Sala) => void
): Promise<Unsubscribe> => {
  const sala = new Sala(usuario);
  const novaSala = await addDoc(
    collection(db, "salas"),
    JSON.parse(JSON.stringify(sala.converterParaObjeto()))
  );

  const docRef = doc(db, "salas", novaSala.id);

  const unsubscribe = onSnapshot(docRef, (doc) => {
    callback(
      Sala.criarUsandoObjeto(
        JSON.parse(JSON.stringify({ ...doc.data(), id: doc.id }))
      )
    );
  });

  return unsubscribe;
};

export const escutarSala = async (
  idSala: string,
  callback: (sala: Sala) => void
): Promise<Unsubscribe> => {
  const docRef = doc(db, "salas", idSala);

  const unsubscribe = onSnapshot(docRef, (doc) => {
    callback(
      Sala.criarUsandoObjeto(
        JSON.parse(JSON.stringify({ ...doc.data(), id: doc.id }))
      )
    );
  });

  return unsubscribe;
};

export const adicionarHistoricoPrimeiroJogador = async (sala: Sala) => {
  const salaRef = doc(db, "salas", sala.id);
  await setDoc(salaRef, sala.converterParaObjeto());
};

export const alterarSala = async (sala: Sala) => {
  const salaRef = doc(db, "salas", sala.id);
  await setDoc(salaRef, sala.converterParaObjeto());
};

export const deletarSala = async (sala: Sala) => {
  const salaRef = doc(db, "salas", sala.id);
  await deleteDoc(salaRef);
};
