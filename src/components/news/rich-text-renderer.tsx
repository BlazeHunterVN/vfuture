type RichTextRendererProps = {
  html: string;
};

export function RichTextRenderer({ html }: RichTextRendererProps) {
  return (
    <article
      className="prose dark:prose-invert max-w-none prose-headings:font-heading prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary prose-strong:text-foreground"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

