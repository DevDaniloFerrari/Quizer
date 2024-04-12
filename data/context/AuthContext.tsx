"use client";
import { User, UserInfo } from "firebase/auth";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import {
  auth,
  createUserWithEmailESenha,
  db,
  signInWithEmailESenha,
  signInWithGooglePopup,
} from "@/firebase";
import { Cookies, useCookies } from "next-client-cookies";
import UsuarioLogado from "@/model/usuarioLogado";
import Usuario from "@/model/usuario";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";

interface AuthContextProps {
  usuario?: UsuarioLogado;
  carregando?: boolean;
  login?: (email: string, senha: string) => Promise<void>;
  cadastrar?: (
    email: string,
    senha: string,
    nome: string,
    urlFoto: string
  ) => Promise<void>;
  loginGoogle?: () => Promise<void>;
  logout?: () => Promise<void>;
  setCarregando?: Dispatch<SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextProps>({});

async function usuarioNormalizado(
  usuarioFirebase: User,
  nome?: string,
  urlFoto?: string
): Promise<UsuarioLogado> {
  const token = await usuarioFirebase.getIdToken();
  return {
    uid: usuarioFirebase.uid,
    nome: usuarioFirebase.displayName || nome || "",
    email: usuarioFirebase.email || "",
    token,
    provedor: usuarioFirebase.providerData[0].providerId,
    imagemUrl: usuarioFirebase.photoURL || urlFoto || "",
  };
}

function gerenciarCookie(logado: boolean, cookies: Cookies) {
  const data = new Date();
  data.setDate(data.getDate() + 7);

  if (logado) cookies.set("auth", logado.toString(), { expires: data });
  else cookies.remove("auth");
}

export function AuthProvider(props: any) {
  const cookies = useCookies();
  const router = useRouter();
  const [usuario, setUsuario] = useState<UsuarioLogado>();
  const [carregando, setCarregando] = useState<boolean>(true);

  async function salvarUsuario(usuarioLogado: UsuarioLogado) {
    const userRef = doc(db, "usuarios", usuarioLogado.uid);
    const usuario = {
      uid: usuarioLogado.uid,
      email: usuarioLogado.email,
      nome: usuarioLogado.nome,
      imagemUrl: usuarioLogado.imagemUrl,
    } as Usuario;
    await setDoc(userRef, usuario);
  }

  async function configurarSessao(usuarioFirebase: User | null) {
    if (usuarioFirebase?.email) {
      const usuario = await usuarioNormalizado(usuarioFirebase);
      const usuarioSalvo = await obterUsuario(usuario.uid);
      setUsuario({
        ...usuario,
        imagemUrl: usuarioSalvo.imagemUrl,
        nome: usuarioSalvo.nome,
      });
      gerenciarCookie(true, cookies);
      return usuario.email;
    } else {
      setUsuario(undefined);
      gerenciarCookie(false, cookies);
      return false;
    }
  }

  async function obterUsuario(uid: string): Promise<Usuario> {
    const querySnapshot = await getDocs(
      query(collection(db, "usuarios"), where("uid", "==", uid))
    );
    const usuarioEncontrado = JSON.parse(
      JSON.stringify(querySnapshot.docs[0].data())
    ) as Usuario;

    return usuarioEncontrado;
  }

  async function cadastrar(
    email: string,
    senha: string,
    nome: string,
    urlFoto: string
  ) {
    setCarregando(true);
    const resposta = await createUserWithEmailESenha(email, senha);
    const usuario = await usuarioNormalizado(resposta.user, nome, urlFoto);
    salvarUsuario(usuario);
    await configurarSessao(resposta.user);
  }

  async function login(email: string, senha: string) {
    setCarregando(true);
    const resposta = await signInWithEmailESenha(email, senha);
    await configurarSessao(resposta.user);
  }

  async function loginGoogle() {
    try {
      setCarregando(true);
      const resposta = await signInWithGooglePopup();
      await configurarSessao(resposta.user);
      router.push("/");
    } catch {
      setCarregando(false);
    } finally {
      setCarregando(false);
    }
  }

  async function logout() {
    setCarregando(true);
    try {
      await auth.signOut();
      await configurarSessao(null);
    } finally {
      setCarregando(false);
    }
  }

  useEffect((): any => {
    if (cookies.get("auth")) {
      const cancelar = auth.onIdTokenChanged((promise) => {
        configurarSessao(promise as User);
      });
      setCarregando(false);
      return () => cancelar;
    }

    setCarregando(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        usuario,
        carregando,
        login,
        cadastrar,
        loginGoogle,
        logout,
        setCarregando,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
