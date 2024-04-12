import useAuth from "@/data/hook/useAuth";
import Image from "next/image";

interface AvatarUsuarioProps {
  className?: string;
}

export default function AvatarUsuario(props: AvatarUsuarioProps) {
  const { usuario } = useAuth();
  return (
    <Image
      src={usuario?.imagemUrl ?? "/images/avatar.svg"}
      alt="Avatar do Usuário"
      className={`rounded-full ${!usuario && "cursor-pointer"} ${
        props.className
      }`}
      width={60}
      height={60}
    />
  );
}
