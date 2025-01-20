import { AILogoPrompt } from "@/configs/AiModel";
import { db } from "@/configs/FirebaseConfig";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { NextResponse } from "next/server";
import axios from "axios";
import Replicate from "replicate";

export async function POST(req) {
    try {
        const { prompt, email, title, desc, type, userCredit } = await req.json();

        if (!prompt || !email || !title || !type) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Generate AI text Prompt for Logo
        try {
            const AiPromptResult = await AILogoPrompt.sendMessage(prompt);
            const AIPrompt = JSON.parse(AiPromptResult.response.text()).prompt;

            let logoImage;

            // Generate Logo
            if (type === 'free') {
                logoImage = await generateFreelogo(AIPrompt);
            } else {
                logoImage = await generatePaidLogo(AIPrompt);

                // Deduct credits
                const docRef = doc(db, 'users', email);
                await updateDoc(docRef, {
                    credits: Number(userCredit) - 1
                });
            }

            // Save to Firebase
            await saveToFirebase(email, logoImage, title, desc);

            return NextResponse.json({ image: { url: logoImage } });
        } catch (error) {
            return NextResponse.json(
                { error: "Service is busy. Please try again in a few minutes." },
                { status: 429 }
            );
        }
    } catch (err) {
        return NextResponse.json(
            { error: "Something went wrong. Please try again later." },
            { status: 500 }
        );
    }
}


async function generatePaidLogo(prompt) {
    const replicate = new Replicate({
        auth: process.env.REPLICATE_API_TOKEN,
    });

    const output = await replicate.run(
        "bytedance/hyper-flux-8step:81946b1e09b256c543b35f37333a30d0d02ee2cd8c4f77cd915873a1ca622bad",
        {
            input: {
                prompt: prompt,
                num_outputs: 1,
                aspect_ratio: "1:1",
                output_format: "png",
                guidance_scale: 3.5,
                output_quality: 80,
                num_inference_steps: 8
            }
        }
    );

    return await convertImageToBase64(output[0]);
}


async function saveToFirebase(email, image, title, desc) {
    try {
        await setDoc(doc(db, "users", email, "logos", Date.now().toString()), {
            image,
            title,
            desc,
            createdAt: new Date().toISOString()
        });
    } catch (error) {
        console.error("Firebase error:", error);
        throw new Error('Failed to save logo to database');
    }
}


async function convertImageToBase64(imageUrl) {
    try {
        const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        const base64ImageRaw = Buffer.from(response.data).toString('base64');
        return `data:image/png;base64,${base64ImageRaw}`;
    } catch (error) {
        console.error('Error converting image to base64:', error);
        throw new Error('Failed to convert image to base64');
    }
}