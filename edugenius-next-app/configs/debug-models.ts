import fetch from "node-fetch";
import { BaseEnvironment } from "./BaseEnvironment";

const env = new BaseEnvironment();

interface ModelInfo {
  name: string;
}

interface ModelsResponse {
  models: ModelInfo[];
}

async function debugModels() {
  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1/models",
      {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${env.GOOGLE_GEMENI_API_KEY}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = (await response.json()) as ModelsResponse;

    console.log("✅ Available Models:");
    data.models.forEach((m) => console.log(m.name));
  } catch (error) {
    console.error("❌ Error fetching models:", error);
  }
}

debugModels();
