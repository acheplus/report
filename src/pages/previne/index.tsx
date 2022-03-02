import { Box, Flex, Text, HStack, Center } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { mdiHome } from '@mdi/js';
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

            <Flex>

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
                        <Flex direction={"column"} w='100%'>    

                            <Text p='1.1em' bgColor='white' m='.5em' mr='1em' borderRadius='.8em'
                            border='1px solid #DBDBDB' color='#919191' fontSize='1.1em'
                            fontFamily='Roboto, bold' fontWeight='bold'
                            >CADASTROS E INDICADORES DE SAÚDE</Text>
        
                            <HStack m='.5em' fontWeight='bold'>
                                <Center bgColor='green' color='white' p='1.1em' borderStartRadius='.6em'
                                m={0}>POPULAÇÃO IBGE</Center>
                                <Center bgColor='white' color='green' p='1.1em' borderEndRadius='.6em'
                                m={0}>{resumo.populacao_ibge.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}</Center>

                                <Center bgColor='green' color='white' p='1.1em' borderStartRadius='.6em'
                                m={0}>CADASTROS ESUS</Center>
                                <Center bgColor='white' color='green' p='1.1em' borderEndRadius='.6em'
                                m={0}>{resumo.cadastros_esus.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}</Center>
                            </HStack>

                            <Box m='.5em' mr='1em' borderRadius='.8em' padding='1.2em' bgColor='white'>
                                <TableInstance tableData={resumo.gestantes} icon={mdiHome} title='HOME'
                                columnsData={[
                                    {
                                        Header: 'Vinculado à UBS',
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
                            </Box>
                        </Flex>
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