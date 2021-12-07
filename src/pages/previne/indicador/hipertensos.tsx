import { Checkbox } from "@chakra-ui/checkbox";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { useState, useMemo, useEffect } from "react";
import {useTable, useSortBy, useFilters} from 'react-table';
import { matchSorter } from 'match-sorter'

import ExportCSV from "../../../components/ExportCsv";
import { Header } from "../../../components/Header";
import { Sidebar } from "../../../components/Sidebar";
import { useHipertensos } from "../../../services/hooks/previne/useHipertensos";
import { withSSRAuth } from "../../../utils/withSSRAuth";
import TableLayout from "../../../components/Table/TableLayout";

const TableInstance = ({ tableData }) => {
    const [columns, data] = useMemo(
      () => {
        const columns = [
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
            },
        ];
        return [columns, tableData];
      },
      [tableData]
    );

    // Define a default UI for filtering
    function DefaultColumnFilter({
        column: { filterValue, preFilteredRows, setFilter },
    }) {
        const count = preFilteredRows.length
    
        return (
        <input
            value={filterValue || ''}
            onChange={e => {
            setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
            }}
            placeholder={`Procurar em ${count} registros...`}
        />
        )
    }

    function fuzzyTextFilterFn(rows, id, filterValue) {
        return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
    }

    const filterTypes = useMemo(
        () => ({
        // Add a new fuzzyTextFilterFn filter type.
        fuzzyText: fuzzyTextFilterFn,
        // Or, override the default text filter to use
        // "startWith"
        text: (rows, id, filterValue) => {
            return rows.filter(row => {
            const rowValue = row.values[id]
            return rowValue !== undefined
                ? String(rowValue)
                    .toLowerCase()
                    .startsWith(String(filterValue).toLowerCase())
                : true
            })
        },
        }),
        []
    )

    const defaultColumn = useMemo(
        () => ({
            Filter: DefaultColumnFilter
        }),
        []
    )

    const tableInstance = useTable({ columns, data, defaultColumn, filterTypes }, useFilters, useSortBy);

    return (
        <TableLayout {...tableInstance} />
    );
}

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
                            <TableInstance tableData={hipertensos} />
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