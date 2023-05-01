import ModalAdd from '@/components/Modals/ModalAdd';
import List from '@/components/Todo/List';
import Activity from '@/components/Todo/TodoEmpty';
import { AlertContext } from '@/context/AlertContext';
import { IsAddContext } from '@/context/IsAddContext';
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Container,
  FormControl,
  Icon,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';
import { IoIosArrowBack } from 'react-icons/io';
import { MdDone } from 'react-icons/md';
import { TbPencil, TbArrowsDownUp } from 'react-icons/tb';

const options = [
  { title: 'Terbaru', value: 'latest', imageUrl: '/filter/terbaru.png' },
  { title: 'Terlama', value: 'oldest', imageUrl: '/filter/terlama.png' },
  { title: 'A-Z', value: 'az', imageUrl: '/filter/a-z.png' },
  { title: 'Z-A', value: 'za', imageUrl: '/filter/z-a.png' },
  {
    title: 'Belum Selesai',
    value: 'unfinished',
    imageUrl: '/filter/unfinish.png',
  },
];

const DetailsActivity = () => {
  const router = useRouter();
  const activityId = router.query.id;

  const [result, setResult] = useState(null);
  const [edit, setEdit] = useState(false);
  const [isFocus, setIsFocus] = useState(false);

  const [isAdd] = useContext(IsAddContext);
  const [isDelete] = useContext(AlertContext);
  const [selected, setSelected] = useState('latest');
  const [todoItems, setTodoItems] = useState();

  const modalAdd = useDisclosure();
  const { register, watch, setValue } = useForm();

  const titleRef = useRef();
  const inputRef = useRef();
  const editRef = useRef();

  useEffect(() => {
    fetch(`https://todo.api.devcode.gethired.id/activity-groups/${activityId}`)
      .then((res) => res.json())
      .then((data) => {
        setResult(data);
        setTodoItems(data?.todo_items);
        setValue('todo-title', data?.title);
      });
  }, [isAdd, activityId, setValue, isDelete, setResult]);

  const onSubmit = () => {
    const data = {
      title: watch('todo-title'),
    };

    updateTitle(activityId, data);
    setIsFocus(false);
  };

  useEffect(() => {
    setValue('todo-title', watch('todo-title'));
  }, [setValue, watch]);

  useEffect(() => {
    if (edit) inputRef.current.focus();
  }, [edit]);

  useEffect(() => {
    if (!isFocus) setEdit(false);
  }, [isFocus]);

  const onFocus = () => setIsFocus(true);
  const handleShowInput = (e) => {
    if (
      e.target === inputRef.current ||
      e.target === titleRef.current ||
      e.target === editRef.current
    ) {
      setEdit(true);
      setValue('todo-title', watch('todo-title'));
    } else {
      setEdit(false);
    }
  };

  const handleDropdown = (option) => {
    setSelected(option);
  };

  const handleCheck = (data) => {
    setTodoItems(data);
  };

  const handleFilter = (selected) => {
    switch (selected) {
      case 'latest':
        return todoItems?.sort((a, b) => b.id - a.id);
      case 'oldest':
        return todoItems?.sort((a, b) => a.id - b.id);
      case 'az':
        return todoItems?.sort((a, b) =>
          b.title.localeCompare(a.title.localeCompare)
        );
      // return todoItems?.sort(function (a, b) {
      //   if (a.title > b.title) {
      //     return 1;
      //   } else if (a.title < b.title) {
      //     return -1;
      //   } else {
      //     return 0;
      //   }
      // });
      case 'za':
        return todoItems?.sort((a, b) => -1 * b.title.localeCompare(a.title));
      case 'unfinished':
        return todoItems?.sort((a, b) => b.is_active - a.is_active);
      default:
        return todoItems?.sort((a, b) => b.id - a.id);
    }
  };

  return (
    <>
      <Head>
        <title>Todo List App - {result?.title}</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Container data-cy='new-activity' maxW={['100%', '100%', '1000px']}>
        <Box data-cy='modal-information' pt={3}>
          {isDelete && (
            <Alert data-cy='modal-information' status='success' variant='solid'>
              <AlertIcon />
              Delete task success!
            </Alert>
          )}
        </Box>

        <Box
          my={8}
          display='flex'
          justifyContent={'space-between'}
          alignItems='center'
          onClick={(e) => handleShowInput(e)}
        >
          <Box display='flex' alignItems='center' gap={4}>
            <Icon
              as={IoIosArrowBack}
              w={6}
              h={6}
              onClick={() => router.back()}
            />

            <FormControl display={'flex'} alignItems='center'>
              {edit ? (
                <Input
                  {...register('todo-title')}
                  value={watch('todo-title' || '')}
                  type={'text'}
                  fontWeight='bold'
                  fontSize={'3xl'}
                  variant={'unstyled'}
                  onBlur={onSubmit}
                  onFocus={onFocus}
                  onChange={(e) => setValue('todo-title', e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && onSubmit()}
                  ref={inputRef}
                  data-cy='todo-title'
                />
              ) : (
                <Text
                  fontWeight='bold'
                  fontSize={'3xl'}
                  data-cy='todo-title'
                  ref={titleRef}
                >
                  {watch('todo-title')}
                </Text>
              )}

              <Button
                onClick={() => setEdit(!edit)}
                variant={'unstyled'}
                display='flex'
                alignItems={'center'}
                data-cy='todo-title-edit-button'
                ref={editRef}
              >
                <Icon as={TbPencil} w={6} h={6} color='#C4C4C4' />
              </Button>
            </FormControl>
          </Box>

          <Box display='flex' alignItems='center' gap={3}>
            <Menu closeOnSelect={true} data-cy='sort-selection'>
              <MenuButton as={Button} data-cy='todo-sort-button'>
                <Icon as={TbArrowsDownUp} />
              </MenuButton>

              <MenuList data-cy='sort-selection'>
                {options.map((item, key) => (
                  <MenuItem
                    key={key}
                    value={item.value}
                    onClick={() => {
                      handleDropdown(item.value);
                      handleFilter(item.value);
                    }}
                    data-cy='sort-selection'
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'space-between'}
                  >
                    <Box
                      display={'flex'}
                      alignItems={'center'}
                      gap={3}
                      data-cy='sort-selection'
                    >
                      <Image
                        data-cy='sort-selection-icon'
                        src={item.imageUrl}
                        width={25}
                        height={25}
                        alt=''
                      />
                      <Box
                        data-cy={`${
                          selected === item.value
                            ? 'sort-selection-selected'
                            : 'false'
                        }`}
                      >
                        <Text data-cy='sort-selection-title'>{item.title}</Text>
                      </Box>
                    </Box>

                    {selected === item.value && (
                      <Icon as={MdDone} w={5} h={5} color={'#4A4A4A'} />
                    )}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>

            <Button
              data-cy='todo-add-button'
              onClick={modalAdd.onOpen}
              leftIcon={<AiOutlinePlus color='white' />}
              background='#16ABF8'
              color='white'
              _hover={{ bg: '#16ABF8' }}
              size='lg'
              borderRadius={'3xl'}
            >
              <Text>Tambah</Text>
            </Button>
          </Box>
        </Box>

        {todoItems?.length > 0 ? (
          <Box>
            {todoItems?.map((item, key) => (
              <Box key={key} data-cy='list-item'>
                <List
                  title={item?.title}
                  priority={item.priority}
                  id={item.id}
                  is_active={item.is_active}
                  listItems={todoItems}
                  setListItems={handleCheck}
                />
              </Box>
            ))}
          </Box>
        ) : (
          <Activity />
        )}
      </Container>

      <ModalAdd
        isOpen={modalAdd.isOpen}
        onClose={modalAdd.onClose}
        groupId={result?.id}
        type='create'
      />
    </>
  );
};

export default DetailsActivity;

export async function updateTitle(id, data) {
  const response = await fetch(
    `https://todo.api.devcode.gethired.id/activity-groups/${id}`,
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
