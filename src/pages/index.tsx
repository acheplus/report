import { Flex, Button, Stack, Heading, Image, Link } from '@chakra-ui/react'
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
      bg="#77d282"
      align="center"
      justify="center">
        <Flex
          bg="#1b9b4e"
          borderRadius="10px 0 0 10px"
          flexDir="column"
          padding="20px"
          width="300px"
          height="500px"
          align="center">
            <Heading as="h1" color="#fff"
              fontSize="24px"
              fontFamily="Roboto"
              mt="80px">
              Seja Bem Vindo à
            </Heading>
            <Image
            w="110px"
            h="140px"
            mt="20px"
            mb="50px" 
            src="/assets/logo_acheb.png"  />
            <Heading as="h5"
              fontSize="12"
              color="#fff"
              margin="0 0 12px">
                Ainda não tem acesso<br />
                ao sistema? >
                <Link href="#" 
                  cursor="pointer"
                  textDecoration="underline"
                  color="#c5c4c4">
                  Clique aqui.
                </Link>
            </Heading>
        </Flex>
        <Flex
          as="form"
          width="500px"
          h="500px"
          bg="#fff"
          padding="20px"
          justify="center"
          borderRadius="0 10px 10px 0"
          flexDir='column'
          onSubmit={handleSubmit(handleSignIn)}>
            <Heading as="h1"
              color="#727376"
              m="0 0 16px"
              >
              Login para Dashboard
            </Heading>
            <Stack spacing="4">
                <Input error={errors.email}
                  name="email" type="email"
                  label="E-mail"
                  {...register('email')}
                  align="center"
                  br="5px"
                  placeholder="Digite um email"
                  />
                <Input error={errors.password}
                  name="password" type="password"
                  label="Senha"
                  {...register('password')}
                  align="center"
                  br="5px"
                  placeholder="Digite sua senha"
                  />
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