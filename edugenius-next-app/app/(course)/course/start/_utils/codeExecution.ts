// executor.ts

import axios from "axios";

export const LANGUAGE_VERSIONS = {
  python: "3.10.0",
  javascript: "18.15.0",
};

const API = axios.create({
  baseURL: "https://emkc.org/api/v2/piston",
});

export interface ExecutionResult {
  language: string;
  run: {
    stdout: string;
    stderr: string;
    code: number;
  };
}

export const executeCode = async (
  language: keyof typeof LANGUAGE_VERSIONS,
  sourceCode: string
): Promise<ExecutionResult> => {
  try {
    const response = await API.post<ExecutionResult>(
      "/execute",
      {
        language,
        version: LANGUAGE_VERSIONS[language],
        files: [{ content: sourceCode }],
      },
      { timeout: 10000 }
    );
    return response.data;
  } catch (err: any) {
    console.error("Execution error:", err);
    throw new Error("Failed to execute code");
  }
};
