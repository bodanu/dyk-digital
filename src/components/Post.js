import { Heading, Text, Box } from '@chakra-ui/react'

const Post = (props) => {
    const { title, body } = props;
    return (
        <Box p={5} shadow='md' borderWidth='1px'>
            <Heading>{title}</Heading>
            <Text>{body}</Text>
        </Box>
    )
}

export default Post;