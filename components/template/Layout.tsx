"use client";
import MenuLateral from "./MenuLateral";

interface LayoutProps {
  children?: any;
}

export default function Layout(props: LayoutProps) {
  return (
    <div className={`flex h-screen w-screen`}>
      <MenuLateral />
      <div className={`flex flex-col w-full`}>
        {props.children}
      </div>
    </div>
  );
}
