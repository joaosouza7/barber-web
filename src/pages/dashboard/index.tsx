import { useState } from 'react';
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

import { canSSRAuth } from '../../utils/canSSRAuth';
import { setupAPIClient } from '../../services/api';

export interface ScheduleItem {
    id: string;
    customer: string;
    haircut: {
        id: string;
        name: string;
        price: number | string;
        user_id: string;
    }
}

interface DashboardProps {
    schedule: ScheduleItem[];
}

export default function Dashboard({ schedule }: DashboardProps) {

    const [isMobile] = useMediaQuery('(max-width: 500px)');

    const [list, setList] = useState(schedule);

    return (
        <>
            <Head>
                <title>BarberPRO - Minha barbearia</title>
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

                    {list.map( item => (
                        <ChakraLink 
                            key={item?.id}
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
                                mb={3}
                                justify='space-between'
                                align={isMobile ? 'flex-start' : 'center'}
                            >

                                <Flex direction='row' align='center' justify='center' mb={isMobile ? 2 : 0}>
                                    <IoMdPerson size={25} color='#fba931' />
                                    <Text fontWeight='600' ml={3} noOfLines={1}>
                                        {item?.customer}
                                    </Text>
                                </Flex>

                                <Text mb={isMobile ? 2 : 0}>
                                    {item?.haircut?.name}
                                </Text>

                                <Text mb={isMobile ? 2 : 0}>
                                    {item?.haircut?.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                </Text>

                            </Flex>
                        </ChakraLink>
                    ))}

                </Flex>
            </Sidebar>
        </>
    );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    
    try {

        const apiClient = setupAPIClient(ctx);

        const response = await apiClient.get('/schedule');

        return {
            props: {
                schedule: response.data,
            }
        }
        
    } catch (error) {
        console.log(error);
        return {
            props: {
                schedule: [],
            }
        }
    }
});