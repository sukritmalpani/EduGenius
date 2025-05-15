"use client";

// TODO: fetch course data
const CourseStart = ({ params }: { params: { courseId: string } }) => {
  return (
    <div className="p-8">
      <h1 className="text-2xl">Course ID: {params.courseId}</h1>
      <p>Loading content…</p>
    </div>
  );
};

export default CourseStart;
