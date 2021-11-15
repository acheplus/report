import { Flex, Divider } from '@chakra-ui/react'
import { Logo } from '../Sidebar/Logo'
import { Prefeitura } from './Prefeitura'
import { Profile } from './Profile'
import { SearchBox } from './SearchBox'

export function Header() {
    return (
        <Flex
          as="header"
          w="calc(100% - 160px)"
          bg="white"
          maxWidth={1480}
          h="8"
          p="8"
          px="1"
          top={0}
          align="center"
          position="fixed"
          left={160}
          zIndex={100}
          boxShadow="dark-lg">
            <Prefeitura />
            <SearchBox />
            <Profile />
        </Flex>
    )
}