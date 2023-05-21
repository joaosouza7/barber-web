import Head from 'next/head';
import { Flex, Text } from '@chakra-ui/react';

import { canSSRAuth } from '../../utils/canSSRAuth';

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

export const getServerSideProps = canSSRAuth(async (ctx) => {
    return {
        props: {

        }
    }
});