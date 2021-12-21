import { Fab } from 'react-tiny-fab';
import 'react-tiny-fab/dist/styles.css';
import { useNavigate } from 'react-router-dom';
import { useSanctum } from "react-sanctum";
import { useToast } from '@chakra-ui/react'


const Floater = () => {
  const { authenticated } = useSanctum();
  const navigate = useNavigate();
  const toast = useToast()
  const handleUpload = () => {
      if(authenticated){
          navigate('/add');
      }else{
        toast({
          title: 'Not logged in.',
          description: "You need to be logged in before creating a new post.",
          status: 'warning',
          duration: 5000,
          isClosable: true,
        })
        navigate('/login');
      }
        
  }
  const defaultStyles: React.CSSProperties = { bottom: 24, right: 24 };
  return (
    <Fab
    // mainButtonStyles={mainButtonStyles}
    // actionButtonStyles={actionButtonStyles}
    style={defaultStyles}
    icon={"+"}
    // event={event}
    alwaysShowTitle={true}
    onClick={handleUpload}
    >
    </Fab>
  )
}

export default Floater;