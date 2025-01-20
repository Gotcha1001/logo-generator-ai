"use client"
import { UserDetailContext } from '@/app/_context/UserDetailContext'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext } from 'react'

function Info() {

    const { userDetail, setUserDetail } = useContext(UserDetailContext)
    return (
        <div>
            <div className='flex justify-between items-center'>
                <h2 className='text-3xl gradient-title'>Welcome, {userDetail?.name}</h2>
                <div className='flex items-center gap-2'>
                    <Image src={'/coin.png'} alt='coin' height={40} width={40} />
                    <h2 className='text-yellow-400 font-bold text-3xl'>{userDetail?.credits} Credits Left</h2>
                </div>

            </div>
            <div className='flex justify-between items-center mt-6'>
                <h2 className='font-bold text-2xl text-yellow-300'>Dashboard</h2>
                <Link href='/create' >
                    <Button>+ Create New Logo</Button>
                </Link>

            </div>
        </div>
    )
}

export default Info