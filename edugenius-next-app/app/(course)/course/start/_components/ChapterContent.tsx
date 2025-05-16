import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function ChapterContent({ content, handleNext }: any) {
  return (
    <Card>
      <CardContent>
        <h2 className="text-xl font-bold">{content.title}</h2>
        <p>{content.body}</p>
        <Progress value={content.progress || 0} className="my-4" />
        <button onClick={handleNext}>Next ▶️</button>
      </CardContent>
    </Card>
  );
}
