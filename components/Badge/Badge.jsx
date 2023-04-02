import React from 'react';
import { Box } from '@chakra-ui/react';

const Badges = ({ priority }) => {
  if (priority === 'very-high') {
    return (
      <Box
        m={2}
        bg={'red'}
        width={'10px'}
        height={'10px'}
        borderRadius={'50%'}
      ></Box>
    );
  }

  if (priority === 'high') {
    return (
      <Box
        m={2}
        bg={'yellow'}
        width={'10px'}
        height={'10px'}
        borderRadius={'50%'}
      ></Box>
    );
  }

  if (priority === 'normal') {
    return (
      <Box
        m={2}
        bg={'green'}
        width={'10px'}
        height={'10px'}
        borderRadius={'50%'}
      ></Box>
    );
  }

  if (priority === 'low') {
    return (
      <Box
        m={2}
        bg={'blue'}
        width={'10px'}
        height={'10px'}
        borderRadius={'50%'}
      ></Box>
    );
  }

  if (priority === 'very-low') {
    return (
      <Box
        m={2}
        bg={'violet'}
        width={'10px'}
        height={'10px'}
        borderRadius={'50%'}
      ></Box>
    );
  }
};

export default Badges;
