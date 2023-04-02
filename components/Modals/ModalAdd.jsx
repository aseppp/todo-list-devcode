import { IsAddContext } from '@/context/IsAddContext';
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
} from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Badges from '../Badge/Badge';

const ModalAdd = ({ isOpen, onClose, groupId, type, id }) => {
  const [isAdd, setIsAdd] = useContext(IsAddContext);
  const [priority, setPriority] = useState('');
  const [name, setName] = useState('Select Priority');
  const { register, watch, handleSubmit } = useForm();

  console.log(name);

  const onSubmit = () => {
    if (type === 'create') {
      const data = {
        title: watch('title'),
        activity_group_id: groupId,
        priority: priority,
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
                  <Box data-cy="modal-add-name-input">
                    <FormLabel
                      data-cy="modal-add-priority-title"
                      textTransform={'uppercase'}
                      fontWeight="bold"
                    >
                      priority
                    </FormLabel>

                    <Menu>
                      <MenuButton as={Button}>
                        <Box display="flex" alignItems={'center'}>
                          <Badges priority={priority} />
                          <Text>{name}</Text>
                        </Box>
                      </MenuButton>
                      <MenuList data-cy="modal-add-priority-dropdown">
                        <MenuItem
                          value={'very-high'}
                          name="Very High"
                          onClick={e => {
                            setPriority(e.target.value);
                            setName(e.target.name);
                          }}
                        >
                          <Badges priority={'very-high'} />
                          Very High
                        </MenuItem>
                        <MenuItem
                          value={'high'}
                          name="High"
                          onClick={e => {
                            setPriority(e.target.value);
                            setName(e.target.name);
                          }}
                        >
                          <Badges priority={'high'} />
                          High
                        </MenuItem>
                        <MenuItem
                          value={'normal'}
                          name="Medium"
                          onClick={e => {
                            setPriority(e.target.value);
                            setName(e.target.name);
                          }}
                        >
                          <Badges priority={'normal'} />
                          Medium
                        </MenuItem>
                        <MenuItem
                          value={'low'}
                          name="Low"
                          onClick={e => {
                            setPriority(e.target.value);
                            setName(e.target.name);
                          }}
                        >
                          <Badges priority={'low'} />
                          Low
                        </MenuItem>
                        <MenuItem
                          value={'very-low'}
                          name="Very Low"
                          onClick={e => {
                            setPriority(e.target.value);
                            setName(e.target.name);
                          }}
                        >
                          <Badges priority={'very-low'} />
                          Very Low
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </Box>

                  {/* <FormLabel
                    data-cy="modal-add-priority-title"
                    textTransform={'uppercase'}
                    fontWeight="bold"
                  >
                    priority
                  </FormLabel>

                  <Select
                    data-cy="modal-add-name-input"
                    {...register('priority')}
                  >
                    <option value="very-high">Very High</option>
                    <option value="high">High</option>
                  </Select> */}
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
