import useAuth from "@/data/hook/useAuth";
import { SvgIconProps } from "@mui/material/SvgIcon/SvgIcon";
import Link from "next/link";

interface MenuItemProps {
  url?: string;
  texto: string;
  value?: string;
  selecionado?: string;
  icone: React.ElementType<SvgIconProps>;
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
        className={`flex gap-6 items-center h-20 w-25 cursor-pointer ${props.className} sm: sm:ml-6`}
      >
        <props.icone style={{ color: props.selecionado === props.value ? `#68B8E6` : null} }/>
        <span className={`hidden sm:flex text-xs font-light text-center mt-0.5 ${props.selecionado === props.value ? 'text-cyan-300' : null}`}>{props.texto}</span>
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