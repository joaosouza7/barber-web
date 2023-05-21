import Head from 'next/head';
import { Flex, Text } from '@chakra-ui/react';

export default function Dashboard() {
    return (
        <>
            <Head>
                <title>BarberPRO - Minha Barberia</title>
            </Head>

            <Flex>
                <Text>DASHBOARD</Text>
            </Flex>
        </>
    );
}