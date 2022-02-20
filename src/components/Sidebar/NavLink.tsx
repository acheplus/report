import { ElementType } from 'react'
import { Link as ChakraLink, Icon, Text, ChakraProps as ChakraLinkProps } from '@chakra-ui/react'
import { ActiveLink } from '../ActiveLink'

interface NavLinkProps extends ChakraLinkProps {
    icon: ElementType;
    href: string;
    children: string;
}

export function NavLink({icon, href, children, ...rest}: NavLinkProps) {
    return (
        <ActiveLink href={href} passHref>
            <ChakraLink display="flex"
                marginLeft={1} pl={3} pt={1}
                w="153px" h={8} _hover={{
                    bg: "#ffffff",
                    color: "#1b9b4e",
                    borderRadius: "30px 0px 0px 30px"
                }}  {...rest}>
                <Icon as={icon} fontSize="20" />
                <Text fontSize={12} ml="2" fontWeight="tiny">{children}</Text>
            </ChakraLink>
        </ActiveLink>
    )
}