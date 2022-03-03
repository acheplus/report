import { Checkbox } from "@chakra-ui/checkbox";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { mdiLotionPlus } from '@mdi/js';
import { Spinner } from "@chakra-ui/spinner";
import { useState, useEffect } from "react";
import SelectColumnFilter from "../../../components/Filter/SelectColumFilter";
import { Header } from "../../../components/Header";
import { Sidebar } from "../../../components/Sidebar";
import TableInstance from "../../../components/Table";
import { useDiabeticos } from "../../../services/hooks/previne/useDiabeticos";
import { withSSRAuth } from "../../../utils/withSSRAuth";


export default function Diabeticos() {
    const [ diabeticos, setDiabeticos ] = useState<any>()
    const { data: apiResponse, isLoading, isFetching, error } = useDiabeticos()

    useEffect(() => {
        setDiabeticos(apiResponse?.diabeticos)
    }, [apiResponse])

    return (
        <Box marginLeft={170}
        marginTop={20}>
            <Header />

            <Flex w="100%" my="1" maxWidth={1480} mx="auto" px="0">

                <Sidebar />

                { isLoading || !diabeticos ? (
                        <Flex justify="center">
                            <Spinner />
                        </Flex>
                    ) : error ? (
                        <Flex justify="center">
                            <Text>Falha ao obter dados...</Text>
                        </Flex>
                    ) : (
                        <Box mt='1em' borderRadius='1.2em' padding='0.8em' bgColor='white' w='100%'>
                            <TableInstance tableData={diabeticos} icon={mdiLotionPlus} title='DIABÉTICOS'
                            columnsData={[
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
                                        Header: 'OK?',
                                        accessor: 'ok',
                                        Cell: ({value}) => <Checkbox isChecked={value}></Checkbox>,
                                        Filter: SelectColumnFilter,
                                    },
                                    {
                                        Header: 'Obs.:',
                                        accessor: 'obs'
                                    }
                            ]}/>
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