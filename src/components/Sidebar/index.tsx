import { Box, Stack, Divider } from '@chakra-ui/react'
import { GiHealthDecrease, GiBrokenHeartZone } from "react-icons/gi";
import { MdOutlinePregnantWoman, MdChildFriendly, MdSpaceDashboard } from "react-icons/md";
import { IoWomanSharp, IoDuplicate } from "react-icons/io5";
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
                    <NavLink href="/dashboard" icon={MdSpaceDashboard}>Início</NavLink>
                    {/* <NavLink href="/users" icon={RiContactsLine}>Usuários</NavLink> */}
                </NavSection>
                <NavSection title="Previne Brasil">
                    <NavLink href="/previne/indicador/pre-natal" icon={MdOutlinePregnantWoman}>Pré-Natal</NavLink>
                    <NavLink href="/previne/indicador/citologias" icon={IoWomanSharp}>Saúde da Mulher</NavLink>
                    <NavLink href="/previne/indicador/vacinas" icon={MdChildFriendly}>Saúde da Criança</NavLink>
                    <NavLink href="/previne/indicador/hipertensos" icon={GiHealthDecrease}>Hipertensos</NavLink>
                    <NavLink href="/previne/indicador/diabeticos" icon={GiBrokenHeartZone}>Diabéticos</NavLink>
                </NavSection>
                <NavSection title="Cidadãos">
                    <NavLink href="/cidadaos/duplicados" icon={IoDuplicate}>Duplicados</NavLink>
                </NavSection>
            </Stack>
        </Box>
    )
}