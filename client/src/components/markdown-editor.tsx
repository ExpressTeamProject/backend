import { useState, useEffect } from "react";
import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import "katex/dist/katex.min.css";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  height?: number;
  preview?: "live" | "edit" | "preview";
}

export function MarkdownEditor({
  value,
  onChange,
  placeholder = "내용을 입력하세요...",
  height = 400,
  preview = "live",
}: MarkdownEditorProps) {
  const [mounted, setMounted] = useState(false);

  // 클라이언트 사이드에서만 렌더링하기 위한 처리
  useEffect(() => {
    setMounted(true);
  }, []);

  // LaTeX 도움말 표시 토글
  const [showHelp, setShowHelp] = useState(false);

  // LaTeX 도움말 내용
  const latexHelp = `
### 마크다운 & LaTeX 사용법

#### 기본 마크다운
- **굵게**: \`**텍스트**\`
- *기울임*: \`*텍스트*\`
- [링크](https://example.com): \`[링크텍스트](URL)\`
- 목록: \`- 항목\` 또는 \`1. 항목\`
- 코드: \`\`\`코드\`\`\`

#### LaTeX 수식
- 인라인 수식: \`$E = mc^2$\`
- 블록 수식: \`$$\\frac{d^2y}{dx^2} + 4\\frac{dy}{dx} + 4y = 0$$\`

#### 자주 사용하는 LaTeX 기호
- 분수: \`\\frac{분자}{분모}\`
- 제곱: \`x^2\`, \`x^{n+1}\`
- 아래첨자: \`x_i\`, \`x_{i+1}\`
- 적분: \`\\int_{a}^{b} f(x) dx\`
- 극한: \`\\lim_{x \\to 0}\`
- 시그마: \`\\sum_{i=1}^{n}\`
- 루트: \`\\sqrt{x}\`, \`\\sqrt[n]{x}\`
- 그리스 문자: \`\\alpha\`, \`\\beta\`, \`\\gamma\`, \`\\theta\`, \`\\pi\`
  `;

  return (
    <div className="w-full">
      {mounted && (
        <>
          <div className="mb-2 flex justify-between items-center">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setShowHelp(!showHelp)}
              className="text-xs"
            >
              {showHelp ? "도움말 닫기" : "마크다운/LaTeX 도움말"}
            </Button>
          </div>

          {showHelp && (
            <Card className="p-4 mb-4 bg-gray-50 dark:bg-gray-900 overflow-auto max-h-60">
              <MDEditor.Markdown
                source={latexHelp}
                rehypePlugins={[[rehypeSanitize], [rehypeKatex, { throwOnError: false }]]}
                remarkPlugins={[remarkMath]}
              />
            </Card>
          )}

          <MDEditor
            value={value}
            onChange={(val) => onChange(val || "")}
            height={height}
            preview={preview}
            textareaProps={{
              placeholder,
            }}
            previewOptions={{
              rehypePlugins: [[rehypeSanitize], [rehypeKatex, { throwOnError: false }]],
              remarkPlugins: [remarkMath],
            }}
          />
        </>
      )}
    </div>
  );
}
