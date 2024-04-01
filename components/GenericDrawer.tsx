import React, { ReactNode } from 'react';
import Drawer, { DrawerProps } from '@mui/material/Drawer';
import styles from '@/styles/GenericDrawer.module.css';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Botao from './Botao';
import Divider from '@mui/material/Divider';

interface IDrawer {
  status: boolean;
  title: string;
  anchor?: 'left' | 'top' | 'right' | 'bottom';
  variant?: 'permanent' | 'persistent' | 'temporary';
  children: ReactNode;
  otherProps?: DrawerProps;
  onClose: () => void;
  onSave?: () => void;
}


export default function GenericDrawer(props: IDrawer) {

  return (
    <Drawer
      anchor={props.anchor || 'right'}
      open={props.status}
      variant={props.variant || 'permanent'}
      onClose={props.onClose}
      {...props.otherProps}
    >
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>{props.title}</h1>
          <IconButton onClick={props.onClose} className={styles.iconButton}>
            <CloseIcon className={styles.iconClose} />
          </IconButton>
        </div>
        <Divider />
        <div className={styles.main}>{props.children}</div>
        <Divider />
        <div className={styles.footer}>
          <Botao texto='Cancelar' onClick={props.onClose} width={140} />
          {
            props.onSave && <Botao texto='Salvar' width={140}/>
          }
        </div>
      </div>
    </Drawer>
  );
}