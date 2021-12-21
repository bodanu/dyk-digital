import { useState, useEffect } from 'react';
import { ChakraProvider, Container, VStack, StackDivider } from '@chakra-ui/react';
import axios from "axios";
import theme from './theme';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { Sanctum } from "react-sanctum";



//components
import Nav from './components/Navbar';
import AddPost from './components/AddPost';
import Posts from './components/Posts';
import Post from './components/Post';
import Construction from './components/Construction';
import SkeletonPage from './components/utils/SkeletonPage';
import Floater from './components/utils/Floater';
// import ColorModeToggle from './components/ColorModeToggle';

function App() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const url = process.env.REACT_APP_API_URL + '/api/posts';
    axios.get(url)
    .then((rsp) => {
      setPosts(rsp.data)
    })
  }, [setPosts])

  const sanctumConfig = {
  apiUrl: process.env.REACT_APP_API_URL,
  csrfCookieRoute: "sanctum/csrf-cookie",
  signInRoute: "api/login",
  signOutRoute: "api/logout",
  userObjectRoute: "api/user",
};


  console.log(posts);
  return (
    <BrowserRouter>
      <Sanctum config={sanctumConfig}>
      <ChakraProvider theme={theme}>
      <Nav/>
        <Routes>
          <Route path="/" element={
            <Container>
              {posts.length === 0 && <SkeletonPage/>}
              <VStack
                divider={<StackDivider borderColor='gray.200' />}
                spacing={4}
                align='stretch'
              >
                  {posts.map((post, key) => {
                    return(
                        <Posts key={key} title={post.title} body={post.body} id={post.id} commentCount={post.comments_count} likes={post.likers_count}/>
                    )
                  })}
                </VStack>
              </Container>} />
              <Route path="post/:id" element={<Post />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="add" element={<AddPost />} />
            <Route path="construction" element={<Construction />} />
        </Routes>
        <Floater />
      </ChakraProvider>
      </Sanctum>
    </BrowserRouter>
  );
}

export default App;
