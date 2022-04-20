import { Table, Tbody, Th, Thead, Tr, Td, chakra, Icon, Text, Spacer, Box } from "@chakra-ui/react";
import { Flex } from "@chakra-ui/layout";
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'
import { Pagination } from "../Pagination";
import { useState } from "react";
import ExportXls from "../ExportXls";

const TableLayout = ({
    icon,
    title,
    registersPerPage=20,
    getTableProps,
    getTableBodyProps,
    headerGroups,
    headers,
    rows,
    prepareRow,
  }) => {
      const [page, setPage] = useState(1)

    // We don't want to render all of the rows for this example, so cap
    // it for this use case
    const firstPageRows = rows.slice((registersPerPage*page-registersPerPage), registersPerPage*page)

    return (
            <Box>
                <Flex color='#737375' m='0.5em' justifyContent='space-between' alignContent='center'>
                    <Box>
            <Icon fontSize='2em' border='1px solid' borderRadius='50%' m='0.2em'>
                <path fill="currentColor" d={icon}></path>
            </Icon>
            <Text display='inline'>{title}</Text></Box>
            <ExportXls csvData={rows} fileName={'download'} />

            </Flex>
            
            <Table {...getTableProps()} variant='striped' colorScheme='green' size='sm'>
                <Thead>
                {headerGroups.map((headerGroup, index) => (
                    <Tr key={index} {...headerGroup.getHeaderGroupProps()} 
                    color='blue'
                    textColor='blue'
                    bgColor={"#1B9B4E"}>
                    {headerGroup.headers.map((column, i) => (
                        <Th key={i} {...column.getHeaderProps(column.getSortByToggleProps())}
                            isNumeric={column.isNumeric} 
                            textColor='white'>
                            {column.render('Header')}
                            <chakra.span pl='4'>
                                {column.isSorted ? (
                                    column.isSortedDesc ? (
                                    <TriangleDownIcon aria-label='sorted descending' />
                                    ) : (
                                    <TriangleUpIcon aria-label='sorted ascending' />
                                    )
                                ) : null}
                            </chakra.span>
                            <div>{column.canFilter ? column.render('Filter') : null}</div>
                        </Th>
                    ))}
                    </Tr>
                ))}
                </Thead>
                <Tbody {...getTableBodyProps()}>
                {firstPageRows.map((row, i) => {
                    prepareRow(row)
                    return (
                    <Tr key={i} {...row.getRowProps()} h='4em'>
                        {row.cells.map((cell, index) => (
                        <Td key={index} {...cell.getCellProps()} isNumeric={cell.column.isNumeric}>
                            {cell.render('Cell')}
                            </Td>
                        ))}
                    </Tr>
                    )
                })}
                </Tbody>
            </Table>
            <Pagination
                registersPerPage={registersPerPage}
                totalCountOfRegisters={rows.length}
                currentPage={page}
                onPageChange={setPage} />
        </Box>
    );
  }

  export default TableLayout