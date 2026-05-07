import type { Metadata } from "next";
import { Mail } from "lucide-react";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | GrowWithMaya",
  description: "Have a question, collaboration idea, or just want to say hi? Reach out to the GrowWithMaya team.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary mb-4">
          <Mail className="h-6 w-6" />
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight mb-3">Get in Touch</h1>
        <p className="text-muted-foreground">
          Have a question, collaboration idea, or just want to say hi? I&apos;d love to hear from you.
        </p>
      </div>
      <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-6">
        <Mail className="h-4 w-4" />
        <span>You can also reach us directly at: <a href="mailto:hello@growwithmaya.info" className="font-medium text-foreground hover:underline">hello@growwithmaya.info</a></span>
      </div>
      <ContactForm />
    </div>
  );
}
