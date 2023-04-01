import React, { useState } from 'react';
import { Box, Button, Checkbox, Text, Icon } from '@chakra-ui/react';
import { FiTrash2 } from 'react-icons/fi';
import { TbPencil } from 'react-icons/tb';
import Badges from '../Badge/Badge';

const List = ({ title, priority, id, is_active }) => {
  const [modal, setModal] = useState(false);
  const [isChecked, setIsChecked] = useState(is_active === 0);

  const handleUpdate = () => {
    if (is_active === 0) {
      const status = {
        is_active: 1,
      };
      updateStatus(id, status);
    }
    if (is_active === 1) {
      const status = {
        is_active: 0,
      };
      updateStatus(id, status);
    }
  };

  const handleChecked = () => {
    setIsChecked((prevValue) => !prevValue);
    handleUpdate();
  };

  return (
    <>
      <Box
        data-cy="todo-item"
        bg={'white'}
        borderRadius="lg"
        boxShadow={'0px 6px 10px rgba(0, 0, 0, 0.1)'}
        padding={6}
        display="flex"
        alignItems={'center'}
        justifyContent="space-between"
        mt={3}
      >
        <Box display="flex" alignItems={'center'} gap={5}>
          <Checkbox
            data-cy="todo-item-checkbox"
            size={'lg'}
            onChange={() => handleChecked()}
            isChecked={isChecked}
          />
          <Badges data-cy="todo-item-priority-indicator" priority={priority} />

          <Text
            data-cy="todo-item-title"
            fontSize={'18px'}
            lineHeight="27px"
            fontWeight={500}
          >
            {title}
          </Text>
          <Button
            data-cy="todo-item-edit-button"
            variant={'unstyled'}
            display="flex"
            alignItems={'center'}
            onClick={() => {
              modalTodo.onOpen();
              setModal(!modal);
            }}
          >
            <Icon as={TbPencil} w={6} h={6} color="#C4C4C4" />
          </Button>
        </Box>

        <Button
          data-cy="todo-item-delete-button"
          variant={'unstyled'}
          onClick={() => {
            modalDelete.onOpen();
            setModal(!modal);
          }}
        >
          <Icon as={FiTrash2} w={5} h={5} color="#C4C4C4" />
        </Button>
      </Box>

      {/* <Modals
        type={'add-items'}
        isOpen={modalTodo.isOpen}
        onClose={modalTodo.onClose}
        groupId={id}
        action='task-update'
        id={id}
        title={title}
      />

      <Modals
        type={'modal-delete'}
        isOpen={modalDelete.isOpen}
        onClose={modalDelete.onClose}
        groupId={id}
        action='task-delete'
        id={id}
        title={title}
      /> */}
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
