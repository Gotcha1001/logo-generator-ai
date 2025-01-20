const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
};


export const AIDesignIdea = model.startChat({
    generationConfig,
    history: [
        {
            role: "user",
            parts: [
                { text: "Based on Logo of type Modern Mascot Logos Generate a text prompt to create Logo for Logo title/Brand name : Indian Spice with description: Indian Restaurant. Give me 4/5 Suggestion of logo ideas (each idea with maximum 4-5 words), Result in JSON format like this: {\"ideas\": [\"Chef Elephant with spices\", \"Smiling Mango character Turban\"]}" }
            ],
        },
        {
            role: "model",
            parts: [
                { text: "```json\n{\n  \"ideas\": [\"Chef Elephant with spices\", \"Smiling Mango character Turban\", \"Friendly Spice Jar Dancing\", \"Royal Peacock Serving Curry\", \"Majestic Tiger with Thali\"]\n}\n```" }
            ],
        }
    ]
});
export const AILogoPrompt = model.startChat({
    generationConfig,
    history: [
        {
            role: "user",
            parts: [
                { text: "STORAGE: Generate a text prompt to create Logo for Logo Title/Brand name : sauses,with description: Sause shop, with Color combination of Soft Purples, also include the Ornate bottle with dripping sauce and include Vintage Logo Designs With Text & Icon design idea and Referring to this Logo Prompt:Design a collection of vintage-inspired logos with a hand-drawn, artistic style. Incorporate a variety of themes, including food, animals, characters, and unique brand elements. Each logo should feature bold typography, intricate details, and a retro aesthetic that is versatile and suitable for diverse brands or businesses.  Give me result in JSON portal with prompt field only" },
            ],
        },
        {
            role: "model",
            parts: [
                { text: "```json\n{\n  \"prompt\": \"Design a vintage-inspired logo for a sauce shop named \\\"sauses\\\".  Use a soft purple color palette. The logo should feature an ornate bottle with sauce dripping from it.  The design should incorporate both text (\\\"sauses\\\") and an icon (the ornate bottle).  Evoke a hand-drawn, artistic feel with intricate details and bold typography.  Think vintage apothecary labels or product packaging for inspiration. The overall aesthetic should be retro and versatile.\"\n}\n```" },
            ],
        },
    ],
});

// const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
// console.log(result.response.text());
