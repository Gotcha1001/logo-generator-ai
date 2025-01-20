"use client"; // Ensures the component is client-side

import React, { useContext, useEffect, useState, Suspense } from 'react';
import { UserDetailContext } from '../_context/UserDetailContext';
import Prompt from '../_data/Prompt';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { DownloadIcon, LayoutDashboard } from 'lucide-react';

function GenerateLogo() {
    const { userDetail, setuserDetail } = useContext(UserDetailContext);
    const [formData, setFormData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [logoImage, setLogoImage] = useState(null);

    const searchParams = useSearchParams();
    const modelType = searchParams.get('type');

    useEffect(() => {
        if (typeof window !== 'undefined' && userDetail?.email) {
            try {
                const storage = localStorage.getItem('formData');
                if (storage) {
                    const parsed = JSON.parse(storage);
                    setFormData(parsed);
                }
            } catch (err) {
                console.error('Error parsing form data:', err);
            }
        }
    }, [userDetail]);

    const generateAILogo = async () => {
        if (modelType !== 'Free' && userDetail?.credits <= 0) {
            toast.error("Not enough credits, sorry.");
            return;
        }

        if (!formData?.title || !userDetail?.email) return;

        setLoading(true);

        try {
            const prompt = Prompt.LOGO_PROMPT
                .replace('{logoTitle}', formData.title || ' ')
                .replace('{logoDesc}', formData.desc || ' ')
                .replace('{logoColor}', formData.palette || ' ')
                .replace('{logoIdea}', formData.idea || 'Default Idea')
                .replace('{logoDesign}', formData.design?.title || ' ')
                .replace('{logoPrompt}', formData.design?.prompt || ' ');

            const response = await axios.post('/api/ai-logo-model', {
                prompt,
                email: userDetail.email,
                title: formData.title,
                desc: formData.desc,
                type: modelType,
                userCredit: userDetail?.credits,
            });

            if (response.data?.image?.url) {
                setLogoImage(response.data.image.url);
            }
        } catch (err) {
            alert(err.response?.data?.error || "Something went wrong. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const onDownload = () => {
        if (!logoImage) return;

        const anchor = document.createElement("a");
        anchor.href = logoImage;
        anchor.download = "logo.png";
        anchor.click();
    };

    useEffect(() => {
        if (formData?.title) {
            generateAILogo();
        }
    }, [formData, userDetail, modelType]);

    if (loading) {
        return (
            <div className="p-4 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent mx-auto mb-2"></div>
                <p className='text-white animate-bounce'>Generating your logo...</p>
            </div>
        );
    }

    if (logoImage) {
        return (
            <div className="p-4 text-center">
                <div className="mb-4">
                    <img
                        src={logoImage}
                        alt="Generated Logo"
                        className="max-w-md mx-auto rounded-lg"
                        loading="lazy"
                    />
                </div>

                <div className="mt-4 flex justify-center items-center gap-5">
                    <Button onClick={() => onDownload()}>
                        <DownloadIcon /> Download
                    </Button>
                    <Link href={"/dashboard"}>
                        <Button variant="sex">
                            <LayoutDashboard /> Dashboard
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    return null;
}

export default function SuspendedGenerateLogo() {
    return (
        <Suspense fallback={<div>Loading logo...</div>}>
            <GenerateLogo />
        </Suspense>
    );
}
