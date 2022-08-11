import { Box, Heading, Text, Button, Container, Link } from '@chakra-ui/react';
// import { useNavigate } from 'react-router-dom';
import { useRouter } from 'next/router';

export default function Construction() {
    const router = useRouter();
    const gotohome = () =>
    {
        router.push('/');
    }
  return (
    <Container mt="20" maxW='2xl' centerContent>
  
    <Box textAlign="center" py={10} px={6}>
        <Heading
            display="inline-block"
            as="h2"
            size="2xl"
            bgGradient="linear(to-r, teal.400, teal.600)"
            backgroundClip="text">
            About the project
        </Heading>
    <Box paddingTop='24'>
        <Heading
            display="inline-block"
            as="h3"
            size="lg"
            bgGradient="linear(to-r, teal.400, teal.600)"
            backgroundClip="text">
            What does DYK stand for?
        </Heading>
    </Box>
    <Box padding='4'>
        DYK or DYKs as presented all over the app, are an abbreviation for Did You Know.
        DYK.digital is a community-based collection of Did You Know Facts.
    </Box>
    <Box paddingTop='18'>
        <Heading
            display="inline-block"
            as="h3"
            size="lg"
            bgGradient="linear(to-r, teal.400, teal.600)"
            backgroundClip="text">
            Technical details
        </Heading>
    </Box>
    <Box padding='4'>
        DYK.digital is a web3 project. This means it is a fully decentralized app that 
        does not have a conventional back-end to handle user authentication and data
        handling.
    </Box>
    <Box padding='2'>
        At the moment the project works on the Ethereum chain (Ropsten testnet) and
        depending on future development progress and gas cost future values, 
        the project may be launched on the main network or moved to another 
        cheaper blockchain.
    </Box>
    <Box paddingTop='18'>
        <Heading
            display="inline-block"
            as="h3"
            size="lg"
            bgGradient="linear(to-r, teal.400, teal.600)"
            backgroundClip="text">
            Usage information
        </Heading>
    </Box>
    <Box padding='4'>
        All DYKs are public. Any visitor of DYK.digital can read them. Any interaction, however,
        will require authentication.
    </Box>
    <Box padding='2'>
        The authentication process is handled by any WalletConnect compatible wallet.
        The most common are &ldquo;MetaMask&ldquo;, &ldquo;TrustWallet&ldquo;, &ldquo;My Ether Wallet (MEW)&ldquo;, etc. <br/>
        Find more information about WalletConnect <Link href="https://walletconnect.com/" passHref><strong>here</strong></Link>
    </Box>
    <Box padding='2'>
        Whenever you wish to interact with a DYK (like, comment), or post a new DYK, you will
        be prompted with a QR code or walet selector to choose your wallet in order to authenticate yourself.
        This will only take place once. <br/>
        After the authentication process, you can post a new fact or interact with the other DYKs.
    </Box>
    <Box padding='2'>
        Since this is a web3 project, any interaction that modifies the state of the smart contract
        on the blockchain will cost gas. The gas cost will depend on loads of factors and is calculated
        on the spot.<br/><br/>
        Posting a new DYK requires only the gas fee, which is usually quite small.<br/>
        Other actions such as &ldquo;Like&ldquo; or &ldquo;Comment&ldquo; are not free. A fixed ammount of rETH (currency may change before launch)
        is required. Make sure your wallet contains these funds before trying to hit the like button. <br/> <br/>
        <strong>These funds will not go to us, they will be sent straight to the DYK author!</strong><br/><br/>
        For example: <br/>
        User A posts a DYK. He does not pay anything except the gas fee for that. <br/>
        User B reads and likes User A's post. When he clicks on the &ldquo;Like&ldquo; button, he pays 0.01 rETH. The funds are sent to
        the smart contract which transfers them to User A&lsquo;s wallet.
    </Box>
      {/* <Text fontSize="18px" mt={3} mb={2}>
        Page is under construction
      </Text>
      <Text color={'gray.500'} mb={6}>
        Come back later to check its awesomeness
      </Text> */}
    <Box padding='10'>
        <Button
            colorScheme="teal"
            bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
            color="white"
            variant="solid"
            onClick={gotohome}>
            Go back Home
        </Button>
    </Box>
    </Box>
    </Container>
  );
}