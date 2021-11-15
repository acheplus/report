import { Flex, Icon, Input } from '@chakra-ui/react'
import { RiSearchLine } from 'react-icons/ri'
import { useRef } from 'react'

export function SearchBox() {
    // const  [ search, setSearch ] = useState()

    const searchInputRef = useRef<HTMLInputElement>(null)

    return (
        <Flex as="label"
            flex="1"
            py="4"
            px="8"
            ml="6"
            maxWidth={400}
            align="center"
            alignSelf="center"
            color="gray.200"
            position="relative"
            bg="gray.50"
            borderRadius="full">
                <Input
                    color="gray.500"
                    variant="unstyled"
                    placeholder="Digite sua pesquisa"
                    px="4"
                    mr="4"
                    _placeholder={{color: 'gray.400'}} 
                    ref={searchInputRef} />
                    <Icon as={RiSearchLine}
                        fontSize="20" />
        </Flex>
    )
}