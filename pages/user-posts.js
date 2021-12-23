import { useState, useEffect } from 'react';
import instance from "./../components/utils/Interceptor";
import { VStack, StackDivider, Heading, Container } from '@chakra-ui/react';
import SkeletonPage from './../components/utils/SkeletonPage';
import Posts from './../components/Posts';

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
      <Container mt={20}>
        {posts.length === 0 && <SkeletonPage/>}
        <VStack
        divider={<StackDivider borderColor="gray.200" />}
        spacing={4}
        align="stretch"
        >
        <Heading>Your DYKs</Heading>
            {posts.map((post, index) => {
            return(
                <Posts key={index} index={index} title={post.title} body={post.body} id={post.id} commentCount={post.comments_count} likes={post.likers_count}/>
            )
            })}
        </VStack>
    </ Container>
  )
}

export default UserPosts;

// export async function getServerSideProps() {
// //   const url = process.env.REACT_APP_API_URL + '/api/posts';


//   const request = await instance.get(process.env.REACT_APP_API_URL + '/api/userposts/')
// //   console.log(id.params.id)

//   return {
//     props: {
//       posts: request.data
//     },
//   }
// }