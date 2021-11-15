import { Flex, Image, Box} from '@chakra-ui/react' 

export function Prefeitura() {
    return (
        <Flex align="flex-start">
            <Image alt="Prefeitura Municipal" size="md" src="/assets/bart.jpg" fallbackSrc="/assets/" boxSize="50px" borderRadius={15} />
                <Flex direction="column">
                    <Box mr="4" align="center" padding="4">
                        <h4>Município - Municipal</h4>
                    </Box>
                </Flex>
        </Flex>
    )
}