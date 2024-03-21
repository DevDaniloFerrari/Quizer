import useAuth from "@/data/hook/useAuth";

interface AvatarUsuarioProps {
  className?: string;
}

export default function AvatarUsuario(props: AvatarUsuarioProps) {
  const { usuario, loginGoogle } = useAuth();

  return (
    <img
      src={usuario?.imagemUrl ?? "/images/avatar.svg"}
      alt="Avatar do Usuário"
      onClick={!usuario && loginGoogle}
      className={`h-12 w-12 rounded-full ${!usuario && "cursor-pointer"} ${
        props.className
      }`}
    />
  );
}
