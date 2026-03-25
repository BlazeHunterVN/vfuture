import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { BreadcrumbJsonLd } from "next-seo";
import { getNewsBySlug } from "@/lib/data/content-service";
import { RichTextRenderer } from "@/components/news/rich-text-renderer";
import { siteConfig } from "@/lib/constants/site";

type NewsDetailPageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: NewsDetailPageProps): Promise<Metadata> {
  const article = await getNewsBySlug(params.slug);
  if (!article) {
    return {
      title: "Không tìm thấy bài viết",
    };
  }

  return {
    title: article.title,
    description: article.excerpt,
    alternates: {
      canonical: `${siteConfig.url}/news/${article.slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: `${siteConfig.url}/news/${article.slug}`,
      images: [
        {
          url: article.cover,
        },
      ],
    },
  };
}

export const revalidate = 60;

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const article = await getNewsBySlug(params.slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6 pt-6 md:pt-8">
      <BreadcrumbJsonLd
        items={[
          { name: "Trang chủ", item: siteConfig.url },
          { name: "Tin tức", item: `${siteConfig.url}/news` },
          { name: article.title, item: `${siteConfig.url}/news/${article.slug}` },
        ]}
      />
      <div className="space-y-3">
        <div className="text-xs uppercase tracking-[0.14em] text-primary">{article.category}</div>
        <h1 className="font-heading text-3xl font-bold text-foreground md:text-4xl">{article.title}</h1>
        <p className="text-sm text-muted-foreground">
          {format(new Date(article.created_at), "dd/MM/yyyy", { locale: vi })}
        </p>
      </div>
      <div className="relative h-[320px] overflow-hidden rounded-2xl border border-border">
        <Image src={article.cover} alt={article.title} fill className="object-cover" />
      </div>
      <div className="glass-card rounded-2xl p-6">
        <RichTextRenderer html={article.content} />
      </div>
    </div>
  );
}
