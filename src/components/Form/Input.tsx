import {
  FormControl,
  FormLabel,
  InputLeftElement,
  InputGroup,
  FormErrorMessage,
  Icon,
  Input as ChakraInput,
  InputProps as ChakraInputProps
} from '@chakra-ui/react'
import { forwardRef, ForwardRefRenderFunction } from 'react'
import { FieldError } from 'react-hook-form'
import { IconType } from 'react-icons'

interface InputProps extends ChakraInputProps {
  name: string
  label?: string
  placeholder?: string
  iconBase: IconType
  error?: FieldError
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, label, placeholder, iconBase, error, ...rest }: InputProps,
  ref
) => {
  return (
    <FormControl isInvalid={!!error}>
      {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <InputGroup
        focusBorderColor="teal.200"
        variant="filled"
        align="center"
        br="5px"
        size="lg"
      >
        <InputLeftElement pointerEvents="none">
          <Icon as={iconBase} color="gray.300" />
        </InputLeftElement>
        <ChakraInput
          name={name}
          id={name}
          placeholder={placeholder}
          ref={ref}
          {...rest}
        ></ChakraInput>

        {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
      </InputGroup>
    </FormControl>
  )
}

export const Input = forwardRef(InputBase)
