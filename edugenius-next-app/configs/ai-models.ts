import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import { BaseEnvironment } from "./BaseEnvironment";

const env = new BaseEnvironment();
export const MODEL = "gemini-1.5-flash";

const genAI = new GoogleGenerativeAI(env.GOOGLE_GEMENI_API_KEY);

const model = genAI.getGenerativeModel({
  model: MODEL,
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const generateCourseLayout = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Generate a course tutorial on following details with field name, description, along with the chapter name about and duration: Category 'programming' Topic 'python' Level 'basic' Duration '1 hour' chapters '5' in JSON format.\n",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "category": "programming",\n  "topic": "python",\n   "description": "Python is a high-level, general-purpose programming language known for its simplicity, readability, and versatility. Its widely used for web development, data analysis, machine learning, and automation tasks.",\n "level": "basic",\n  "duration": "1 hour",\n  "chapters": [\n    {\n      "chapter_name": "Introduction to Python",\n      "description": "This chapter covers the basics of Python programming, including data types, variables, operators, and control flow.",\n      "duration": "15 minutes"\n    },\n    {\n      "chapter_name": "Working with Data Structures",\n      "description": "This chapter explores fundamental data structures like lists, tuples, dictionaries, and sets.",\n      "duration": "20 minutes"\n    },\n    {\n      "chapter_name": "Functions and Modules",\n      "description": "This chapter teaches how to define and use functions, as well as import and utilize modules.",\n      "duration": "15 minutes"\n    },\n    {\n      "chapter_name": "Loops and Iteration",\n      "description": "This chapter focuses on different looping mechanisms like \'for\' and \'while\' loops to iterate over data.",\n      "duration": "10 minutes"\n    },\n    {\n      "chapter_name": "Basic Input and Output",\n      "description": "This chapter covers how to take user input and display output using Python.",\n      "duration": "10 minutes"\n    }\n  ]\n}\n```\n',
        },
      ],
    },
  ],
});

export const generatePathway = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Generate a detailed learning pathway for a given career. The response should be in JSON format and include the following fields: title, description, estimatedTime, difficulty, prerequisites (array), and steps (array of objects with title, description, estimatedTime, and resources fields). Each step's resources should be an array of objects with title and url fields.",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: "Understood. I'll generate a detailed learning pathway in the specified JSON format when provided with a career and description. Here's an example of the expected output format:",
        },
        {
          text: `
\`\`\`json
{
  "title": "Full Stack Web Developer Learning Path",
  "description": "This comprehensive learning path will guide you through becoming a proficient full stack web developer, covering both front-end and back-end technologies, as well as essential tools and practices in modern web development.",
  "estimatedTime": "6-8 months",
  "difficulty": "Intermediate",
  "prerequisites": [
    "Basic understanding of HTML, CSS, and JavaScript",
    "Familiarity with command-line interfaces",
    "Problem-solving skills and logical thinking"
  ],
  "steps": [
    {
      "title": "Advanced JavaScript and ES6+",
      "description": "Deepen your understanding of JavaScript, including modern ES6+ features, asynchronous programming, and functional programming concepts.",
      "estimatedTime": "3 weeks",
      "resources": [
        {
          "title": "JavaScript.info",
          "url": "https://javascript.info/"
        },
        {
          "title": "Eloquent JavaScript",
          "url": "https://eloquentjavascript.net/"
        }
      ]
    },
    {
      "title": "React Fundamentals",
      "description": "Learn the basics of React, including components, state management, and hooks.",
      "estimatedTime": "4 weeks",
      "resources": [
        {
          "title": "React Official Documentation",
          "url": "https://reactjs.org/docs/getting-started.html"
        },
        {
          "title": "React Tutorial by Tao of React",
          "url": "https://www.taoofcode.net/react-tutorial/"
        }
      ]
    },
    {
      "title": "Node.js and Express",
      "description": "Explore server-side JavaScript with Node.js and build RESTful APIs using Express.",
      "estimatedTime": "3 weeks",
      "resources": [
        {
          "title": "Node.js Official Documentation",
          "url": "https://nodejs.org/en/docs/"
        },
        {
          "title": "Express.js Guide",
          "url": "https://expressjs.com/en/guide/routing.html"
        }
      ]
    }
  ]
}
\`\`\`

This example demonstrates the structure and content expected for a learning pathway. When generating a pathway for a specific career, I'll follow this format, adjusting the content to match the given career and description.
          `,
        },
      ],
    },
  ],
});