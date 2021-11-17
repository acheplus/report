import { Box, Stack, Divider } from '@chakra-ui/react'
import { RiContactsLine, RiDashboardLine, RiGitMergeLine, RiInputMethodLine } from 'react-icons/ri'
import { Logo } from './Logo'
import { NavLink } from './NavLink'
import { NavSection } from './NavSection'

export function Sidebar() {
    return (
        <Box as="aside" color="white" w="10rem"
            margin={0} h="100%"
            borderStartRadius={10} bgColor="#1b9b4e"
            position="fixed" left={0} top={0} 
            justifyContent="center" >
            <Logo />
            <Divider />
            <Stack spacing="6" align="flex-start" p="2">
                <NavSection title="Dashboard">
                    <NavLink href="/dashboard" icon={RiDashboardLine}>Início</NavLink>
                    <NavLink href="/users" icon={RiContactsLine}>Usuários</NavLink>
                </NavSection>
                <NavSection title="Previne Brasil">
                    <NavLink href="/dashboard" icon={RiInputMethodLine}>Pré-Natal</NavLink>
                    <NavLink href="/dashboard" icon={RiGitMergeLine}>Saúde da Mulher</NavLink>
                    <NavLink href="/dashboard" icon={RiGitMergeLine}>Saúde da Criança</NavLink>
                    <NavLink href="/dashboard" icon={RiGitMergeLine}>Hipertensos</NavLink>
                    <NavLink href="/dashboard" icon={RiGitMergeLine}>Diabéticos</NavLink>
                </NavSection>
                <NavSection title="Cidadãos">
                    <NavLink href="/dashboard" icon={RiInputMethodLine}>Duplicados</NavLink>
                </NavSection>
            </Stack>
        </Box>
    )
}