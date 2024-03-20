import { FieldError } from "react-hook-form"

export const getStylesForm = (error: FieldError) => {
    return {
        input:
            { color: error ? 'red' : 'white',
            fontWeight: 'bold'
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'white',
            },
            '&:hover fieldset': {
                borderColor: error ? '' : 'aqua',
            },
            '&.Mui-focused fieldset': {
                borderColor: error ? 'red' : 'aqua',
            },
        },
        '& label': {
            color: 'white',
            fontWeight: error ? 'bold' : 'normal'
        },
        '& label.Mui-focused': {
            color: error ? 'red' : 'aqua',
        },
        '& label-focused': {
            color: 'white',
        },
    }
}
