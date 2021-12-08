import { Checkbox } from "@chakra-ui/checkbox";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { useState, useEffect } from "react";
import ExportCSV from "../../../components/ExportCsv";
import { Header } from "../../../components/Header";
import { Sidebar } from "../../../components/Sidebar";
import TableInstance from "../../../components/Table";
import { useHipertensos } from "../../../services/hooks/previne/useHipertensos";
import { withSSRAuth } from "../../../utils/withSSRAuth";


export default function Hipertensos() {
    const [ hipertensos, setHipertensos ] = useState<any>()
    const { data: apiResponse, isLoading, isFetching, error } = useHipertensos()

    useEffect(() => {
        setHipertensos(apiResponse?.hipertensos)
    }, [apiResponse])

    return (
        <Box marginLeft={170}
        marginTop={20}>
            <Header />

            <Flex w="100%" my="1" maxWidth={1480} mx="auto" px="0">

                <Sidebar />

                { isLoading || !hipertensos ? (
                        <Flex justify="center">
                            <Spinner />
                        </Flex>
                    ) : error ? (
                        <Flex justify="center">
                            <Text>Falha ao obter dados...</Text>
                        </Flex>
                    ) : (
                        <>
                            <ExportCSV csvData={hipertensos} header="UBS,INE,CNS,CPF,NOME,OK?" />
                            <TableInstance tableData={hipertensos} columnsData={[
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
                                        Header: 'OK?',
                                        accessor: 'ok',
                                        Cell: ({value}) => <Checkbox isChecked={value}></Checkbox>
                                    }
                            ]}/>
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