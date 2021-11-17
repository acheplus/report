import { Flex, Button, Stack } from '@chakra-ui/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import { Input } from '../components/Form/Input'
import { AuthContext } from '../contexts/AuthContext'
import { useContext } from 'react'
import { withSSRGuest } from '../utils/withSSRGuest'

type SignInFormData = {
  email: string;
  password: string;
  error: string;
}

const SignInFormSchema = yup.object().shape({
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha é obrigatória'),
}).required();

export default function Home() {
  const { register, handleSubmit, formState} = useForm({
    resolver: yupResolver(SignInFormSchema)
  })

  const { errors } = formState

  const { signIn } = useContext(AuthContext)

  const handleSignIn:SubmitHandler<SignInFormData> = async (values) => {
    await signIn(values)
  }

  return (
    <Flex
      w="100vw"
      h="100vh"
      align="center"
      justify="center">
        <Flex
          as="form"
          width="100%"
          maxWidth={360}
          bg="gray.50"
          padding="8"
          borderRadius={8}
          flexDir='column'
          onSubmit={handleSubmit(handleSignIn)}>
            <Stack spacing="4">
                <Input error={errors.email} name="email" type="email" label="E-mail" {...register('email')}/>
                <Input error={errors.password} name="password" type="password" label="Senha" {...register('password')}/>
            </Stack>

            <Button
              type="submit"
              mt={6}
              colorScheme="green"
              isLoading={formState.isSubmitting}>Entrar</Button>
        </Flex>
      </Flex>
    )
}

export const getServerSideProps = withSSRGuest(async (ctx) => {
  return {
    props: {}
  }
})