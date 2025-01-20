"use client"
import React, { useEffect, useState } from 'react'
import HeadingDescription from './HeadingDescription'
import Lookup from '@/app/_data/Lookup'
import { useSearchParams } from 'next/navigation'

function LogoTitle({ onHandleInputChange }) {
    const searchParams = useSearchParams()
    const [title, setTitle] = useState(searchParams?.get('title') ?? "")

    // Add useEffect to send initial title to parent when component mounts
    useEffect(() => {
        if (title) {
            onHandleInputChange(title)
        }
    }, []) // Run once on mount

    return (
        <div className='my-10'>
            <HeadingDescription title={Lookup.LogoTitle} description={Lookup.LogoTitleDesc} />
            <input type="text"
                placeholder={Lookup.InputTitlePlaceholder}
                className='p-4 border border-indigo-500 rounded-lg mt-5 w-full'
                defaultValue={title}
                onChange={(e) => {
                    setTitle(e.target.value)
                    onHandleInputChange(e.target.value)
                }}
            />
        </div>
    )
}

export default LogoTitle