import { FormControl, FormControlProps, FormLabel } from '@chakra-ui/react';
import React from 'react';

type FormFieldProps = FormControlProps & {
    label: string;
    children: React.ReactNode;
};

const FormField: React.FC<FormFieldProps> = ({ label, children, ...rest }) => (
    <FormControl {...rest}>
        <FormLabel>{label}</FormLabel>
        {children}
    </FormControl>
);

export default FormField;
