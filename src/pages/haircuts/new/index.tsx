import Head from 'next/head';
import Link from 'next/link';
import { FiChevronLeft } from 'react-icons/fi';
import {
    Flex,
    Text,
    Heading,
    Button,
    Input,
    useMediaQuery
} from '@chakra-ui/react';

import { Sidebar } from '../../../components/sidebar';

export default function NewHaircut() {

    const [isMobile] = useMediaQuery('(max-width: 500px)');

    return (
        <>
            <Head>
                <title>BarberPRO - Novo modelo de corte</title>
            </Head>

            <Sidebar>
                <Flex direction='column' alignItems='flex-start' justifyContent='flex-start' >
                    
                    <Flex
                        direction={isMobile ? 'column' : 'row'}
                        w='100%'
                        align={isMobile ? 'flex-start' : 'center'}
                        mb={isMobile ? 4 : 0}
                    >
                        <Link href='/haircuts'>
                            <Button 
                                bg='gray.700' 
                                _hover={{ bg: 'gray.800'}}
                                p={4}
                                alignItems='center'
                                justifyContent='center'
                                mr={4}
                            >
                                <FiChevronLeft size={22} color='#FFF' />
                                Voltar
                            </Button>
                        </Link>

                        <Heading
                            color='orange.900'
                            mt={4}
                            mb={4}
                            mr={4}
                            fontSize={isMobile ? '28px' : '3xl'}
                        >
                            Modelos de corte
                        </Heading>
                    </Flex>

                    <Flex
                        maxW='700px'
                        w='100%'
                        bg='barber.400'
                        direction='column'
                        align='center'
                        justify='center'
                        pt={6}
                        pb={6}
                    >
                        <Heading mb={4} fontSize={isMobile ? '22px' : '2xl'} color='white'>Cadastrar modelo</Heading>

                        <Input 
                            placeholder='Nome do corte'
                            w='85%'
                            size='lg'
                            mb={3}
                            bg='gray.900'
                            type='text'
                        />

                        <Input 
                            placeholder='Preço do corte'
                            w='85%'
                            size='lg'
                            mb={4}
                            bg='gray.900'
                            type='text'
                        />

                        <Button
                            w='85%'
                            size='lg'
                            color='gray.900'
                            mb={6}
                            bg='button.cta'
                            _hover={{ bg: '#ffb13e' }}
                        >
                            Cadastrar
                        </Button>

                    </Flex>

                </Flex>
            </Sidebar>
        </>
    );
}