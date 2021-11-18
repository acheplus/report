import {FormControl, FormLabel, FormErrorMessage, Input as ChakraInput, InputProps as ChakraInputProps } from '@chakra-ui/react'
import { forwardRef, ForwardRefRenderFunction } from 'react'
import { FieldError } from 'react-hook-form'

interface InputProps extends ChakraInputProps {
    name: string;
    label?: string;
    placeholder?: string;
    error?: FieldError;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({ name, label, placeholder, error, ...rest }: InputProps, ref) => {
    return (
        <FormControl isInvalid={!!error}>
            { !!label && <FormLabel htmlFor={name}>{label}</FormLabel> }
            <ChakraInput
                name={name}
                id={name}
                placeholder={placeholder}
                focusBorderColor='teal.200'
                bgColor='gray.200'
                variant='filled'
                _hover={{
                    bgColor: 'gray.100'
                }}
                align="center"
                br="5px"
                size="lg"
                ref={ref}
                {...rest}></ChakraInput>

                { !!error && (
                    <FormErrorMessage>{error.message}</FormErrorMessage>
                )}
        </FormControl>
    )
}

export const Input = forwardRef(InputBase)