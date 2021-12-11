import { Select } from "@chakra-ui/react"
import { useMemo } from "react"


// This is a custom filter UI for selecting
// a unique option from a list
export default function SelectColumnFilter({
    column: { filterValue, setFilter, preFilteredRows, id },
  }) {

        // Calculate the options for filtering
        // using the preFilteredRows
        const options: any[] = useMemo(() => {
            const options = new Set()
            preFilteredRows.forEach(row => {
            options.add(row.values[id])
            })
            return [...options.values()]
        }, [id, preFilteredRows])

        // Render a multi-select box
        return (
            <Select
            w={32}
            value={filterValue}
            onChange={e => {
                setFilter(e.target.value || undefined)
            }}
            >
            <option value="">Todos</option>
            {options.map((option, i) => (
                <option key={i} value={option}>
                {typeof(option) == "boolean" && option ? "Sim" : 
                typeof(option) == "boolean" ? "Não" : option}
                </option>
            ))}
            </Select>
    )
}