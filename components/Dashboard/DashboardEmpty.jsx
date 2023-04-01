'use client';

import React from 'react';
import { Box, Image } from '@chakra-ui/react';

const Dashboard = () => {
  return (
    <>
      <Box
        data-cy="activity-empty-state"
        display="flex"
        justifyContent="center"
        my={5}
      >
        <Image src="/activity-empty-state.png" alt="" />
      </Box>
    </>
  );
};

export default Dashboard;
