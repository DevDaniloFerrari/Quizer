"use client";
import { CircularProgress } from "@mui/material";
import MenuLateral from "./MenuLateral";

interface LayoutProps {
  children?: any;
  carregando?: boolean;
}

export default function Layout(props: LayoutProps) {
  function renderizarCarregando() {
    return (
      <div className={`flex justify-center items-center h-screen`}>
        <CircularProgress
          style={{
            height: 100,
            width: 100,
            color: "#33ccff"
          }}
        />
      </div>
    );
  }

  return (
    <div className={`flex h-screen w-screen`}>
      <MenuLateral />
      <div className={`flex flex-col w-full`}>
        {props.carregando ? renderizarCarregando() : props.children}
      </div>
    </div>
  );
}
