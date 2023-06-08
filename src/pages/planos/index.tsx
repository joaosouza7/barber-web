import Head from 'next/head';

import {
    Flex,
    Text,
    Heading,
    Button,
    useMediaQuery,
} from '@chakra-ui/react';

import { Sidebar } from '../../components/sidebar';

import { canSSRAuth } from '../../utils/canSSRAuth';
import { setupAPIClient } from '../../services/api';
import { getStripeJs } from '../../services/stripe-js';

interface PlanosProps {
    premium: boolean;
}

export default function Planos({ premium }: PlanosProps) {

    const [isMobile] = useMediaQuery('(max-width: 500px)');

    const handleSubscribe = async () => {
        if(premium) return;

        try {

            const apiClient = setupAPIClient();
            const response = await apiClient.post('/subscribe');

            const { sessionId } = response.data;

            const stripe = await getStripeJs();
            await stripe.redirectToCheckout({ sessionId: sessionId });
            
        } catch (error) {
            console.log(error);
        }
    }

    async function handleCreatePortal() {

        try {

            if(!premium) return;

            const apiClient = setupAPIClient();

            const response = await apiClient.post('/create-portal');

            const { sessionId } = response.data;

            window.location.href = sessionId;
            
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <>
            <Head>
                <title>BarberPRO - Sua assinatura premium</title>
            </Head>

            <Sidebar>
                <Flex w='100%' direction='column' align='flex-start' justify='flex-start'>
                    <Heading fontSize='3xl' mt={4} mb={4} mr={4} color='white'>
                        Planos
                    </Heading>
                </Flex>

                <Flex mb={6} maxW='780px' w='100%' direction='column' align='flex-start' justify='flex-start'>

                    <Flex gap={4} w='100%' direction={isMobile ? 'column' : 'row'}>
                        <Flex rounded={3} padding={2} flex={1} bg='barber.400' direction='column'>
                            <Heading
                                textAlign='center'
                                fontSize='2xl'
                                mt={2}
                                mb={4}
                                color='gray.100'
                            >
                                Plano Grátis
                            </Heading>

                            <Text fontWeight='medium' ml={4} mb={2}>Registrar cortes.</Text>
                            <Text fontWeight='medium' ml={4} mb={2}>Cadastrar 3 modelos de corte.</Text>
                            <Text fontWeight='medium' ml={4} mb={2}>Editar perfil</Text>
                        </Flex>

                        <Flex rounded={3} padding={2} flex={1} bg='barber.400' direction='column'>
                            <Heading
                                textAlign='center'
                                fontSize='2xl'
                                mt={2}
                                mb={4}
                                color='#31fb6a'
                            >
                                Premium
                            </Heading>

                            <Text fontWeight='medium' ml={4} mb={2}>Registrar cortes ilimitados.</Text>
                            <Text fontWeight='medium' ml={4} mb={2}>Cadastrar modelos de corte ilimitados.</Text>
                            <Text fontWeight='medium' ml={4} mb={2}>Editar perfil</Text>
                            <Text fontWeight='medium' ml={4} mb={2}>Editar modelos de corte</Text>
                            <Text fontWeight='medium' ml={4} mb={2}>Receber todas as atualizações.</Text>
                            <Text textAlign='center' color='#31fb6a' fontWeight='700' fontSize='2xl' ml={4} mb={2}>R$ 9,99</Text>

                            <Button
                                bg={premium ? 'gray.700' : 'button.cta'}
                                m={2}
                                color='white'
                                onClick={handleSubscribe}
                                isDisabled={premium}
                            >
                                {premium ? (
                                    'VOCÊ JÁ É PREMIUM'
                                ) : (
                                    'SEJA PREMIUM'
                                )}
                            </Button>

                            {premium && (
                                <Button
                                    m={2}
                                    bg='white'
                                    color='barber.900'
                                    fontWeight='600'
                                    onClick={handleCreatePortal}
                                >
                                    ALTERAR ASSINATURA
                                </Button>
                            )}
                        </Flex>
                    </Flex>

                </Flex>
            </Sidebar>
        </>
    );
}

export const getServerSideProps = canSSRAuth( async (ctx) => {

    try {

        const apiClient = setupAPIClient(ctx);

        const response = await apiClient.get('/me');

        return {
            props: {
                premium: response.data?.subscriptions?.status === 'active' ? true : false,
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