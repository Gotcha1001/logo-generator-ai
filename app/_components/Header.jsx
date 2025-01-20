"use client"
import { Button } from '@/components/ui/button'
import { UserButton, useUser } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Header() {

    const { user } = useUser()

    return (
        <div className='px-10 lg:px-32 xl:px-48 2xl:px-56 p-4 flex justify-between items-center gradient-background2'>
            <Link href={'/'}>
                <Image
                    className='h-10 w-32 rounded-xl p-1 border-2 border-indigo-600 bg-black hover:scale-105 transition-all   '
                    src="/logo3.jpg" alt='Logo' height={100} width={100} />
            </Link>
            <div className='flex gap-4 items-center'>

                {user ?

                    <Button variant="sex1">Dashboard</Button>

                    :
                    <Button>Get Started</Button>
                }
                <UserButton
                    appearance={{
                        elements: {
                            avatarBox: "w-16 h-16",
                        },
                    }}
                />
            </div>



        </div>
    )
}

export default Header