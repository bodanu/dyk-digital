import { useState, useEffect } from 'react';
import instance from "./utils/Interceptor";
import { VStack, StackDivider, Heading } from '@chakra-ui/react';
import SkeletonPage from './utils/SkeletonPage';
import Posts from './Posts';

const UserPosts = () => {
    //  const [posts, setPosts] = useState([]);
     const abi = JSON.parse(process.env.REACT_APP_CONTRACT_ABI);
     const contract_addr = process.env.REACT_APP_CONTRACT_ADDR;
     const [account, setAccount] = useState(); // state variable to set account.
     const [w3con, setW3con] = useState();
     const [contactList, setContactList] = useState();
     const [contacts, setContacts] = useState([]);
     let web3
     useEffect(() => {
         async function load() {
          const provider = new WalletConnectProvider({
            infuraId: "a4af2f72e0954ab9895e0247dff11a83",
          });
          await provider.enable();
          web3 = new Web3(provider);
          const accounts = await web3.eth.getAccounts();
    
          setAccount(accounts[0]);
          //  const web3 = new Web3(Web3.givenProvider || "wss://ropsten.infura.io/ws/v3/a4af2f72e0954ab9895e0247dff11a83");
         //   const accounts = await web3.eth.requestAccounts();
           
         //   setAccount(accounts[0]);
         //   const addDyk = new web3.eth.Contract(abi, contract_addr);
           const contactList = new web3.eth.Contract(abi, contract_addr);
           setContactList(contactList);
           const dyks = await contactList.methods.getDyks().call();
         //   const addDyk = await contactList.methods.addDyk("Something", "Somethinf").send({from: accounts[0]});
 
           setContacts(dyks)
         }
         
         load();
        }, []);
  // useEffect(() => {
  //   const url = process.env.REACT_APP_API_URL + '/api/userposts';
  //   instance.get(url)
  //   .then((rsp) => {
  //     setPosts(rsp.data)
  //   })
  // }, [setPosts])

  return(
      <>
        {posts.length === 0 && <SkeletonPage/>}
        <VStack
        divider={<StackDivider borderColor="gray.200" />}
        spacing={4}
        align="stretch"
        >
        <Heading>Your DYKs</Heading>
              {contacts.map((post, index) => {
                if(post.owner == account){
                  return(
                      <Posts key={index} index={index} title={post.title} body={post.body} id={post.id} commentCount="0" likes={post.likes} owner={post.owner}/>
                  )
                }
                })}
        </VStack>
    </>
  )
}

export default UserPosts;