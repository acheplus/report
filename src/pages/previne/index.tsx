import { Box, Flex, Text } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { useState, useEffect } from "react";
import SelectColumnFilter from "../../components/Filter/SelectColumFilter";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import TableInstance from "../../components/Table";
import { useResumo } from "../../services/hooks/previne/useResumo";
import { withSSRAuth } from "../../utils/withSSRAuth";


export default function Resumo() {
    const [ resumo, setResumo ] = useState<any>()
    const { data: apiResponse, isLoading, isFetching, error } = useResumo()

    useEffect(() => {
        setResumo(apiResponse?.resumo)
    }, [apiResponse])

    return (
        <Box marginLeft={170}
        marginTop={20}>
            <Header />

            <Flex w="100%" my="1" maxWidth={1480} mx="auto" px="0">

                <Sidebar />

                { isLoading || !resumo ? (
                        <Flex justify="center">
                            <Spinner />
                        </Flex>
                    ) : error ? (
                        <Flex justify="center">
                            <Text>Falha ao obter dados...</Text>
                        </Flex>
                    ) : (
                        <>
                            <TableInstance tableData={resumo.gestantes} columnsData={[
                                {
                                    Header: 'Vinculadoa à UBS',
                                    accessor: 'ubs',
                                    Filter: SelectColumnFilter,
                                },
                                {
                                    Header: 'Gestantes',
                                    accessor: 'total',
                                    isNumeric: true,
                                },
                                {
                                    Header: 'Com 6 Consultas',
                                    accessor: 'consultas',
                                    isNumeric: true,
                                },
                                {
                                    Header: 'Realizado Exames',
                                    accessor: 'exames',
                                    isNumeric: true,
                                },
                                {
                                    Header: 'Com consulta odonto',
                                    accessor: 'odonto',
                                    isNumeric: true,
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