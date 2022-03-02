import { Box, Stack, Divider } from '@chakra-ui/react'
import { mdiHome, mdiHumanPregnant, mdiHumanFemale, mdiTeddyBear,
    mdiAccountHeart, mdiLotionPlus, mdiAccountMultiple } from '@mdi/js';
import { Logo } from './Logo'
import { NavLink } from './NavLink'
import { NavSection } from './NavSection'

export function Sidebar() {
    return (
        <Box as="aside" color="white" w="10rem"
            margin={0} h="100%"
            borderStartRadius={10} bgColor="#1b9b4e"
            position="fixed" left={0} top={0} 
            justifyContent="center" textAlign="center">
            <Logo />
            <Divider />
            <Stack spacing="6" align="flex-start" p="2">
                <NavSection title="Dashboard">
                    <NavLink href="/previne" icon={mdiHome}>Home</NavLink>
                    {/* <NavLink href="/users" icon={RiContactsLine}>Usuários</NavLink> */}
                </NavSection>
                <NavSection title="Previne Brasil">
                    <NavLink href="/previne/indicador/pre-natal" icon={mdiHumanPregnant}>Pré-Natal</NavLink>
                    <NavLink href="/previne/indicador/citologias" icon={mdiHumanFemale}>Saúde da Mulher</NavLink>
                    <NavLink href="/previne/indicador/vacinas" icon={mdiTeddyBear}>Saúde da Criança</NavLink>
                    <NavLink href="/previne/indicador/hipertensos" icon={mdiAccountHeart}>Hipertensos</NavLink>
                    <NavLink href="/previne/indicador/diabeticos" icon={mdiLotionPlus}>Diabéticos</NavLink>
                </NavSection>
                <NavSection title="Cidadãos">
                    <NavLink href="/cidadaos/duplicados" icon={mdiAccountMultiple}>Duplicados</NavLink>
                </NavSection>
            </Stack>
        </Box>
    )
}