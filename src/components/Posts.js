import { Heading, Text, Box, Stack, Button } from '@chakra-ui/react'
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
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import instance from "./utils/Interceptor";
import { useSanctum } from "react-sanctum";
import { useToast } from '@chakra-ui/react';
import Seo from './utils/SEO';

const Posts = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { title, body, id, commentCount, likes } = props;
    const [like, setLike] = useState(likes)
    const navigate = useNavigate();
    const { authenticated } = useSanctum();
    const toast = useToast();

    const shareAction = () => {
        if (navigator.share) {
            navigator.share({
                title: title,
                url: 'https://dyk.digital/post/'+id
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
            navigate('/login');
        }
    }
    const BasicUsage = () => {
        
        return (
            <>
            <Seo title="DYK Facts" description="World's greates collection of Did You Know facts. Read, share and learn new things." url="https://dyk.digital"/>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Share this DYK</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                <Stack mt={8} direction={['column', 'row']} justify="space-evenly">
                     <Button onClick={() => window.open("https://www.facebook.com/sharer/sharer.php?u=http://dyk.digital/post/"+id, "pop", "width=600, height=400, scrollbars=no")} colorScheme='facebook' leftIcon={<FaFacebook />}>
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
            <Heading><Link to={"/post/"+id}>{title}</Link></Heading>
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
                    onClick={() => navigate('/post/'+id)}
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