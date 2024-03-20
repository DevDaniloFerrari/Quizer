import { LoadingButton } from "@mui/lab";
import styles from "../styles/Botao.module.css";

interface BotaoProps {
  href?: string;
  texto: string;
  loading?: boolean;
  type?: 'submit' | 'button';
  onClick?: (event: any) => void;
}

export default function Botao(props: BotaoProps) {
    return (
      <LoadingButton 
        variant="contained" 
        className={styles.botao} 
        onClick={props.onClick} 
        loading={props.loading}
        disabled={props.loading}
        type={props.type || 'button'}>
        {props.texto}
      </LoadingButton>
    );
}
