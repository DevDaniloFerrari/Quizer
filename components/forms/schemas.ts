import * as yup from "yup";

export const formInicial = yup.object().shape({
  perguntas: yup.number()
    .transform((value) => Number.isNaN(value) ? null : value)
    .nullable()
    .required('Preecha esse campo!')
    .positive()
    .integer('Número inválido! Preecha com valor inteiro!')
    .max(30, 'O valor deve ser menor ou igual a 30!')
    .min(10, 'O valor deve ser maior ou igual a 10!'),
  duracao: yup.number()
    .transform((value) => Number.isNaN(value) ? null : value)
    .nullable()
    .required('Preecha esse campo!')
    .positive()
    .integer('Número inválido! Preecha com valor inteiro!')
    .max(60, 'O valor deve ser menor ou igual a 60!')
    .min(10, 'O valor deve ser maior ou igual a 10!')
});

export const formLogin = yup.object().shape({
  email: yup.string()
    .email('Email inválido! Preencha com um email válido!')
    .required('Preencha esse campo!'),
  senha: yup.string()
    .required('Preencha esse campo!')
});

export const formCadastroLogin = yup.object().shape({
  nome: yup.string()
    .required('Preecha esse campo!'),
  email: yup.string()
    .email('Email inválido! Preecha com um email válido!')
    .required('Preecha esse campo!'),
  senha: yup.string()
    .required('Preencha esse campo!')
    .matches(
      /(?=.*[A-Z])/,
      'A senha deve conter pelo menos uma letra maiúscula!'
    )
    .matches(
      /(?=.*[$*&@#.])/,
      'A senha deve conter pelo menos um dos seguintes símbolos: $, *, &, @, # ou . !'
    )
    .matches(
      /(?=.*\d)/,
      'A senha deve conter pelo menos um número!'
    )
    .matches(
      /^[^\s]{6,12}$/,
      'A senha deve ter entre 6 e 12 caracteres e não pode conter espaços!'
    ),
  confirmarSenha: yup.string()
    .required('Confirme sua senha!')
    .oneOf([yup.ref('senha'), null], 'As senhas precisam ser iguais.'),
});