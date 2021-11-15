import { Button, Stack, Box, Text } from '@chakra-ui/react'
import { PaginationItem } from './PaginationItem'

interface PaginationProps {
    totalCountOfRegisters: number;
    registersPerPage?: number;
    currentPage?: number;
    onPageChange: (page: number) => void;
}

const sibilingsCount = 1;

function generatePagesArray(from: number, to: number){
    return [...new Array(to-from)]
        .map((_, index) => {
            return from + index + 1;
        })
        .filter(page => page > 0);
}

export function Pagination({ 
    totalCountOfRegisters,
    registersPerPage = 10,
    currentPage = 1,
    onPageChange
}: PaginationProps) {
    const lastPage = Math.floor(totalCountOfRegisters / registersPerPage);

    const previousPage = currentPage > 1
        ? generatePagesArray(currentPage - 1 - sibilingsCount, currentPage - 1)
        : []
    
    const nextPage = currentPage < lastPage
        ? generatePagesArray(currentPage, Math.min(currentPage + sibilingsCount, lastPage))
        : []

    return (
        <Stack direction="row"
            spacing="6"
            mt="8"
            justify="space-between"
            align="center">
            <Box>
                <strong>0</strong> - <strong>10</strong> de <strong>100</strong>
            </Box>
            <Stack direction="row"
                spacing="2"
                >

                { currentPage > (1 + sibilingsCount ) && (
                    <>
                        <PaginationItem onPageChange={onPageChange} number={1} isCurrent={false}/>
                        { currentPage > (2+sibilingsCount) && (
                            <Text color="gray.300" w="8" textAlign="center">...</Text>
                        )}
                    </>
                )}

                {previousPage.length > 0 && previousPage.map(page => {
                    return <PaginationItem onPageChange={onPageChange} key={page} number={page} isCurrent={false} />
                })}
                <PaginationItem onPageChange={onPageChange} isCurrent={true} number={currentPage} />

                {nextPage.length > 0 && nextPage.map(page => {
                    return <PaginationItem onPageChange={onPageChange} key={page} number={page} isCurrent={false} />
                })}

                { (currentPage + sibilingsCount) < lastPage && (
                    <>
                        <PaginationItem onPageChange={onPageChange} number={lastPage} isCurrent={false} />
                        {(currentPage + 1 + sibilingsCount) < lastPage && (
                            <Text color="gray.300" w="8" textAlign="center">...</Text>
                        )}
                    </>
                )}

            </Stack>
        </Stack>
    )
}