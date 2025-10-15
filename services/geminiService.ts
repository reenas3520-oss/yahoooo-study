

import { GoogleGenAI, Chat, GenerateContentResponse, Type, Modality } from "@google/genai";
import type { StudyTopic, Flashcard, Test, StudyPlan, TTSConfig } from '../types';

if (!process.env.API_KEY) {
  // In a real app, you might want to handle this more gracefully,
  // but for this context, throwing an error is fine.
  // The instructions state to assume API_KEY is present.
  console.warn("API_KEY environment variable is not set. App will not function correctly.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

let chatSession: Chat | null = null;

export const startChatSession = (topic: StudyTopic, ttsConfig: TTSConfig): Chat => {
  let languageInstruction = '';
  if (ttsConfig.language === 'hi') {
      languageInstruction = ' You must respond entirely in Hindi, using Devanagari script.';
  } else if (ttsConfig.language === 'mix') {
      languageInstruction = ' You can respond in a mix of Hindi and English (Hinglish), as is natural in modern Indian conversation.';
  }

  const systemInstruction = `You are an expert tutor for a Class ${topic.class} student in India studying the ${topic.subject} subject from the ${topic.book} textbook. The current chapter is "${topic.chapter}". Your goal is to help the student understand this chapter deeply. Be encouraging, ask probing questions, and explain concepts clearly and concisely. Use analogies and real-world examples relevant to an Indian context where possible. Keep your responses focused on the topic.${languageInstruction}`;
  
  chatSession = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: systemInstruction
    }
  });
  return chatSession;
};

export const sendMessage = async (message: string): Promise<GenerateContentResponse> => {
  if (!chatSession) {
    throw new Error("Chat session not started.");
  }
  return await chatSession.sendMessage({ message });
};

export const sendMessageStream = async (message: string) => {
  if (!chatSession) {
    throw new Error("Chat session not started.");
  }
  return await chatSession.sendMessageStream({ message });
};


const generateContent = async (prompt: string, model: string = 'gemini-2.5-flash') => {
  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt
    });
    return response.text;
  } catch (error) {
    console.error("Error generating content:", error);
    return null;
  }
};

const generateJsonContent = async <T>(prompt: string, responseSchema: any, model: string = 'gemini-2.5-flash'): Promise<T | null> => {
    try {
        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema
            }
        });
        const jsonText = response.text.trim();
        return JSON.parse(jsonText) as T;
    } catch (error) {
        console.error("Error generating JSON content:", error);
        return null;
    }
};

export const generateSummary = async (topic: StudyTopic): Promise<string | null> => {
  const prompt = `Provide a concise summary of the key concepts in the chapter "${topic.chapter}" for Class ${topic.class} ${topic.subject}. The summary should be easy to understand for a student. Use headings and bullet points.`;
  return generateContent(prompt, 'gemini-2.5-pro');
};

export const generateNotes = async (topic: StudyTopic): Promise<string | null> => {
    const prompt = `Generate detailed study notes for the chapter "${topic.chapter}" for Class ${topic.class} ${topic.subject}. The notes should be well-structured with clear headings, subheadings, bullet points, and definitions. Highlight important formulas or key terms.`;
    return generateContent(prompt, 'gemini-2.5-pro');
};
  
export const generateHomework = async (topic: StudyTopic): Promise<string | null> => {
    const prompt = `Create a set of 5 homework questions based on the chapter "${topic.chapter}" for Class ${topic.class} ${topic.subject}. The questions should cover a range of difficulties, from easy to challenging, to test the student's understanding. Include a mix of question types (e.g., short answer, problem-solving). Do not provide answers.`;
    return generateContent(prompt);
};

export const generateFlashcards = async (topic: StudyTopic): Promise<Flashcard[] | null> => {
  const prompt = `Generate a set of 10 flashcards for the chapter "${topic.chapter}" for Class ${topic.class} ${topic.subject}. Each flashcard should have a clear question on one side and a concise answer on the other. Focus on key definitions, concepts, and formulas.`;
  const schema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        question: { type: Type.STRING },
        answer: { type: Type.STRING }
      },
      required: ["question", "answer"]
    }
  };
  return generateJsonContent<Flashcard[]>(prompt, schema);
};

export const generateTest = async (topic: StudyTopic): Promise<Test | null> => {
    const prompt = `Create a multiple-choice quiz with 10 questions to test a student's knowledge of the chapter "${topic.chapter}" from the Class ${topic.class} ${topic.subject} textbook. Each question must have exactly 4 options, and one of them must be the correct answer.`;
    const schema = {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            question: { type: Type.STRING },
            options: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            correctAnswer: { type: Type.STRING }
          },
          required: ["question", "options", "correctAnswer"]
        }
    };
    return generateJsonContent<Test>(prompt, schema);
};

export const generateStudyPlan = async (): Promise<StudyPlan | null> => {
    const prompt = `Create a generic 7-day study plan for a student preparing for exams. The plan should be balanced, covering different subjects each day, with time for revision and breaks. Structure it day-by-day. For each day, specify a main topic focus, a list of tasks, and a review session topic.`;
    const schema = {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            day: { type: Type.NUMBER },
            topic: { type: Type.STRING },
            tasks: { type: Type.ARRAY, items: { type: Type.STRING } },
            review: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["day", "topic", "tasks", "review"]
        }
    };
    // The schema generates a StudyPlan (which is StudyDay[]), not a StudyPlan[] (which would be StudyDay[][]).
    return generateJsonContent<StudyPlan>(prompt, schema);
};

export const generateDiagrams = async (topic: StudyTopic, count: number): Promise<string[] | null> => {
    const prompt = `Generate a clear, simple, and educational diagram illustrating a key concept from the chapter "${topic.chapter}" for a Class ${topic.class} ${topic.subject} student. For example, for 'Life Processes', a diagram of the human digestive system. For 'Chemical Reactions', a diagram showing a type of reaction. The style should be a clean, colorful illustration.`;
    try {
        const images: string[] = [];
        for (let i = 0; i < count; i++) {
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash-image',
                contents: { parts: [{ text: prompt }] },
                config: { responseModalities: [Modality.IMAGE] }
            });

            for (const part of response.candidates[0].content.parts) {
                if (part.inlineData) {
                    images.push(part.inlineData.data);
                }
            }
        }
        return images.length > 0 ? images : null;
    } catch (error) {
        console.error("Error generating diagrams:", error);
        return null;
    }
};

export const generateAvatar = async (prompt: string): Promise<string | null> => {
    try {
        const response = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: prompt,
            config: {
              numberOfImages: 1,
              outputMimeType: 'image/jpeg',
              aspectRatio: '1:1'
            }
        });
        if (response.generatedImages && response.generatedImages.length > 0) {
            return response.generatedImages[0].image.imageBytes;
        }
        return null;
    } catch (error) {
        console.error("Error generating avatar:", error);
        return null;
    }
}

export const textToSpeech = async (text: string, config: TTSConfig): Promise<string | null> => {
    if (!text.trim()) return null;

    let promptText = `Say this naturally: ${text}`;
    if (config.language === 'hi') {
        promptText = `यह हिन्दी में कहें: ${text}`;
    } else if (config.language === 'mix') {
        promptText = `Read this Hinglish (Hindi and English mix) text naturally: ${text}`;
    }

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-preview-tts",
            contents: [{ parts: [{ text: promptText }] }],
            config: {
              responseModalities: [Modality.AUDIO],
              speechConfig: {
                  voiceConfig: {
                    prebuiltVoiceConfig: { voiceName: config.voice }
                  }
              }
            }
          });
          const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
          return base64Audio || null;
    } catch (error) {
        console.error("Error generating speech:", error);
        return null;
    }
};