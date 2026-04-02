"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { mockArticles, categoryInfo } from "@/lib/mock/education-data";
import { PageTransition } from "@/components/motion/page-transition";

// Simple markdown-like renderer for our content
function RenderContent({ content }: { content: string }) {
  const lines = content.split("\n");

  return (
    <div className="prose prose-sm max-w-none">
      {lines.map((line, i) => {
        const trimmed = line.trim();
        if (!trimmed) return <br key={i} />;
        if (trimmed.startsWith("## "))
          return (
            <h2
              key={i}
              className="mt-6 mb-3 text-lg font-bold text-foreground"
            >
              {trimmed.slice(3)}
            </h2>
          );
        if (trimmed.startsWith("### "))
          return (
            <h3
              key={i}
              className="mt-4 mb-2 text-base font-bold text-foreground"
            >
              {trimmed.slice(4)}
            </h3>
          );
        if (trimmed.startsWith("- "))
          return (
            <li key={i} className="ml-4 text-sm text-foreground/90 list-disc">
              {renderInline(trimmed.slice(2))}
            </li>
          );
        if (/^\d+\.\s/.test(trimmed))
          return (
            <li
              key={i}
              className="ml-4 text-sm text-foreground/90 list-decimal"
            >
              {renderInline(trimmed.replace(/^\d+\.\s/, ""))}
            </li>
          );
        if (trimmed.startsWith("**Q:"))
          return (
            <p key={i} className="mt-3 text-sm font-bold text-primary">
              {renderInline(trimmed)}
            </p>
          );
        if (trimmed.startsWith("A:"))
          return (
            <p key={i} className="mb-2 text-sm text-foreground/90">
              {renderInline(trimmed)}
            </p>
          );
        return (
          <p key={i} className="text-sm leading-relaxed text-foreground/90">
            {renderInline(trimmed)}
          </p>
        );
      })}
    </div>
  );
}

function renderInline(text: string) {
  // Bold
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-bold text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

export default function ArticlePage() {
  const params = useParams();
  const slug = params.slug as string;
  const article = mockArticles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div className="mx-auto max-w-3xl py-12 text-center text-muted-foreground">
        文章未找到
      </div>
    );
  }

  const cat = categoryInfo[article.category];

  return (
    <PageTransition className="mx-auto max-w-3xl space-y-6">
      {/* Back */}
      <Link href="/education">
        <Button variant="ghost" size="sm" className="gap-1.5">
          <ArrowLeft className="h-4 w-4" /> 返回衛教專區
        </Button>
      </Link>

      {/* Header */}
      <div>
        <div className="flex items-center gap-2 flex-wrap mb-3">
          <Badge className={`rounded-full ${cat?.color}`}>
            {cat?.emoji} {cat?.zh}
          </Badge>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" /> {article.readTimeMin} 分鐘閱讀
          </span>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" /> {article.publishedAt}
          </span>
        </div>
        <h1 className="font-heading text-2xl font-bold leading-tight">
          {article.titleZh}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {article.summary}
        </p>
      </div>

      {/* Content */}
      <Card className="rounded-2xl shadow-sm">
        <CardContent className="py-6 px-4 sm:px-8">
          <RenderContent content={article.contentZh} />
        </CardContent>
      </Card>

      {/* Back button at bottom */}
      <div className="text-center pb-8">
        <Link href="/education">
          <Button variant="outline" className="rounded-xl">
            <ArrowLeft className="mr-1.5 h-4 w-4" /> 返回衛教專區
          </Button>
        </Link>
      </div>
    </PageTransition>
  );
}
