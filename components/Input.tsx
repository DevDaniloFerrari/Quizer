import { TextField, TextFieldProps } from "@mui/material";

type CustomInput = {
    propsInput: TextFieldProps,
    register: any;
}

const CustomInput = (props: CustomInput) => {
    return (
        <TextField
            id="outlined-basic"
            variant="outlined"
            {...props.propsInput}
            {...props.register}
        />
    )
}

export default CustomInput