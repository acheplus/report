import { Checkbox } from "@chakra-ui/checkbox";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { useEffect, useState } from "react";
import ExportCSV from "../../../components/ExportCsv";
import { Header } from "../../../components/Header";
import { Sidebar } from "../../../components/Sidebar";
import TableInstance from "../../../components/Table";
import { useGestantes } from "../../../services/hooks/previne/useGestantes";
import { withSSRAuth } from "../../../utils/withSSRAuth";


export default function PreNatal() {
    const [ gestantes, setGestantes ] = useState<any>()
    const { data: apiResponse, isLoading, isFetching, error } = useGestantes()

    useEffect(() => {
        setGestantes(apiResponse?.gestantes)
    }, [apiResponse])

    return (
        <Box marginLeft={170}
        marginTop={20}>
            <Header />

            <Flex w="100%" my="1" maxWidth={1480} mx="auto" px="0">

                <Sidebar />

                { isLoading || !gestantes ? (
                        <Flex justify="center">
                            <Spinner />
                        </Flex>
                    ) : error ? (
                        <Flex justify="center">
                            <Text>Falha ao obter dados dos usuários</Text>
                        </Flex>
                    ) : (
                        <>
                            <ExportCSV csvData={gestantes} header="UBS,INE,CNS,CPF,NOME,DUM,CONSULTAS,TESTES,ODONTO" />
                            <TableInstance tableData={gestantes} columnsData={[
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
                                    Header: 'DUM',
                                    accessor: 'dum',
                                },
                                {
                                    Header: 'Consultas',
                                    accessor: 'consultas',
                                    isNumeric: true,
                                },
                                {
                                    Header: 'Testes',
                                    accessor: 'testes',
                                    Cell: ({value}) => <Checkbox isChecked={value}></Checkbox>
                                },
                                {
                                    Header: 'Odonto?',
                                    accessor: 'odonto',
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