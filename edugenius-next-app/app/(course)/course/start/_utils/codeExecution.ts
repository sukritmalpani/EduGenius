// executor.ts

import axios from "axios";

export const LANGUAGE_VERSIONS = {
  python: "3.10.0",
  javascript: "18.15.0",
};

const API = axios.create({
  baseURL: "https://emkc.org/api/v2/piston",
});

// Placeholder for remote execution of user code
export const executeCode = async (language: string, sourceCode: string) => {
  // will call external API
  return null;
};
