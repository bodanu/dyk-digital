import { useState } from 'react';
import instance from "./utils/Interceptor";
import {
  Input,
  Textarea,
  Button
} from '@chakra-ui/react'

const AddPost = () => {
    const [ title,  setTitle ] = useState();
    const [ body, setBody ] = useState();

    const handleSubmit = () => {
        const url = process.env.REACT_APP_API_URL + '/api/posts';
        instance.post(url, {
            title: title,
            body: body
        })
        console.log(title)
        console.log(body)
    }

    return (
        <>
            <Input id='postTitle' type='text' onChange={(e) => {setTitle(e.target.value)}} />
            <Textarea placeholder='DYK fact' onChange={(e) => {setBody(e.target.value)}} />
            <Button colorScheme='blue' onClick={handleSubmit}>Submit</Button>
        </>
    )
}

export default AddPost;