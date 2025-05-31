"use client";

import type React from "react";

import { useEffect, useState, useRef } from "react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { db } from "@/configs/db";
import { forumTopics, forumReplies } from "@/db/schema/chapter";
import { eq } from "drizzle-orm";
import { motion, AnimatePresence } from "framer-motion";
import io from "socket.io-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import {
  PlusCircle,
  MessageCircle,
  Send,
  Clock,
  ArrowLeft,
  Search,
  X,
  MessageSquare,
  Sparkles,
  CalendarDays,
} from "lucide-react";

type ForumProps = {
  params: { courseId: string };
};

type Topic = {
  id: string;
  title: string;
  content: string;
  userId: string;
  createdAt: Date;
};

type Reply = {
  id: string;
  topicId: string;
  userId: string;
  content: string;
  createdAt: Date;
};

export default function Forum({ params }: ForumProps) {
  const { user } = useKindeBrowserClient();
  const [topics, setTopics] = useState<Topic[]>([]);
  const [filteredTopics, setFilteredTopics] = useState<Topic[]>([]);
  const [newTopic, setNewTopic] = useState({ title: "", content: "" });
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [newReply, setNewReply] = useState("");
  const [isCreatingTopic, setIsCreatingTopic] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const { toast } = useToast();
  const replyInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // WebSocket setup
  const socket = useRef<ReturnType<typeof io> | null>(null);

  useEffect(() => {
    fetchTopics();

    // Initialize socket connection
    socket.current = io("http://localhost:3001");

    socket.current.on("receive-message", (message: Reply) => {
      if (selectedTopic && message.topicId === selectedTopic.id) {
        setReplies((prevReplies) => [...prevReplies, message]);

        // Scroll to bottom when new message arrives
        setTimeout(() => {
          messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    });

    return () => {
      socket.current?.disconnect();
    };
  }, [selectedTopic]);

  // Filter topics when search query or filter changes
  useEffect(() => {
    if (!topics.length) return;

    let filtered = [...topics];

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (topic) =>
          topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          topic.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (activeFilter === "recent") {
      filtered = filtered.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else if (activeFilter === "popular") {
      // This is a placeholder - in a real app, you'd sort by number of replies or views
      filtered = filtered;
    }

    setFilteredTopics(filtered);
  }, [searchQuery, topics, activeFilter]);

  // Scroll to bottom when replies change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [replies]);

  const fetchTopics = async () => {
    setIsLoading(true);
    try {
      const result = await db
        .select()
        .from(forumTopics)
        .where(eq(forumTopics.courseId, params.courseId))
        .orderBy(forumTopics.createdAt);
      setTopics(result as Topic[]);
      setFilteredTopics(result as Topic[]);
    } catch (error) {
      console.error("Error fetching topics:", error);
      toast({
        title: "Failed to load topics",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateTopic = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast({
        title: "Please log in to create a topic",
        variant: "destructive",
      });
      return;
    }

    if (!newTopic.title.trim() || !newTopic.content.trim()) {
      toast({
        title: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    try {
      await db.insert(forumTopics).values({
        courseId: params.courseId,
        userId: user.given_name || "Anonymous",
        title: newTopic.title,
        content: newTopic.content,
      });

      setNewTopic({ title: "", content: "" });
      setIsCreatingTopic(false);
      fetchTopics();

      toast({
        title: "Topic created successfully",
        variant: "default",
      });
    } catch (error) {
      console.error("Error creating topic:", error);
      toast({
        title: "Failed to create topic",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  };

  const handleViewReplies = async (topic: Topic) => {
    setSelectedTopic(topic);

    try {
      const result = await db
        .select()
        .from(forumReplies)
        .where(eq(forumReplies.topicId, topic.id))
        .orderBy(forumReplies.createdAt);

      setReplies(result as Reply[]);
      socket.current?.emit("join-room", topic.id);

      // Focus on reply input
      setTimeout(() => {
        replyInputRef.current?.focus();
      }, 100);
    } catch (error) {
      console.error("Error fetching replies:", error);
      toast({
        title: "Failed to load replies",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  };

  const handleSendReply = async () => {
    if (!user || !selectedTopic) {
      toast({
        title: "Please log in to reply",
        variant: "destructive",
      });
      return;
    }

    if (!newReply.trim()) {
      return;
    }

    const reply = {
      topicId: selectedTopic.id,
      userId: user.given_name || "Anonymous",
      content: newReply,
      createdAt: new Date(),
    };

    try {
      // Store in DB
      await db.insert(forumReplies).values(reply);

      // Emit message to WebSocket
      socket.current?.emit("send-message", {
        ...reply,
        roomId: selectedTopic.id,
      });

      setNewReply("");
      setReplies([...replies, reply]);

      // Scroll to bottom
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (error) {
      console.error("Error sending reply:", error);
      toast({
        title: "Failed to send reply",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor(
      (now.getTime() - new Date(date).getTime()) / 1000
    );

    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800)
      return `${Math.floor(diffInSeconds / 86400)} days ago`;

    return formatDate(date);
  };

  return (
    <div className="min-h-screen bg-[#1A1A2E] text-white">
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col space-y-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <MessageSquare className="h-6 w-6 text-[#00FFFF]" />
                <h1 className="text-3xl font-bold tracking-tight text-[#00FFFF]">
                  Course Forum
                </h1>
              </div>
              <p className="text-gray-400 mt-1">
                Discuss topics and ask questions about this course with fellow
                students
              </p>
            </div>

            {selectedTopic ? (
              <Button
                variant="outline"
                onClick={() => setSelectedTopic(null)}
                className="gap-2 self-start border-[#8A2BE2] text-[#00FFFF] hover:bg-[#8A2BE2]/20"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Topics
              </Button>
            ) : (
              <Button
                onClick={() => setIsCreatingTopic(true)}
                className="gap-2 self-start bg-[#007BFF] hover:bg-[#0056b3] text-white"
              >
                <PlusCircle className="h-4 w-4" />
                New Topic
              </Button>
            )}
          </div>

          {/* Main Content */}
          <AnimatePresence mode="wait">
            {!selectedTopic ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Topic List View */}
                <div className="space-y-6">
                  {/* Search and Filters */}
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-grow">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search topics..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 pr-10 bg-[#1A1A2E] border-[#8A2BE2] text-white"
                      />
                      {searchQuery && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 text-[#00FFFF]"
                          onClick={() => setSearchQuery("")}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>

                    <Tabs
                      defaultValue="all"
                      className="w-full md:w-auto"
                      onValueChange={setActiveFilter}
                    >
                      <TabsList className="bg-[#2C3E50]">
                        <TabsTrigger
                          value="all"
                          className="data-[state=active]:bg-[#8A2BE2] data-[state=active]:text-white"
                        >
                          All Topics
                        </TabsTrigger>
                        <TabsTrigger
                          value="recent"
                          className="data-[state=active]:bg-[#8A2BE2] data-[state=active]:text-white"
                        >
                          Recent
                        </TabsTrigger>
                        <TabsTrigger
                          value="popular"
                          className="data-[state=active]:bg-[#8A2BE2] data-[state=active]:text-white"
                        >
                          Popular
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>

                  {/* Create Topic Form */}
                  <AnimatePresence>
                    {isCreatingTopic && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Card className="border-[#00FFFF] bg-[#2C3E50] shadow-lg">
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-[#00FFFF]">
                              <Sparkles className="h-5 w-5" />
                              Create New Topic
                            </CardTitle>
                            <CardDescription className="text-gray-400">
                              Share your question or start a discussion with the
                              community
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <form
                              onSubmit={handleCreateTopic}
                              className="space-y-4"
                            >
                              <div className="space-y-2">
                                <label
                                  htmlFor="topic-title"
                                  className="text-sm font-medium text-gray-300"
                                >
                                  Title
                                </label>
                                <Input
                                  id="topic-title"
                                  placeholder="What's your topic about?"
                                  value={newTopic.title}
                                  onChange={(e) =>
                                    setNewTopic({
                                      ...newTopic,
                                      title: e.target.value,
                                    })
                                  }
                                  required
                                  className="bg-[#1A1A2E] border-[#00FFFF] text-white"
                                />
                              </div>

                              <div className="space-y-2">
                                <label
                                  htmlFor="topic-content"
                                  className="text-sm font-medium text-gray-300"
                                >
                                  Content
                                </label>
                                <Textarea
                                  id="topic-content"
                                  placeholder="Describe your topic or question in detail..."
                                  value={newTopic.content}
                                  onChange={(e) =>
                                    setNewTopic({
                                      ...newTopic,
                                      content: e.target.value,
                                    })
                                  }
                                  rows={5}
                                  required
                                  className="bg-[#1A1A2E] border-[#00FFFF] text-white"
                                />
                              </div>

                              <div className="flex justify-end gap-2">
                                <Button
                                  type="button"
                                  variant="outline"
                                  onClick={() => setIsCreatingTopic(false)}
                                  className="text-gray-300 border-gray-500 hover:bg-gray-700"
                                >
                                  Cancel
                                </Button>
                                <Button
                                  type="submit"
                                  className="bg-[#007BFF] hover:bg-[#0056b3] text-white"
                                >
                                  Create Topic
                                </Button>
                              </div>
                            </form>
                          </CardContent>
                        </Card>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Topics List */}
                  {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {[1, 2, 3, 4, 5, 6].map((i) => (
                        <Card
                          key={i}
                          className="opacity-70 animate-pulse bg-[#2C3E50] border-[#8A2BE2]"
                        >
                          <CardContent className="p-6">
                            <div className="h-6 bg-[#1A1A2E] rounded-md mb-4 w-3/4"></div>
                            <div className="h-4 bg-[#1A1A2E] rounded-md mb-2 w-full"></div>
                            <div className="h-4 bg-[#1A1A2E] rounded-md mb-4 w-2/3"></div>
                            <div className="flex justify-between">
                              <div className="h-6 bg-[#1A1A2E] rounded-full w-24"></div>
                              <div className="h-6 bg-[#1A1A2E] rounded-md w-16"></div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : filteredTopics.length === 0 ? (
                    <Card className="bg-[#2C3E50] border-[#8A2BE2]">
                      <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="rounded-full bg-[#8A2BE2]/20 p-4 mb-4">
                          <MessageCircle className="h-8 w-8 text-[#00FFFF]" />
                        </div>
                        <h3 className="text-lg font-medium mb-2 text-white">
                          No topics found
                        </h3>
                        <p className="text-gray-400 max-w-md">
                          {searchQuery
                            ? "No topics match your search criteria. Try a different search term."
                            : "Be the first to start a discussion in this forum!"}
                        </p>
                        {searchQuery && (
                          <Button
                            variant="outline"
                            onClick={() => setSearchQuery("")}
                            className="mt-4 border-[#8A2BE2] text-[#00FFFF] hover:bg-[#8A2BE2]/20"
                          >
                            Clear Search
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredTopics.map((topic) => (
                        <Card
                          key={topic.id}
                          className="overflow-hidden hover:border-[#00FFFF] transition-all cursor-pointer bg-[#2C3E50] border-[#8A2BE2] text-white"
                          onClick={() => handleViewReplies(topic)}
                        >
                          <div className="h-1 bg-[#8A2BE2]"></div>
                          <CardContent className="p-6">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge
                                variant="outline"
                                className="text-xs text-[#00FFFF] border-[#00FFFF]"
                              >
                                Discussion
                              </Badge>
                              <span className="text-xs text-gray-400 ml-auto flex items-center gap-1">
                                <Clock className="h-3 w-3 text-[#00FFFF]" />
                                {getTimeAgo(topic.createdAt)}
                              </span>
                            </div>

                            <h3 className="font-semibold text-lg mb-2 line-clamp-2 text-[#00FFFF]">
                              {topic.title}
                            </h3>

                            <p className="text-gray-300 text-sm line-clamp-2 mb-4">
                              {topic.content}
                            </p>

                            <div className="flex items-center justify-between mt-auto pt-2 border-t border-[#8A2BE2]/30">
                              <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarFallback className="bg-[#00FFFF] text-[#1A1A2E]">
                                    {topic.userId?.[0]}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="text-sm font-medium">
                                  {topic.userId}
                                </span>
                              </div>

                              <div className="flex items-center gap-1 text-gray-400">
                                <MessageSquare className="h-4 w-4 text-[#00FFFF]" />
                                <span className="text-xs">
                                  {replies.length || 0} replies
                                </span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Topic Detail View */}
                <Card className="overflow-hidden bg-[#2C3E50] border-[#00FFFF] shadow-lg">
                  <CardHeader className="border-b border-[#00FFFF] bg-[#2C3E50]">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Badge
                            variant="outline"
                            className="border-[#00FFFF] text-[#00FFFF]"
                          >
                            Discussion
                          </Badge>
                          <span className="text-xs text-gray-400">
                            Posted {getTimeAgo(selectedTopic.createdAt)}
                          </span>
                        </div>
                        <CardTitle className="text-2xl text-[#00FFFF]">
                          {selectedTopic.title}
                        </CardTitle>
                      </div>

                      <div className="flex items-center gap-2">
                        <Avatar>
                          <AvatarFallback className="bg-[#00FFFF] text-[#1A1A2E]">
                            {selectedTopic.userId?.[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-white">
                            {selectedTopic.userId}
                          </p>
                          <p className="text-xs text-gray-400">Topic Author</p>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="p-0">
                    <div className="p-6 border-b border-[#8A2BE2]/30 bg-[#1A1A2E]">
                      <div className="prose dark:prose-invert max-w-none text-gray-300">
                        <p>{selectedTopic.content}</p>
                      </div>
                    </div>

                    <div className="p-6 bg-[#1A1A2E]">
                      <h3 className="font-semibold text-lg flex items-center gap-2 mb-6 text-[#00FFFF]">
                        <MessageCircle className="h-5 w-5" />
                        Replies ({replies.length})
                      </h3>

                      <ScrollArea className="h-[50vh] pr-4">
                        {replies.length === 0 ? (
                          <div className="text-center py-12 bg-[#2C3E50] rounded-lg">
                            <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-400">
                              No replies yet. Be the first to respond!
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-6">
                            {replies.map((reply, index) => (
                              <div key={reply.id} className="flex gap-4">
                                <Avatar>
                                  <AvatarFallback className="bg-[#00FFFF] text-[#1A1A2E]">
                                    {reply.userId?.[0]}
                                  </AvatarFallback>
                                </Avatar>

                                <div className="flex-grow space-y-2">
                                  <div className="flex items-center justify-between">
                                    <div className="font-medium text-[#00FFFF]">
                                      {reply.userId}
                                    </div>
                                    <div className="text-xs text-gray-400 flex items-center gap-1">
                                      <CalendarDays className="h-3 w-3 text-[#00FFFF]" />
                                      {formatDate(reply.createdAt)}
                                    </div>
                                  </div>

                                  <div className="text-sm bg-[#2C3E50] p-3 rounded-lg text-gray-300">
                                    {reply.content}
                                  </div>
                                </div>
                              </div>
                            ))}
                            <div ref={messagesEndRef} />
                          </div>
                        )}
                      </ScrollArea>
                    </div>
                  </CardContent>

                  <CardFooter className="border-t border-[#00FFFF] p-4 bg-[#2C3E50]">
                    <div className="flex w-full gap-2">
                      <Input
                        ref={replyInputRef}
                        placeholder="Write your reply..."
                        value={newReply}
                        onChange={(e) => setNewReply(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleSendReply();
                          }
                        }}
                        className="bg-[#1A1A2E] border-[#00FFFF] text-white"
                      />
                      <Button
                        onClick={handleSendReply}
                        disabled={!newReply.trim()}
                        className="gap-2 bg-[#007BFF] hover:bg-[#0056b3] text-white"
                      >
                        <Send className="h-4 w-4" />
                        Reply
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
