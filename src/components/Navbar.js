// import { ReactNode } from 'react';
import { Link } from "react-router-dom";
import { useSanctum } from "react-sanctum";

import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Image,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

// const NavLink = ({ children }: { children: ReactNode }) => (
//   <Link
//     px={2}
//     py={1}
//     rounded={'md'}
//     _hover={{
//       textDecoration: 'none',
//       bg: useColorModeValue('gray.200', 'gray.700'),
//     }}
//     href={'#'}>
//     {children}
//   </Link>
// );

export default function Nav() {
  const { colorMode, toggleColorMode } = useColorMode();
//   const { isOpen, onOpen, onClose } = useDisclosure();
  const { authenticated, user, signOut } = useSanctum();
  const navigate = useNavigate();

  const handleSignOut = () => {
      signOut()
      .then(() => navigate('/'))
  }
  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Box><Link to="/"><Image boxSize='150px' objectFit='contain' src="/logo_transparent.png" alt="DYK" /></Link></Box>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>

              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}>
                  <Avatar
                    size={'sm'}
                    src={'https://avatars.dicebear.com/api/male/username.svg'}
                  />
                </MenuButton>
                <MenuList alignItems={'center'}>
                  <br />
                  <Center>
                    <Avatar
                      size={'2xl'}
                      src={'https://avatars.dicebear.com/api/male/username.svg'}
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>{authenticated ? user.name : "Log In or Create an account"}</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  {authenticated ? 
                  <>
                    <MenuItem>Your posts</MenuItem>
                    <MenuItem>Account Settings</MenuItem>
                    <MenuItem>
                        <p onClick={handleSignOut}>Sign Out</p>
                    </MenuItem>
                    </>
                    :
                    <>
                    <MenuItem>
                        <Link to="/login">Log In</Link>
                    </MenuItem>
                     <MenuItem>
                        <Link to="/register">Create a new account</Link>
                    </MenuItem>
                    </>
                  }
                  
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}