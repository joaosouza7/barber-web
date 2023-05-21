import { useState, useContext } from 'react';

import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Flex, Text, Center, Input, Button } from '@chakra-ui/react';

import { AuthContext } from '../../contexts/AuthContext';
import { canSSRGuest } from '../../utils/canSSRGuest';

import logo from '../../../public/images/logo.svg';

export default function Login() {

    const { signIn } = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleLogin() {

        if(email === '' || password === '') {
            return;
        }

        await signIn({
            email,
            password
        });
    }

    return (
        <>
            <Head>
                <title>BarberPRO - Login</title>
            </Head>

            <Flex background='barber.900' height='100vh' alignItems='center' justifyContent='center'>
                
                <Flex width={640} direction='column' p={12} rounded={3}>
                    <Center p={4}>
                        <Image 
                            src={logo}
                            quality={100}
                            width={240}
                            alt='Logo BarberPRO'
                        />
                    </Center>

                    <Input 
                        background='barber.400'
                        rounded={3}
                        variant='filled'
                        size='lg'
                        placeholder='Digite seu e-mail...'
                        type='email'
                        mb={3}
                        color='button.gray'
                        value={email}
                        onChange={ (e) => setEmail(e.target.value) }
                    />

                    <Input 
                        background='barber.400'
                        rounded={3}
                        variant='filled'
                        size='lg'
                        placeholder='Digite sua senha...'
                        type='text'
                        mb={5}
                        color='button.gray'
                        value={password}
                        onChange={ (e) => setPassword(e.target.value) }
                    />

                    <Button
                        background='button.cta'
                        mb={5}
                        color='gray.900'
                        size='lg'
                        _hover={{ background: '#ffb13e' }}
                        onClick={handleLogin}
                    >
                        Acessar
                    </Button>

                    <Center mt={2}>
                        <Link href='/register'>
                            <Text color='button.default' cursor='pointer'>Não possui uma conta? <strong>Cadastre-se</strong></Text>
                        </Link>
                    </Center>

                </Flex>

            </Flex>

        </>
    );
}

export const getServerSideProps = canSSRGuest( async (ctx) => {
    return {
        props: {}
    }
});