'use client';

import styles from './register.module.scss';
import { useFormState } from 'react-dom';

import { Input } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import { handleRegisterSubmit } from '@/actions/user';

export default function Home() {
    const [, formAction, isPending] = useFormState(handleRegisterSubmit, null);

    return (
        <main className={styles.main}>
            <div className={styles.description}>
                <form action={formAction}>
                    <label htmlFor="username">Username</label>
                    <Input name="username" required pattern=".*\S.*" />

                    <label htmlFor="jobtitle">Username</label>
                    <Input name="jobtitle" required pattern=".*\S.*" />

                    <Button type="submit" disabled={isPending} isLoading={isPending}>
                        Continue
                    </Button>
                </form>
            </div>
        </main>
    );
}
