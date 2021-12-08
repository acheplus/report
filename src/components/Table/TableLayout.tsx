import { Table, Tbody, Th, Thead, Tr, Td, chakra } from "@chakra-ui/react";
import { Flex } from "@chakra-ui/layout";
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'
import { Pagination } from "../Pagination";
import { useState } from "react";

const TableLayout = ({
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  }) => {
      const [page, setPage] = useState(1)

    // We don't want to render all of the rows for this example, so cap
    // it for this use case
    const firstPageRows = rows.slice((10*page-10), 10*page)

    return (
        <Flex display='inline'>
            <Table {...getTableProps()}>
                <Thead>
                {headerGroups.map((headerGroup, index) => (
                    <Tr key={index} {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column, i) => (
                        <Th key={i} {...column.getHeaderProps(column.getSortByToggleProps())}
                            isNumeric={column.isNumeric}>
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
                    <Tr key={i} {...row.getRowProps()}>
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
                totalCountOfRegisters={rows.length}
                currentPage={page}
                onPageChange={setPage} />
        </Flex>
    );
  }

  export default TableLayout