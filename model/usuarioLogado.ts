export default interface UsuarioLogado {
  uid: string;
  email: string;
  nome: string;
  token: string;
  provedor: string;
  imagemUrl: string | null;
}