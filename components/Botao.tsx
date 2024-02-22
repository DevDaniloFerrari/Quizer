import Link from "next/link";
import styles from "../styles/Botao.module.css";

interface BotaoProps {
  href?: string;
  texto: string;
  onClick?: (event: any) => void;
}

export default function Botao(props: BotaoProps) {
  function renderizarBotao() {
    return (
      <button className={styles.botao} onClick={props.onClick}>
        {props.texto}
      </button>
    );
  }

  return props.href ? (
    <Link href={props.href}>{renderizarBotao()}</Link>
  ) : (
    renderizarBotao()
  );
}
