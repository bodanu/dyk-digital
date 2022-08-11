import { useState, useEffect } from 'react';
import instance from "./../components/utils/Interceptor";
import {
  Input,
  Textarea,
  Button,
  Container,
  Heading,
} from '@chakra-ui/react'
import { useRouter } from 'next/router';
import { useToast } from '@chakra-ui/react'
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3 from 'web3';

const CryptoAddPost = () => {
    const [ title,  setTitle ] = useState('');
    const [ body, setBody ] = useState('');
    const [ isLoading, setIsloading] =useState(false);
    const router = useRouter();
    const toast = useToast();
    const [account, setAccount] = useState(); // state variable to set account.
    const [w3con, setW3con] = useState();

    const abi = JSON.parse(process.env.REACT_APP_CONTRACT_ABI);
    const contract_addr = process.env.REACT_APP_CONTRACT_ADDR;

    let web3
  
      



    useEffect(() => {
        async function load() {
        
       
        //   if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined')
        //     {
        //         // we are in the browser and metamask is running
        //         // window.ethereum.request({ method: "eth_requestAccounts" });
        //         // web3 = new Web3(window.ethereum);
        //         const eth = window.ethereum;
        //         web3 = new Web3(eth || "https://ropsten.infura.io/ws/v3/a4af2f72e0954ab9895e0247dff11a83");
        //         const accounts = await web3.eth.requestAccounts();
          
        //         setAccount(accounts[0]);
        //     }
        //     else
        //     {
        //         // we are on the server *OR* the user is not running metamask
        //         // https://medium.com/jelly-market/how-to-get-infura-api-key-e7d552dd396f
        //         const provider = new Web3.providers.HttpProvider("https://ropsten.infura.io/ws/v3/a4af2f72e0954ab9895e0247dff11a83");
        //         web3 = new Web3(provider);
        //         const accounts = await web3.eth.requestAccounts();
          
        //         setAccount(accounts[0]);
        //     }
        const provider = new WalletConnectProvider({
            infuraId: "a4af2f72e0954ab9895e0247dff11a83",
        });
        await provider.enable();
        web3 = new Web3(provider);
        const accounts = await web3.eth.getAccounts();
    
        setAccount(accounts[0]);
          
          //   const addDyk = new web3.eth.Contract(abi, contract_addr);
        const contract = new web3.eth.Contract(abi, contract_addr);
        setW3con(contract)
        //   setContactList(contactList);
        //   const dyks = await contactList.methods.getDyks().call();
        //   const addDyk = await contactList.methods.addDyk("Something", "Somethinf").send({from: accounts[0]});

        //   setContacts(dyks)
        }
        
        load();
    }, []);

    const handleSubmit = () => {
        // const url = process.env.REACT_APP_API_URL + '/api/posts';
        setIsloading(true);
        w3con.methods.addDyk(title, body).send({from: account})
        .then(function(receipt){
            // receipt can also be a new contract instance, when coming from a "contract.deploy({...}).send()"
            toast({
                title: 'Success!',
                description: "Your DYK has been added to the list.",
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
            router.push('/');
            setIsloading(false);
            setTitle('');
            setBody('');
        });
        
    }

    return (
        <Container mt={20}>
                <Heading mt={10}>Share your DYK with us (it may take up to 5 network confirmations for the dyk to show up)</Heading>
                <p>You are: {account}</p>
                <Input mt={10} placeholder='Dyd you know...' id='postTitle' value={title} type='text' onChange={(e) => {setTitle(e.target.value)}} />
                <Textarea isRequired size="lg" resize="vertical" mt={10} value={body} placeholder='DYK fact' onChange={(e) => {setBody(e.target.value)}} />
                <Button isLoading={isLoading} mt={10} colorScheme='blue' onClick={handleSubmit}>Submit</Button>
        </Container>
    )
}

export default CryptoAddPost;