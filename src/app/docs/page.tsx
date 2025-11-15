"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import "./markdown.css";

const RedocStandalone = dynamic(
  () => import("redoc").then((m) => m.RedocStandalone),
  { ssr: false }
);

export default function ApiDocsPage() {
  const [md, setMd] = useState("");
  const [activeTab, setActiveTab] = useState<"docs" | "api">("docs");

  useEffect(() => {
    fetch("/docs/docs.md")
      .then((res) => res.text())
      .then(setMd);
  }, []);

  return (
    <div className="max-w-6xl mx-auto py-10">
      {/* Tabs */}
      <div className="flex gap-4 border-b mb-6">
        <button
          onClick={() => setActiveTab("docs")}
          className={`pb-2 px-4 ${
            activeTab === "docs"
              ? "border-b-2 border-blue-500 font-semibold"
              : "text-gray-500"
          }`}
        >
          Project Docs
        </button>

        <button
          onClick={() => setActiveTab("api")}
          className={`pb-2 px-4 ${
            activeTab === "api"
              ? "border-b-2 border-blue-500 font-semibold"
              : "text-gray-500"
          }`}
        >
          API Docs
        </button>
      </div>

      {/* Markdown */}
      {activeTab === "docs" && (
        <div className="markdown-body">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
          >
            {md}
          </ReactMarkdown>
          <div className="text-sm text-center text-gray-500  mt-10">
             Fyndme - Venky
          </div>
        </div>
      )}

      {/* Redoc */}
      {activeTab === "api" && <RedocStandalone specUrl="/docs/openapi.yaml" />}
    </div>
  );
}
