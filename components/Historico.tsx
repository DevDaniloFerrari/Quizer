import { IHistoricoQuestoes } from '@/model/historicoQuestoes';
import styles from '@/styles/Historico.module.css'
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

export default function Historico() {

    const questoesFormatadasString = localStorage.getItem('questoes');
    const questoesFormatadas = questoesFormatadasString ? JSON.parse(questoesFormatadasString) as IHistoricoQuestoes[] : [];

    const getTitle = (message: string, index: number) => {
        return `${index + 1}º - ${message}`
    }

    const getSubtitle = (message: string, erro?: boolean) => {
        if (erro && message) {
            return `Você respondeu: ${message}`
        }
        return message || '';
    }

    if(!questoesFormatadas.length) {
        return (
            <p className={styles.semHistorico}>Sem Histórico</p>
        )
    }

    return (
        <>
            {questoesFormatadas.map((questao, index) => (
                <div className={styles.container} key={index}>
                    <div className={`${styles.panel} ${questao.acertou ? styles.certa : styles.errada}`}>
                        <p className={styles.title}>{getTitle(questao.enunciado, index)}</p>
                        <div className={styles.containerSubTitle}>
                            <p className={`${styles.subTitle} ${styles.textoRespostaCerta}`}>{getSubtitle(questao.respostaVerdadeira)}</p>
                            {
                                !questao.acertou && <>
                                    <p className={`${styles.subTitle} ${styles.textoRespostaErrada}`}>{getSubtitle(questao.respostaErrada, true)}</p>
                                </>
                            }
                        </div>
                        <div className={styles.iconContainer}>
                            {questao.acertou ? (<InsertEmoticonIcon fontSize='large' />) : <SentimentVeryDissatisfiedIcon fontSize='large' />}
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}