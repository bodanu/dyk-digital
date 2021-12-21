import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useSanctum } from "react-sanctum";
// import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link as Rlink } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const { signIn } = useSanctum();
    const navigate = useNavigate();

    const handleLogin = () => {
        signIn(email, password)
        .then(() => navigate("/"))
        .catch(() => window.alert("Incorrect email or password"));
    }
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" onChange={(e) => setPassword(e.target.value)} />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Checkbox>Remember me</Checkbox>
                <Link color={'blue.400'}>Forgot password?</Link>
              </Stack>
              <Button
                bg={'blue.400'}
                color={'white'}
                onClick={handleLogin}
                _hover={{
                  bg: 'blue.500',
                }}>
                Sign in
              </Button>
               <Stack align={'center'}>
                <Text fontSize={'lg'}>
                    OR
                </Text>
                <Link as={Rlink} to="/register" color={'blue.400'}>Create a new account</Link>
                </Stack>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}