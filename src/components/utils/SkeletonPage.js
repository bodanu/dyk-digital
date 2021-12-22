import { Skeleton, Stack } from '@chakra-ui/react';

const SkeletonPage = () => {

    return (
        <>
        <Stack>
            <Skeleton height='20px' />
            <Skeleton height='60px' />
            <Skeleton height='20px' />
        </Stack>
        <Stack>
            <Skeleton height='20px' />
            <Skeleton height='60px' />
            <Skeleton height='20px' />
        </Stack>
        <Stack>
            <Skeleton height='20px' />
            <Skeleton height='60px' />
            <Skeleton height='20px' />
        </Stack>
        </>
    )
}

export default SkeletonPage;