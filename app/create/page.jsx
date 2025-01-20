'use client'
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import LogoTitle from './_components/LogoTitle';
import LogoDesc from './_components/LogoDesc';
import LogoColorPallete from './_components/LogoColorPallete';
import LogoDesigns from './_components/LogoDesigns';
import LogoIdea from './_components/LogoIdea';
import PricingModel from './_components/PricingModel';

// Dynamically import components to ensure they are client-side only
const LogoTitleDynamic = dynamic(() => import('./_components/LogoTitle'), { ssr: false });
const LogoDescDynamic = dynamic(() => import('./_components/LogoDesc'), { ssr: false });
const LogoColorPalleteDynamic = dynamic(() => import('./_components/LogoColorPallete'), { ssr: false });
const LogoDesignsDynamic = dynamic(() => import('./_components/LogoDesigns'), { ssr: false });
const LogoIdeaDynamic = dynamic(() => import('./_components/LogoIdea'), { ssr: false });
const PricingModelDynamic = dynamic(() => import('./_components/PricingModel'), { ssr: false });

function Create() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        title: '',
        desc: '',
        palette: '',
        design: '',
        idea: '',
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Ensure code runs only in the client
            const storage = localStorage.getItem('formData');
            if (storage) {
                const parsed = JSON.parse(storage);
                setFormData(parsed);
            }
        }
    }, []); // Run only once after the component mounts

    const onHandleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value,
        }));
        console.log("FORMDATA:", formData);
    };

    return (
        <div className="mt-28 p-10 border rounded-xl 2xl:mx-72 shadow-neon">
            {step === 1 && <LogoTitleDynamic onHandleInputChange={(v) => onHandleInputChange('title', v)} formData={formData} />}
            {step === 2 && <LogoDescDynamic onHandleInputChange={(v) => onHandleInputChange('desc', v)} formData={formData} />}
            {step === 3 && <LogoColorPalleteDynamic onHandleInputChange={(v) => onHandleInputChange('palette', v)} formData={formData} />}
            {step === 4 && <LogoDesignsDynamic onHandleInputChange={(v) => onHandleInputChange('design', v)} formData={formData} />}
            {step === 5 && <LogoIdeaDynamic onHandleInputChange={(v) => onHandleInputChange('idea', v)} formData={formData} />}
            {step === 6 && <PricingModelDynamic onHandleInputChange={(v) => onHandleInputChange('pricing', v)} formData={formData} />}

            <div className="flex justify-between items-center mt-10">
                {step !== 1 && (
                    <Button onClick={() => setStep(step - 1)} variant="sex2">
                        <ArrowLeft />Previous
                    </Button>
                )}
                <Button onClick={() => setStep(step + 1)}>
                    <ArrowRight />Continue
                </Button>
            </div>
        </div>
    );
}

export default Create;
