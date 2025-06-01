import { config } from "dotenv";

config({ path: ".env.local" });

export type Environment = "development" | "production" | "test";

export class BaseEnvironment {
  get environment(): Environment {
    return process.env.NODE_ENV as Environment;
  }

  get HOST_URL(): string {
    return process.env.NEXT_PUBLIC_HOST_URL!;
  }

  get GOOGLE_GEMENI_API_KEY(): string {
    return process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY!;
  }

  get DRIZZLE_DATABASE_URL(): string {
    return process.env.DRIZZLE_DATABASE_URL!;
  }

  get FIREBASE_API_KEY(): string {
    return process.env.NEXT_PUBLIC_FIREBASE_API_KEY!;
  }

  get FIREBASE_AUTH_DOMAIN(): string {
    return process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!;
  }

  get FIREBASE_PROJECT_ID(): string {
    return process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!;
  }

  get FIREBASE_STORAGE_BUCKET(): string {
    return process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!;
  }

  get FIREBASE_MESSAGING_SENDER_ID(): string {
    return process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!;
  }

  get FIREBASE_APP_ID(): string {
    return process.env.NEXT_PUBLIC_FIREBASE_APP_ID!;
  }

  get FIREBASE_MEASUREMENT_ID(): string {
    return process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID!;
  }

  get YOUTUBE_API_KEY(): string {
    return process.env.NEXT_PUBLIC_YOUTUBE_API_KEY!;
  }

  get GROQ_API_KEY(): string {
    return process.env.GROQ_API_KEY!;
  }
}
