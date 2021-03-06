import Link from 'next/link'
import { Box, Button, Flex, Heading, Divider, VStack, HStack, SimpleGrid } from '@chakra-ui/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import { useMutation } from 'react-query'

import { Input } from '../../components/Form/Input'
import { Header } from '../../components/Header'
import { Sidebar } from '../../components/Sidebar'
import { api } from '../../services/apiClient'
import { queryClient } from '../../services/mirage/queryClient'
import { useRouter } from 'next/router'
import { FaEnvelope } from 'react-icons/fa'

type CreateUserFormData = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

const CreateUserFormSchema = yup.object().shape({
    name: yup.string().required('Nome Obrigatório'),
    email: yup.string().required('E-mail Obrigatório').email('E-mail inválido'),
    password: yup.string().required('Senha obrigatória').min(6, 'No mínimo 6 caracteres'),
    password_confirmation: yup.string().oneOf([
        null, yup.ref('password')
    ], 'As senhas precisam ser iguais')
})

export default function UserCreate() {

    const router = useRouter()

    const createUser = useMutation(async (user: CreateUserFormData) => {
        const response = await api.post('users', {
            user: {
                ...user,
                created_at: new Date(),
            }
        })
        return response.data.user
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('users')
        }
    });

    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(CreateUserFormSchema)
    })
    
    const handleCreateUser: SubmitHandler<CreateUserFormData> = async (values) => {
        await createUser.mutateAsync(values)

        await router.push('/users')
    }
    return (
        <Box marginTop={20}>
            <Header />

            <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
                <Sidebar />

                <Box as="form" flex="1" marginLeft={170} borderRadius={8}
                    bg="gray.50" p="8" onSubmit={handleSubmit(handleCreateUser)}>
                    <Heading size="lg" fontWeight="normal">Criar Usuário</Heading>
                    <Divider my="6" borderColor="gray.100" />

                    <VStack spacing="8">
                        <SimpleGrid minChildWidth="248px" spacing="8" w="100%">
                            <Input iconBase={FaEnvelope} error={formState.errors.name} {...register('name')} name="name" type="text" label="Nome completo" />
                            <Input iconBase={FaEnvelope} error={formState.errors.email} {...register('email')} name="email" type="email" label="E-mail" />
                        </SimpleGrid>

                        <SimpleGrid minChildWidth="248px" spacing="8" w="100%">
                            <Input iconBase={FaEnvelope} error={formState.errors.password} {...register('password')} name="password" type="password" label="Senha" />
                            <Input iconBase={FaEnvelope} error={formState.errors.password_confirmation} {...register('password_confirmation')} name="password_confirmation" type="password" label="Confirmação da senha" />
                        </SimpleGrid>
                    </VStack>

                    <Flex mt="8" justify="flex-end">
                        <HStack spacing="4">
                            <Link href="/users" passHref>
                                <Button as="a" colorScheme="gray">Cancelar</Button>
                            </Link>
                            <Button colorScheme="teal" type="submit" isLoading={formState.isSubmitting}>Salvar</Button>
                        </HStack>
                    </Flex>
                </Box>
            </Flex>
        </Box>
    )
}