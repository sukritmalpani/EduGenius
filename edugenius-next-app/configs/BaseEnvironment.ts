import { config } from "dotenv";

config({ path: ".env" });

export type Environment = "development" | "production" | "test";

export class BaseEnvironment {
  get environment(): Environment {
    return process.env.NODE_ENV as Environment;
  }

  // Kinde Auth
  get KINDE_CLIENT_ID(): string {
    return process.env.KINDE_CLIENT_ID!;
  }
  get KINDE_CLIENT_SECRET(): string {
    return process.env.KINDE_CLIENT_SECRET!;
  }
  get KINDE_ISSUER_URL(): string {
    return process.env.KINDE_ISSUER_URL!;
  }
  get KINDE_SITE_URL(): string {
    return process.env.KINDE_SITE_URL!;
  }
  get KINDE_POST_LOGOUT_REDIRECT_URL(): string {
    return process.env.KINDE_POST_LOGOUT_REDIRECT_URL!;
  }
  get KINDE_POST_LOGIN_REDIRECT_URL(): string {
    return process.env.KINDE_POST_LOGIN_REDIRECT_URL!;
  }

  // Stream
  get NEXT_PUBLIC_STREAM_API_KEY(): string {
    return process.env.NEXT_PUBLIC_STREAM_API_KEY!;
  }
  get STREAM_SECRET_KEY(): string {
    return process.env.STREAM_SECRET_KEY!;
  }

  // Firebase (public config)
  get NEXT_PUBLIC_FIREBASE_API_KEY(): string {
    return process.env.NEXT_PUBLIC_FIREBASE_API_KEY!;
  }
  get NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN(): string {
    return process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!;
  }
  get NEXT_PUBLIC_FIREBASE_PROJECT_ID(): string {
    return process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!;
  }
  get NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET(): string {
    return process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!;
  }
  get NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID(): string {
    return process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!;
  }
  get NEXT_PUBLIC_FIREBASE_APP_ID(): string {
    return process.env.NEXT_PUBLIC_FIREBASE_APP_ID!;
  }
  get NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID(): string {
    return process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID!;
  }

  // Host URL
  get NEXT_PUBLIC_HOST_URL(): string {
    return process.env.NEXT_PUBLIC_HOST_URL!;
  }

  // Google Gemini
  get NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY(): string {
    return process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY!;
  }

  // Drizzle/NeonDB
  get DRIZZLE_DATABASE_URL(): string {
    return process.env.DRIZZLE_DATABASE_URL!;
  }

  // YouTube API
  get NEXT_PUBLIC_YOUTUBE_API_KEY(): string {
    return process.env.NEXT_PUBLIC_YOUTUBE_API_KEY!;
  }

  // GROQ
  get GROQ_API_KEY(): string {
    return process.env.GROQ_API_KEY!;
  }
}
