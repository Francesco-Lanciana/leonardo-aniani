'use server';

/**
 * The logic for these two server actions is identical, however I kept them as two seperate functions
 * as their behaviour is likely to diverge in the future, e.g. updating information may include fields
 * not needed whilst registering.
 */

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { z } from 'zod';

import { USER_USERNAME_COOKIE, USER_JOBTITLE_COOKIE } from '@/constants';

const schema = z.object({
    username: z.string().trim().min(1),
    jobTitle: z.string().trim().min(1),
});

export async function handleRegisterSubmit(formData: FormData) {
    const validatedFields = schema.safeParse({
        username: formData.get('username'),
        jobTitle: formData.get('jobtitle'),
    });

    // Return early if the form data is invalid. I'm not providing more advanced error handling because
    // we have client side validation in place.
    if (!validatedFields.success) {
        return;
    }

    cookies().set(USER_USERNAME_COOKIE, validatedFields.data.username);
    cookies().set(USER_JOBTITLE_COOKIE, validatedFields.data.jobTitle);

    redirect('/information');
}

export async function handleUpdateInformation(formData: FormData) {
    const validatedFields = schema.safeParse({
        username: formData.get('username'),
        jobTitle: formData.get('jobtitle'),
    });

    // Return early if the form data is invalid. I'm not providing more advanced error handling because
    // we have client side validation in place.
    if (!validatedFields.success) {
        return;
    }

    cookies().set(USER_USERNAME_COOKIE, validatedFields.data.username);
    cookies().set(USER_JOBTITLE_COOKIE, validatedFields.data.jobTitle);

    redirect('/information');
}
