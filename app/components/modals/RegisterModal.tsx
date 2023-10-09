'use client';

import axios from 'axios';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import React, { useCallback, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import { toast } from 'react-hot-toast';
import Button from '../Button';
import { signIn } from 'next-auth/react';

const RegisterModal = () => {

    const registerModal = useRegisterModal();

    const [isLoading, setIsLoading] = React.useState(false);

    const { register, handleSubmit, formState: {
        errors
    } } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    });
    const bodyContent = (
        <div className="flex flex-col">
            <Heading title='Welcome to Airbnb' subtitle='Create an account' />
            <Input
                register={register}
                id="email" label='Email'
                disabled={isLoading} errors={errors} required />

            <Input
                register={register}
                id="name" label='Name'
                disabled={isLoading} errors={errors} required />

            <Input
                register={register}
                id="password" label='Password' type='password'
                disabled={isLoading} errors={errors} required />
        </div>
    );

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <Button outline label='Continue with Google' icon={FcGoogle} onClick={() => signIn('google')} />
            <Button outline label='Continue with Github' icon={AiFillGithub} onClick={() => signIn('github')} />

            <div className="text-neutral-500 text-center font-light mt-4">
                <div className=" flex flex-row justify-center items-center gap-2">
                    <div className="">
                        Already have an account?
                    </div>
                    <div
                        onClick={registerModal.onClose}
                        className=" text-neutral-800 cursor-pointer hover:underline">
                        Login
                    </div>
                </div>
            </div>

        </div>
    )
    const onSubmit: SubmitHandler<FieldValues> = data => {
        setIsLoading(true);
        axios.post('/api/register', data)
            .then(() => {
                registerModal.onClose();
            })
            .catch(error => {
                console.log(error)
                toast.error('Something went wront');
            }).finally(() => {
                setIsLoading(false)
            })
    }


    return (
        <Modal
            body={bodyContent}
            footer={footerContent}
            disabled={isLoading}
            title='Register'
            isOpen={registerModal.isOpen}
            onClose={registerModal.onClose}
            actionLabel='Continue'
            onSubmit={handleSubmit(onSubmit)}
        />
    )
}

export default RegisterModal