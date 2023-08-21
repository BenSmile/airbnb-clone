'use client';

import axios from 'axios';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import React, { useCallback, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import useLoginModal from '@/app/hooks/useLoginModal';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import { toast } from 'react-hot-toast';
import Button from '../Button';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
const LoginModal = () => {

    const loginModal = useLoginModal();

    const router = useRouter();

    const [isLoading, setIsLoading] = React.useState(false);

    const { register, handleSubmit, formState: {
        errors
    } } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: ''
        }
    });
    const bodyContent = (
        <div className="flex flex-col">
            <Heading title='Welcome back' subtitle='Login to your account' />
            <Input
                register={register}
                id="email" label='Email'
                disabled={isLoading} errors={errors} required />

            <Input
                register={register}
                id="password" label='Password' type='password'
                disabled={isLoading} errors={errors} required />
        </div>
    );

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <Button outline label='Continue with Google' icon={FcGoogle} onClick={() => { }} />
            <Button outline label='Continue with Github' icon={AiFillGithub} onClick={() => { }} />

            <div className="text-neutral-500 text-center font-light mt-4">
                <div className=" flex flex-row justify-center items-center gap-2">
                    <div className="">
                        Already have an account?
                    </div>
                    <div
                        onClick={loginModal.onClose}
                        className=" text-neutral-800 cursor-pointer hover:underline">
                        Login
                    </div>
                </div>
            </div>
        </div>
    )
    const onSubmit: SubmitHandler<FieldValues> = data => {
        setIsLoading(true);
        signIn('credentials', {
            ...data, redirect: false,
        })
            .then(callback => {
                setIsLoading(false);
                if (callback?.ok) {
                    toast.success('Logged in');
                    router.refresh();
                    loginModal.onClose();
                  
                }
                if(callback?.error){
                    toast.error(callback.error);
                }
            })
    }


    return (
        <Modal
            body={bodyContent}
            footer={footerContent}
            disabled={isLoading}
            title='Login'
            isOpen={loginModal.isOpen}
            onClose={loginModal.onClose}
            actionLabel='Continue'
            onSubmit={handleSubmit(onSubmit)}
        />
    )
}

export default LoginModal;