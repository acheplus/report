import {
  Flex,
  Button,
  Stack,
  Link,
  Heading,
  Image,
  Text,
  Checkbox,
} from '@chakra-ui/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import { Input } from '../components/Form/Input'
import { AuthContext } from '../contexts/AuthContext'
import { useContext } from 'react'
import { withSSRGuest } from '../utils/withSSRGuest'
import { FaEnvelope, FaLock } from 'react-icons/fa'

type SignInFormData = {
  email: string
  password: string
  error: string
}

const SignInFormSchema = yup
  .object()
  .shape({
    email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
    password: yup.string().required('Senha é obrigatória')
  })
  .required()

export default function Home() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(SignInFormSchema)
  })

  const { errors } = formState

  const { signIn } = useContext(AuthContext)

  const handleSignIn: SubmitHandler<SignInFormData> = async values => {
    await signIn(values)
  }

  return (
    <Flex w="100vw" h="100vh" bg="#77d282" align="center" justify="center">
      <Flex
        bg="#1b9b4e"
        borderRadius="10px 0 0 10px"
        flexDir="column"
        padding="20px"
        width="300px"
        height="500px"
        align="center"
      >
        <Heading color="#fff" fontSize="24px" fontFamily="Roboto" mt="80px">
          Seja Bem Vindo à
        </Heading>
        <Image
          w="110px"
          h="140px"
          mt="40px"
          mb="50px"
          src="/assets/logo_acheb.png"
          alt='logo acheplus'

        />
        <Heading as="h5" fontSize="12" color="#fff" margin="0 0 12px">
          Ainda não tem acesso
          <br />
          ao sistema? &gt;
          <Link
            href="#"
            cursor="pointer"
            textDecoration="underline"
            color="#c5c4c4"
          >
            <a>Clique aqui.</a>
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
        flexDir="column"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Heading fontSize="28px" color="#727376" m="0 0 16px">
          Login para Dashboard
        </Heading>
        <Stack spacing="4">
          <Input
            iconBase={FaEnvelope}
            width="100%"
            alignSelf="flex-end"
            error={errors.email}
            name="email"
            type="email"
            {...register('email')}
            placeholder="Digite um email"
          />
          <Input
            iconBase={FaLock}
            error={errors.password}
            name="password"
            type="password"
            {...register('password')}
            placeholder="Digite sua senha"
          />
        </Stack>
        <Flex width="100%" marginTop="2px">
          <Checkbox marginTop="4" 
          // label="Lembrar-me"
           width="100%">
            <Text fontSize="10px"> Lembrar-me</Text>
          </Checkbox>
          <Link
            color="gray"
            width="100%"
            fontSize="10px"
            alignSelf="flex-end"
            textAlign="end"
          >
            <a href="#" target="_blank" rel="noopener noreferrer">
              Esqueci Senha
            </a>
          </Link>
        </Flex>

        <Button
          type="submit"
          mt={6}
          colorScheme="green"
          isLoading={formState.isSubmitting}
        >
          Entrar
        </Button>
      </Flex>
    </Flex>
  )
}

export const getServerSideProps = withSSRGuest(async ctx => {
  return {
    props: {}
  }
})
