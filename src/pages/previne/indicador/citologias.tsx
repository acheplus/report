import { Checkbox } from "@chakra-ui/checkbox";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { useState, useEffect } from "react";
import SelectColumnFilter from "../../../components/Filter/SelectColumFilter";
import { Header } from "../../../components/Header";
import { Sidebar } from "../../../components/Sidebar";
import TableInstance from "../../../components/Table";
import { useCitologias } from "../../../services/hooks/previne/useCitologias";
import { withSSRAuth } from "../../../utils/withSSRAuth";


export default function Citologias() {
    const [ mulheres, setMulheres ] = useState<any>()
    const { data: apiResponse, isLoading, isFetching, error } = useCitologias()

    useEffect(() => {
        setMulheres(apiResponse?.mulheres)
    }, [apiResponse])

    return (
        <Box marginLeft={170}
        marginTop={20}>
            <Header />

            <Flex w="100%" my="1" maxWidth={1480} mx="auto" px="0">

                <Sidebar />

                { isLoading || !mulheres ? (
                        <Flex justify="center">
                            <Spinner />
                        </Flex>
                    ) : error ? (
                        <Flex justify="center">
                            <Text>Falha ao obter dados...</Text>
                        </Flex>
                    ) : (
                        <>
                            <TableInstance tableData={mulheres} columnsData={[
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
                                    Header: 'Idade?',
                                    accessor: 'idade',
                                    isNumeric: true,
                                    Filter: SelectColumnFilter,
                                },
                                {
                                    Header: 'OK?',
                                    accessor: 'ok',
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