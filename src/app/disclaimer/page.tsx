import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer | GrowWithMaya",
  description: "Important disclaimers regarding the content and advice provided on GrowWithMaya.",
};

export default function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-extrabold tracking-tight mb-8">Disclaimer</h1>
      <div className="prose-custom text-muted-foreground">
        <h2>1. General Information</h2>
        <p>The information provided on GrowWithMaya is for general informational and educational purposes only. All content is based on personal experience, research, and industry knowledge. It is not intended as professional advice.</p>

        <h2>2. No Guarantees</h2>
        <p>While we strive to provide accurate and up-to-date information, we make no guarantees regarding the completeness, reliability, or accuracy of any content. Social media platforms, algorithms, and best practices change frequently.</p>

        <h2>3. Results May Vary</h2>
        <p>Any growth strategies, income reports, or case studies shared on this website represent personal experiences and are not typical results. Your individual results will vary based on numerous factors including effort, niche, timing, and market conditions.</p>

        <h2>4. Not Professional Advice</h2>
        <p>The content on this website does not constitute legal, financial, tax, or professional advice. Always consult with qualified professionals before making significant business or financial decisions.</p>

        <h2>5. Affiliate Disclosure</h2>
        <p>GrowWithMaya may contain affiliate links. If you purchase a product or service through these links, we may receive a commission at no additional cost to you. We only recommend products and services we genuinely believe in.</p>

        <h2>6. External Links</h2>
        <p>Our website contains links to external websites. We are not responsible for the content, accuracy, or practices of these third-party sites.</p>

        <h2>7. Changes to This Disclaimer</h2>
        <p>We may update this disclaimer from time to time. Changes will be posted on this page with an updated effective date.</p>

        <h2>8. Contact</h2>
        <p>If you have any questions about this disclaimer, please contact us through our contact page.</p>
      </div>
    </div>
  );
}
