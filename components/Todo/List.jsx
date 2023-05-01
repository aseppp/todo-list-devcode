import React, { useContext, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Text,
  Icon,
  useDisclosure,
} from '@chakra-ui/react';
import { FiTrash2 } from 'react-icons/fi';
import { TbPencil } from 'react-icons/tb';
import Badges from '../Badge/Badge';
import ModalDelete from '../Modals/ModalDelete';
import ModalAdd from '../Modals/ModalAdd';
import { IsAddContext } from '@/context/IsAddContext';

const List = ({ title, priority, id, is_active }) => {
  const [isChecked, setIsChecked] = useState(is_active);
  const [isAdd, setIsAdd] = useContext(IsAddContext);
  const modalDelete = useDisclosure();
  const modalTask = useDisclosure();

  const handleUpdate = () => {
    updateStatus(id, { is_active: isChecked });

    // if (is_active === 0) {
    //   const status = {
    //     is_active: 1,
    //   };
    //   updateStatus(id, status);
    // }
    // if (is_active === 1) {
    //   const status = {
    //     is_active: 0,
    //   };
    // updateStatus(id, status);
    // }
  };

  // useEffect(() => {
  //   // if (is_active === 0) {
  //   //   const status = {
  //   //     is_active: isChecked,
  //   //   };
  //   // }
  //   updateStatus(id, isChecked);
  // }, [isChecked, id]);

  const handleChecked = () => {
    setIsChecked((prevValue) => !prevValue);
    handleUpdate();
    setIsAdd(!isAdd);
  };

  return (
    <>
      <Box
        data-cy='todo-item'
        bg={'white'}
        borderRadius='lg'
        boxShadow={'0px 6px 10px rgba(0, 0, 0, 0.1)'}
        padding={6}
        display='flex'
        alignItems={'center'}
        justifyContent='space-between'
        mt={3}
      >
        <Box display='flex' alignItems={'center'} gap={5}>
          <Checkbox
            data-cy='todo-item-checkbox'
            size={'lg'}
            onChange={handleChecked}
            isChecked={!isChecked}
          />

          <Badges data-cy='todo-item-priority-indicator' priority={priority} />

          <Text
            data-cy='todo-item-title'
            fontSize={'18px'}
            lineHeight='27px'
            fontWeight={500}
            textDecoration={!isChecked ? 'line-through' : null}
          >
            {title}
          </Text>
          <Button
            data-cy='todo-item-edit-button'
            variant={'unstyled'}
            display='flex'
            alignItems={'center'}
            onClick={() => {
              modalTask.onOpen();
            }}
          >
            <Icon as={TbPencil} w={6} h={6} color='#C4C4C4' />
          </Button>
        </Box>

        <Button
          data-cy='todo-item-delete-button'
          variant={'unstyled'}
          onClick={() => {
            modalDelete.onOpen();
          }}
        >
          <Icon as={FiTrash2} w={5} h={5} color='#C4C4C4' />
        </Button>
      </Box>

      <ModalDelete
        isOpen={modalDelete.isOpen}
        onClose={modalDelete.onClose}
        title={title}
        id={id}
      />

      <ModalAdd
        isOpen={modalTask.isOpen}
        onClose={modalTask.onClose}
        id={id}
        type='update'
      />
    </>
  );
};

export default List;

export async function updateStatus(id, data) {
  const response = await fetch(
    `https://todo.api.devcode.gethired.id/todo-items/${id}`,
    {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json;
}
