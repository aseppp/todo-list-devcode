import React from 'react';
import { Box, Image } from '@chakra-ui/react';

const Activity = () => {
  return (
    <>
      <Box
        data-cy="todo-empty-state"
        display="flex"
        justifyContent="center"
        my={5}
      >
        <Image src="/todo-empty-state.png" alt="" />
      </Box>
    </>
  );
};

export default Activity;
