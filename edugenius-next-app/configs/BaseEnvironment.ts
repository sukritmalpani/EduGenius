import { config } from "dotenv";

config({ path: ".env.local" });

export type Environment = "development" | "production" | "test";

export class BaseEnvironment {

  get HOST_URL(): string {
    return process.env.NEXT_PUBLIC_HOST_URL!;
    // this.defaultEnvironmentValues.HOST_URL
  }

  get GOOGLE_GEMENI_API_KEY(): string {
    return process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY!;
    // this.defaultEnvironmentValues.GOOGLE_GEMENI_API_KEY
  }

  get DRIZZLE_DATABASE_URL(): string {
    return process.env.NEXT_PUBLIC_DRIZZLE_DATABASE_URL!;
    // this.defaultEnvironmentValues.NEXT_PUBLIC_DRIZZLE_DATABASE_URL
  }

  get FIREBASE_API_KEY(): string {
    return process.env.NEXT_PUBLIC_FIREBASE_API_KEY!;
    // this.defaultEnvironmentValues.FIREBASE_API_KEY
  }

  get FIREBASE_AUTH_DOMAIN(): string {
    return process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!;
    // this.defaultEnvironmentValues.FIREBASE_AUTH_DOMAIN
  }

  get FIREBASE_PROJECT_ID(): string {
    return process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!;
    // this.defaultEnvironmentValues.FIREBASE_PROJECT_ID
  }

  get FIREBASE_STORAGE_BUCKET(): string {
    return process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!;
    // this.defaultEnvironmentValues.FIREBASE_STORAGE_BUCKET
  }

  get FIREBASE_MESSAGING_SENDER_ID(): string {
    return process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!;
    // this.defaultEnvironmentValues.FIREBASE_MESSAGING_SENDER_ID
  }

  get FIREBASE_APP_ID(): string {
    return process.env.NEXT_PUBLIC_FIREBASE_APP_ID!;
    // this.defaultEnvironmentValues.FIREBASE_APP_ID
  }

  get FIREBASE_MEASUREMENT_ID(): string {
    return process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID!;
    // this.defaultEnvironmentValues.FIREBASE_MEASUREMENT_ID
  }

  get YOUTUBE_API_KEY(): string {
    return process.env.NEXT_PUBLIC_YOUTUBE_API_KEY!;
    // this.defaultEnvironmentValues.YOUTUBE_API_KEY
  }

  get GROQ_API_KEY(): string {
    return (
      process.env.NEXT_PUBLIC_GROQ_API_KEY! ||
      // this.defaultEnvironmentValues.GROQ_API_KEY
    );
  }
}
