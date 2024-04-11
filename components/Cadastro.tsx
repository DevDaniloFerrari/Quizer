import { useState } from "react";
import CustomInput from "./Input";
import Botao from "./Botao";
import { IComponents } from "@/app/autenticacao/page";
import { SubmitHandler, useForm } from "react-hook-form";
import { formCadastroLogin } from "./forms/schemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { navegarPorLink } from "@/functions/utils";
import { Avatar, Box, Button, IconButton, InputAdornment, Paper } from "@mui/material";
import { getStylesForm } from "@/styles/Input-styles";
import ClearIcon from '@mui/icons-material/Clear';
import { Visibility, VisibilityOff } from "@mui/icons-material";

type FormDataCadastro = {
    imagem?: any;
    email?: string;
    senha?: string;
    confirmarSenha?: string;
};

export function Cadastro(props: IComponents) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormDataCadastro>({
        resolver: yupResolver(formCadastroLogin),
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordVerified, setShowPasswordVerified] = useState(false);
    const [filePreview, setFilePreview] = useState<string>('');
    const [file, setFile] = useState<File | null>(null);

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const uploadedFile = event.target.files && event.target.files[0];
        if (uploadedFile) {
            setFile(uploadedFile);
            setFilePreview(URL.createObjectURL(uploadedFile));
        }
    };

    const onSubmit: SubmitHandler<FormDataCadastro> = (data) => {
        try {
            if (file) {
                data.imagem = file
            }
            console.log(data);
            navegarPorLink("/");
        }
        catch (e) {
            console.log('Erro ao cadastrar usuário!', e)
        }
    };

    const removerFile = () => {
        setFile(null);
        setFilePreview('');
    };

    return (
        <div className={`flex flex-col bg-slate-60 gap-10`}>
            <p>Cadastro</p>
            <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                <div className={`flex flex-col bg-slate-60 gap-10`}>
                    <Box alignItems='center' display='flex' justifyContent='center' flexDirection='column'>
                        {
                            !file && <input
                                accept="image/*"
                                id="avatar"
                                type='file'
                                onChange={onChange}
                                hidden />
                        }
                        <Box>
                            <label htmlFor="avatar">
                                <Button component="span" >
                                    <Paper elevation={10} style={{ borderRadius: 100 }}>
                                        <Avatar src={filePreview} variant='circular' className={`w-20 h-20`} />
                                    </Paper>
                                </Button>
                            </label>
                        </Box>
                    </Box>
                    {
                        filePreview && <div className={`flex justify-center -mt-6`}><ClearIcon onClick={removerFile} className={`cursor-pointer`} /></div>
                    }
                    <CustomInput
                        propsInput={{
                            label: "Email",
                            type: "text",
                            autoComplete: 'off',
                            error: !!errors.email,
                            helperText: errors.email?.message,
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
                    <CustomInput
                        propsInput={{
                            label: "Confirmar Senha",
                            type: showPasswordVerified ? 'text' : 'password',
                            error: !!errors.confirmarSenha,
                            helperText: errors.confirmarSenha?.message,
                            InputProps: {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPasswordVerified(!showPasswordVerified)}
                                            edge="end"
                                        >
                                            {showPasswordVerified ? <Visibility style={{ color: 'white' }} /> : <VisibilityOff style={{ color: 'white' }} />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            },
                            sx: getStylesForm(errors.confirmarSenha),
                        }}
                        register={register("confirmarSenha")}
                    />
                    <Botao texto="Cadastrar" type="submit" width={'100%'} />
                </div>
            </form>
            <div className={`flex flex-col gap-4`}>
                <div
                    onClick={() => props.mudarComponenteAutenticacao()}
                    className={`cursor-pointer`}>
                    <p className={`text-center text-xs hover:text-cyan-300`}>
                        Já faz parte da Comunidade? Entre com suas credenciais!
                    </p>
                </div>
            </div>
        </div>
    )
}