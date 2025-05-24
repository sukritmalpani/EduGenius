import { config } from "dotenv";

config({ path: ".env.local" });

export type Environment = "development" | "production" | "test";

export class BaseEnvironment {
  defaultEnvironmentValues = {
    HOST_URL: "http://localhost:3000",
    GOOGLE_GEMENI_API_KEY: "AIzaSyC6WiNu-OPk68yvYpubN6LQvXky2b4_yec",
    DRIZZLE_DATABASE_URL:
      "postgresql://neondb_owner:npg_y1KRMjcWXor4@ep-solitary-glitter-a18x9itx-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require",
    FIREBASE_API_KEY: "AIzaSyBzfSUcdEp9O5U_QynLA-2AeMuXGVWPOJ4",
    FIREBASE_AUTH_DOMAIN: "edify-4d145.firebaseapp.com",
    FIREBASE_PROJECT_ID: "edify-4d145",
    FIREBASE_STORAGE_BUCKET: "edify-4d145.firebasestorage.app",
    FIREBASE_MESSAGING_SENDER_ID: "696369049065",
    FIREBASE_APP_ID: "1:696369049065:web:772f101df72c608bf9ef78",
    FIREBASE_MEASUREMENT_ID: "G-6SG8WQ3PPV",
    YOUTUBE_API_KEY: "AIzaSyD9Al_kkxgoSF-tzrRq_YOXYy975wAlqSM",
  };

  get environment(): Environment {
    return process.env.NODE_ENV as Environment;
  }

  get HOST_URL(): string {
    return (
      process.env.NEXT_PUBLIC_HOST_URL! ||
      this.defaultEnvironmentValues.HOST_URL
    );
  }

  get GOOGLE_GEMENI_API_KEY(): string {
    return (
      process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY! ||
      this.defaultEnvironmentValues.GOOGLE_GEMENI_API_KEY
    );
  }

  get DRIZZLE_DATABASE_URL(): string {
    return (
      process.env.NEXT_PUBLIC_DRIZZLE_DATABASE_URL! ||
      this.defaultEnvironmentValues.DRIZZLE_DATABASE_URL
    );
  }

  get FIREBASE_API_KEY(): string {
    return (
      process.env.NEXT_PUBLIC_FIREBASE_API_KEY! ||
      this.defaultEnvironmentValues.FIREBASE_API_KEY
    );
  }

  get FIREBASE_AUTH_DOMAIN(): string {
    return (
      process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN! ||
      this.defaultEnvironmentValues.FIREBASE_AUTH_DOMAIN
    );
  }

  get FIREBASE_PROJECT_ID(): string {
    return (
      process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID! ||
      this.defaultEnvironmentValues.FIREBASE_PROJECT_ID
    );
  }

  get FIREBASE_STORAGE_BUCKET(): string {
    return (
      process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET! ||
      this.defaultEnvironmentValues.FIREBASE_STORAGE_BUCKET
    );
  }

  get FIREBASE_MESSAGING_SENDER_ID(): string {
    return (
      process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID! ||
      this.defaultEnvironmentValues.FIREBASE_MESSAGING_SENDER_ID
    );
  }

  get FIREBASE_APP_ID(): string {
    return (
      process.env.NEXT_PUBLIC_FIREBASE_APP_ID! ||
      this.defaultEnvironmentValues.FIREBASE_APP_ID
    );
  }

  get FIREBASE_MEASUREMENT_ID(): string {
    return (
      process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID! ||
      this.defaultEnvironmentValues.FIREBASE_MEASUREMENT_ID
    );
  }

  get YOUTUBE_API_KEY(): string {
    return (
      process.env.NEXT_PUBLIC_YOUTUBE_API_KEY! ||
      this.defaultEnvironmentValues.YOUTUBE_API_KEY
    );
  }
}
