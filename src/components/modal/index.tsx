import { FaMoneyBillAlt } from 'react-icons/fa';
import { FiScissors } from 'react-icons/fi';
import { IoMdPerson } from 'react-icons/io';

import {
    Modal,
    ModalOverlay,
    ModalHeader,
    ModalContent,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Text,
    Button,
    Flex
} from '@chakra-ui/react';

import { ScheduleItem } from '../../pages/dashboard';

interface ModalInfoProps {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    data: ScheduleItem;
    finishService: () => Promise<void>;
}

export function ModalInfo({ isOpen, onOpen, onClose, data, finishService }: ModalInfoProps) {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent bg='barber.400' color='white'>
                <ModalHeader>Próximo</ModalHeader>
                <ModalCloseButton />

                <ModalBody>
                    <Flex align='center' mb={3}>
                        <IoMdPerson size={22} color='#FFB13e' />
                        <Text ml={3} fontSize='large' fontWeight='400'>{data?.customer}</Text>
                    </Flex>

                    <Flex align='center' mb={3}>
                        <FiScissors size={22} color='#FFF' />
                        <Text ml={3} fontSize='large' fontWeight='400'>
                            {data?.haircut?.name}
                        </Text>
                    </Flex>

                    <Flex align='center' mb={3}>
                        <FaMoneyBillAlt size={22} color='#46ef75' />
                        <Text ml={3} fontSize='large' fontWeight='400'>
                            {data?.haircut?.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </Text>
                    </Flex>
                </ModalBody>

                <ModalFooter>
                    <Button
                        bg='button.cta'
                        _hover={{ bg: '#ffb13e'}}
                        mr={3}
                        onClick={ () => finishService() }
                    >
                        Finalizar serviço
                    </Button>
                </ModalFooter>

            </ModalContent>
        </Modal>
    );
}