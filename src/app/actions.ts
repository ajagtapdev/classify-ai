'use server'

import { PineconeStore } from "@langchain/pinecone";
import { OpenAIEmbeddings } from "@langchain/openai";
import { Pinecone as PineconeClient } from "@pinecone-database/pinecone";
import OpenAI from "openai";

export const classifyText = async (text: string) => {

    const embeddings = new OpenAIEmbeddings({
        model: "text-embedding-3-small",
    });

    const pinecone = new PineconeClient();
    const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX!);

    const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
        pineconeIndex,
        maxConcurrency: 5,
    });

    const retriever = vectorStore.asRetriever({k:5})

    const vectorStoreResponse = await retriever.invoke(text)
    const examples = vectorStoreResponse.map((document) => document.pageContent).join('\n')
    const prompt = `Classify this text: ${text}. Use these as examples: ${examples}. Respond with just the classification. Classify as Top Secret, Secret, For Official Use Only, Unclassified`

    const openai = new OpenAI()

    const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
    });

    return response.choices[0].message.content

}