import { Checkbox } from "@chakra-ui/checkbox";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { useState, useEffect } from "react";
import SelectColumnFilter from "../../../components/Filter/SelectColumFilter";
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
                            <TableInstance tableData={criancas} columnsData={[
                                {
                                    Header: 'UBS',
                                    accessor: 'ubs',
                                    Filter: SelectColumnFilter,
                                },
                                {
                                    Header: 'INE',
                                    accessor: 'ine',
                                    isNumeric: true,
                                    Filter: SelectColumnFilter,
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
                                    Cell: ({value}) => <Checkbox isChecked={value}></Checkbox>,
                                    Filter: SelectColumnFilter,
                                },
                                {
                                    Header: 'PENTA?',
                                    accessor: 'penta',
                                    Cell: ({value}) => <Checkbox isChecked={value}></Checkbox>,
                                    Filter: SelectColumnFilter,
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