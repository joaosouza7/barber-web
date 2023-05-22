import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';

import { FiChevronLeft } from 'react-icons/fi';
import {
    Flex,
    Text,
    Heading,
    Button,
    Input,
    useMediaQuery
} from '@chakra-ui/react';

import { canSSRAuth } from '../../../utils/canSSRAuth';
import { setupAPIClient } from '../../../services/api';

import { Sidebar } from '../../../components/sidebar';

interface NewHaircutProps {
    subscription: boolean;
    count: number;
}

export default function NewHaircut({ subscription, count }: NewHaircutProps) {

    const [isMobile] = useMediaQuery('(max-width: 500px)');

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');

    async function handleRegister() {
        
        if(name === '' || price === '') return;

        try {
            
            const apiClient = setupAPIClient();

            await apiClient.post('/haircut', {
                name: name,
                price: Number(price),
            });

            Router.push('/haircuts');

        } catch (error) {
            console.log(error);
            alert('ERRO AO CADASTRAR MODELO!');
        }
    }

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
                            disabled={ !subscription && count >= 3 }
                            value={name}
                            onChange={ (e) => setName(e.target.value) }
                        />

                        <Input 
                            placeholder='Preço do corte'
                            w='85%'
                            size='lg'
                            mb={4}
                            bg='gray.900'
                            type='text'
                            disabled={ !subscription && count >= 3 }
                            value={price}
                            onChange={ (e) => setPrice(e.target.value) }
                        />

                        <Button
                            w='85%'
                            size='lg'
                            color='gray.900'
                            mb={6}
                            bg='button.cta'
                            _hover={{ bg: '#ffb13e' }}
                            isDisabled={!subscription && count >= 3}
                            onClick={handleRegister}
                        >
                            Cadastrar
                        </Button>

                        {!subscription && count >= 3 && (
                            <Flex direction='row' align='center' justify='center'>
                                <Text>
                                    Você atingiu seu limite de cortes cadastrados!
                                </Text>

                                <Link href='/planos'>
                                    <Text fontWeight='700' color='#31FB6A' cursor='pointer' ml={1}>
                                        Seja premium.
                                    </Text>
                                </Link>
                            </Flex>
                        )}

                    </Flex>

                </Flex>
            </Sidebar>
        </>
    );
}

export const getServerSideProps = canSSRAuth( async (ctx) => {
    
    try {

        const apiClient = setupAPIClient(ctx);

        const response = await apiClient.get('/haircut/check');
        const count = await apiClient.get('/haircut/count');

        return {
            props: {
                subscription: response.data?.subscriptions?.status === 'active' ? true : false,
                count: count.data
            }
        }
        
    } catch (error) {
        console.log(error);

        return {
            redirect: {
                destination: '/dashboard',
                permanent: false
            }
        }
    }
    
});