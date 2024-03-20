import * as yup from "yup"

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