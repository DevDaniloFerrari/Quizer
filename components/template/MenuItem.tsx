import useAuth from "@/data/hook/useAuth";
import Link from "next/link";

interface MenuItemProps {
  url?: string;
  texto: string;
  icone: any;
  className?: string;
  somenteParaUsuarioAutenticado?: boolean;
  onClick?: (evento: any) => void;
}

export default function MenuItem(props: MenuItemProps) {
  const { usuario } = useAuth();

  if (props.somenteParaUsuarioAutenticado && !usuario) return;

  function renderizarConteudo() {
    return (
      <div
        className={`flex flex-col justify-center items-center h-20 w-25 cursor-pointer ${props.className}`}
      >
        {props.icone}
        <span className={`text-xs font-light text-center hidden sm:flex`}>{props.texto}</span>
      </div>
    );
  }

  return (
    <li onClick={props.onClick} className={`hover:bg-violet-600 list-none`}>
      {props.url ? (
        <Link href={props.url}>{renderizarConteudo()}</Link>
      ) : (
        renderizarConteudo()
      )}
    </li>
  );
}
