import { useState, useEffect } from 'react';
import instance from "./utils/Interceptor";
import { VStack, StackDivider, Heading } from '@chakra-ui/react';
import SkeletonPage from './utils/SkeletonPage';
import Posts from './Posts';

const UserPosts = () => {
     const [posts, setPosts] = useState([]);
  useEffect(() => {
    const url = process.env.REACT_APP_API_URL + '/api/userposts';
    instance.get(url)
    .then((rsp) => {
      setPosts(rsp.data)
    })
  }, [setPosts])

  return(
      <>
        {posts.length === 0 && <SkeletonPage/>}
        <VStack
        divider={<StackDivider borderColor='gray.200' />}
        spacing={4}
        align='stretch'
        >
        <Heading>Your DYK's</Heading>
            {posts.map((post, index) => {
            return(
                <Posts key={index} index={index} title={post.title} body={post.body} id={post.id} commentCount={post.comments_count} likes={post.likers_count}/>
            )
            })}
        </VStack>
    </>
  )
}

export default UserPosts;