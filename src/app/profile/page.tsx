'use client';

import styles from './profile.module.scss';
import { useFormState } from 'react-dom';

import { HStack, Heading, Input, VStack } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import { handleUpdateInformation } from '@/actions/user';
import { useMemo } from 'react';
import { USER_USERNAME_COOKIE, USER_JOBTITLE_COOKIE } from '@/constants';
import { useRouter } from 'next/navigation';
import { getCookie } from '@/lib/cookie-helpers';

export default function Home() {
    const [, formAction, isPending] = useFormState(handleUpdateInformation, null);
    const router = useRouter();
    const initalUsername = useMemo(() => getCookie(USER_USERNAME_COOKIE), []);
    const initialJobTitle = useMemo(() => getCookie(USER_JOBTITLE_COOKIE), []);

    function handleCancel() {
        router.push('/information');
    }

    return (
        <main className={styles.main}>
            <Heading as="h1" fontSize="4xl" textAlign="center" className={styles.title}>
                Edit profile
            </Heading>

            <form action={formAction}>
                <VStack spacing="1.5rem" className={styles.inputs}>
                    <VStack spacing="0.5rem" width="100%" alignItems="flex-start">
                        <label htmlFor="username">Username</label>
                        <Input name="username" defaultValue={initalUsername} required pattern=".*\S.*" />
                    </VStack>
                    <VStack spacing="0.5rem" width="100%" alignItems="flex-start">
                        <label htmlFor="jobtitle">Job title</label>
                        <Input name="jobtitle" defaultValue={initialJobTitle} required pattern=".*\S.*" />
                    </VStack>
                </VStack>

                <HStack
                    spacing="0.5rem"
                    justifyContent="center"
                    marginTop="1rem"
                    className={styles.actionButtons}
                >
                    <Button type="button" onClick={handleCancel} variant="outline" color="#F47521">
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        disabled={isPending}
                        isLoading={isPending}
                        color="#F47521"
                        variant="solid"
                    >
                        Save
                    </Button>
                </HStack>
            </form>
        </main>
    );
}
