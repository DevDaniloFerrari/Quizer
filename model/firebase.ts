import { db } from "@/firebase";
import QuestaoModel from "@/model/questao";
import { collection, getDocs } from "firebase/firestore";

export const getQuestoesFirebase = async () => {
    const querySnapshot = await getDocs(collection(db, "questoes"));
    const questoes = querySnapshot.docs.map((doc) =>
        QuestaoModel.criarUsandoObjeto(JSON.parse(JSON.stringify(doc.data())))
    );

    return questoes;
}