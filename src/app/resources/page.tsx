import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Best Tools for Instagram & Faceless Content Creators | GrowWithMaya",
  description: "A curated list of tools I actually use and recommend for content creation, video editing, AI writing, analytics, and monetization.",
};

interface Tool {
  name: string;
  description: string;
  url: string;
}

const sections: { title: string; tools: Tool[] }[] = [
  {
    title: "Content Creation Tools",
    tools: [
      {
        name: "Canva Pro",
        description: "Design carousels, Reels covers, and story graphics with templates built for social media.",
        url: "https://www.canva.com",
      },
      {
        name: "Notion",
        description: "My content bank, editorial calendar, and idea vault all in one place.",
        url: "https://www.notion.so",
      },
    ],
  },
  {
    title: "AI Writing Tools",
    tools: [
      {
        name: "Claude (Anthropic)",
        description: "Best for long-form content, nuanced captions, and tone-matched writing.",
        url: "https://claude.ai",
      },
      {
        name: "ChatGPT Plus",
        description: "Great for brainstorming, quick rewrites, and technical troubleshooting.",
        url: "https://chat.openai.com",
      },
    ],
  },
  {
    title: "Video Editing Tools",
    tools: [
      {
        name: "CapCut",
        description: "Auto-captions, smart cuts, and native short-form editing. Free and Pro versions.",
        url: "https://www.capcut.com",
      },
    ],
  },
  {
    title: "Analytics & Scheduling Tools",
    tools: [
      {
        name: "Google Analytics",
        description: "Track website traffic, referral sources, and audience behavior for free.",
        url: "https://analytics.google.com",
      },
      {
        name: "Meta Business Suite",
        description: "Schedule posts, check insights, and manage DMs across Facebook and Instagram.",
        url: "https://business.facebook.com",
      },
    ],
  },
  {
    title: "Monetization Tools",
    tools: [
      {
        name: "Gumroad",
        description: "Sell digital products, guides, and templates with zero setup friction.",
        url: "https://gumroad.com",
      },
      {
        name: "ConvertKit",
        description: "Email newsletter platform built for creators with automation and landing pages.",
        url: "https://convertkit.com",
      },
    ],
  },
];

export default function ResourcesPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 animate-in fade-in duration-500">
      <h1 className="text-4xl font-extrabold tracking-tight mb-4">
        Best Tools for Instagram & Faceless Content Creators
      </h1>
      <p className="text-lg text-muted-foreground mb-2">
        (Tested & Reviewed)
      </p>
      <p className="text-muted-foreground leading-relaxed mb-10">
        I only list tools I actually use in my workflow. Some links are affiliate links — 
        if you purchase through them, I earn a small commission at no extra cost to you.
      </p>

      <div className="mb-6 rounded-lg border border-yellow-200/60 bg-yellow-50/60 dark:border-yellow-900/30 dark:bg-yellow-950/15 p-3 text-xs text-yellow-800 dark:text-yellow-400 leading-relaxed">
        <strong>Disclosure:</strong> This page contains affiliate links. If you purchase through my links, I earn a small commission at no extra cost to you.
      </div>

      <div className="space-y-12">
        {sections.map((section) => (
          <section key={section.title}>
            <h2 className="text-2xl font-bold mb-5">{section.title}</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {section.tools.map((tool) => (
                <div
                  key={tool.name}
                  className="rounded-2xl border border-border bg-card p-5 hover:shadow-sm transition-shadow"
                >
                  <h3 className="font-semibold text-lg mb-2">{tool.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {tool.description}
                  </p>
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                  >
                    Visit Tool &rarr;
                  </a>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-16 pt-8 border-t border-border">
        <p className="text-sm text-muted-foreground text-center">
          Last updated: May 2026. I regularly update this list as my workflow changes.
        </p>
      </div>
    </div>
  );
}
