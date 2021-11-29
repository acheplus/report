import { Checkbox } from "@chakra-ui/checkbox";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { Table, Tbody, Th, Thead, Tr } from "@chakra-ui/table";
import { useState, useEffect } from "react";
import ExportCSV from "../../../components/ExportCsv";
import { Header } from "../../../components/Header";
import { Sidebar } from "../../../components/Sidebar";
import { useDiabeticos } from "../../../services/hooks/previne/useDiabeticos";
import { withSSRAuth } from "../../../utils/withSSRAuth";


export default function Diabeticos() {
    const [ diabeticos, setDiabeticos ] = useState<any>()
    const { data, isLoading, isFetching, error } = useDiabeticos()

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
                            <ExportCSV csvData={data.diabeticos} header="UBS,CNS,CPF,NOME,OK?" />
                            <Table>
                                <Thead>
                                    <Tr>
                                        <Th>UBS</Th>
                                        <Th>CNS</Th>
                                        <Th>CPF</Th>
                                        <Th>Nome</Th>
                                        <Th>OK?</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {data.diabeticos.map((diabetico, i) => {
                                        return (
                                            <Tr key={i}>
                                                <Th>{diabetico.ubs}</Th>
                                                <Th>{diabetico.cns}</Th>
                                                <Th>{diabetico.cpf}</Th>
                                                <Th>{diabetico.nome}</Th>
                                                <Th><Checkbox isChecked={diabetico.ok}></Checkbox></Th>
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

export const getServerSideProps = withSSRAuth(async(ctx) => {
    return {
        props: {}
    }
})