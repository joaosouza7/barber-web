import Head from 'next/head';
import Link from 'next/link';
import { IoMdPricetag } from 'react-icons/io';
import {
    Flex,
    Text,
    Heading,
    Stack,
    Switch,
    Button,
    useMediaQuery
} from '@chakra-ui/react';

import { Sidebar } from '../../components/sidebar';

export default function Haircuts() {

    const [isMobile] = useMediaQuery('(max-width: 500px)');

    return (
        <>
            <Head>
                <title>Modelos de corte - BarberPRO</title>
            </Head>

            <Sidebar>
                <Flex direction='column' alignItems='flex-start' justifyContent='flex-start'>
                    
                    <Flex
                        direction={isMobile ? 'column': 'row'}
                        w='100%'
                        alignItems={isMobile ? 'flex-start': 'center'}
                        justifyContent='flex-start'
                        mb={0}
                    >
                        <Heading
                            fontSize={isMobile ? '28px' : '3xl'}
                            mt={4}
                            mb={4}
                            mr={4}
                            color='orange.900'
                        >
                            Modelos de corte
                        </Heading>

                        <Link href='/haircuts/new'>
                            <Button bg='gray.700' _hover={{ bg: 'gray.800'}}>
                                Cadastrar novo
                            </Button>
                        </Link>

                        <Stack ml='auto' alignItems='center' direction='row'>
                            <Text fontWeight='700'>ATIVOS</Text>
                            <Switch 
                                colorScheme='green'
                                size='lg'
                            />
                        </Stack>

                    </Flex>

                    <Link href='/haircuts/123' style={{ width: '100%' }}>
                        <Flex
                            cursor='pointer'
                            w='100%'
                            p={4}
                            bg='barber.400'
                            direction='row'
                            rounded='3'
                            mb={2}
                            justifyContent='space-between'
                            
                        >

                            <Flex alignItems='center' justifyContent='center'>
                                <IoMdPricetag size={25} color='#fba931' />
                                <Text ml={2} noOfLines={2} color='white'>
                                    Corte completo
                                </Text>
                            </Flex>

                            <Text>
                                R$ 45.00
                            </Text>

                        </Flex>
                    </Link>

                </Flex>
            </Sidebar>
        </>
    );
}