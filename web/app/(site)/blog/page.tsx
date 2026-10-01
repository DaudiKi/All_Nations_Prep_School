import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Card, Pill } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { CtaBand } from "@/components/site/CtaBand";
import { Pattern } from "@/components/brand/Pattern";
import { cms } from "@/lib/cms";

export const metadata: Metadata = {
  title: "News",
  description: "News, circulars and letters from All Nations Prep School.",
};

export default async function BlogPage() {
  const posts = await cms.posts();

  return (
    <>
      <section className="relative overflow-hidden bg-ink text-white">
        <Pattern name="innovation" colourway="white-gold" opacity={0.1} size={280} />
        <div className="container-site relative py-16 md:py-24">
          <Pill tone="gold" tilt>News</Pill>
          <h1 className="type-display mt-6 max-w-[16ch] text-white">From the school</h1>
        </div>
      </section>

      <Section ground="white">
        {posts.length ? (
          <ul className="m-0 grid list-none gap-4 p-0 md:grid-cols-3">
            {posts.map((post) => (
              <li key={post.slug}>
                <Card href={`/blog/${post.slug}`}>
                  <p className="type-small font-bold text-sky-dark">
                    <time dateTime={post.publishedAt}>
                      {new Date(post.publishedAt).toLocaleDateString("en-GB", {
                        day: "numeric", month: "long", year: "numeric",
                      })}
                    </time>
                    {" · "}{post.readingMinutes} min read
                  </p>
                  <h2 className="type-sub3 mt-2">{post.title}</h2>
                  <p className="type-body mt-2 text-ink-t20">{post.excerpt}</p>
                </Card>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState
            icon="school/punctuation"
            title="No news posted yet"
            body="Term letters, circulars and school news will appear here. In the meantime, call the school and we will tell you anything you need to know."
          />
        )}
        <p className="type-small mt-10 text-ink-t20">
          Looking for a circular? <Link href="/contact" className="font-bold text-sky-dark">Contact the office</Link>.
        </p>
      </Section>

      <CtaBand />
    </>
  );
}
