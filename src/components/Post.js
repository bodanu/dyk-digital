import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";
import instance from "./utils/Interceptor";
import { useToast } from '@chakra-ui/react'
import { Heading, Text, Box, Button, Container, Textarea } from '@chakra-ui/react'
import { useSanctum } from "react-sanctum";
import Seo from './utils/SEO';


const Post = () => {
    const { id } = useParams();
    const [post, setPost] = useState();
    const [comments, setComments] = useState([]);
    const [ body, setBody ] = useState();
    const toast = useToast();
    const { authenticated } = useSanctum();
    


    useEffect(() => {
        const url = process.env.REACT_APP_API_URL + '/api/posts/' + id;
        axios.get(url)
            .then((rsp) => {
                setPost(rsp.data)
                setComments(rsp.data.comments)
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setPost])

    // console.log(post)

    const handleSubmit = () => {
        const url = process.env.REACT_APP_API_URL + '/api/posts/comment';
        instance.post(url, {
            post_id: id,
            comment_body: body
        })
        .then((response) =>{
            toast({
                title: 'Success!',
                description: "Your DYK thought been submitted.",
                status: 'success',
                duration: 1000,
                isClosable: true,
            });
            setComments((comments) => [...comments, response.data]);
            // navigate('/');
        })
    }

    const CommentCont = () => {
        return(
            comments.length === 0
                    ?
                    <Text mt={4} fontSize={'md'} color={'gray.600'}>
                            No comments yet...
                    </Text>
                    :
            comments.map((comment, key) => {
                return(
                    
                    <Box key={key}>
                        <Text mt={4} fontSize={'md'} color={'gray.600'}>
                            {comment.user.name} wrote: 
                        </Text>
                    <Text fontSize={'lg'} mt={4}>{comment.body}</Text>
                    </Box>
                )
            })
        )
    }

    return(
        <Container>
        
        {post 
            ?
            <Box p={5} shadow='md' borderWidth='1px'>
            <Seo title={post.title} description={post.body} url={"https://dyk.digital/post/" + post.id}/>
                <Heading>{post.title}</Heading>
                <Text>{post.body}</Text>
                <Box>
                <Heading mt={10}>Comments:</Heading>
                <CommentCont/>
                </Box>
                {
                    
                    authenticated 
                    ?
                    <Box>
                    <Heading mt={10}>Share your DYK thoughts</Heading>
                    <Textarea mt={10} placeholder='DYK comment' onChange={(e) => {setBody(e.target.value)}} />
                    <Button mt={10} colorScheme='blue' onClick={handleSubmit}>Submit</Button>
                    </Box>
                    :
                    <Box mt={12}>
                    <Text>You need to be authenticated in order to share your thoughts</Text>
                    </Box>
                    
                }
                
            </Box>
            :
            <Box p={5} shadow='md' borderWidth='1px'>
            </Box>
        }
        </Container>
    )

}

export default Post;