import { Checkbox } from "@chakra-ui/checkbox";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { Table, Tbody, Th, Thead, Tr } from "@chakra-ui/table";
import { useState, useEffect } from "react";
import ExportCSV from "../../../components/ExportCsv";
import { Header } from "../../../components/Header";
import { Sidebar } from "../../../components/Sidebar";
import TableInstance from "../../../components/Table";
import { useVacinas } from "../../../services/hooks/previne/useVacinas";
import { withSSRAuth } from "../../../utils/withSSRAuth";


export default function Vacinas() {
    const [ criancas, setCriancas ] = useState<any>()
    const { data: apiResponse, isLoading, isFetching, error } = useVacinas()

    useEffect(() => {
        setCriancas(apiResponse?.criancas)
    }, [apiResponse])

    return (
        <Box marginLeft={170}
        marginTop={20}>
            <Header />

            <Flex w="100%" my="1" maxWidth={1480} mx="auto" px="0">

                <Sidebar />

                { isLoading || !criancas ? (
                        <Flex justify="center">
                            <Spinner />
                        </Flex>
                    ) : error ? (
                        <Flex justify="center">
                            <Text>Falha ao obter dados...</Text>
                        </Flex>
                    ) : (
                        <>
                        <ExportCSV csvData={criancas} header="UBS,INE,CNS,CPF,NOME,IDADE,VIP?,PENTA?" />
                            <TableInstance tableData={criancas} columnsData={[
                                {
                                    Header: 'UBS',
                                    accessor: 'ubs'
                                },
                                {
                                    Header: 'INE',
                                    accessor: 'ine',
                                    isNumeric: true
                                },
                                {
                                    Header: 'CNS',
                                    accessor: 'cns'
                                },
                                {
                                    Header: 'CPF',
                                    accessor: 'cpf'
                                },
                                {
                                    Header: 'Nome',
                                    accessor: 'nome'
                                },
                                {
                                    Header: 'Idade(Meses)?',
                                    accessor: 'idade',
                                    isNumeric: true,
                                },
                                {
                                    Header: 'VIP?',
                                    accessor: 'vip',
                                    Cell: ({value}) => <Checkbox isChecked={value}></Checkbox>
                                },
                                {
                                    Header: 'PENTA?',
                                    accessor: 'penta',
                                    Cell: ({value}) => <Checkbox isChecked={value}></Checkbox>
                                },
                            ]} />
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