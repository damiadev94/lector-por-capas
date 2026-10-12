
import OpenAI from "openai";

if (!process.env.OPENAI_API_KEY) {
  throw new Error(
    "Falta configurar OPENAI_API_KEY en .env.local",
  );
}

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const model =
  process.env.MODEL || "gpt-5-mini";
