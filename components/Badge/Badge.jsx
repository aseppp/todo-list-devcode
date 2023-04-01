import React from 'react';
import { Box } from '@chakra-ui/react';

const Badges = ({ priority }) => {
  if (priority === 'very-high') {
    return (
      <Box bg={'red'} width={'10px'} height={'10px'} borderRadius={'50%'}></Box>
    );
  }

  if (priority === 'high') {
    return (
      <Box
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
        bg={'violet'}
        width={'10px'}
        height={'10px'}
        borderRadius={'50%'}
      ></Box>
    );
  }
};

export default Badges;
