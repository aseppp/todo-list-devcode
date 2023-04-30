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
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Badges from '../Badge/Badge';
import { RiArrowDropDownLine } from 'react-icons/ri';
import Dropdown from '../Dropdown/Dropdown';

const ModalAdd = ({ isOpen, onClose, groupId, type, id }) => {
  const [isAdd, setIsAdd] = useContext(IsAddContext);
  const [selected, setSelected] = useState('Very High');
  // const [priority, setPriority] = useState('');
  // const [name, setName] = useState('Select Priority');
  const { register, watch, handleSubmit, setValue } = useForm();

  console.log(watch());

  const onSubmit = () => {
    if (type === 'create') {
      const data = {
        title: watch('title'),
        activity_group_id: groupId,
        priority: selected,
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
      setIsAdd(!isAdd);
    }
  };

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

                  <Dropdown
                    selected={selected}
                    setSelected={setSelected}
                    data-cy='modal-add-name-input'
                  />

                  {/* <Menu data-cy='modal-add-priority-dropdown'>
                    <MenuButton
                      as={Button}
                      rightIcon={<RiArrowDropDownLine size={'25px'} />}
                    >
                      <Box display='flex' alignItems={'center'}>
                        <Badges priority={priority} />
                        <Text>{name}</Text>
                      </Box>
                    </MenuButton>

                    <MenuList>
                      <MenuItem
                        value={'very-high'}
                        name='Very High'
                        onClick={(e) => {
                          setPriority(e.target.value);
                          setName(e.target.name);
                        }}
                        data-cy='data-cy=modal-add-priority-item'
                      >
                        <Badges priority={'very-high'} />
                        Very High
                      </MenuItem>
                      <MenuItem
                        value={'high'}
                        name='High'
                        onClick={(e) => {
                          setPriority(e.target.value);
                          setName(e.target.name);
                        }}
                        data-cy='data-cy=modal-add-priority-item'
                      >
                        <Badges priority={'high'} />
                        High
                      </MenuItem>
                      <MenuItem
                        value={'normal'}
                        name='Medium'
                        onClick={(e) => {
                          setPriority(e.target.value);
                          setName(e.target.name);
                        }}
                        data-cy='data-cy=modal-add-priority-item'
                      >
                        <Badges priority={'normal'} />
                        Medium
                      </MenuItem>
                      <MenuItem
                        value={'low'}
                        name='Low'
                        onClick={(e) => {
                          setPriority(e.target.value);
                          setName(e.target.name);
                        }}
                        data-cy='data-cy=modal-add-priority-item'
                      >
                        <Badges priority={'low'} />
                        Low
                      </MenuItem>
                      <MenuItem
                        value={'very-low'}
                        name='Very Low'
                        onClick={(e) => {
                          setPriority(e.target.value);
                          setName(e.target.name);
                        }}
                        data-cy='data-cy=modal-add-priority-item'
                      >
                        <Badges priority={'very-low'} />
                        Very Low
                      </MenuItem>
                    </MenuList>
                  </Menu> */}
                </FormControl>
              </ModalBody>

              <Divider size='lg' orientation='horizontal' zIndex={1} />
              <Box
                data-cy='modal-add-save-button'
                display={'flex'}
                justifyContent='end'
                my={5}
              >
                <Button
                  type='submit'
                  colorScheme='blue'
                  mr={3}
                  onClick={() => {
                    onClose();
                    setIsAdd(!isAdd);
                  }}
                  isDisabled={!watch('title')}
                  data-cy='modal-add-save-button'
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
