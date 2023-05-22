import { useState, ChangeEvent } from 'react';
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

import { setupAPIClient } from '../../services/api';
import { canSSRAuth } from '../../utils/canSSRAuth';

interface HaircutsItem {
    id: string;
    name: string;
    price: number | string;
    status: boolean;
    user_id: string;
}

interface HaircutsProps {
    haircuts: HaircutsItem[];
}

export default function Haircuts({ haircuts }: HaircutsProps) {

    const [isMobile] = useMediaQuery('(max-width: 500px)');

    const [haircutList, setHaircutList] = useState<HaircutsItem[]>(haircuts || []);
    const [disableHaircut, setDisableHaircut] = useState('enabled');

    async function handleDisabled(e: ChangeEvent<HTMLInputElement>) {

        const apiClient = setupAPIClient();

        if(e.target.value === 'disabled') {
            
            setDisableHaircut('enabled');

            const response = await apiClient.get('/haircuts', 
            {
                params: {
                    status: true,
                }
            }
            );

            setHaircutList(response.data);

        } else {

            setDisableHaircut('disabled');

            const response = await apiClient.get('/haircuts', 
            {
                params: {
                    status: false,
                }
            }
            );

            setHaircutList(response.data);

        }

    }

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
                                value={disableHaircut}
                                onChange={ (e: ChangeEvent<HTMLInputElement>) => handleDisabled(e) }
                                isChecked={disableHaircut === 'disabled' ? false : true}
                            />
                        </Stack>

                    </Flex>

                    {haircutList.map(haircut => (
                        <Link href={`/haircuts/${haircut.id}`} style={{ width: '100%' }} key={haircut.id}>
                            <Flex
                                cursor='pointer'
                                w='100%'
                                p={4}
                                bg='barber.400'
                                direction='row'
                                rounded='3'
                                mt={isMobile ? 4 : 3}
                                justifyContent='space-between'
                                
                            >

                                <Flex alignItems='center' justifyContent='center'>
                                    <IoMdPricetag size={25} color='#fba931' />
                                    <Text ml={2} noOfLines={2} color='white'>
                                        {haircut?.name}
                                    </Text>
                                </Flex>

                                <Text>
                                    {haircut?.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                </Text>

                            </Flex>
                        </Link>
                    ))}

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

        if(response?.data === null) {
            return {
                redirect: {
                    destination: '/dashboard',
                    permanent: false,
                }
            }
        }

        return {
            props: {
                haircuts: response?.data,
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