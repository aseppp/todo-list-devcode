import { IsAddContext } from '@/context/IsAddContext';
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
} from '@chakra-ui/react';
import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';

const ModalAdd = ({ isOpen, onClose, groupId, type, id }) => {
  const [isAdd, setIsAdd] = useContext(IsAddContext);
  const { register, watch, handleSubmit } = useForm();

  const onSubmit = () => {
    if (type === 'create') {
      const data = {
        title: watch('title'),
        activity_group_id: groupId,
        priority: watch('priority'),
      };
      saveTask(data);
      setIsAdd(prevState => !prevState);
    }

    if (type === 'update') {
      const data = {
        title: watch('title'),
        priority: watch('priority'),
        is_active: 1,
      };

      updateTask(id, data);
      setIsAdd(prevState => !prevState);
      setIsAdd(!isAdd);
    }

    // const data = {
    //   title: watch('title'),
    //   activity_group_id: groupId,
    //   priority: watch('priority'),
    // };

    // saveTask(data);
    // setIsAdd(prevState => !prevState);
  };

  return (
    <>
      <Box data-cy="modal-add">
        <Modal isOpen={isOpen} onClose={onClose} size="2xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader data-cy="modal-add-title">
              {type === 'create' && ' Tambah List Item'}
              {type === 'update' && ' Ubah List Item'}
            </ModalHeader>
            <Divider size="lg" orientation="horizontal" />
            <ModalCloseButton data-cy="modal-add-close-button" />
            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalBody my={8}>
                <FormControl>
                  <FormLabel
                    data-cy="modal-add-name-title"
                    textTransform={'uppercase'}
                    fontWeight="bold"
                  >
                    nama list item
                  </FormLabel>
                  <Input
                    data-cy="modal-add-name-input"
                    {...register('title')}
                    type={'text'}
                    placeholder="Tambahkan nama list item"
                  />
                </FormControl>

                <FormControl mt={5}>
                  <FormLabel
                    data-cy="modal-add-priority-title"
                    textTransform={'uppercase'}
                    fontWeight="bold"
                  >
                    priority
                  </FormLabel>

                  <Select
                    ata-cy="modal-add-name-input"
                    {...register('priority')}
                  >
                    <option value="very-high">Very High</option>
                    <option value="high">High</option>
                  </Select>
                </FormControl>
              </ModalBody>

              <Divider size="lg" orientation="horizontal" />
              <ModalFooter>
                <Button
                  data-cy="modal-add-save-button"
                  type="submit"
                  colorScheme="blue"
                  mr={3}
                  onClick={onClose}
                >
                  Submit
                </Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
      </Box>
    </>
  );
};

export default ModalAdd;

export async function saveTask(data) {
  const response = await fetch(
    `https://todo.api.devcode.gethired.id/todo-items`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }
  );

  return await response.json;
}

export async function updateTask(id, data) {
  const response = await fetch(
    `https://todo.api.devcode.gethired.id/todo-items/${id}`,
    {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }
  );

  return await response.json;
}
