import { Checkbox } from "@chakra-ui/checkbox";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { Table, Tbody, Th, Thead, Tr } from "@chakra-ui/table";
import { useState, useEffect } from "react";
import { Header } from "../../../components/Header";
import { Sidebar } from "../../../components/Sidebar";
import { useVacinas } from "../../../services/hooks/previne/useVacinas";


export default function Vacinas() {
    const [ criancas, setCriancas ] = useState<any>()
    const { data, isLoading, isFetching, error } = useVacinas()

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
                            <Text>Falha ao obter dados...</Text>
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
                                        <Th>Idade</Th>
                                        <Th>VIP?</Th>
                                        <Th>Penta</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {data.criancas.map((crianca, i) => {
                                        return (
                                            <Tr key={i}>
                                                <Th>{crianca.ubs}</Th>
                                                <Th>{crianca.cns}</Th>
                                                <Th>{crianca.cpf}</Th>
                                                <Th>{crianca.nome}</Th>
                                                <Th>{crianca.idade}</Th>
                                                <Th><Checkbox isChecked={crianca.vip}></Checkbox></Th>
                                                <Th><Checkbox isChecked={crianca.penta}></Checkbox></Th>
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