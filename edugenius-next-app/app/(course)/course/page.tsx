"use client";

type CourseParams = {
  params: {
    courseId: string;
  };
};

const Course = ({ params }: CourseParams) => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Course ID: {params.courseId}</h1>
      <p>Course details will load here.</p>
    </div>
  );
};

export default Course;
