// import { useState, useEffect } from 'react';
import { Container, VStack, StackDivider, Heading } from '@chakra-ui/react';
import axios from "axios";
import Head from 'next/head'

import Login from './../components/auth/Login';
import Register from './../components/auth/Register';

import Link from 'next/link'



//components

// import AddPost from './../components/AddPost';
import Posts from './../components/Posts';
// import Post from './../components/Post';
// import Construction from './../components/Construction';
import SkeletonPage from './../components/utils/SkeletonPage';

// import UserPosts from './../components/UserPosts';
// import ColorModeToggle from './components/ColorModeToggle';

function App({ posts }) {
  // const [posts, setPosts] = useState([]);
  // useEffect(() => {
  //   const url = process.env.REACT_APP_API_URL + '/api/posts';
  //   axios.get(url)
  //   .then((rsp) => {
  //     setPosts(rsp.data)
  //   })
  // }, [setPosts])




  return (
      <>
      <Head>
        <title>DYK facts</title>
        <meta name="description" content="World's greates collection of Did You Know facts. Read, share and learn new things." />
        <meta property="og:title" content="DYK facts" />
        <meta property="og:description" content="CWorld's greates collection of Did You Know facts. Read, share and learn new things." />
        <meta property="og:url" content="https://dyk.digital/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://dyk.digital/logo_transparent.png" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container mt="20" as="main">
        <>
          {posts.length === 0 && <SkeletonPage/>}
          <VStack
            divider={<StackDivider borderColor="gray.200" />}
            spacing={4} 
            align='stretch'
          >
          <Heading>Top DYKs</Heading>
              {posts.map((post, index) => {
                return(
                    <Posts key={index} index={index} title={post.title} body={post.body} id={post.id} commentCount={post.comments_count} likes={post.likers_count}/>
                )
              })}
          </VStack>
        </>
        </Container>
        </>
  );
}

export default App;

export async function getServerSideProps(context) {
  // const url = process.env.REACT_APP_API_URL + '/api/posts';

  const request = await axios.get(process.env.REACT_APP_API_URL + '/api/posts')

  return {
    props: {
      posts: request.data
    },
  }
}
