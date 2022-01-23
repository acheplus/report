import Link from 'next/link'
import { Box, Button, Flex, Heading, Divider, VStack, HStack, SimpleGrid } from '@chakra-ui/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import { useMutation } from 'react-query'

import { Input } from '../../components/Form/Input'
import { Select } from '../../components/Form/Select'
import { Header } from '../../components/Header'
import { Sidebar } from '../../components/Sidebar'
import { api } from '../../services/apiClient'
import { useRouter } from 'next/router'
import { FaEnvelope, FaUsers, FaUser, FaLock, FaBirthdayCake, FaDochub, FaPhone, FaFileUpload } from 'react-icons/fa'
import {useContext} from "react";
import {AuthContext} from "../../contexts/AuthContext";
import {withSSRAuth} from "../../utils/withSSRAuth";

type UpdateUserFormData = {
    password: string;
    password_confirmation: string;
}

const UpdateUserFormSchema = yup.object().shape({
    password: yup.string().required('Senha obrigatória').min(6, 'No mínimo 6 caracteres'),
    password_confirmation: yup.string().oneOf([
        null, yup.ref('password')
    ], 'As senhas precisam ser iguais')
})

export default function UserProfile() {
    const { user } = useContext(AuthContext)
    const router = useRouter()

    const updateUser = useMutation(async (userParams: UpdateUserFormData) => {
        const respose = await api.post('me', {
            ...userParams,
            updated_at: new Date(),
        })
        return respose.data.sucess
    }, {
        onSuccess: () => {
            alert('Senha alterada com sucesso')
        },
        onError: () => {
            alert('Erro ao tentar alterar a senha.')
        }
    });

    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(UpdateUserFormSchema)
    })
    
    const handleUpdateUser: SubmitHandler<UpdateUserFormData> = async (values) => {
        try{
            const response = await updateUser.mutateAsync(values)
            if(response){
                await router.push('/')
            }
        } catch (e){
            // console.log(e)
        }
    }
    return (
        <Box marginTop={20}>
            <Header />

            <Flex w="100%" my="1" maxWidth={1480} mx="auto" px="6">
                <Sidebar />

                <Box as="form" flex="1" marginLeft={170} borderRadius={8}
                    bg="gray.50" p="8" onSubmit={handleSubmit(handleUpdateUser)}>
                    <Heading size="lg" fontWeight="normal">Usuário: {user?.username}</Heading>
                    <Divider my="6" borderColor="gray.100" />

                    <VStack spacing="8">
                        <SimpleGrid minChildWidth="248px" spacing="8" w="100%">
                            <Input iconBase={FaUser}  name="user" type="user" label="Nome Completo" />
                            <Input iconBase={FaUsers}  name="apelido_user" type="apelido_user" label="Apelido" />
                            <Input iconBase={FaBirthdayCake}  name="birthday" type="birthday" label="Data de Nascimento" />

                        </SimpleGrid>
                    </VStack>
                    <VStack spacing="8">
                        <SimpleGrid minChildWidth="248px" spacing="8" w="100%">
                        <Select iconBase={FaPhone}  name="TypeDocumento" type="TypeDocumento" label="Telefone" />
                            <Select iconBase={FaDochub}  name="TypeDocumento" type="TypeDocumento" label="Tipo de Documento" />
                            <Input iconBase={FaDochub}  name="TypeDocumento" type="TypeDocumento" label="Numero do Documento" />
                        </SimpleGrid>
                    </VStack>
                    <VStack spacing="8">
                        <SimpleGrid minChildWidth="248px" spacing="8" w="100%">
                        <Input iconBase={FaEnvelope}  name="name_user" type="name_user" label="Email Completo" />
                        <Input iconBase={FaFileUpload}  name="TypeDocumento" type="TypeDocumento" label="Foto (Avatar)" />
                        </SimpleGrid>
                    </VStack>
                    <VStack spacing="8">
                        <SimpleGrid minChildWidth="248px" spacing="8" w="100%">
                            <Input iconBase={FaLock} error={formState.errors.password} {...register('password')} name="password" type="password" label="Senha" />
                            <Input iconBase={FaLock} error={formState.errors.password_confirmation} {...register('password_confirmation')} name="password_confirmation" type="password" label="Confirmação da senha" />
                        </SimpleGrid>
                    </VStack>

                    <Flex mt="8" justify="flex-end">
                        <HStack spacing="4">
                            <Link href="/" passHref>
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

export const getServerSideProps = withSSRAuth(async(ctx) => {
    return {
        props: {}
    }
})