import Link from "next/link";

interface MenuItemProps {
  url?: string;
  texto: string;
  icone: any;
  className?: string;
  onClick?: (evento: any) => void;
}

export default function MenuItem(props: MenuItemProps) {
  function renderizarConteudo() {
    return (
      <div
        className={`flex flex-col justify-center items-center h-20 w-25 cursor-pointer ${props.className}`}
      >
        {props.icone}
        <span className={`text-xs font-light text-center`}>{props.texto}</span>
      </div>
    );
  }

  return (
    <li onClick={props.onClick} className={`hover:bg-violet-600`}>
      {props.url ? (
        <Link href={props.url}>{renderizarConteudo()}</Link>
      ) : (
        renderizarConteudo()
      )}
    </li>
  );
}
