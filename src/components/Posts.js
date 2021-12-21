import { Heading, Text, Box, Stack, Button } from '@chakra-ui/react'
import { BiCommentDetail } from "react-icons/bi";
import { FaArrowUp, FaArrowDown, FaShareAlt, FaFacebook, FaTwitter } from "react-icons/fa";
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

const Posts = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { title, body, id, commentCount } = props;
    const navigate = useNavigate();
    const shareAction = () => {
        if (navigator.share) {
            navigator.share({
                title: 'WebShare API Demo',
                url: 'https://dyk.digital'
        }).then(() => {
                console.log('Thanks for sharing!');
            })
        .catch(console.error);
        }else{
            onOpen()
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
                    leftIcon={<FaArrowUp />}
                >
                33
                </Button>
                <Button
                    colorScheme='blue'
                    leftIcon={<FaArrowDown />}
                >
                1
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