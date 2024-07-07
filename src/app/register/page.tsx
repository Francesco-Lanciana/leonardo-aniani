'use client';

import styles from './register.module.scss';
import { useFormState } from 'react-dom';

import { Heading, Input, VStack } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import { handleRegisterSubmit } from '@/actions/user';

import RegisterImage from '@/../public/register-image.jpg';
import Image from 'next/image';
import { USER_JOBTITLE_COOKIE, USER_USERNAME_COOKIE } from '@/constants';
import { useMemo } from 'react';
import { getCookie } from '@/lib/cookie-helpers';

export default function Home() {
    const [, formAction, isPending] = useFormState(handleRegisterSubmit, null);
    const initalUsername = useMemo(() => getCookie(USER_USERNAME_COOKIE), []);
    const initialJobTitle = useMemo(() => getCookie(USER_JOBTITLE_COOKIE), []);

    return (
        <main className={styles.main}>
            <section className={styles.mainSection}>
                <div className={styles.mainSectionContent}>
                    <Heading as="h1" fontSize="3xl" marginBottom="2rem">
                        Let&apos;s get you set up
                    </Heading>

                    <form action={formAction} className={styles.form}>
                        <VStack spacing="1.5rem">
                            <VStack spacing="0.5rem" width="100%" alignItems="flex-start">
                                <label htmlFor="username" className={styles.label}>
                                    Username
                                </label>
                                <Input
                                    name="username"
                                    defaultValue={initalUsername}
                                    required
                                    pattern=".*\S.*"
                                />
                            </VStack>
                            <VStack spacing="0.5rem" width="100%" alignItems="flex-start">
                                <label htmlFor="jobtitle" className={styles.label}>
                                    Job title
                                </label>
                                <Input
                                    name="jobtitle"
                                    defaultValue={initialJobTitle}
                                    required
                                    pattern=".*\S.*"
                                />
                            </VStack>
                        </VStack>

                        <Button type="submit" disabled={isPending} isLoading={isPending} color="#F47521">
                            Continue
                        </Button>
                    </form>
                </div>
            </section>
            <div className={styles.sideSection}>
                <Image src={RegisterImage} alt="Let's get started" />
            </div>
        </main>
    );
}
