import { useContext } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { IoMdPerson } from 'react-icons/io';
import {
    Flex, 
    Text,
    Heading,
    Button,
    Link as ChakraLink,
    useMediaQuery
} from '@chakra-ui/react';

import { Sidebar } from '../../components/sidebar';
import { AuthContext } from '../../contexts/AuthContext';

import { canSSRAuth } from '../../utils/canSSRAuth';

export default function Dashboard() {

    const { user } = useContext(AuthContext);

    const [isMobile] = useMediaQuery('(max-width: 500px)');

    return (
        <>
            <Head>
                <title>BarberPRO - {user?.name ? user?.name : 'Minha barbearia'}</title>
            </Head>

            <Sidebar>
                <Flex direction='column' alignItems='flex-start' justifyContent='flex-start'>

                    <Flex w='100%' direction='row' align='center' justify='flex-start'>
                        <Heading fontSize='3xl' mt={4} mb={4} mr={4}>
                            Agenda
                        </Heading>

                        <Link href='/new'>
                            <Button bg='gray.700' _hover={{ bg: 'gray.800' }}>Registrar</Button>
                        </Link>
                    </Flex>

                    <ChakraLink 
                        w='100%'
                        m={0}
                        p={0}
                        mt={1}
                        bg='transparent'
                        style={{ textDecoration: 'none' }}
                    >
                        <Flex 
                            w='100%' 
                            bg='barber.400'
                            direction={isMobile ? 'column' : 'row'}
                            rounded={3}
                            p={4}
                            mb={4}
                            justify='space-between'
                            align={isMobile ? 'flex-start' : 'center'}
                        >

                            <Flex direction='row' align='center' justify='center' mb={isMobile ? 2 : 0}>
                                <IoMdPerson size={25} color='#fba931' />
                                <Text fontWeight='600' ml={3} noOfLines={1}>Joao Souza</Text>
                            </Flex>

                            <Text mb={isMobile ? 2 : 0}>Corte completo</Text>

                            <Text mb={isMobile ? 2 : 0}>R$ 45.99</Text>

                        </Flex>
                    </ChakraLink>

                </Flex>
            </Sidebar>
        </>
    );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    return {
        props: {

        }
    }
});