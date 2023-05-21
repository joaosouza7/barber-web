import { useContext, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import {
    Flex,
    Text,
    Heading,
    Box,
    Input,
    Button
} from '@chakra-ui/react';

import { Sidebar } from '../../components/sidebar';
import { AuthContext } from '../../contexts/AuthContext';

import { canSSRAuth } from '../../utils/canSSRAuth';
import { setupAPIClient } from '../../services/api';

interface UserProps {
    id: string;
    name: string;
    email: string;
    endereco: string | null;
}

interface ProfileProps {
    user: UserProps;
    premium: boolean;
}

export default function Profile({ user, premium }: ProfileProps) {

    const { logoutUser } = useContext(AuthContext);

    const [name, setName] = useState(user && user?.name);
    const [endereco, setEndereco] = useState(user?.endereco ? user?.endereco : '');

    async function handleLogout() {
        await logoutUser();
    }

    return (
        <>
            <Head>
                <title>Minha conta - BarberPRO</title>
            </Head>

            <Sidebar>
                <Flex direction='column' alignItems='flex-start' justifyContent='flex-start'>

                    <Flex w='100%' direction='row' alignItems='center' justifyContent='flex-start'>
                        <Heading color='orange.900' fontSize='2xl' mt={4} mb={4} mr={4}>Minha Conta</Heading>
                    </Flex>

                    <Flex 
                        bg='barber.400' 
                        maxW='700px' 
                        w='100%' 
                        direction='column' 
                        alignItems='center' 
                        justifyContent='center' 
                        rounded='3'
                        pt={8}
                        pb={8}
                    >
                        <Flex w='85%' direction='column'>
                            <Text mb={2} fontSize='xl' fontWeight='600'>
                                Nome da barbearia:
                            </Text>
                            <Input 
                                w='100%'
                                bg='gray.900'
                                rounded={3}
                                placeholder='Nome da sua barbearia'
                                size='lg'
                                type='text'
                                mb={4}
                                value={name}
                                onChange={ (e) => setName(e.target.value) }
                            />

                            <Text mb={2} fontSize='xl' fontWeight='600'>
                                Endereço:
                            </Text>
                            <Input 
                                w='100%'
                                bg='gray.900'
                                rounded={3}
                                placeholder='Endereço da barbearia'
                                size='lg'
                                type='text'
                                mb={4}
                                value={endereco}
                                onChange={ (e) => setEndereco(e.target.value) }
                            />

                            <Text mb={2} fontSize='xl' fontWeight='600'>
                                Plano Atual:
                            </Text>
                            
                            <Flex 
                                direction='row'
                                alignItems='center'
                                justifyContent='space-between'
                                w='100%'
                                mb={4}
                                p={1}
                                borderWidth={1}
                                rounded={3}
                                bg='barber.900'
                            >

                                <Text p={2} fontSize='lg' color={premium ? '#FBA931' : '#4dffb4'}>
                                    Plano {premium ? 'Premium' : 'Grátis'}
                                </Text>

                                <Link href='/planos'>
                                    <Box 
                                        cursor='pointer' 
                                        bg='#00cd52' 
                                        p={1} 
                                        pl={2} 
                                        pr={2} 
                                        rounded={4} 
                                        color='white' 
                                    >
                                        Mudar plano
                                    </Box>
                                </Link>
                            </Flex>

                            <Button 
                                w='100%'
                                mt={3}
                                mb={4}
                                bg='button.cta' 
                                size='lg'
                                _hover={{ bg: '#ffb13e'}}
                            >
                                Salvar
                            </Button>

                            <Button
                                w='100%'
                                mb={6}
                                size='lg'
                                bg='transparent'
                                borderWidth={2}
                                borderColor='red.500'
                                color='red.500'
                                _hover={{ bg: 'transparent'}}
                                onClick={handleLogout}
                            >
                                Sair da conta
                            </Button>

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

        const user = {
            id: response.data?.id,
            name: response.data?.name,
            email: response.data?.email,
            endereco: response.data?.endereco,
        };

        return {
            props: {
                user: user,
                premium: response.data?.subscriptions?.status === 'active' ? true : false
            }
        }
        
    } catch (error) {
        console.log(error);

        return {
            redirect: {
                destination: '/dashboard',
                permanent: false,
            }
        };
    }
});