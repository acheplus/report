import { Checkbox } from "@chakra-ui/checkbox";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { Table, Tbody, Th, Thead, Tr } from "@chakra-ui/table";
import { useState } from "react";
import ExportCSV from "../../../components/ExportCsv";
import { Header } from "../../../components/Header";
import { Sidebar } from "../../../components/Sidebar";
import { useGestantes } from "../../../services/hooks/previne/useGestantes";




export default function PreNatal() {
    const [ gestantes, setGestantes ] = useState<any>()
    const { data, isLoading, isFetching, error } = useGestantes()

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
                            <ExportCSV csvData={data.gestantes} header="UBS,CNS,CPF,NOME,DUM,CONSULTAS,TESTES,ODONTO" />
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
                                    {data.gestantes.map((ges, i) => {
                                        return (
                                            <Tr key={i}>
                                                <Th>{ges.ubs}</Th>
                                                <Th>{ges.cns}</Th>
                                                <Th>{ges.cpf}</Th>
                                                <Th>{ges.nome}</Th>
                                                <Th>{ges.dum}</Th>
                                                <Th>{ges.consultas}</Th>
                                                <Th><Checkbox isChecked={ges.testes}></Checkbox></Th>
                                                <Th><Checkbox isChecked={ges.odonto}></Checkbox></Th>
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
