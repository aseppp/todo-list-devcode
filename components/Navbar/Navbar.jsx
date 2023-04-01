'use client';

import React from 'react';
import { Box, Container, Text } from '@chakra-ui/react';

const Navbar = () => {
  return (
    <>
      <header data-cy="header-background">
        <Box
          width={'100%'}
          height="105px"
          backgroundColor={'#16ABF8'}
          display="flex"
          alignItems="center"
        >
          <Container maxW={['100%', '100%', '1100px']}>
            <Text
              data-cy="header-title"
              color="white"
              fontWeight="bold"
              fontSize={['lg', 'lg', '2xl']}
              lineHeight="36px"
            >
              TO DO LIST APP
            </Text>
          </Container>
        </Box>
      </header>
    </>
  );
};

export default Navbar;
