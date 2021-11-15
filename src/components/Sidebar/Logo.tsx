import { Text, Flex} from '@chakra-ui/react' 

export function Logo () {
    return (
        <Flex>
            <Text fontSize="2xl"
                fontWeight="bold"
                letterSpacing="tight"
                m="4">acheplus
                <Text as="span" ml="1" color="green.500">.</Text>
            </Text>
        </Flex>
    )
}