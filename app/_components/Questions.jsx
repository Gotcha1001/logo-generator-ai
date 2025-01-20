import React from "react";



import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import faqs from "../_data/faqs";
import FeatureMotionWrapper from "@/components/ui/FramerMotionStuff/FeatureMotionWrapperMap";


const Questions = () => {
    return (
        <section id="features" className="py-10 px-2 sm:px-6 md:px-8 lg:px-12 gradient-background2 rounded-lg hover:bg-transparent">
            <div className="max-w-6xl mx-auto w-full"> {/* Increased max-width */}
                <h3 className="text-3xl font-bold mb-12 text-center gradient-title1">
                    Frequently Asked Questions
                </h3>

                <div className="w-full max-w-4xl mx-auto"> {/* Added wrapper for accordion */}
                    <Accordion type="single" collapsible className="w-full">
                        {faqs.map((faq, index) => (
                            <FeatureMotionWrapper key={index} index={index}>
                                <AccordionItem value={`item-${index}`}>
                                    <AccordionTrigger className="text-left">
                                        {faq.question}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-base">
                                        {faq.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            </FeatureMotionWrapper>
                        ))}
                    </Accordion>
                </div>
            </div>
        </section>
    );
};

export default Questions;