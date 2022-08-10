import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
  } from '@chakra-ui/react';
import Web3 from 'web3';
import { useEffect, useState } from 'react';
export default function Eth(){
    const [account, setAccount] = useState(); // state variable to set account.

    const abi = process.env.REACT_APP_CONTRACT_ABI;
    const contract_addr = process.env.REACT_APP_CONTRACT_ADDR;

    const [contactList, setContactList] = useState();
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        async function load() {
          const web3 = new Web3(Web3.givenProvider || "wss://ropsten.infura.io/ws/v3/a4af2f72e0954ab9895e0247dff11a83");
          const accounts = await web3.eth.requestAccounts();
          
          setAccount(accounts[0]);
        //   const addDyk = new web3.eth.Contract(abi, contract_addr);
          const contactList = new web3.eth.Contract(abi, contract_addr);
          setContactList(contactList);
          const dyks = await contactList.methods.getDyks().call();
        //   const addDyk = await contactList.methods.addDyk("Something", "Somethinf").send({from: accounts[0]});

          setContacts(dyks)
        }
        
        load();
       }, []);
    // const web3 = new Web3(Web3.givenProvider || "wss://ropsten.infura.io/ws/v3/a4af2f72e0954ab9895e0247dff11a83");
    // const accounts = web3.eth.requestAccounts();
    console.log(account)
    console.log(contacts)
    return (
        <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
              Block stuff
            </Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              below
            </Text>
          </Stack>
        </Stack>
      </Flex>
    );
}

