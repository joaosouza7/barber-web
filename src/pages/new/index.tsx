import { useState, ChangeEvent } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import {
    Flex,
    Text,
    Heading,
    Button,
    Input,
    Select
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

interface NewProps {
    haircuts: HaircutProps[];
}

export default function New({ haircuts }: NewProps) {

    const router = useRouter();

    const [customer, setCustomer] = useState('');
    const [haircutSelected, setHaircutSelected] = useState(haircuts[0]);

    function handleChangeSelect(id: string) {
        const haircutItem = haircuts.find(item => item.id === id);
        setHaircutSelected(haircutItem);
    }

    async function handleRegister() {

        if(customer === '') return;

        try {

            const apiClient = setupAPIClient();
            await apiClient.post('/schedule', {
                customer: customer,
                haircut_id: haircutSelected?.id
            });

            router.push('/dashboard');
            
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <>
            <Head>
                <title>BarberPRO - Novo agendamento</title>
            </Head>

            <Sidebar>
                <Flex direction='column' align='flex-start' justify='flex-start'>
                    
                    <Flex direction='row' w='100%' align='center' justify='flex-start'>
                        <Heading fontSize='3xl' mt={4} mb={4} mr={4}>
                            Novo agendamento
                        </Heading>
                    </Flex>

                    <Flex
                        maxW='700px'
                        w='100%'
                        direction='column'
                        align='center'
                        justify='center'
                        pt={6}
                        pb={6}
                        bg='barber.400'
                        rounded={3}
                    >
                        <Input 
                            placeholder='Digite o nome do cliente'
                            w='85%'
                            size='lg'
                            type='text'
                            mb={3}
                            bg='gray.900'
                            value={customer}
                            onChange={ (e: ChangeEvent<HTMLInputElement>) => setCustomer(e.target.value) }
                        />

                        <Select w='85%' size='lg' mb={3} bg='gray.900' onChange={ (e) => handleChangeSelect(e.target.value) }>
                            {haircuts.map( item => (
                                <option style={{ background: '#171923'}} key={item?.id} value={item?.id}>{item?.name}</option>
                            ))}
                        </Select>

                        <Button
                            onClick={handleRegister}
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

export const getServerSideProps = canSSRAuth( async (ctx) => {

    try {

        const apiClient = setupAPIClient(ctx);

        const response = await apiClient.get('/haircuts',
        {
            params: {
                status: true,
            }
        }
        );

        if(response.data === null) {
            return {
                redirect: {
                    destination: '/dashboard',
                    permanent: false,
                }
            }
        }

        return {
            props: {
                haircuts: response.data,
            }
        }
        
    } catch (error) {
        console.log(error);
        return {
            redirect: {
                destination: '/dashboard',
                permanent: false,
            }
        }
    }

});