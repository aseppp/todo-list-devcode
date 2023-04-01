import { AlertContext } from '@/context/AlertContext';
import { IsAddContext } from '@/context/IsAddContext';
import {
  Box,
  Button,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import React, { useContext, useEffect } from 'react';

const ModalDelete = ({ isOpen, onClose, title, id }) => {
  const [isAdd, setIsAdd] = useContext(IsAddContext);
  const [isDelete, setIsDelete] = useContext(AlertContext);

  const handleSubmit = id => {
    fetch(`https://todo.api.devcode.gethired.id/todo-items/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => res.json())
      .then(() => {
        setIsAdd(prevState => !prevState);
        setIsAdd(!isAdd);
      });
  };

  useEffect(() => {
    if (isDelete) {
      setInterval(() => {
        setIsDelete(!isDelete);
      }, 2000);
    }
  }, [isDelete, setIsDelete]);

  return (
    <Box data-cy="modal-delete">
      <Modal
        data-cy="modal-delete"
        isOpen={isOpen}
        onClose={onClose}
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
                {'"'}
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
              onClick={onClose}
            >
              Batal
            </Button>

            <Button
              data-cy="modal-delete-confirm-button"
              colorScheme={'red'}
              mr={3}
              onClick={() => {
                onClose();
                handleSubmit(id);
                setIsDelete(!isDelete);
              }}
            >
              Hapus
            </Button>
          </Box>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ModalDelete;
