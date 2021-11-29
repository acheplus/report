import {FormControl, FormLabel, Flex, FormErrorMessage, Icon, Input as ChakraInput, InputProps as ChakraInputProps } from '@chakra-ui/react'
import { forwardRef, ForwardRefRenderFunction } from 'react'
import { FieldError } from 'react-hook-form'
import { IconType } from 'react-icons'


interface InputProps extends ChakraInputProps {
    name: string;
    label?: string;
    placeholder?: string;
    icon: IconType;
    error?: FieldError;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({ name, label, placeholder, icon, error, ...rest }: InputProps, ref) => {
    return (
        <FormControl isInvalid={!!icon}>
            { !!label && <FormLabel htmlFor={name}>{label}</FormLabel> }
            <Flex focusBorderColor='teal.200'
                bgColor='gray.200'
                variant='filled'
                _hover={{
                    bgColor: 'gray.100'
                }}
                align="center"
                br="5px"
                size="lg">
            <Icon as={icon} display='flex'/>
            <ChakraInput
                name={name}
                id={name}
                placeholder={placeholder}
                
                ref={ref}
                {...rest}></ChakraInput>

                { !!error && (
                    <FormErrorMessage>{error.message}</FormErrorMessage>
                )}
                </Flex>
        </FormControl>
    )
}

export const Input = forwardRef(InputBase)