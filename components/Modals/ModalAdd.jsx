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
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import Dropdown from '../Dropdown/Dropdown';

const ModalAdd = ({ isOpen, onClose, groupId, type, id, title }) => {
  const [isAdd, setIsAdd] = useContext(IsAddContext);
  const [selected, setSelected] = useState('Very High');
  const { register, watch, handleSubmit, setValue } = useForm();

  const onSubmit = () => {
    let priority = selected.split(' ').join('-').toLowerCase();
    priority = priority === 'medium' ? 'normal' : priority;

    if (type === 'create') {
      const data = {
        title: watch('title'),
        activity_group_id: groupId,
        priority: priority,
      };

      saveTask(data);
      setIsAdd((prevState) => !prevState);
      setValue('title', '');
    }

    if (type === 'update') {
      const data = {
        title: watch('title'),
        priority: priority,
        is_active: 1,
      };

      updateTask(id, data);
      setIsAdd((prevState) => !prevState);
      setValue('title', '');
    }
  };

  useEffect(() => {
    if (title) {
      setValue('title', title);
    }
  }, [title, setValue]);

  return (
    <>
      <Box data-cy='modal-add'>
        <Modal isOpen={isOpen} onClose={onClose} size='2xl'>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader data-cy='modal-add-title'>
              {type === 'create' && ' Tambah List Item'}
              {type === 'update' && ' Ubah List Item'}
            </ModalHeader>

            <Divider size='lg' orientation='horizontal' />

            <ModalCloseButton data-cy='modal-add-close-button' />

            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalBody my={8}>
                <FormControl>
                  <FormLabel textTransform={'uppercase'} fontWeight='bold'>
                    nama list item
                  </FormLabel>
                  <Input
                    {...register('title')}
                    data-cy='modal-add-name-input'
                    type={'text'}
                    placeholder='Tambahkan nama list item'
                  />
                </FormControl>

                <FormControl mt={5}>
                  <FormLabel
                    data-cy='modal-add-priority-title'
                    textTransform={'uppercase'}
                    fontWeight='bold'
                  >
                    priority
                  </FormLabel>

                  <Dropdown selected={selected} setSelected={setSelected} />
                </FormControl>
              </ModalBody>

              <Divider size='lg' orientation='horizontal' zIndex={1} />

              <Box display={'flex'} justifyContent='end' my={5}>
                <Button
                  type='submit'
                  colorScheme='blue'
                  mr={3}
                  onClick={() => {
                    onClose();
                    setIsAdd(!isAdd);
                  }}
                  data-cy='modal-add-save-button'
                  isDisabled={!watch('title')}
                >
                  Submit
                </Button>
              </Box>
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
