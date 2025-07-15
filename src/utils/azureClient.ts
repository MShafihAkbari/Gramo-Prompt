import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";

// Use environment variable for API key, fallback to the provided token
const token = import.meta.env.VITE_GITHUB_TOKEN || "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";
const endpoint = "https://models.github.ai/inference";
const model = "gpt-4.1";

export async function correctGrammar(inputText: string): Promise<string> {
  try {
    if (!token) {
      throw new Error('API token is not configured. Please check your environment variables.');
    }

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
      console.error("API Error Response:", response.body);
      
      // Handle specific error cases
      if (response.status === 401) {
        throw new Error('Authentication failed. Please check your API token.');
      } else if (response.status === 403) {
        throw new Error('Access forbidden. Your API token may not have the required permissions.');
      } else if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.');
      } else {
        throw new Error(response.body.error?.message || `API request failed with status ${response.status}`);
      }
    }

    const correctedText = response.body.choices[0]?.message?.content?.trim();
    if (!correctedText) {
      throw new Error('No response received from AI service');
    }

    return correctedText;
  } catch (error) {
    console.error("Grammar correction error:", error);
    if (error instanceof Error) {
      throw new Error(`Grammar correction failed: ${error.message}`);
    }
    throw new Error('Grammar correction failed: Unknown error');
  }
}