import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { formLogin } from '@/components/forms/schemas';
import { navegarPorLink } from "@/functions/utils";
import { getStylesForm } from "@/styles/Input-styles";
import { Divider, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IComponents } from "@/app/autenticacao/page";
import useAuth from "@/data/hook/useAuth";
import CustomInput from "./Input";
import Botao from "./Botao";

type FormDataLogin = {
    email?: string;
    senha?: string;
};

export function Login(props: IComponents) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormDataLogin>({
        resolver: yupResolver(formLogin),
    });
    const [showPassword, setShowPassword] = useState(false);
    const { usuario, loginGoogle } = useAuth();

    const logar = () => {
        if (!usuario) loginGoogle();
    }

    const onSubmit: SubmitHandler<FormDataLogin> = (data) => {
        try {
            console.log(data);
            navegarPorLink("/");

        }catch(e) {
            console.log('Erro ao logar!', e)
        }
    };

    return (
        <div className={`flex flex-col bg-slate-60 gap-10`}>
            <p>Login</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={`flex flex-col bg-slate-60 gap-10`}>
                    <CustomInput
                        propsInput={{
                            label: "Email",
                            type: "text",
                            error: !!errors.email,
                            helperText: errors.email?.message,
                            autoComplete: 'off',
                            sx: getStylesForm(errors.email),
                        }}
                        register={register("email")}
                    />
                    <CustomInput
                        propsInput={{
                            label: "Senha",
                            type: showPassword ? 'text' : 'password',
                            error: !!errors.senha,
                            helperText: errors.senha?.message,
                            InputProps: {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPassword(!showPassword)}
                                            edge="end"
                                        >
                                            {showPassword ? <Visibility style={{ color: 'white' }} /> : <VisibilityOff style={{ color: 'white' }} />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            },
                            sx: getStylesForm(errors.senha),
                        }}
                        register={register("senha")}
                    />
                    <Botao texto="Entrar" type="submit" width={'100%'} />
                </div>
            </form>
            <div className={`flex flex-col gap-4`}>
                <div
                    onClick={() => props.mudarComponenteAutenticacao()}
                    className={`cursor-pointer`}>
                    <p className={`text-center text-xs hover:text-cyan-300`}>Ainda não tem uma conta? Cadastre-se agora!</p></div>
                <div className={`mg-8`}>
                    <Divider />
                    <p className={`text-center mt-4`}>Ou entre com</p>
                    <div className={`mg-8`}>
                        <Botao texto="Google" type="submit" onClick={logar} width={'100%'} />
                    </div>
                </div>
            </div>
        </div>
    )
}