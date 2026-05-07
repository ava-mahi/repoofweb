import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About Maya | GrowWithMaya",
  description: "The real story behind GrowWithMaya. How I went from burnt-out hobbyist to full-time creator, and why I share everything I learn.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col items-center mb-8 animate-in fade-in duration-500">
        <img
          src="/images/maya-author.jpg"
          alt="Maya Chen"
          width={120}
          height={120}
          className="rounded-full object-cover border-2 border-border shadow-md"
          style={{ width: 120, height: 120 }}
        />
        <p className="mt-3 text-sm text-muted-foreground text-center">Maya Chen — Creator & Strategist</p>
      </div>
      <h1 className="text-4xl font-extrabold tracking-tight mb-8">About Me</h1>

      <div className="flex justify-center mb-8">
        <a
          href="https://www.instagram.com/maya?igsh=YXhuaTNxbmZpZTIz"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 px-6 py-3 text-sm font-semibold text-white hover:opacity-90 transition-opacity shadow-lg shadow-pink-500/20"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
          Follow me on Instagram
        </a>
      </div>

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
