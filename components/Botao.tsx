import LoadingButton from "@mui/lab/LoadingButton";
import styles from "../styles/Botao.module.css";
import Link from "next/link";

interface BotaoProps {
  href?: string;
  texto: string;
  loading?: boolean;
  width?: string | number;
  type?: "submit" | "button";
  onClick?: (event: any) => void;
}

export default function Botao(props: BotaoProps) {

  function renderizarBotao() {
    return (
      <LoadingButton
        variant="contained"
        className={styles.botao}
        style={{ width: props.width || '250px'}}
        loading={props.loading}
        disabled={props.loading}
        type={props.type || "button"}
        {...props}
      >
        {props.texto}
      </LoadingButton>
    );
  }

  return props.href ? (
    <Link href={props.href}>{renderizarBotao()}</Link>
  ) : (
    renderizarBotao()
  );

}
