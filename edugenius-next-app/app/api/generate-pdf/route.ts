// app/api/generate-pdf/route.ts
import { NextRequest } from "next/server";
import puppeteer from "puppeteer";
import { marked } from "marked";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { chapter_name, chapter } = body;

  const html = buildHTML(
    chapter.content,
    chapter.quiz,
    chapter.videoId,
    chapter_name
  );

  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle0" });

  const pdfBuffer = await page.pdf({ format: "A4", printBackground: true });

  await browser.close();

  return new Response(pdfBuffer, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=Chapter-${chapter_name}.pdf`, // Use chapter_name here for the filename
    },
  });
}

function buildHTML(
  content: any[],
  quiz: any[],
  videoId: string,
  chapter_name: string
) {
  let quizCounter = 1;
  console.log(content);
  const chapterHTML = content
    .map((section: any, index: number) => {
      let sectionQuizCounter = 1;
      return `
            <section>
              <h2>${index + 1}. ${section.Title}</h2>
              <p>${marked(section.explanation)}</p> <!-- Convert markdown here -->
              ${
                section.quiz?.length
                  ? `<h3>Quiz</h3>
                    ${section.quiz
                      .map(
                        (q: any) => `
                          <div class="question">
                            <p><strong>Q${sectionQuizCounter}:</strong> ${q.question}</p>
                            <ul>
                              ${q.options
                                .map((opt: string) => `<li>${opt}</li>`)
                                .join("")}
                            </ul>
                          </div>
                        `
                      )
                      .join("")}`
                  : ""
              }
              <hr />
            </section>
          `;
    })
    .join("");

  const finalAnswers = [...quiz];
  content.forEach((section) => {
    if (section.quiz?.length) {
      finalAnswers.push(...section.quiz);
    }
  });

  const answersHTML = finalAnswers
    .map(
      (q: any, i: number) => `
            <div class="answer">
              <p><strong>Q${i + 1} Answer:</strong> ${q.answer}</p>
            </div>
          `
    )
    .join("");

  const videoThumbnail = `
        <div class="video">
          <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank">
            <img src="https://img.youtube.com/vi/${videoId}/0.jpg" alt="Video Thumbnail" />
            <p>Click to watch the video</p>
          </a>
        </div>
      `;

  return `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8" />
            <title>${chapter_name}</title>
            <style>
              body {
                font-family: Georgia, serif;
                margin: 3rem auto;
                padding: 0 2.5rem;
                max-width: 800px;
                line-height: 1.8;
                color: #2c3e50;
                text-align: justify;
                position: relative;
              }
              h1, h2, h3 {
                color: #1a237e;
                text-align: left;
                margin-bottom: 0.5rem;
              }
              section {
                margin-bottom: 3rem;
              }
              p {
                margin: 0.5rem 0 1rem;
              }
              ul {
                padding-left: 1.5rem;
                margin-bottom: 1rem;
              }
              li {
                margin-bottom: 0.3rem;
              }
              hr {
                margin: 2rem 0;
                border: none;
                border-top: 1px solid #bbb;
              }
              .answer {
                background-color: #f1f1f1;
                padding: 0.8rem 1rem;
                border-radius: 8px;
                margin-bottom: 1rem;
              }
              .video {
                text-align: center;
                margin-top: 2rem;
              }
              .video img {
                width: 100%;
                max-width: 600px;
                border-radius: 10px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.2);
              }
              .video p {
                font-style: italic;
                margin-top: 0.5rem;
                text-align: center;
              }
    
              /* Watermark styles */
              body::before {
                content: "EDUGEN";
                position: fixed;
                top: 30%;
                left: 10%;
                font-size: 5rem;
                color: rgba(200, 200, 200, 0.2);
                transform: rotate(-45deg);
                z-index: 0;
                pointer-events: none;
                white-space: nowrap;
              }
            </style>
          </head>
          <body>
            <h1>${chapter_name}</h1> <!-- Display chapter name at the top -->
    
            ${chapterHTML}
    
            <hr />
            <h2>Final Quiz</h2>
            ${quiz
              .map(
                (q: any) => `
                  <div class="question">
                    <p><strong>Q${quizCounter}:</strong> ${q.question}</p>
                    <ul>
                      ${q.options.map((opt: string) => `<li>${opt}</li>`).join("")}
                    </ul>
                  </div>
                `
              )
              .join("")}
    
            <hr />
            <h2>All Answers</h2>
            ${answersHTML}
    
            <hr />
            <h2>Video Reference</h2>
            ${videoThumbnail}
          </body>
        </html>
      `;
}
