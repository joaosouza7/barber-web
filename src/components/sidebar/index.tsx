import { ReactNode } from 'react';
import Link from 'next/link';
import {
    IconButton,
    Box,
    CloseButton,
    Flex,
    Icon,
    Drawer,
    DrawerContent,
    useColorModeValue,
    Text,
    useDisclosure,
    BoxProps,
    FlexProps
} from '@chakra-ui/react';

import {
    FiScissors,
    FiClipboard,
    FiSettings,
    FiMenu
} from 'react-icons/fi';

import { IconType } from 'react-icons';

interface LinkItemProps {
    name: string;
    icon: IconType;
    route: string;
}

const LinkItems: Array<LinkItemProps> = [
    { name: 'Agenda', icon: FiClipboard, route: '/dashboard' },
    { name: 'Cortes', icon: FiScissors, route: '/haircuts' },
    { name: 'Minha Conta', icon: FiSettings, route: '/profile' },
];

export function Sidebar({ children }: { children: ReactNode }) {

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Box minH='100vh' bg='barber.900' >
            <SidebarContent 
                onClose={() => onClose()}
                display={{ base: 'none', md: 'block' }}
            />

            <Drawer
                autoFocus={false}
                isOpen={isOpen}
                placement='left'
                returnFocusOnClose={false}
                onOverlayClick={onClose}
                size='full'
                onClose={onClose}
            >
                <DrawerContent>
                    <SidebarContent onClose={() => onClose()} />
                </DrawerContent>
            </Drawer>

            <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />

            <Box ml={{ base: 0, md: 60 }} p={4} color='whiteAlpha.900'>
                {children}
            </Box>
        </Box>
    );
}

interface SidebarProps extends BoxProps {
    onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
    return (
        <Box
            bg='barber.400'
            borderRight='1px'
            borderRightColor={ useColorModeValue('gray.200', 'gray.700') }
            w={{ base: 'full', md: 60 }}
            h='full'
            pos='fixed'
            {...rest}
        >

            <Flex h='20' alignItems='center' justifyContent='space-between' mx='8'>
                <Link href='/dashboard'>
                    <Flex cursor='pointer' userSelect='none' flexDirection='row' alignItems='center'>
                        <Text fontSize='2xl' fontWeight='700' color='button.default'>Barber</Text>
                        <Text fontSize='2xl' fontWeight='700' color='button.cta'>PRO</Text>
                    </Flex>
                </Link>

                <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} color='button.default' />
            </Flex>

            {LinkItems.map((link) => {
                return (
                    <NavItem key={link.name} icon={link.icon} route={link.route}>
                        {link.name}
                    </NavItem>
                );
            })}

        </Box>
    );
}

interface NavItemProps extends FlexProps {
    icon: IconType;
    children: ReactNode;
    route: string;
}

const NavItem = ({ icon, children, route, ...rest }: NavItemProps) => {
    return (
        <Link href={route}  style={{ textDecoration: 'none' }}>
            <Flex
                align='center'
                p='4'
                mx='4'
                borderRadius='3'
                color='barber.100'
                role='group'
                cursor='pointer'
                _hover={{
                    bg: 'barber.900',
                    color: 'white'
                }}
                {...rest}
            >

                {icon && (
                    <Icon 
                        mr={4}
                        fontSize='16'
                        as={icon}
                        _groupHover={{
                            color: 'button.cta'
                        }}
                    />
                )}

                {children}

            </Flex>
        </Link>
    );
}

interface MobileProps extends FlexProps {
    onOpen: () => void;
}

const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
    return (
        <Flex
            ml={{ base: 0, md: 60 }}
            px={{ base: 4, md: 24 }}
            height='20'
            alignItems='center'
            justifyContent='flex-start'
            bg='gray.900'
            color='button.default'
            borderBottomWidth='1px'
            borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
            {...rest}
        >
            <IconButton 
                variant='outline'
                onClick={onOpen}
                aria-label='open menu'
                icon={ <FiMenu /> }
            />

            <Flex cursor='pointer' flexDirection='row' ml={6}>
                <Text fontSize='2xl' fontWeight='700' color='button.default'>Barber</Text>
                <Text fontSize='2xl' fontWeight='700' color='button.cta'>PRO</Text>
            </Flex>

        </Flex>
    );
} 