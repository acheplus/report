import { Checkbox } from "@chakra-ui/checkbox";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { Table, Tbody, Th, Thead, Tr } from "@chakra-ui/table";
import { useState, useEffect } from "react";
import { Header } from "../../../components/Header";
import { Sidebar } from "../../../components/Sidebar";
import { api } from "../../../services/apiClient";
import { useGestantes } from "../../../services/hooks/previne/useGestantes";
import { queryClient } from "../../../services/mirage/queryClient";


export default function PreNatal() {
    const [ gestantes, setGestantes ] = useState<any>()
    const { data, isLoading, isFetching, error } = useGestantes()

    // useEffect(() => {
    //     setGestantes(
    //         [
    //             {
    //                 ubs: 'Vila Dágua',
    //                 cns: '705123456789125',
    //                 cpf: '000.111.222-33',
    //                 nome: 'Maria',
    //                 dum: '05/04/2021',
    //                 consultas: '01/01/2021',
    //                 testes: false,
    //                 odonto: true
    //             }
    //         ]
    //     )
    // }, [])

    async function handlePrefetchGestante(gestanteId: string) {
        await queryClient.prefetchQuery(['gestante', gestanteId], async () => {
            const response = await api.get(`indicadores/${gestanteId}`)

            return response.data
        }, {
            staleTime: 1000 * 60 * 10
        })
    }

    return (
        <Box marginLeft={170}
        marginTop={20}>
            <Header />

            <Flex w="100%" my="1" maxWidth={1480} mx="auto" px="0">

                <Sidebar />

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
                            <Table>
                                <Thead>
                                    <Tr>
                                        <Th>UBS</Th>
                                        <Th>CNS</Th>
                                        <Th>CPF</Th>
                                        <Th>Nome</Th>
                                        <Th>DUM</Th>
                                        <Th>Consultas</Th>
                                        <Th>Testes?</Th>
                                        <Th>Odonto</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {data.gestantes.map(ges => {
                                        return (
                                            <Tr>
                                                <Th>{ges.ubs}</Th>
                                                <Th>{ges.cns}</Th>
                                                <Th>{ges.cpf}</Th>
                                                <Th>{ges.nome}</Th>
                                                <Th>{ges.dum}</Th>
                                                <Th>{ges.consultas}</Th>
                                                <Th><Checkbox isChecked={ges.testes}></Checkbox></Th>
                                                <Th>{ges.odonto}</Th>
                                            </Tr>
                                        )
                                    })}
                                </Tbody>
                            </Table>
                        </>
                    )
                }
            </Flex>
        </Box>
    )
}