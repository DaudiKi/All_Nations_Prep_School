import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Section } from "@/components/ui/Section";
import { Pill } from "@/components/ui/Card";
import { CtaBand } from "@/components/site/CtaBand";
import { Pattern } from "@/components/brand/Pattern";
import { cms } from "@/lib/cms";
import { POSTS } from "@/content/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await cms.post(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { type: "article", publishedTime: post.publishedAt },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await cms.post(slug);
  if (!post) notFound();

  return (
    <>
      <section className="relative overflow-hidden bg-ink text-white">
        <Pattern name="innovation" colourway="white-gold" opacity={0.08} size={260} />
        <div className="container-site relative py-16 md:py-20">
          <Pill tone="gold" tilt>News</Pill>
          <h1 className="type-display mt-6 max-w-[22ch] text-white">{post.title}</h1>
          <p className="type-small mt-5 font-semibold text-white/75">
            <time dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString("en-GB", {
                day: "numeric", month: "long", year: "numeric",
              })}
            </time>
            {" · "}{post.readingMinutes} min read{post.author ? ` · ${post.author}` : ""}
          </p>
        </div>
      </section>

      <Section ground="white">
        <article className="max-w-[66ch]">
          {post.body.map((block, i) => {
            if (block.kind === "h2") return <h2 key={i} className="type-sub2 mt-10 mb-3">{block.text}</h2>;
            if (block.kind === "quote")
              return (
                <blockquote key={i} className="my-7 border-l-4 border-gold bg-gold-t94 py-4 pl-6 pr-4">
                  <p className="type-sub3 m-0 font-normal">{block.text}</p>
                </blockquote>
              );
            return <p key={i} className="type-body mt-4 text-ink-t20">{block.text}</p>;
          })}
        </article>
      </Section>

      <CtaBand />
    </>
  );
}
