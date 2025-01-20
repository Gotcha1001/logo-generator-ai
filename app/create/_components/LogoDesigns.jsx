import React, { useState } from 'react'
import HeadingDescription from './HeadingDescription'
import Lookup from '@/app/_data/Lookup'
import LogoDesign from '@/app/_data/LogoDesign'
import FeatureMotionWrapper from '@/components/ui/FramerMotionStuff/FeatureMotionWrapperMap'
import Image from 'next/image'

function LogoDesigns({ onHandleInputChange, formData }) {

    const [selectedOption, setSelectedOption] = useState(formData?.design || '')

    return (
        <div className='my-10'>
            <HeadingDescription title={Lookup.LogoDesignTitle} description={Lookup.LogoDesignDesc} />

            <div className='grid grid-cols-2 md:grid-cols-3 gap-10 mt-10 '>
                {LogoDesign.map((design, index) => (
                    <FeatureMotionWrapper key={index} index={index}>
                        <div
                            onClick={() => {
                                setSelectedOption(design.title);
                                onHandleInputChange(design) // Store only the title
                            }}

                            className={`p-2 hover:border-2 border-primary rounded-xl cursor-pointer ${selectedOption === design.title && 'border-2 border-indigo-600 rounded-lg'}`}
                        >
                            <Image
                                src={design.image}
                                alt={design.title}
                                width={300}
                                height={200}
                                className="w-full rounded-xl h-[200px] object-cover sharp-image "
                            />
                        </div>


                    </FeatureMotionWrapper>

                ))}
            </div>
        </div>
    )
}

export default LogoDesigns