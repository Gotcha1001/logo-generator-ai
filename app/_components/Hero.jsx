"use client"
import React, { useState } from 'react'
import Lookup from '../_data/Lookup'
import MotionWrapperDelay from '@/components/ui/FramerMotionStuff/MotionWrapperDelay'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

import Questions from './Questions'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import FeatureCard from './FeatureCard'

function Hero() {

    const [logoTitle, setLogoTitle] = useState()

    return (
        <div className='flex items-center mt-20 flex-col gap-5'>
            <MotionWrapperDelay
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                variants={{
                    hidden: { opacity: 0, y: -100 },
                    visible: { opacity: 1, y: 0 },
                }}
            >
                <h2 className='text-primary text-5xl text-center font-bold gradient-title p-3'>{Lookup.HeroHeading}</h2>
            </MotionWrapperDelay>
            <MotionWrapperDelay
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.9, delay: 0.8 }}
                variants={{
                    hidden: { opacity: 0, y: -100 },
                    visible: { opacity: 1, y: 0 },
                }}
            >
                <Image
                    className='h-28 w-40 horizontal-rotate'
                    src="/logo.png" alt='Logo' height={180} width={100} />
            </MotionWrapperDelay>
            <h2 className='text-3xl text-center font-bold gradient-title p-2'>{Lookup.HeroSubheading}</h2>
            <p className='text-lg text-gray-300 text-center'>{Lookup.HeroDesc}</p>
            <div className='flex gap-6 w-full max-w-2xl mt-10 items-center'>
                <input
                    onChange={(e) => setLogoTitle(e.target.value)}
                    placeholder={Lookup.InputTitlePlaceholder}
                    className='p-3 border border-indigo-500 rounded-lg w-full shadow-neon'

                />
                <Link href={'/create?title=' + logoTitle}>
                    <Button className="w-full p-6">Get Started</Button>
                </Link>



            </div>
            <Link href="#features" className="w-full sm:w-auto">
                <Button variant="sex" size="lg" className="w-full sm:w-auto mt-5">
                    Learn More <ChevronRight size={18} className="ml-1" />
                </Button>
            </Link>

            {/* Features */}
            <FeatureCard />

            {/* Questions */}
            <Questions />
        </div>
    )
}

export default Hero