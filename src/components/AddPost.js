import { useState } from 'react';
import instance from "./utils/Interceptor";
import {
  Input,
  Textarea,
  Button,
  Container,
  Heading,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react'

const AddPost = () => {
    const [ title,  setTitle ] = useState();
    const [ body, setBody ] = useState();
    const navigate = useNavigate();
    const toast = useToast();

    const handleSubmit = () => {
        const url = process.env.REACT_APP_API_URL + '/api/posts';
        instance.post(url, {
            title: title,
            body: body
        })
        .then(() =>{
            toast({
                title: 'Success!',
                description: "Your DYK has been added to the list.",
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
            navigate('/');
        })
    }

    return (
        <Container mt={20}>
                <Heading mt={10}>Share your DYK with us</Heading>
                <Input mt={10} placeholder='DYK title' id='postTitle' type='text' onChange={(e) => {setTitle(e.target.value)}} />
                <Textarea mt={10} placeholder='DYK fact' onChange={(e) => {setBody(e.target.value)}} />
                <Button mt={10} colorScheme='blue' onClick={handleSubmit}>Submit</Button>
        </Container>
    )
}

export default AddPost;