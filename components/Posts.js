import { Heading, Text, Box, Stack, Button, Badge } from '@chakra-ui/react'
import { BiCommentDetail } from "react-icons/bi";
import { useState, useEffect } from 'react';
import { FaArrowUp, FaShareAlt, FaFacebook, FaTwitter } from "react-icons/fa";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from '@chakra-ui/react'
import instance from "./utils/Interceptor";
import { useSanctum } from "react-sanctum";
import { useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router'
import Link from 'next/link';
import Web3 from 'web3';
import Web3Utils from 'web3-utils';

const Posts = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { title, body, id, commentCount, likes, index, owner } = props;
    const [like, setLike] = useState(likes)
    const router = useRouter()
    const { authenticated } = useSanctum();
    const toast = useToast();
    const [account, setAccount] = useState(); // state variable to set account.
    const [w3con, setW3con] = useState();
    const [test, setTest]  = useState()

    const abi = JSON.parse(process.env.REACT_APP_CONTRACT_ABI);
    const contract_addr = process.env.REACT_APP_CONTRACT_ADDR;

    let web3

    useEffect(() => {
        setTest(window.ethereum)
        async function load() {
        
       
          if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined')
            {
                // we are in the browser and metamask is running
                // window.ethereum.request({ method: "eth_requestAccounts" });
                // web3 = new Web3(window.ethereum);
                const eth = window.ethereum;
                web3 = new Web3(eth || "https://ropsten.infura.io/ws/v3/a4af2f72e0954ab9895e0247dff11a83");
                const accounts = await web3.eth.requestAccounts();
          
                setAccount(accounts[0]);
            }
            else
            {
                // we are on the server *OR* the user is not running metamask
                // https://medium.com/jelly-market/how-to-get-infura-api-key-e7d552dd396f
                const provider = new Web3.providers.HttpProvider("https://ropsten.infura.io/ws/v3/a4af2f72e0954ab9895e0247dff11a83");
                web3 = new Web3(provider);
                const accounts = await web3.eth.requestAccounts();
          
                setAccount(accounts[0]);
            }
          
          
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

    const shareAction = () => {
        if (navigator.share) {
            navigator.share({
                title: title,
                url: 'https://dyk.digital/posts/'+id
        }).then(() => {
                console.log('Thanks for sharing!');
            })
        .catch(console.error);
        }else{
            onOpen()
        }
    }
    // const likeThis = () => {
    //     if(authenticated){
    //         setLike(like + 1);
    //         const url = process.env.REACT_APP_API_URL + '/api/posts/like';
    //         instance.post(url, {
    //             post_id: id
    //         })
    //         .then((response) =>{
    //             console.log(response)
    //         })
    //     }else{
    //         toast({
    //             title: 'Not allowed.',
    //             description: "You need to be logged in in order to rate a DYK.",
    //             status: 'warning',
    //             duration: 5000,
    //             isClosable: true,
    //         });
    //         router.push('/login');
    //     }
    // }
    const likeThis = () => {
        const amountToSend = Web3Utils.toWei("0.01", "ether");
        w3con.methods.likeDyk(id, owner).send({from: account, value: amountToSend})
        .then(function(receipt){
            // receipt can also be a new contract instance, when coming from a "contract.deploy({...}).send()"
            toast({
                title: 'Success!',
                description: "Your DYK has been added to the list.",
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
        });
    }
    const BasicUsage = () => {
        
        return (
            <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Share this DYK</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                <Stack mt={8} direction={['column', 'row']} justify="space-evenly">
                     <Button onClick={() => window.open("https://www.facebook.com/sharer/sharer.php?u=http://dyk.digital/posts/"+id, "pop", "width=600, height=400, scrollbars=no")} colorScheme='facebook' leftIcon={<FaFacebook />}>
                        Facebook
                    </Button>
                    <Button colorScheme='twitter' leftIcon={<FaTwitter />}>
                        Twitter
                    </Button>
                </Stack>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={onClose}>
                    Close
                    </Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
            </>
        )
        }


    return (
        <Box p={5} shadow='md' borderWidth='1px'>
        <Stack direction={['column', 'row']} justify="left" spacing='24px'>
        {
            index < 2 
            &&
            <Badge ml='1' colorScheme='green'>
                NEW
            </Badge>
        }
        {
            like > 1 
            &&
            <Badge ml='1' colorScheme='red'>
                HOT
            </Badge>
        }
        {
            commentCount > 1 
            &&
            <Badge ml='1' colorScheme='red'>
                TRENDING
            </Badge>
        }
        

        </Stack>
            <Heading><Link href={"/posts/"+id}>{title}</Link></Heading>
            <Text>{body}</Text>
            <hr/>
            <Text fontSize='xs' as="em">Author - {owner}</Text>
            <Stack mt={8} direction={['column', 'row']} justify="space-evenly" spacing='24px'>
                <Button
                    colorScheme='blue'
                    leftIcon={<FaArrowUp/>}
                    onClick={likeThis} 
                    >
                {like}
                </Button>
                <Button
                    onClick={() => router.push('/posts/'+id)}
                    colorScheme='blue'
                    leftIcon={<BiCommentDetail />}
                >
                {commentCount}
                </Button>
                 <Button
                    colorScheme='blue'
                    leftIcon={<FaShareAlt />}
                    onClick={shareAction}
                >
                </Button>
            </Stack>
            <BasicUsage/>
        </Box>
    )
}

export default Posts;