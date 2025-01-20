"use client"
import React, { useEffect, useState } from 'react'
import HeadingDescription from './HeadingDescription'
import Lookup from '@/app/_data/Lookup'
import axios from 'axios'
import Prompt from '@/app/_data/Prompt'
import { Loader2Icon } from 'lucide-react'

function LogoIdea({ formData, onHandleInputChange }) {

    const [ideas, setIdeas] = useState()
    const [loading, setLoading] = useState(false)
    const [selectedOption, setSelectedOption] = useState(formData?.idea)

    useEffect(() => {
        generatedLogoDesignIdea()
    }, [])


    useEffect(() => {
        console.log("Updated FORMDATA:", formData);
    }, [formData]); // Runs whenever formData changes

    const generatedLogoDesignIdea = async () => {
        setLoading(true)
        const PROMPT = Prompt.DESIGN_IDEA_PROMPT
            .replace('{logoType}', formData?.design.title)
            .replace('{logoTitle}', formData?.title)
            .replace('logoDesc', formData.desc)
            .replace('{logoPrompt}', formData.design.prompt)

        // console.log("PROMPT:", PROMPT)
        const result = await axios.post('/api/ai-design-idea', {
            prompt: PROMPT
        })
        console.log("RESULT KIDS", result.data)
        setIdeas(result.data.ideas)
        setLoading(false)

    }

    return (
        <div>
            <HeadingDescription
                title={Lookup.LogoIdeaTitle}
                description={Lookup.LogoIdeaDesc}
            />


            <div className='flex items-center justify-center'>
                {loading && <Loader2Icon className='animate-spin my-10 text-white w-10 h-10 bg-indigo-500 rounded-full' />}
            </div>

            <div className='flex flex-wrap gap-3 mt-6'>
                {ideas && ideas.map((item, index) => (
                    <h2 key={index}
                        onClick={() => {
                            setSelectedOption(item)
                            onHandleInputChange(item)
                        }}

                        className={`p-2 rounded-full border text-yellow-500 px-3 cursor-pointer ${selectedOption == item && 'border-2 border-primary '}`}
                    >{item}</h2>
                ))}

                <h2
                    onClick={() => {
                        setSelectedOption('Let AI Select the best idea')
                        onHandleInputChange('Let AI Select the best idea')
                    }}
                    className={`p-2 rounded-full border text-yellow-500 px-3 cursor-pointer ${selectedOption == 'Let AI Select the best idea' && 'border-2 border-primary'}`}>Let AI Select the best idea</h2> </div>

        </div>
    )
}

export default LogoIdea