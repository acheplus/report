import { Flex, SimpleGrid, Box, Text, theme } from "@chakra-ui/react";
import dynamic from 'next/dynamic';
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { withSSRAuth } from "../utils/withSSRAuth";

const Chart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
})

const options= {
    chart: {
        toolbar: {
            show: false,
        },
        zoom: {
            enabled: false,
        },
        foreColor: theme.colors.green[900],
    },
    grid: {
        show: false,
    },
    dataLabels: {
        enabled: false,
    },
    tooltip: {
        enabled: false,
    },
    xaxis: {
        type: 'datetime',
        axisBorder: {
            color: theme.colors.gray[600]
        },
        axisTicks: {
            color: theme.colors.gray[600]
        },
        categories: [
            '2021-03-18T00:00:00.000Z',
            '2021-03-19T00:00:00.000Z',
            '2021-03-20T00:00:00.000Z',
            '2021-03-21T00:00:00.000Z',
            '2021-03-22T00:00:00.000Z',
            '2021-03-23T00:00:00.000Z',
            '2021-03-24T00:00:00.000Z',
        ]
    },
    fill: {
        opacity: 0.3,
        type: 'gradient',
        gradient: {
            shade: 'dark',
            opacityFrom: 0.7,
            opacityTo: 0.3
        }
    }
}

const series = [
    { name: 'Series1', data: [31,120,10,28,61,18,109]}
]

export default function Dashboard() {

    return (
        <Flex direction="column" h="1000vh">
            <Header />

            <Flex w="100%" my="1" maxWidth={1480} mx="auto" px="0">

                <Sidebar />

                <SimpleGrid marginLeft={165} flex="1" gap="4"
                    minChildWidth="320px" align="flex-start"
                    marginTop={20}>
                    <Box
                        p="8"
                        bg="gray.50"
                        borderRadius={8} pb="4">
                        <Text fontSize="lg" mb="4">Inscritos da Semana</Text>
                        <Chart options={options} series={series} type="area" height={160}></Chart>
                    </Box>
                    <Box
                        p="8"
                        bg="gray.50"
                        borderRadius={8}
                        pb="4">
                        <Text fontSize="lg" mb="4">Taxa de Abertura</Text>
                        <Chart options={options} series={series} type="area" height={160}></Chart>
                    </Box>
                </SimpleGrid>
            </Flex>
        </Flex>
    )
}

export const getServerSideProps = withSSRAuth(async(ctx) => {
    return {
        props: {}
    }
})