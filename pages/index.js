// import { useState, useEffect } from 'react';
import { Container, VStack, StackDivider, Heading, Divider } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons'
import axios from "axios";
import Head from 'next/head'

import Login from './../components/auth/Login';
import Register from './../components/auth/Register';
import Router from 'next/router'

import Link from 'next/link'



//components

// import AddPost from './../components/AddPost';
import Posts from './../components/Posts';
// import Post from './../components/Post';
// import Construction from './../components/Construction';
import SkeletonPage from './../components/utils/SkeletonPage';

// import UserPosts from './../components/UserPosts';
// import ColorModeToggle from './components/ColorModeToggle';
import Web3 from 'web3';
import { useEffect, useState } from 'react';
import WalletConnectProvider from "@walletconnect/web3-provider";

export default function Eth(){
    const [account, setAccount] = useState(); // state variable to set account.

    const abi = JSON.parse(process.env.REACT_APP_CONTRACT_ABI);
    const contract_addr = process.env.REACT_APP_CONTRACT_ADDR;

    const [contactList, setContactList] = useState();
    let [contacts, setContacts] = useState([]);
    const [chain, setChain] = useState();
    let web3
    const provider = new WalletConnectProvider({
      infuraId: "a4af2f72e0954ab9895e0247dff11a83",
    });
    useEffect(() => {
        async function load() {
       
        await provider.enable();
        web3 = new Web3(provider);
          // const web3 = new Web3(Web3.givenProvider || "wss://ropsten.infura.io/ws/v3/a4af2f72e0954ab9895e0247dff11a83");
        //   const accounts = await web3.eth.requestAccounts();
          
        //   setAccount(accounts[0]);
        //   const addDyk = new web3.eth.Contract(abi, contract_addr);
        const chainId = await web3.eth.getChainId();
        // console.log(chainId)
        setChain(chainId)
        if(chainId == 1){
          return
        }
        
        const contactList = new web3.eth.Contract(abi, contract_addr);
        setContactList(contactList);
        const dyks = await contactList.methods.getDyks().call();
        //   const addDyk = await contactList.methods.addDyk("Something", "Somethinf").send({from: accounts[0]});

          setContacts(dyks)
        }
        
        load();
       }, []);

      provider.on("chainChanged", (chainId) => {
        setChain(chainId)
        if(chainId != chain){
          // Router.reload(window.location.pathname)
        }
      });
       
    // const web3 = new Web3(Web3.givenProvider || "wss://ropsten.infura.io/ws/v3/a4af2f72e0954ab9895e0247dff11a83");
    // const accounts = web3.eth.requestAccounts();
    // console.log(contacts)
    if(contacts.length > 0){
      contacts = [...contacts];
      contacts = contacts.reverse()
    }
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
        <Heading align="center"  size='xl'>DYKs</Heading>
        <Heading mt='10' mb='10' style={{textAlign: "center"}} size='md'>Development version</Heading>
        <Heading mt='10' mb='10' size='md'>In order to interact with the app make sure you set the wallet network to Ropsten test network =&gt; <Link href="http://www.herongyang.com/Ethereum/MetaMask-Extension-Add-Ropsten-Test-Network.html" target="_blank">See instructions</Link><ExternalLinkIcon mx='2px'/></Heading>
        <Heading mt='10' mb='10' size='md'>Ropsten ETH faucet =&gt; <Link href="https://faucet.egorfine.com/" target="_blank">Get free rETH</Link><ExternalLinkIcon mx='2px'/></Heading>
          <>
            {chain == 1 && <Heading mt='10' mb='10' size='sm'>We detected you are on ETH main net. Please switch to Ropsten test network and reload the page in order to proceed</Heading>}
            {chain !=1 && contacts.length === 0  && <SkeletonPage/>}
            <VStack
              divider={<StackDivider borderColor="gray.200" />}
              spacing={4} 
              align='stretch'
            >
            
                {contacts.map((post, index) => {
                  return(
                      <Posts key={index} index={index} title={post.title} body={post.body} id={post.id} commentCount="0" likes={post.likes} owner={post.owner}/>
                  )
                })}
            </VStack>
          </>
          </Container>
          </>
    );
}

