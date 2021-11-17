import { Box, Avatar, Flex, Icon, HStack, Button } from '@chakra-ui/react'
import { RiNotificationLine, RiUserAddLine } from 'react-icons/ri'
import { useContext } from 'react'
import { AuthContext, signOut } from '../../contexts/AuthContext'

export function Profile() {
    const { user } = useContext(AuthContext)

    return (
        <Flex
            align="center"
            ml="auto">
                <HStack
                    spacing="8"
                    mx="8"
                    pr="8"
                    py="1"
                    color="gray.300"
                    borderRightWidth={1}
                    borderColor="gray.700">
                    <Icon as={RiNotificationLine} fontSize="20"></Icon>
                    <Icon as={RiUserAddLine} fontSize="20"></Icon>
                </HStack>
            
        <Flex align="center">
            <Flex fontSize="1.5rem"
                color="gray.500"
                marginRight="0.5rem">
            <div>
                <span className="las la-bell" />
                <span className="las la-envelope" />
            </div>
            </Flex>
            <Avatar name="Bart Simpson" size="md" src="/assets/bart.jpg" />
            <Flex direction="column">
                <Box mr="4" align="center" padding="4">
                    <h4>Bart Simpson</h4>
                    <small>{user?.email}</small>
                </Box>
            </Flex>
            <Button onClick={signOut}>Sair</Button>
        </Flex>
      </Flex>
    )
}
