import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About Maya | GrowWithMaya",
  description: "The real story behind GrowWithMaya. How I went from burnt-out hobbyist to full-time creator, and why I share everything I learn.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-extrabold tracking-tight mb-8">About Me</h1>

      <div className="prose-custom">
        <p className="text-lg leading-relaxed">
          Hi, I'm Maya. I help creators grow on Instagram and build sustainable businesses — without burning out or selling their soul to the algorithm.
        </p>

        <p>
          I didn't start as an "expert." Two years ago, I was working a corporate marketing job, posting on Instagram as a side hobby, and wondering if I'd ever have the courage to go all-in on creating.
        </p>

        <p>
          I grew three Instagram accounts past 50,000 followers. I also burnt out twice, wasted thousands on courses that overpromised, and made every beginner mistake in the book.
        </p>

        <p>
          What I've learned isn't theoretical. It's what actually worked for me, what completely failed, and what I'd do differently if I were starting over today.
        </p>

        <h2>Why I Started This Blog</h2>

        <p>
          The creator space is full of advice from people who got lucky once and decided they were gurus. I got tired of hearing "just post consistently!" from someone with a million followers who started in 2019 when the algorithm was completely different.
        </p>

        <p>
          I wanted a place where I could share the unglamorous truth about growing online. The spreadsheets. The failed Reels. The two-week breaks because I couldn't look at my phone anymore.
        </p>

        <p>
          If that sounds like the kind of advice you need, you're in the right place.
        </p>

        <h2>What You'll Find Here</h2>

        <ul>
          <li><strong>Instagram growth strategies</strong> that work in 2026, not 2020</li>
          <li><strong>Faceless content tips</strong> for introverts and privacy-conscious creators</li>
          <li><strong>Honest AI tool reviews</strong> — no affiliate link spam, just real opinions</li>
          <li><strong>Monetization breakdowns</strong> with actual numbers</li>
          <li><strong>Mental health and sustainability</strong> advice for long-term creators</li>
        </ul>

        <h2>A Few Things About Me</h2>

        <ul>
          <li>I'm a recovering perfectionist who used to delete "flopped" Reels (don't do this)</li>
          <li>I batch all my content on Sundays so I can actually have a life during the week</li>
          <li>My first digital product was a $7 PDF that took three hours to make. It outsold my $47 "masterclass."</li>
          <li>I believe the best niche is the one where you're slightly ahead of your audience, not a world-famous expert</li>
        </ul>

        <h2>Let's Connect</h2>

        <p>
          I read every email and reply to as many as I can. If you have a question, a story to share, or just want to say hi, reach out through the contact page.
        </p>

        <p>
          And if you want weekly tips delivered straight to your inbox, join the newsletter. No spam. No sales pitches. Just honest advice every Monday.
        </p>
      </div>
    </div>
  );
}
