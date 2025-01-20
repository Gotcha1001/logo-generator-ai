"use client"
import { UserDetailContext } from '@/app/_context/UserDetailContext'
import FeatureMotionWrapper from '@/components/ui/FramerMotionStuff/FeatureMotionWrapperMap'
import { db } from '@/configs/FirebaseConfig'
import { collection, doc, getDocs } from 'firebase/firestore'
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'

function LogoList() {

    const { userDetail, setUserDetail } = useContext(UserDetailContext)
    const [logoList, setLogoList] = useState([])

    useEffect(() => {
        userDetail && GetUserLogos()
    }, [userDetail])

    const GetUserLogos = async () => {
        const queryShapshot = await getDocs(collection(db, "users", userDetail?.email, "logos"))
        setLogoList([])
        queryShapshot.forEach((doc) => {
            console.log(doc.data())
            setLogoList(prev => [...prev, doc.data()])
        })
    }

    // const ViewLogo = (image) => {
    //     const imageWindow = window.open();
    //     imageWindow.document.write(`<img src="${image}" alt="Base64 Image" />`)
    // }

    const ViewLogo = (image) => {
        const anchor = document.createElement("a"); // Create an <a> element
        anchor.href = image; // Set the image URL
        anchor.download = "logo.png"; // Set the default file name
        anchor.click(); // Programmatically click the anchor to trigger the download
    };


    return (
        <div className='mt-10'>
            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 '>
                {logoList?.length > 0 ? logoList.map((logo, index) => (
                    <FeatureMotionWrapper key={index} index={index}>
                        <div className=' rounded-lg hover:scale-105 transition-all cursor-pointer'
                            onClick={() => ViewLogo(logo?.image)}>
                            <Image src={logo?.image} width={400} height={200} alt='Logo'
                                className='w-full rounded-xl'
                            />
                            <h2 className='text-center font-medium text-yellow-400 text-lg  mt-2'>{logo.title}</h2>
                            <p className='gradient-title text-sm text-center'>{logo?.desc}</p>
                        </div>
                    </FeatureMotionWrapper>
                ))
                    :
                    [1, 2, 3, 4, 5, 6].map((item, index) => (
                        <FeatureMotionWrapper key={index} index={index}>
                            <div className="w-full h-[200px] rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 animate-pulse" />
                        </FeatureMotionWrapper>
                    ))


                }
            </div>
        </div>
    )
}

export default LogoList