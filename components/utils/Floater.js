// import { Fab } from 'react-tiny-fab';
import dynamic from 'next/dynamic';
import 'react-tiny-fab/dist/styles.css';
import { useRouter } from 'next/router'
import { useSanctum } from "react-sanctum";
import { useToast } from '@chakra-ui/react'

const Fab = dynamic(
    () => import('react-tiny-fab').then(mod => mod.Fab),
    { ssr: false }
  )

const Floater = () => {
  const { authenticated } = useSanctum();
  const router = useRouter();
  const toast = useToast()
  const handleUpload = () => {
      if(authenticated){
          router.push('/add');
      }else{
        toast({
          title: 'Not logged in.',
          description: "You need to be logged in before creating a new post.",
          status: 'warning',
          duration: 5000,
          isClosable: true,
        })
        router.push('/login');
      }
        
  }
//   const defaultStyles: React.CSSProperties = { bottom: 5, right: 5 };
  return (
    <Fab
    // mainButtonStyles={mainButtonStyles}
    // actionButtonStyles={actionButtonStyles}
    // style={defaultStyles}
    icon={"+"}
    // event={event}
    alwaysShowTitle={true}
    onClick={handleUpload}
    >
    </Fab>
    // <button onClick={handleUpload}> + </button>
  )
}

export default Floater;