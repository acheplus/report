import { Box, Flex, Text, HStack, Center } from "@chakra-ui/layout";
import { mdiHumanFemale, mdiHumanPregnant, mdiTeddyBear } from '@mdi/js';
import { useState, useEffect } from "react";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { useResumo } from "../../services/hooks/previne/useResumo";
import { withSSRAuth } from "../../utils/withSSRAuth";

import { Icon, Progress, Stack, Tooltip } from "@chakra-ui/react";
import { SpinnerLogo } from "../../components/Animation/SpinnerLogo";
import Chart from "react-google-charts";


export default function Resumo() {
    const [ resumo, setResumo ] = useState<any>()
    const { data: apiResponse, isLoading, isFetching, error } = useResumo()

    const colors = {0:'pink', 1:'purple', 2:'teal', 3:'orange'}

    function calcPercent(arr){
        return arr[1]/arr[0] * 100
    }

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
                        <Flex justify="center" align='center' h='100vh' w='100vw'>
                           <SpinnerLogo />
                        </Flex>
                    ) : error ? (
                        <Flex justify="center">
                            <Text>Falha ao obter dados...</Text>
                        </Flex>
                    ) : (
                        <Flex direction={"column"} w='100%'>    

                            <Text p='1.1em' bgColor='white' m='.5em' mr='1em' borderRadius='.8em'
                            border='1px solid #DBDBDB' color='#919191' fontSize='100%'
                            fontFamily='Roboto, bold' fontWeight='bold'
                            >CADASTROS E INDICADORES DE SAÚDE</Text>
        
                            <HStack m='.5em' fontWeight='bold' w={'100%'}>
                                <Center bgColor='#1b9b4e' color='white' p='1%' borderStartRadius='.6em' w='12.5%' fontSize='1vw'
                                m={0}>POPULAÇÃO IBGE</Center>
                                <Center bgColor='white' color='green' p='1%' borderEndRadius='.6em' w='12.5%'
                                m={0}>{resumo.populacao_ibge.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}</Center>

                                <Center bgColor='#1b9b4e' color='white' p='1%' borderStartRadius='.6em' w='12.5%' fontSize='1vw'
                                m={0}>CADASTROS ESUS</Center>
                                <Center bgColor='white' color='green' p='1%' borderEndRadius='.6em' w='12.5%'
                                m={0}>{resumo.cadastros_esus.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}</Center>
                            </HStack>

                            <HStack>
                                <Box m='.5em' p='1em' borderRadius='.8em' w='48.2%' bg='white'>
                                    <Center>Município</Center>
                                    <Chart chartType="ColumnChart" width='100%' height='400px'
                                           data={ [ ['Indicador', 'Total' ],
                                               ['I1', calcPercent(resumo.gestantes.reduce((([acc, acc1], ubs) => { return [ acc+= ubs.total, acc1+=ubs.consultas ]}), [0,0]))],
                                               ['I2', calcPercent(resumo.gestantes.reduce((([acc, acc1], ubs) => { return [ acc+= ubs.total, acc1+=ubs.exames ]}), [0,0]))],
                                               ['I3', calcPercent(resumo.gestantes.reduce((([acc, acc1], ubs) => { return [ acc+= ubs.total, acc1+=ubs.odonto ]}), [0,0]))],
                                               ['I4', calcPercent(resumo.mulheres.reduce((([acc, acc1], ubs) => { return [ acc+= ubs.total, acc1+=ubs.ok ]}), [0,0]))],
                                               ['I5',calcPercent(resumo.criancas.reduce((([acc, acc1], ubs) => { return [ acc+= ubs.total, acc1+=ubs.ok ]}), [0,0]))],
                                               ['I6', calcPercent(resumo.hipertensos.reduce((([acc, acc1], ubs) => { return [ acc+= ubs.total, acc1+=ubs.ok ]}), [0,0]))],
                                               ['I7', calcPercent(resumo.diabeticos.reduce((([acc, acc1], ubs) => { return [ acc+= ubs.total, acc1+=ubs.ok ]}), [0,0]))] ] }
                                    />
                                </Box>
                            </HStack>

                            <HStack>
                                <Box m='.5em' p='1em' borderRadius='.8em' w='48.2%' bg='white'>
                                    <Center>HIPERTENSOS</Center>
                                    <Chart chartType="ColumnChart" width='100%' height='400px'
                                    data={ [ ['UBS', '% Atingido', {role: "style"}], ...resumo.hipertensos_total.sort((a,b) => ((a[1]-b[1]))*-1).map((d, i)=>([d[0], d[1], colors[i]])) ] }
                                     />
                                </Box>

                                <Box m='.5em' p='1em' borderRadius='.8em' w='48.2%' bg='white'>
                                    <Center>Diabéticos</Center>
                                    <Chart chartType="ColumnChart" width='100%' height='400px'
                                    data={ [ ['UBS', '% Atingido', {role: "style"}], ...resumo.diabeticos_total.sort((a,b) => (a[1]-b[1])*-1).map((d, i)=>([d[0], d[1], colors[i]])) ] }
                                     />
                                </Box>
                            </HStack>

                            <HStack>
                                <Box m='.5em' p='1em' borderRadius='.8em' bgColor='#1b9b4e' w='19%' h='100%' color='white'>
                                    <Center>PRÉ-NATAL - Consultas</Center>
                                    <HStack fontWeight='bold' m='0.4em'>
                                            <Icon fontSize='4em' m='-0.3em'><path fill='currentColor' d={mdiHumanPregnant} height='18em'></path> </Icon>
                                            <Stack spacing={1.5} w='100%'>
                                                {resumo.gestantes.sort((a,b) => ((a.consultas/a.total)-(b.consultas/b.total))*-1).map((gestante, i)=>{
                                                    return (
                                                        <Tooltip label={gestante.ubs} key={i} hasArrow arrowSize={10}>
                                                            <HStack><Progress value={Number((gestante.consultas/gestante.total*100).toFixed(0))} colorScheme={colors[i]} size='xg' w='60%' h='1em'/><Text fontSize='70%'>{(gestante.consultas/gestante.total*100).toFixed(0)}% Atingido</Text></HStack>
                                                        </Tooltip>
                                                    )
                                                })}                                            
                                            </Stack>
                                    </HStack>
                                </Box>

                                <Box m='.5em' p='1em' borderRadius='.8em' bgColor='#1b9b4e' w='19%' h='100%' color='white'>
                                    <Center>PRÉ-NATAL - Exames</Center>
                                    <HStack fontWeight='bold' m='0.4em'>
                                            <Icon fontSize='4em' m='-0.3em'><path fill='currentColor' d={mdiHumanPregnant} height='18em'></path> </Icon>
                                            <Stack spacing={1.5} w='100%'>
                                                {resumo.gestantes.sort((a,b) => ((a.exames/a.total)-(b.exames/b.total))*-1).map((gestante, i)=>{
                                                    return (
                                                        <Tooltip label={gestante.ubs} key={i} hasArrow arrowSize={10}>
                                                            <HStack><Progress value={Number((gestante.exames/gestante.total*100).toFixed(0))} colorScheme={colors[i]} size='xg' w='60%' h='1em'/><Text fontSize='70%'>{(gestante.exames/gestante.total*100).toFixed(0)}% Atingido</Text></HStack>
                                                        </Tooltip>
                                                    )
                                                })}                                            
                                            </Stack>
                                    </HStack>
                                </Box>

                                <Box m='.5em' p='1em' borderRadius='.8em' bgColor='#1b9b4e' w='19%' h='100%' color='white'>
                                    <Center>PRÉ-NATAL - Odonto</Center>
                                    <HStack fontWeight='bold' m='0.4em'>
                                            <Icon fontSize='4em' m='-0.3em'><path fill='currentColor' d={mdiHumanPregnant} height='18em'></path> </Icon>
                                            <Stack spacing={1.5} w='100%'>
                                                {resumo.gestantes.sort((a,b) => ((a.odonto/a.total)-(b.odonto/b.total))*-1).map((gestante, i)=>{
                                                    return (
                                                        <Tooltip label={gestante.ubs} key={i} hasArrow arrowSize={10}>
                                                            <HStack><Progress value={Number((gestante.odonto/gestante.total*100).toFixed(0))} colorScheme={colors[i]} size='xg' w='60%' h='1em'/><Text fontSize='70%'>{(gestante.odonto/gestante.total*100).toFixed(0)}% Atingido</Text></HStack>
                                                        </Tooltip>
                                                    )
                                                })}                                            
                                            </Stack>
                                    </HStack>
                                </Box>

                                <Box m='.5em' p='1em' borderRadius='.8em' bgColor='#1b9b4e' w='19%' h='100%' color='white'>
                                    <Center>SAÚDE DA MULHER</Center>
                                    <HStack fontWeight='bold' m='0.4em'>
                                            <Icon fontSize='4em' m='-0.2em'><path fill='currentColor' d={mdiHumanFemale} height='18em'></path> </Icon>
                                            <Stack spacing={1.5} w='100%'>
                                                {resumo.mulheres.sort((a,b) => ((a.ok/a.total)-(b.ok/b.total))*-1).map((mulher, i)=>{
                                                    return (
                                                        <Tooltip label={mulher.ubs} key={i} hasArrow arrowSize={10}>
                                                            <HStack><Progress value={Number((mulher.ok/mulher.total*100).toFixed(0))} colorScheme={colors[i]} size='xg' w='60%' h='1em'/><Text fontSize='70%'>{(mulher.ok/mulher.total*100).toFixed(0)}% Atingido</Text></HStack>
                                                        </Tooltip>
                                                    )
                                                })}                                            
                                            </Stack>
                                    </HStack>
                                </Box>

                                <Box m='.5em' p='1em' borderRadius='.8em' bgColor='#1b9b4e' w='19%' h='100%' color='white'>
                                    <Center>SAÚDE DA CRIANÇA</Center>
                                    <HStack fontWeight='bold' m='0.4em'>
                                            <Icon fontSize='4em' m='-0.1em'><path fill='currentColor' d={mdiTeddyBear} height='18em'></path> </Icon>
                                            <Stack spacing={1.5} w='100%'>
                                                {resumo.criancas.sort((a,b) => ((a.ok/a.total)-(b.ok/b.total))*-1).map((crianca, i)=>{
                                                    return (
                                                        <Tooltip label={crianca.ubs} key={i} hasArrow arrowSize={10}>
                                                            <HStack><Progress value={Number((crianca.ok/crianca.total*100).toFixed(0))} colorScheme={colors[i]} size='xg' w='55%' h='1em'/><Text fontSize='70%'>{(crianca.ok/crianca.total*100).toFixed(0)}% Atingido</Text></HStack>
                                                        </Tooltip>
                                                    )
                                                })}                                            
                                            </Stack>
                                    </HStack>
                                </Box>
                            </HStack>
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