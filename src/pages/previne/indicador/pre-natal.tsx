import { Checkbox } from "@chakra-ui/checkbox";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { useEffect, useState } from "react";
import moment from 'moment-timezone';
import Moment from "react-moment";
import SelectColumnFilter from "../../../components/Filter/SelectColumFilter";
import { Header } from "../../../components/Header";
import { Sidebar } from "../../../components/Sidebar";
import TableInstance from "../../../components/Table";
import { useGestantes } from "../../../services/hooks/previne/useGestantes";
import { withSSRAuth } from "../../../utils/withSSRAuth";

Moment.globalMoment = moment
Moment.globalLocale = 'pt-br';
Moment.globalLocal = true;
Moment.globalTimezone = 'America/Maceio';

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
                            <TableInstance tableData={gestantes} columnsData={[
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
                                    Header: 'DUM',
                                    accessor: 'dum',
                                    Cell: ({value}) => <Moment parse='D-MM-Y' date={value} format="D/M/Y" />
                                },
                                {
                                    id: 'dpp',
                                    Header: 'DPP',
                                    accessor: 'dum',
                                    Cell: ({value}) => <Moment parse='D-MM-Y' date={value} format="D/M/Y"
                                        add={{days:7, months: -3, years: 1}} />,
                                },
                                {
                                    Header: 'Captação',
                                    accessor: 'captacao',
                                    Cell: ({value}) => <Checkbox isChecked={value}></Checkbox>,
                                    Filter: SelectColumnFilter,
                                },
                                {
                                    Header: 'Consultas',
                                    accessor: 'consultas',
                                    isNumeric: true,
                                },
                                {
                                    Header: 'Testes',
                                    accessor: 'testes',
                                    Cell: ({value}) => <Checkbox isChecked={value}></Checkbox>,
                                    Filter: SelectColumnFilter,
                                },
                                {
                                    Header: 'Odonto?',
                                    accessor: 'odonto',
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