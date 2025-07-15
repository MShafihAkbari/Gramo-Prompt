import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";

const token = "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";
const endpoint = "https://models.github.ai/inference";
const model = "openai/gpt-4.1";

export async function correctGrammar(inputText: string): Promise<string> {
  try {
    const client = ModelClient(
      endpoint,
      new AzureKeyCredential(token),
    );

    const response = await client.path("/chat/completions").post({
      body: {
        messages: [
          { 
            role: "system", 
            content: "You are a grammar correction tool. Correct the grammar, spelling, and punctuation errors in the provided text while maintaining the same tone, style, and level of English. Do not add explanations, just return the corrected text." 
          },
          { 
            role: "user", 
            content: inputText 
          }
        ],
        temperature: 0.1,
        top_p: 1,
        model: model
      }
    });

    if (isUnexpected(response)) {
      throw new Error(response.body.error?.message || 'API request failed');
    }

    return response.body.choices[0]?.message?.content?.trim() || inputText;
  } catch (error) {
    console.error("Grammar correction error:", error);
    throw error;
  }
}