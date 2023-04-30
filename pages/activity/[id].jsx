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
  Image,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';
import { IoIosArrowBack } from 'react-icons/io';
import { TbPencil, TbArrowsDownUp } from 'react-icons/tb';

const DetailsActivity = () => {
  const router = useRouter();
  const activityId = router.query.id;

  const [result, setResult] = useState(null);
  const [edit, setEdit] = useState(false);
  const [isFocus, setIsFocus] = useState(false);

  const [isAdd] = useContext(IsAddContext);
  const [isDelete] = useContext(AlertContext);
  const [selected, setSelected] = useState('');
  const [todoItems, setTodoItems] = useState([]);

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

  // console.log({ todoItems, selected });

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

  return (
    <>
      <Head>
        <title>Todo List App - {result?.title}</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Container data-cy='new-activity' maxW={['100%', '100%', '1000px']}>
        {isDelete && (
          <Box data-cy='modal-information' pt={3}>
            <Alert data-cy='modal-information' status='success' variant='solid'>
              <AlertIcon />
              Delete task success!
            </Alert>
          </Box>
        )}
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
            <Menu closeOnSelect={true}>
              <MenuButton as={Button} data-cy='todo-sort-button'>
                <Icon as={TbArrowsDownUp} />
              </MenuButton>

              <MenuList data-cy='sort-selection'>
                <MenuItem
                  onClick={(e) => setSelected(e.target.value)}
                  value={'terbaru'}
                >
                  Terbaru
                </MenuItem>
                <MenuItem
                  data-cy='sort-selection'
                  onClick={(e) => setSelected(e.target.value)}
                  value={'terlama'}
                >
                  Terlama
                </MenuItem>
                <MenuItem
                  data-cy='todo-sort-button'
                  onClick={(e) => setSelected(e.target.value)}
                  value={'asc'}
                >
                  A-Z
                </MenuItem>
                <MenuItem
                  data-cy='todo-sort-button'
                  onClick={(e) => setSelected(e.target.value)}
                  value={'desc'}
                >
                  Z-A
                </MenuItem>
                <MenuItem
                  onClick={(e) => setSelected(e.target.value)}
                  value={'belum-selesai'}
                >
                  Belum Selesai
                </MenuItem>
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
            {todoItems
              ?.sort((a, b) => {
                if (selected === 'terbaru') {
                  const id1 = a.id;
                  const id2 = b.id;
                  if (id1 > id2) return -1;
                } else if (selected === 'terlama') {
                  const id1 = a.id;
                  const id2 = b.id;
                  if (id1 < id2) return -1;
                } else if (selected === 'asc') {
                  const title1 = a.title;
                  const title2 = b.title;
                  if (title1 < title2) return -1;
                } else if (selected === 'desc') {
                  const title1 = a.title;
                  const title2 = b.title;
                  if (title1 > title2) return -1;
                } else if (selected === 'belum-selesai') {
                  console.log(selected);
                  const task1 = a.is_active;
                  const task2 = b.is_active;
                  if (task1 > task2) return -1;
                } else {
                  return 0;
                }
              })
              ?.map((item, key) => (
                <Box key={key} data-cy='list-item'>
                  <List
                    title={item?.title}
                    priority={item.priority}
                    id={item.id}
                    is_active={item.is_active}
                  />
                </Box>
              ))}
          </Box>
        ) : (
          <Activity />
        )}

        {/* {todoItems?.length > 0 ? (
          <Box>
            {todoItems?.map((item, key) => (
              <Box key={key} data-cy='list-item'>
                <List
                  title={item?.title}
                  priority={item.priority}
                  id={item.id}
                  is_active={item.is_active}
                />
              </Box>
            ))}
          </Box>
        ) : (
          <Activity />
        )} */}
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
