import { useMemo } from "react";
import {useTable, useSortBy, useFilters} from 'react-table';
import { matchSorter } from 'match-sorter'
import TableLayout from "./TableLayout";

const TableInstance = ({ tableData, columnsData, icon, title }) => {

    const [columns, data] = useMemo(
      () => {
        return [columnsData, tableData];
      },
      [tableData, columnsData]
    );

    // Define a default UI for filtering
    function DefaultColumnFilter({
        column: { filterValue, preFilteredRows, setFilter },
    }) {
        const count = preFilteredRows.length
    
        return (
            <></>
        // <input
        //     value={filterValue || ''}
        //     onChange={e => {
        //     setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
        //     }}
        //     placeholder={`Procurar ...`}
        // />
        )
    }

    function fuzzyTextFilterFn(rows: any[], id, filterValue) {
        return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
    }

    const filterTypes = useMemo(
        () => ({
        // Add a new fuzzyTextFilterFn filter type.
        fuzzyText: fuzzyTextFilterFn,
        // Or, override the default text filter to use
        // "startWith"
        text: (rows, id, filterValue) => {
            return rows.filter((row: any[]) => {
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
        <TableLayout icon={icon} title={title} {...tableInstance} />
    );
}

export default TableInstance