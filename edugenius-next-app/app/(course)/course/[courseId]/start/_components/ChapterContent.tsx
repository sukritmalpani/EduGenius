import React, { useEffect, useState } from "react";
import YouTube, { YouTubeProps } from "react-youtube";
import ReactMarkdown from "react-markdown";
import { Editor } from "@monaco-editor/react";
import {
  ChapterContentType,
  ChapterType,
  CourseType,
} from "@/types/resume.type";
import { executeCode } from "../_utils/codeExecution";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Play, Code, BookOpen, Timer, ChevronRight } from "lucide-react";

type ChapterContentProps = {
  course: CourseType;
  chapter: ChapterType | null;
  content: ChapterContentType | null;
  handleNext: () => void;
};

const ChapterContent = ({
  course,
  chapter,
  content,
  handleNext,
}: ChapterContentProps) => {
  const [outputs, setOutputs] = useState<{ [key: string]: string | null }>({});
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({});
  const [activeTab, setActiveTab] = useState<string>("video");

  useEffect(() => {
    console.log("Updated Video ID:", content?.videoId);
  }, [content?.videoId]);

  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    event.target.pauseVideo();
  };

  const runCode = async (code: string, language: string, exampleId: string) => {
    setLoading((prev) => ({ ...prev, [exampleId]: true }));
    setOutputs((prev) => ({ ...prev, [exampleId]: null }));

    try {
      const result = await executeCode(language, code);
      setOutputs((prev) => ({
        ...prev,
        [exampleId]:
          result.run.output ||
          "Code executed successfully, but there was no output.",
      }));
    } catch (error) {
      console.error("Error executing code:", error);
      setOutputs((prev) => ({
        ...prev,
        [exampleId]: `Error: ${error instanceof Error ? error.message : "An unexpected error occurred"}`,
      }));
    } finally {
      setLoading((prev) => ({ ...prev, [exampleId]: false }));
    }
  };

  const formatCode = (code: string | string[]) => {
    if (Array.isArray(code)) {
      return code
        .join("\n")
        .replace("<pre><code>", "")
        .replace("</pre></code>", "");
    }
    return code.replace("<pre><code>", "").replace("</code></pre>", "");
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen bg-[#1A1A2E] text-white">
      <div className="flex flex-col space-y-6">
        {/* Chapter Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className="border-[#8A2BE2] text-[#00FFFF]"
            >
              {course?.courseName}
            </Badge>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <Badge variant="secondary" className="bg-[#8A2BE2] text-white">
              {chapter?.chapter_name}
            </Badge>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-[#00FFFF]">
            {chapter?.chapter_name}
          </h1>
          <p className="text-gray-400 flex items-center gap-2">
            <Timer className="h-4 w-4 text-[#8A2BE2]" />
            {chapter?.duration}
          </p>
          <p className="text-gray-400 max-w-3xl">{chapter?.description}</p>
        </div>

        {/* Main Content */}
        <Tabs
          defaultValue="video"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid grid-cols-2 w-full max-w-md bg-[#2C3E50] rounded-lg">
            <TabsTrigger
              value="video"
              className="flex items-center gap-2 text-[#00FFFF]"
            >
              <Play className="h-4 w-4 text-[#8A2BE2]" />
              Video Lesson
            </TabsTrigger>
            <TabsTrigger
              value="content"
              className="flex items-center gap-2 text-[#00FFFF]"
            >
              <BookOpen className="h-4 w-4 text-[#8A2BE2]" />
              Lesson Content
            </TabsTrigger>
          </TabsList>

          {/* Video Tab */}
          <TabsContent value="video" className="mt-6">
            <Card className="bg-[#2C3E50] border border-[#8A2BE2] shadow-md">
              <CardContent className="p-6">
                <div className="aspect-video w-full max-w-4xl mx-auto rounded-lg overflow-hidden shadow-lg">
                  <YouTube
                    key={content?.videoId}
                    videoId={content?.videoId}
                    opts={{
                      height: "100%",
                      width: "100%",
                      playerVars: { autoplay: 0 },
                    }}
                    onReady={onPlayerReady}
                    className="w-full h-full"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Content Tab */}
          <TabsContent value="content" className="mt-6 space-y-8">
            {content?.content.map((item, contentIndex) => (
              <Card
                key={contentIndex}
                className="overflow-hidden bg-[#2C3E50] border border-[#8A2BE2]"
              >
                <div className="bg-[#8A2BE2] p-4 border-b">
                  <h2 className="text-xl font-semibold text-white">
                    {item.title}
                  </h2>
                </div>
                <CardContent className="p-6">
                  <div className="prose dark:prose-invert max-w-none">
                    <ReactMarkdown>{item.explanation}</ReactMarkdown>
                  </div>

                  {item.code_examples && item.code_examples.length > 0 && (
                    <div className="mt-6 space-y-8">
                      {item.code_examples.map((example, exampleIndex) => {
                        const exampleId = `${contentIndex}-${exampleIndex}`;
                        return (
                          <div key={exampleId} className="space-y-4">
                            <div className="flex items-center gap-2">
                              <Code className="h-5 w-5 text-[#00FFFF]" />
                              <h3 className="text-lg font-medium text-white">
                                Code Example {exampleIndex + 1}
                              </h3>
                              <Badge className="bg-[#8A2BE2] text-white">
                                {example.language || "python"}
                              </Badge>
                            </div>

                            {/* Code Editor */}
                            <div className="border border-[#8A2BE2] rounded-lg overflow-hidden">
                              <Editor
                                height="300px"
                                defaultLanguage={example.language || "python"}
                                value={formatCode(example.code)}
                                options={{
                                  minimap: { enabled: true },
                                  scrollBeyondLastLine: false,
                                  fontSize: 14,
                                  theme: "vs-dark",
                                  automaticLayout: true,
                                }}
                                className="w-full"
                              />
                            </div>

                            {/* Run Code Button */}
                            <div className="flex items-center gap-4">
                              <Button
                                onClick={() =>
                                  runCode(
                                    formatCode(example.code),
                                    example.language || "python",
                                    exampleId
                                  )
                                }
                                disabled={loading[exampleId]}
                                className="flex items-center gap-2 bg-[#007BFF] hover:bg-[#0056b3] text-white"
                              >
                                {loading[exampleId] ? (
                                  <>
                                    <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                    Running...
                                  </>
                                ) : (
                                  <>
                                    <Play className="h-4 w-4 text-white" />
                                    Run Code
                                  </>
                                )}
                              </Button>
                            </div>

                            {/* Output Section */}
                            {outputs[exampleId] !== undefined &&
                              outputs[exampleId] !== null && (
                                <div className="mt-4 bg-[#2C3E50] rounded-lg p-4 border border-[#8A2BE2]">
                                  <div className="flex items-center gap-2 mb-2">
                                    <div className="h-2 w-2 rounded-full bg-green-500" />
                                    <h4 className="font-medium text-[#00FFFF]">
                                      Output
                                    </h4>
                                  </div>
                                  <pre className="text-sm whitespace-pre-wrap overflow-x-auto bg-[#1A1A2E] p-3 rounded-md text-white">
                                    {outputs[exampleId]}
                                  </pre>
                                </div>
                              )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        {/* Navigation */}
        <div className="flex justify-center mt-8">
          <Button
            onClick={handleNext}
            size="lg"
            className="gap-2 bg-[#007BFF] hover:bg-[#0056b3] text-white"
          >
            Take Quiz
            <ChevronRight className="h-4 w-4 text-white" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChapterContent;
