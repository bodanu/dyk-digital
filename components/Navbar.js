import { useRouter } from 'next/router'
import Link from 'next/link';
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
// import { useNavigate } from 'react-router-dom';

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
  const router = useRouter();

  const handleSignOut = () => {
      signOut()
      .then(() => router.push('/'))
  }
  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex style={{zIndex: "99"}}  as="header" position="fixed" left={0} top={0} backdropFilter="saturate(180%) blur(5px)" w="100%" h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Box><Link href="/" passHref><Image boxSize='150px' objectFit='contain' src="/logo_transparent.png" alt="DYK" /></Link></Box>

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
                    mr={4}
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
                    <MenuItem><Link href="/user-posts">Your posts</Link></MenuItem>
                    <MenuItem><Link href="/construction">Account Settings</Link></MenuItem>
                    <MenuItem>
                        <p onClick={handleSignOut}>Sign Out</p>
                    </MenuItem>
                    </>
                    :
                    <>
                    <MenuItem>
                        <Link href="/login">Log In</Link>
                    </MenuItem>
                     <MenuItem>
                        <Link href="/register">Create a new account</Link>
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