/**
 * [Thanks to the ChatGPT-Next-Web](https://github.com/ChatGPTNextWeb/ChatGPT-Next-Web/blob/main/app/components/markdown.tsx)
 */
import React from "react";
import { useDebouncedCallback } from "use-debounce";
import { useRef, useState, useEffect, useMemo } from "react";

import mermaid from "mermaid";
import RemarkGfm from "remark-gfm";
import RemarkMath from "remark-math";
import RehypeKatex from "rehype-katex";
import RemarkBreaks from "remark-breaks";
import ReactMarkdown from "react-markdown";
import RehypeHighlight from "rehype-highlight";

export function Mermaid(props: { code: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (props.code && ref.current) {
      mermaid.run({ nodes: [ref.current], suppressErrors: true }).catch((e) => {
        setHasError(true);
        console.error("[Mermaid] ", e.message);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.code]);

  if (hasError) {
    return null;
  }

  return (
    <div className="mermaid" style={{ cursor: "pointer", overflow: "auto" }} ref={ref}>
      {props.code}
    </div>
  );
}

export function PreCode(props: { children: any }) {
  const ref = useRef<HTMLPreElement>(null);
  const refText = ref.current?.innerText;
  const [mermaidCode, setMermaidCode] = useState("");

  const renderMermaid = useDebouncedCallback(() => {
    if (!ref.current) return;
    const mermaidDom = ref.current.querySelector("code.language-mermaid");
    if (mermaidDom) {
      setMermaidCode((mermaidDom as HTMLElement).innerText);
    }
  }, 600);

  useEffect(() => {
    setTimeout(renderMermaid, 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refText]);

  return (
    <>
      {mermaidCode.length > 0 && <Mermaid code={mermaidCode} key={mermaidCode} />}
      <pre ref={ref}>{props.children}</pre>
    </>
  );
}

function escapeDollarNumber(text: string) {
  let escapedText = "";
  for (let i = 0; i < text.length; i += 1) {
    let char = text[i];
    const nextChar = text[i + 1] || " ";
    if (char === "$" && nextChar >= "0" && nextChar <= "9") {
      char = "\\$";
    }
    escapedText += char;
  }
  return escapedText;
}

function _MarkDownContent(props: { content: string }) {
  const escapedContent = useMemo(() => escapeDollarNumber(props.content), [props.content]);

  return (
    <ReactMarkdown
      className="prose dark:prose-invert"
      remarkPlugins={[RemarkMath, RemarkGfm, RemarkBreaks]}
      rehypePlugins={[
        RehypeKatex,
        [
          RehypeHighlight,
          {
            detect: false,
            ignoreMissing: true,
          },
        ],
      ]}
      components={{
        // @ts-ignore
        pre: PreCode,
        p: (pProps) => <p {...pProps} dir="auto" />,
        a: (aProps) => {
          const href = aProps.href || "";
          const isInternal = /^\/#/i.test(href);
          const target = isInternal ? "_self" : aProps.target ?? "_blank";
          return <a {...aProps} target={target} />;
        },
      }}
    >
      {escapedContent}
    </ReactMarkdown>
  );
}

export const MarkdownContent = React.memo(_MarkDownContent);

export function Markdown(
  props: {
    content: string;
  } & React.DOMAttributes<HTMLDivElement>,
) {
  const mdRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={mdRef} dir="auto">
      <MarkdownContent content={props.content} />
    </div>
  );
}
