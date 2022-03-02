import { ElementType } from 'react'
import { Link as ChakraLink, Icon, Text, ChakraProps as ChakraLinkProps } from '@chakra-ui/react'
import { ActiveLink } from '../ActiveLink'

interface NavLinkProps extends ChakraLinkProps {
    icon: string;
    href: string;
    children: string;
}

export function NavLink({icon, href, children, ...rest}: NavLinkProps) {
    return (
        <ActiveLink href={href} passHref>
            <ChakraLink display="flex"
                pt='0.5em'
                w="9.5em" h='2.2em' _hover={{
                    bg: "gray.50",
                    color: "#1b9b4e",
                    borderRadius: "1.5em 0 0 1.5em"
                }}  {...rest}>
                <Icon fontSize="1.5em" ><path d={icon} fill='currentColor'></path></Icon>
                <Text fontSize='0.9em' ml="1" fontWeight="tiny">{children}</Text>
            </ChakraLink>
        </ActiveLink>
    )
}