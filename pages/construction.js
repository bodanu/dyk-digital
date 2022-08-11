import { Box, Heading, Text, Button, Container } from '@chakra-ui/react';
// import { useNavigate } from 'react-router-dom';
import { useRouter } from 'next/router';

export default function Construction() {
    const router = useRouter();
    const gotohome = () =>
    {
        router.push('/');
    }
  return (
    <Container mt="20" as="main">
    <Box textAlign="center" py={10} px={6}>
      <Heading
        display="inline-block"
        as="h2"
        size="2xl"
        bgGradient="linear(to-r, teal.400, teal.600)"
        backgroundClip="text">
        Under construction
      </Heading>
      <Text fontSize="18px" mt={3} mb={2}>
        Page is under construction
      </Text>
      <Text color={'gray.500'} mb={6}>
        Come back later to check its awesomeness
      </Text>

      <Button
        colorScheme="teal"
        bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
        color="white"
        variant="solid"
        onClick={gotohome}>
        Go back Home
      </Button>
    </Box>
    </Container>
  );
}