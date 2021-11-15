import {FormControl, FormLabel, FormErrorMessage, Input as ChakraInput, InputProps as ChakraInputProps } from '@chakra-ui/react'
import { forwardRef, ForwardRefRenderFunction } from 'react'
import { FieldError } from 'react-hook-form'

interface InputProps extends ChakraInputProps {
    name: string;
    label?: string;
    error: FieldError;
}

export const Input: ForwardRefRenderFunction = forwardRef(({ name, label, error, ...rest }: InputProps, ref) => {
    return (
        <FormControl isInvalid={!!error}>
            { !!label && <FormLabel htmlFor={name}>{label}</FormLabel> }
            <ChakraInput
                name={name}
                id={name}
                focusBorderColor='teal.200'
                bgColor='gray.200'
                variant='filled'
                _hover={{
                    bgColor: 'gray.100'
                }}
                size="lg"
                ref={ref}
                {...rest}></ChakraInput>

                { !!error && (
                    <FormErrorMessage>{error.message}</FormErrorMessage>
                )}
        </FormControl>
    )
})
