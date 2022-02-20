import { Flex, Image, Box} from '@chakra-ui/react' 
import { useContext } from 'react'
import { FaSynagogue } from "react-icons/fa";
import { AuthContext } from '../../contexts/AuthContext'

export function Prefeitura() {
    const { user } = useContext(AuthContext)
    return (
        <Flex align="flex-start">
            <Image alt="Prefeitura Municipal" size="md" as={FaSynagogue} fallbackSrc="/assets/" boxSize="50px" borderRadius={15} />
                <Flex direction="column">
                    <Box mr="20" padding="4">
                        <h4>Município: {user?.prefeitura}</h4>
                    </Box>
                </Flex>
        </Flex>
    )
}