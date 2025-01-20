import React, { useState } from 'react';
import HeadingDescription from './HeadingDescription';
import Lookup from '@/app/_data/Lookup';
import FeatureMotionWrapper from '@/components/ui/FramerMotionStuff/FeatureMotionWrapperMap';
import Colors from '@/app/_data/Colors';

function LogoColorPallete({ onHandleInputChange, formData }) {
    const [selectedOption, setSelectedOption] = useState(formData?.palette);

    return (
        <div className='my-10'>
            <HeadingDescription title={Lookup.LogoColorPaletteTitle} description={Lookup.LogoColorPaletteDesc} />

            <div className='grid grid-cols-2 md:grid-cols-3 gap-5 mt-5'>
                {Colors.map((palette, index) => (
                    <FeatureMotionWrapper key={index} index={index}>
                        <div className={`flex p-1 hover:scale-110 transition-all cursor-pointer ${selectedOption === palette.name && "border-2 border-indigo-500 rounded-lg"}`}>
                            {palette?.colors.map((color, colorIndex) => (
                                <div
                                    key={colorIndex}
                                    className='h-24 w-full'
                                    onClick={() => {
                                        setSelectedOption(palette.name);
                                        onHandleInputChange(palette.name);
                                    }}
                                    style={{
                                        backgroundColor: color
                                    }}
                                />
                            ))}
                        </div>
                    </FeatureMotionWrapper>
                ))}
            </div>
        </div>
    );
}

export default LogoColorPallete;
