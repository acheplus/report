import { Box, Text, Stack} from '@chakra-ui/react'
import { ReactNode } from 'react'

interface NavSectionProps {
    title: string;
    children: ReactNode
}

export function NavSection({ title, children }: NavSectionProps) {
    return (
        <Box>
            <Text
                fontWeight="bold">{title}</Text>
            <Stack spacing="2" mt="2" align="stretch">
                {children}
            </Stack>
        </Box>
    )
}