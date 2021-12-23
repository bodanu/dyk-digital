import { Heading, Text, Box, Stack, Button, Badge } from '@chakra-ui/react'
import { BiCommentDetail } from "react-icons/bi";
import { useState } from 'react';
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

const Posts = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { title, body, id, commentCount, likes, index } = props;
    const [like, setLike] = useState(likes)
    const router = useRouter()
    const { authenticated } = useSanctum();
    const toast = useToast();

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
    const likeThis = () => {
        if(authenticated){
            setLike(like + 1);
            const url = process.env.REACT_APP_API_URL + '/api/posts/like';
            instance.post(url, {
                post_id: id
            })
            .then((response) =>{
                console.log(response)
            })
        }else{
            toast({
                title: 'Not allowed.',
                description: "You need to be logged in in order to rate a DYK.",
                status: 'warning',
                duration: 5000,
                isClosable: true,
            });
            router.push('/login');
        }
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