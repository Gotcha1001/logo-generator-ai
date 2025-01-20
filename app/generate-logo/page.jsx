"use client"
import React, { useContext, useEffect, useState } from 'react';
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
        // 1. Load formData from localStorage when the component is mounted
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
    }, [userDetail]); // Only run this once when `userDetail` changes

    const generateAILogo = async () => {
        if (modelType !== 'Free' && userDetail?.credits <= 0) {
            toast.error("Not enough credits, sorry.");
            return; // Early return if no credits
        }

        if (!formData?.title || !userDetail?.email) return; // Ensure formData and userDetail are available

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
            // Show error message to user
            alert(err.response?.data?.error || "Something went wrong. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    // const onDownload = () => {
    //     console.log(logoImage)
    //     const imageWindow = window.open();
    //     imageWindow.document.write(`<img src="${logoImage}" alt="Base64 Image" />`)
    // }

    //rather use this one to download test later 
    const onDownload = () => {
        if (!logoImage) return;

        const anchor = document.createElement("a");
        anchor.href = logoImage; // Image URL
        anchor.download = "logo.png"; // File name for download
        anchor.click();
    };

    useEffect(() => {
        // Trigger logo generation only when formData is set and credits are available
        if (formData?.title) {
            generateAILogo();
        }
    }, [formData, userDetail, modelType]); // This will run when formData, userDetail, or modelType changes

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

export default GenerateLogo;