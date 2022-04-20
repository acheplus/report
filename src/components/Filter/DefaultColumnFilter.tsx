// This is a custom filter UI for selecting

import { Input } from "@chakra-ui/react"

// a unique option from a list
export default function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length

  return (
  <Input
    bgColor='white'
    textColor='black'
      value={filterValue || ''}
      onChange={e => {
      setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
      }}
      placeholder={`Procurar...`}
  />
  )
}