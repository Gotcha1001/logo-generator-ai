"use client"
import React, { useEffect, useState } from 'react';
import Header from './_components/Header';
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import { UserDetailContext } from './_context/UserDetailContext';

function Provider({ children }) {

    // Get the User 
    const { user } = useUser()
    const [userDetail, setUserDetail] = useState()

    useEffect(() => {
        user && CheckUserAuth()
    }, [user])


    //Save User Data
    const CheckUserAuth = async () => {
        //Save User to Data base 
        const result = await axios.post('/api/users', {
            userName: user?.fullName,
            userEmail: user?.primaryEmailAddress?.emailAddress
        })
        console.log(result.data)
        setUserDetail(result.data)
    }

    const currentYear = new Date().getFullYear();
    return (
        <div className="flex flex-col min-h-screen">
            <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
                {/* Background and Header */}
                <div className="animated-bg" />
                <Header />

                {/* Main content */}
                <main className="flex-grow px-10 lg:px-32 xl:px-48 2xl:px-56 p-4">{children}
                </main>

                {/* Footer */}
                <footer className="relative z-10 bg-indigo-300 py-10 bg-opacity-10 gradient-background2 p-10">
                    <div className="mx-auto px-4 text-center text-gray-200">
                        <p>© {currentYear} CodeNow101. All Rights Reserved</p>
                    </div>
                </footer>
            </UserDetailContext.Provider>
        </div>
    );
}

export default Provider;
