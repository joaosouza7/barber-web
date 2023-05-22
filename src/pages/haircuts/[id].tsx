import { useState, ChangeEvent } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { FiChevronLeft } from 'react-icons/fi';

import {
    Flex,
    Text,
    Heading,
    Button,
    useMediaQuery,
    Input,
    Stack,
    Switch
} from '@chakra-ui/react';

import { Sidebar } from '../../components/sidebar';

import { canSSRAuth } from '../../utils/canSSRAuth';
import { setupAPIClient } from '../../services/api';

interface HaircutProps {
    id: string;
    name: string;
    price: number | string;
    status: boolean;
    user_id: string;
}

interface SubscriptionProps {
    id: string;
    status: string;
}

interface EditHaircutProps {
    haircut: HaircutProps;
    subscription: SubscriptionProps | null;
}

export default function EditHaircut({ haircut, subscription }: EditHaircutProps) {

    const [isMobile] = useMediaQuery('(max-width: 500px)');

    const [name, setName] = useState(haircut?.name);
    const [price, setPrice] = useState(haircut?.price);
    const [status, setStatus] = useState(haircut?.status);

    const [disableHaircut, setDisableHaircut] = useState(haircut?.status ? 'disabled' : 'enabled');

    function handleChangeStatus(e: ChangeEvent<HTMLInputElement>) {

        if(e.target.value === 'disabled') {
            setDisableHaircut('enabled');
            setStatus(false);
        } else {
            setDisableHaircut('disabled');
            setStatus(true);
        }
    }

    async function handleUpdate() {
        
        if(name === '' || price === '') {
            return;
        }

        try {

            const apiClient = setupAPIClient();

            await apiClient.put('/haircut', {
                name: name,
                price: Number(price),
                status: status,
                haircut_id: haircut?.id,
            });

            alert('Corte atualizado com sucesso!');
            
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Head>
                <title>Editando modelo de corte - BarberPRO</title>
            </Head>

            <Sidebar>
                <Flex direction='column' align='flex-start' justify='flex-start'>

                    <Flex
                        direction={isMobile ? 'column': 'row'}
                        w='100%'
                        alignItems={isMobile ? 'flex-start': 'center'}
                        justifyContent='flex-start'
                        mb={isMobile ? 4 : 0}
                    >
                        <Link href='/haircuts'>
                            <Button 
                                bg='gray.700' 
                                _hover={{ bg: 'gray.800'}}
                                p={4}
                                display='flex'
                                alignItems='center'
                                justifyContent='center'
                                mr={4}
                            >
                                <FiChevronLeft size={22} color='#FFF' />
                                Voltar
                            </Button>
                        </Link>

                        <Heading fontSize={isMobile ? '28px' : '3xl'} color='orange.900'>
                            Editar corte
                        </Heading>
                    </Flex>

                    <Flex 
                        maxW='700px' 
                        w='100%' 
                        bg='barber.400' 
                        pt={6} 
                        pb={6} 
                        direction='column'
                        alignItems='center'
                        justifyContent='center'
                        rounded={3}
                        mt={6}
                    >
                        <Heading fontSize={isMobile ? '22px' : '2xl'} mb={4}>Editar corte</Heading>

                        <Flex w='85%' direction='column'>
                            <Input 
                                placeholder='Nome do corte'
                                w='100%'
                                size='lg'
                                mb={3}
                                bg='gray.900'
                                type='text'
                                disabled={subscription?.status !== 'active'}
                                value={name}
                                onChange={ (e) => setName(e.target.value) }
                            />

                            <Input 
                                placeholder='Preço do corte'
                                w='100%'
                                size='lg'
                                mb={3}
                                bg='gray.900'
                                type='number'
                                disabled={subscription?.status !== 'active'}
                                value={price}
                                onChange={ (e) => setPrice(e.target.value) }
                            />

                            <Stack mb={6} direction='row' align='center'>
                                <Text fontWeight='600' >Desativar corte</Text>
                                <Switch 
                                    size='lg'
                                    colorScheme='red'
                                    disabled={subscription?.status !== 'active'}
                                    value={disableHaircut}
                                    isChecked={disableHaircut === 'disabled' ? false : true}
                                    onChange={ (e: ChangeEvent<HTMLInputElement>) => handleChangeStatus(e)}
                                />
                            </Stack>

                            <Button
                            onClick={handleUpdate}
                            w='100%'
                            size='lg'
                            color='gray.900'
                            mb={6}
                            bg='button.cta'
                            _hover={{ bg: '#ffb13e' }}
                            isDisabled={subscription?.status !== 'active'}
                            >
                                Salvar
                            </Button>

                            { subscription?.status !== 'active' && (
                                <Flex direction='row' align='center' justify='center'>
                                    <Link href='/planos'>
                                        <Text mr={1} color='#31fb6a' fontWeight='600'>Seja premium</Text>
                                    </Link>
                                    <Text>e tenha todos os acessos liberados!</Text>
                                </Flex>
                            )}

                        </Flex>

                    </Flex>

                </Flex>
            </Sidebar>
        </>
    );
}

export const getServerSideProps = canSSRAuth( async (ctx) => {

    const { id } = ctx.params;

    try {

        const apiClient = setupAPIClient(ctx);

        const check = await apiClient.get('/haircut/check');
        
        const response = await apiClient.get('/haircut/detail', 
        {
            params: {
                haircut_id: id,
            }
        }
        );

        return {
            props: {
                haircut: response.data,
                subscription: check.data?.subscriptions
            }
        }
        
    } catch (error) {
        console.log(error);

        return {
            redirect: {
                destination: '/haircuts',
                permanent: false,
            }
        }
    }
})