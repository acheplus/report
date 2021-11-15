import Link from 'next/link'
import { Box, Flex, Heading, Button, Text, Icon, Table, Thead, Tbody, Td, Tr, Th, Checkbox, Spinner } from '@chakra-ui/react'
import { RiAddLine, RiPencilLine } from 'react-icons/ri'
import { useState } from 'react'

import { Header } from '../../components/Header'
import { Pagination } from '../../components/Pagination'
import { Sidebar } from '../../components/Sidebar'
import { useUsers } from '../../services/hooks/useUsers'

export default function UserList() {
    const [ page, setPage ] = useState(1)
    const { data, isLoading, isFetching, error } = useUsers(page)

    return (
        <Box>
            <Header />

            <Flex w="100%" my="1" maxWidth={1480} mx="auto" px="0">
                <Sidebar />

                <Box flex="1" bg="gray.50" p="8" marginLeft={170}
                    marginTop={20}>
                    <Flex mb="8" justify="space-between" align="center">
                        <Heading size="lg" fontWeight="normal">Usuários
                            { !isLoading && isFetching && <Spinner size="sm" color="gray.500" ml="4" />}
                        </Heading>
                        
                        <Link href="/users/create" passHref>
                            <Button
                            as="a"
                            size="sm"
                            fontSize="sm"
                            colorScheme="green"
                            fontSize="20"
                            leftIcon={<Icon
                            as={RiAddLine}></Icon>}>
                            Criar
                            Novo
                            </Button>
                        </Link>
                    </Flex>

                    { isLoading ? (
                        <Flex justify="center">
                            <Spinner />
                        </Flex>
                    ) : error ? (
                        <Flex justify="center">
                            <Text>Falha ao obter dados dos usuários</Text>
                        </Flex>
                    ) : (
                        <>
                            <Table colorScheme="whiteAlpha">
                                <Thead>
                                    <Tr>
                                        <Th px="6" color="gray.300" width="8">
                                            <Checkbox colorScheme="pink" />
                                        </Th>
                                        <Th>Usuário</Th>
                                        <Th>Data de Cadastro</Th>
                                        <Th></Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {data.users.map(user => {
                                       return (
                                            <Tr key={user.id}>
                                                <Td>
                                                    <Checkbox colorScheme="pink" />
                                                </Td>
                                                <Td>
                                                    <Box>
                                                        <Text fontWeight="bold">{user.name}</Text>
                                                        <Text fontSize="sm" color="gray.300">{user.email}</Text>
                                                    </Box>
                                                </Td>
                                                <Td>{user.createdAt}</Td>
                                                <Td>
                                                    <Link href="/users/create">
                                                        <Button
                                                            as="a"
                                                            size="sm"
                                                            fontSize="sm"
                                                            colorScheme="purple"
                                                            fontSize="16"
                                                            leftIcon={<Icon
                                                            as={RiPencilLine}></Icon>}>
                                                            Editar
                                                        </Button>
                                                    </Link>
                                                </Td>
                                            </Tr>
                                        )
                                    })}
                                </Tbody>
                            </Table>

                            <Pagination
                                totalCountOfRegisters={data.totalCount}
                                currentPage={page}
                                onPageChange={setPage} />
                        </>
                    )}
                </Box>
            </Flex>
        </Box>
    )
}