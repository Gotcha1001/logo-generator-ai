'use client'

import React, { useEffect } from 'react'
import HeadingDescription from './HeadingDescription'
import Lookup from '@/app/_data/Lookup'
import FeatureMotionWrapper from '@/components/ui/FramerMotionStuff/FeatureMotionWrapperMap'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { SignInButton, useUser } from '@clerk/nextjs'
import Link from 'next/link'

function PricingModel({ formData }) {
    const { user } = useUser(); // Call the useUser hook

    useEffect(() => {
        if (formData?.title && typeof window !== 'undefined') {
            localStorage.setItem('formData', JSON.stringify(formData));
        }
    }, [formData]);

    console.log("Updated Price FORMDATA:", formData);

    return (
        <div className='my-5'>
            <HeadingDescription
                title={Lookup.LogoPricingModelTitle}
                description={Lookup.LogoPricingModelDesc}
            />
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
                {Lookup.pricingOption.map((pricing, index) => (
                    <FeatureMotionWrapper key={index} index={index}>
                        <div className='flex flex-col items-center p-5 border-2 rounded-2xl mt-5 gradient-background2'>
                            <Image src={pricing.icon} alt='Pricing' height={60} width={60} />
                            <h2 className='font-medium text-yellow-400 text-3xl'>{pricing.title}</h2>
                            <div className='p-1 rounded-lg mt-3'>
                                {pricing.features.map((feature, index) => (
                                    <FeatureMotionWrapper key={index} index={index}>
                                        <h2 className='text-lg text-white p-1 mt-5'>{feature}</h2>
                                    </FeatureMotionWrapper>
                                ))}
                            </div>
                            {user ? (
                                // Show the link if user is signed in
                                <Link href={'/generate-logo?type=' + pricing.title}>
                                    <Button className="mt-5">{pricing.button}</Button>
                                </Link>
                            ) : (
                                // Show the Sign In button if user is not signed in
                                <SignInButton mode='modal' forceRedirectUrl={'/generate-logo?type=' + pricing.title}>
                                    <Button className="mt-5">{pricing.button}</Button>
                                </SignInButton>
                            )}
                        </div>
                    </FeatureMotionWrapper>
                ))}
            </div>
        </div>
    );
}

export default PricingModel;
