import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./db/schema/index.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://neondb_owner:npg_y1KRMjcWXor4@ep-solitary-glitter-a18x9itx-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require",
  },
  verbose: true,
  strict: true,
});
