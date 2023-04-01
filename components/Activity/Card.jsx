import React, { useContext, useRef, useEffect } from 'react';
import {
  Box,
  Button,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { AlertContext } from '@/context/AlertContext';

const Card = ({ title, date, id }) => {
  const router = useRouter();
  const btnRef = useRef();
  const modalDelete = useDisclosure();
  const [isDelete, setIsDelete] = useContext(AlertContext);

  const formatDate = (dateString) => {
    const date = dayjs(dateString).locale('id');
    return date.format('DD MMMM YYYY');
  };

  const handleClick = (e) => {
    if (e.target !== btnRef.current) router.push('/activity/' + id);
  };

  useEffect(() => {
    if (isDelete) {
      setInterval(() => {
        setIsDelete(!isDelete);
      }, 5000);
    }
  }, [isDelete, setIsDelete]);

  return (
    <>
      <Box
        data-cy="activity-item"
        w={'235px'}
        h={'235px'}
        shadow={'0px 6px 10px rgba(0, 0, 0, 0.1)'}
        padding={5}
        borderRadius={'12px'}
        bg="white"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        cursor="pointer"
        onClick={(e) => handleClick(e)}
      >
        <Text
          data-cy="activity-item-title"
          fontWeight="semibold"
          fontSize={['lg', 'lg', 'xl', 'xl']}
          cursor="pointer"
        >
          {title}
        </Text>

        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Text
            data-cy="activity-item-date"
            color="#888888"
            fontSize="14px"
            fontWeight="bold"
          >
            {formatDate(date)}
          </Text>
          <Box
            className="trash-icon"
            data-cy="activity-item-delete-button"
            ref={btnRef}
            onClick={modalDelete.onOpen}
          ></Box>
        </Box>
      </Box>

      <Box data-cy="modal-delete">
        <Modal
          data-cy="modal-delete"
          isOpen={modalDelete.isOpen}
          onClose={modalDelete.onClose}
          size="2xl"
        >
          <ModalOverlay />
          <ModalContent>
            <ModalBody
              my={8}
              display="flex"
              justifyContent={'center'}
              flexDirection="column"
              alignItems={'center'}
            >
              <Image
                data-cy="modal-delete-icon"
                src="/modal-delete-icon.png"
                width="120px"
                height="120px"
                alt=""
              />
              <Box fontSize={'xl'} data-cy="modal-delete-title">
                Apakah anda yakin menghapus
                <Text fontWeight="bold" textAlign="center">
                  {' "'}
                  {title}
                  {'"'}?
                </Text>
              </Box>
            </ModalBody>

            <Box
              display={'flex'}
              justifyContent={'center'}
              alignItems="center"
              mb={5}
            >
              <Button
                data-cy="modal-delete-cancel-button"
                mr={3}
                onClick={modalDelete.onClose}
              >
                Batal
              </Button>

              <Button
                data-cy="modal-delete-confirm-button"
                colorScheme={'red'}
                mr={3}
                onClick={() => {
                  modalDelete.onClose();
                  deleteData(id);
                  setIsDelete(!isDelete);
                }}
              >
                Hapus
              </Button>
            </Box>
          </ModalContent>
        </Modal>
      </Box>
    </>
  );
};

export default Card;

export async function deleteData(id) {
  const response = await fetch(
    `https://todo.api.devcode.gethired.id/activity-groups/${id}`,
    {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    }
  );

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json;
}
