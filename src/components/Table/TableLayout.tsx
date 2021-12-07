import { Table, Tbody, Th, Thead, Tr, Td, chakra } from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'

const TableLayout = ({
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  }) => {

    // We don't want to render all of the rows for this example, so cap
    // it for this use case
    const firstPageRows = rows.slice(0, 10)

    return (
        <>
            <Table {...getTableProps()}>
                <Thead>
                {headerGroups.map(headerGroup => (
                    <Tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                        <Th {...column.getHeaderProps(column.getSortByToggleProps())}
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
                    <Tr {...row.getRowProps()}>
                        {row.cells.map(cell => (
                        <Td {...cell.getCellProps()} isNumeric={cell.column.isNumeric}>
                            {cell.render('Cell')}
                            </Td>
                        ))}
                    </Tr>
                    )
                })}
                </Tbody>
            </Table>
            <br />
            <div>Mostrando os primeiros 10 resultados de {rows.length} registros</div>
        </>
    );
  }

  export default TableLayout