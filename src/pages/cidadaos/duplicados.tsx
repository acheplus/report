import { Checkbox } from "@chakra-ui/checkbox";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { mdiAccountMultiple } from '@mdi/js';
import { Spinner } from "@chakra-ui/spinner";
import { useState, useEffect } from "react";
import Moment from "react-moment";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import TableInstance from "../../components/Table";
import { useDuplicados } from "../../services/hooks/cidadaos/useDuplicados";
import { withSSRAuth } from "../../utils/withSSRAuth";


export default function Duplicados() {
    const [ duplicados, setDuplicados ] = useState<any>()
    const { data: apiResponse, isLoading, isFetching, error } = useDuplicados()

    useEffect(() => {
        setDuplicados(apiResponse?.duplicados)
    }, [apiResponse])

    return (
        <Box marginLeft={170}
        marginTop={20}>
            <Header />

            <Flex w="100%" my="1" maxWidth={1480} mx="auto" px="0">

                <Sidebar />

                { isLoading || !duplicados ? (
                        <Flex justify="center">
                            <Spinner />
                        </Flex>
                    ) : error ? (
                        <Flex justify="center">
                            <Text>Falha ao obter dados...</Text>
                        </Flex>
                    ) : (
                        <Box mt='1em' borderRadius='1.2em' padding='0.8em' bgColor='white' w='100%'>
                            <TableInstance tableData={duplicados} icon={mdiAccountMultiple} title='DUPLICADOS'
                            columnsData={[
                                {
                                    Header: 'UBS',
                                    accessor: 'ubs'
                                },
                                {
                                    Header: 'INE',
                                    accessor: 'ine',
                                    isNumeric: true,
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
                                    Header: 'Nascimento',
                                    accessor: 'nasc',
                                    isNumeric: true,
                                    Cell: ({value}) => <Moment parse='D-MM-Y' date={value} format="D/M/Y" />
                                },
                                {
                                    Header: 'Mãe',
                                    accessor: 'mae',
                                },
                            ]} />
                        </Box>
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