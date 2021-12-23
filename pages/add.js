import { useState } from 'react';
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

const AddPost = () => {
    const [ title,  setTitle ] = useState('');
    const [ body, setBody ] = useState('');
    const [ isLoading, setIsloading] =useState(false);
    const router = useRouter();
    const toast = useToast();

    const handleSubmit = () => {
        const url = process.env.REACT_APP_API_URL + '/api/posts';
        setIsloading(true);
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
            router.push('/');
            setIsloading(false);
            setTitle('');
            setBody('');
        })
    }

    return (
        <Container mt={20}>
                <Heading mt={10}>Share your DYK with us</Heading>
                <Input mt={10} placeholder='DYK title' id='postTitle' value={title} type='text' onChange={(e) => {setTitle(e.target.value)}} />
                <Textarea size="lg" resize="vertical" mt={10} value={body} placeholder='DYK fact' onChange={(e) => {setBody(e.target.value)}} />
                <Button isLoading={isLoading} mt={10} colorScheme='blue' onClick={handleSubmit}>Submit</Button>
        </Container>
    )
}

export default AddPost;