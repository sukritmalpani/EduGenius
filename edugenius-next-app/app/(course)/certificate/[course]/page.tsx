"use client";

import { useEffect, useRef, useState } from "react";
import { toPng } from "html-to-image";
import { Playfair_Display } from "next/font/google";
import { toast } from "sonner";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { db } from "@/configs/db";
import { CourseList } from "@/db/schema";
import { eq } from "drizzle-orm";
import type { CourseType } from "@/types/resume.type";
import { generateRecommendationsUtil } from "./_utils/generateRecommendation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Share, Award, BookOpen, Clock } from "lucide-react";
import Link from "next/link";

interface Recommendation {
  title: string;
  description: string;
  category: string;
  level: string;
  duration: string;
}

interface CertificateData {
  userName: string | null;
  courseName: string | null;
  completionDate: string | null;
  certificateId: string | null;
  platformName: string | null;
  instructorName: string | null;
}

const playfair = Playfair_Display({ subsets: ["latin"] });

export default function CertificatePage({
  params,
}: {
  params: { course: string };
}) {
  const { user } = useKindeBrowserClient();
  const [certificateData, setCertificateData] =
    useState<CertificateData | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [course, setCourse] = useState<CourseType | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const certificateRef = useRef<HTMLDivElement>(null);

  const fetchCourse = async () => {
    const course = await db
      .select()
      .from(CourseList)
      .where(eq(CourseList.courseId, params.course));
    return course;
  };

  useEffect(() => {
    if (user) {
      const fetchAndSetCourse = async () => {
        try {
          const res = await fetchCourse();
          setCourse(res[0] as CourseType);
          setCertificateData({
            userName: user?.given_name || "Student Name",
            courseName: res[0]?.courseName || "Course Name",
            completionDate: new Date().toLocaleDateString(),
            certificateId: params.course,
            platformName: "EduGen",
            instructorName: res[0]?.username || "Instructor",
          });
        } catch (error) {
          console.error("Error fetching course:", error);
          toast.error("Failed to load certificate data");
        }
      };

      fetchAndSetCourse();
    }
  }, [user, params.course]); // Removed fetchCourse from dependencies

  useEffect(() => {
    if (certificateData?.courseName) {
      generateRecommendationsUtil(certificateData.courseName)
        .then(setRecommendations)
        .catch(console.error);
    }
  }, [certificateData?.courseName]);

  const downloadCertificate = async () => {
    if (!certificateRef.current) return;

    try {
      setIsDownloading(true);

      // Add a small delay to ensure styles are fully loaded
      await new Promise((resolve) => setTimeout(resolve, 100));

      const dataUrl = await toPng(certificateRef.current, {
        quality: 1,
        pixelRatio: 2,
        width: 1056,
        height: 768,
        style: {
          margin: "0",
          padding: "0",
        },
        cacheBust: true,
      });

      const link = document.createElement("a");
      link.download = `${(certificateData?.userName ?? "certificate").replace(/\s+/g, "-")}-certificate.png`;
      link.href = dataUrl;
      link.click();
      toast.success("Certificate downloaded successfully!");
    } catch (err) {
      console.error("Error generating certificate:", err);
      toast.error("Failed to download certificate. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  const shareCertificate = () => {
    const shareData = {
      title: `${certificateData?.userName}'s Certificate of Completion`,
      text: `I've completed the ${certificateData?.courseName} course on ${certificateData?.platformName}!`,
      url: window.location.href,
    };

    if (navigator.share) {
      navigator
        .share(shareData)
        .then(() => toast.success("Certificate shared successfully!"))
        .catch((error) => console.error("Error sharing certificate:", error));
    } else {
      // Fallback: Copy link to clipboard
      navigator.clipboard
        .writeText(shareData.url)
        .then(() => toast.success("Certificate link copied to clipboard!"))
        .catch(() => toast.error("Failed to copy certificate link"));
    }
  };

  return (
    <div className="min-h-screen bg-[#1A1A2E] py-12 px-4">
      <div className="container mx-auto max-w-5xl space-y-12">
        <div className="text-center space-y-2">
          <h1
            className={`${playfair.className} text-4xl font-bold text-[#00FFFF]`}
          >
            Certificate of Completion
          </h1>
          <p className="text-gray-400">
            Congratulations on completing your course!
          </p>
        </div>

        <div className="relative mx-auto max-w-4xl">
          <div
            ref={certificateRef}
            className="bg-white rounded-lg shadow-xl overflow-hidden"
          >
            {/* Certificate Border */}
            <div className="absolute inset-0 m-8 border border-primary/20"></div>
            <div className="absolute inset-0 m-10 border border-primary/10"></div>

            {/* Decorative Corners */}
            <div className="absolute top-12 left-12 w-16 h-16 border-t-2 border-l-2 border-primary/40" />
            <div className="absolute top-12 right-12 w-16 h-16 border-t-2 border-r-2 border-primary/40" />
            <div className="absolute bottom-12 left-12 w-16 h-16 border-b-2 border-l-2 border-primary/40" />
            <div className="absolute bottom-12 right-12 w-16 h-16 border-b-2 border-r-2 border-primary/40" />

            {/* Platform Name */}
            <div className="absolute top-8 right-12 flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                E
              </div>
              <p className="text-sm font-medium text-muted-foreground">
                {certificateData?.platformName}
              </p>
            </div>

            {/* Main Content */}
            <div className="flex flex-col items-center justify-between h-full relative z-10 p-16 pt-24">
              {/* Header */}
              <div className="text-center space-y-10 w-full">
                <h1
                  className={`${playfair.className} text-3xl font-bold tracking-wide text-primary`}
                >
                  Certificate of Completion
                </h1>

                {/* Recipient Name */}
                <div className="space-y-2">
                  <p className="text-lg text-muted-foreground">
                    is proudly presented to
                  </p>
                  <h2
                    className={`${playfair.className} text-4xl font-bold mt-4`}
                  >
                    {certificateData?.userName}
                  </h2>
                </div>

                {/* Course Name */}
                <div className="space-y-2">
                  <p className="text-lg text-muted-foreground">
                    for successfully completing
                  </p>
                  <h3
                    className={`${playfair.className} text-3xl font-bold mt-4 text-primary`}
                  >
                    {certificateData?.courseName}
                  </h3>
                </div>

                {/* Congratulatory Message */}
                <div className="mt-12 max-w-2xl mx-auto">
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    We hereby acknowledge your outstanding achievement and
                    dedication in completing this comprehensive course. Your
                    commitment to excellence and professional growth has been
                    exemplary throughout this learning journey.
                  </p>
                </div>
              </div>

              {/* Signature Section */}
              <div className="w-full flex justify-between items-end mt-16 relative">
                {/* Lines with content above them */}
                <div className="absolute bottom-0 left-0 right-0 flex justify-between">
                  <div className="w-64 border-t border-muted" />
                  <div className="w-64 border-t border-muted" />
                </div>

                {/* Content positioned above lines */}
                <div className="text-center mb-1">
                  <p className="font-bold text-xl">
                    {certificateData?.instructorName}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Course Instructor
                  </p>
                </div>

                <div className="text-center mb-1">
                  <p className="font-bold text-xl">
                    {certificateData?.completionDate}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Date of Completion
                  </p>
                </div>
              </div>

              {/* Certificate ID */}
              <div className="absolute bottom-8 left-0 right-0 flex justify-center">
                <div className="px-4 py-2 bg-muted/30 rounded-md border border-muted">
                  <p className="text-xs text-muted-foreground font-mono">
                    Certificate ID: {certificateData?.certificateId}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap justify-center gap-4">
          <Button
            className="bg-[#007BFF] hover:bg-[#0056b3] text-white"
            size="lg"
          >
            <Download className="h-5 w-5 mr-2" />
            Download Certificate
          </Button>

          <Button
            onClick={shareCertificate}
            className="border-[#8A2BE2] text-white hover:border-[#00FFFF]"
            variant="outline"
            size="lg"
          >
            <Share className="h-4 w-4" />
            Share Certificate
          </Button>

          <Button
            asChild
            className="bg-[#8A2BE2] hover:bg-[#6a1cb1] text-white"
            size="lg"
          >
            <Link href={`/courses/${params.course}`}>
              <BookOpen className="h-5 w-5 mr-2" />
              Back to Course
            </Link>
          </Button>
        </div>

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <div className="mt-16">
            <h2
              className={`${playfair.className} text-2xl font-bold text-[#00FFFF] text-center`}
            >
              Recommended Courses Just For You
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              {recommendations.map((course, index) => (
                <Card
                  key={index}
                  className="bg-[#2C3E50] border border-[#8A2BE2] shadow-lg"
                >
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-[#00FFFF]">
                      {course.title}
                    </h3>
                    <p className="text-sm text-gray-400 mt-2">
                      {course.description}
                    </p>
                    <Badge className="mt-4 bg-[#8A2BE2] text-white">
                      {course.category}
                    </Badge>
                    <Button
                      asChild
                      variant="outline"
                      className="w-full mt-4 border-[#00FFFF] text-white"
                    >
                      <Link
                        href={`/courses?category=${encodeURIComponent(course.category)}`}
                      >
                        View Course
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
