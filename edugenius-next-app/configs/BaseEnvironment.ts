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
}
