"use client";
import { SiteHeader } from "~/components/site-header";
import { SiteFooter } from "~/components/site-footer";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Separator } from "~/components/ui/separator";
import Link from "next/link";
import {
  RocketIcon,
  VideoIcon,
  BrainIcon,
  CreditCardIcon,
  MicIcon,
} from "lucide-react";
import { SessionProvider } from "next-auth/react";


const features = [
  {
    title: "🎬 Auto Viral Moment Detection",
    description: "Stories, questions, and key moments detected with LLMs.",
    icon: <BrainIcon className="w-5 h-5 text-purple-600" />,
  },
  {
    title: "🔊 Auto Subtitles",
    description: "Subtitles generated using WhisperX and styled perfectly for Shorts.",
    icon: <MicIcon className="w-5 h-5 text-green-600" />,
  },
  {
    title: "🎯 Speaker Cropping",
    description: "Crops clips to active speaker's face using LR-ASD.",
    icon: <VideoIcon className="w-5 h-5 text-pink-600" />,
  },
  {
    title: "📱 Shorts-Optimized Output",
    description: "Vertical video format for TikTok, Reels, and YouTube Shorts.",
    icon: <RocketIcon className="w-5 h-5 text-red-500" />,
  },
  {
    title: "💳 Credit System + Stripe",
    description: "Buy clip credits. Pay-as-you-grow with Stripe.",
    icon: <CreditCardIcon className="w-5 h-5 text-yellow-500" />,
  },
];

export default function LandingPage() {
  return (
    <SessionProvider>
      <SiteHeader />

      {/* Hero Section */}
      <section className="px-6 py-24 max-w-5xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
          Turn Podcasts Into Viral Shorts—Automatically
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-8">
          An AI-powered tool that finds viral moments, adds subtitles, and crops speakers for perfect short-form clips.
        </p>
        <Link href="/dashboard">
          <Button size="lg">Try It Free</Button>
        </Link>
        <div className="mt-4 text-sm text-muted-foreground">
          No credit card required. Start with free credits.
        </div>
      </section>

      <Separator />

      {/* Features */}
      <section className="px-6 py-20 max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-12">Features</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <Card key={idx} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  {feature.icon}
                  <h3 className="text-xl font-medium">{feature.title}</h3>
                </div>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      {/* Tech Stack */}
      <section className="px-6 py-16 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-6">Built with Modern Tools</h2>
        <p className="text-muted-foreground mb-8">
          All services used in this project are free and production-ready.
        </p>
        <div className="flex flex-wrap justify-center gap-3 text-sm">
          {[
            "Next.js 15",
            "TypeScript",
            "Tailwind CSS",
            "ShadCN UI",
            "Stripe",
            "FastAPI",
            "Inngest",
            "Modal",
            "WhisperX",
            "Gemini API",
            "FFMPEG",
          ].map((tech) => (
            <Badge key={tech} variant="outline" className="px-3 py-1">
              {tech}
            </Badge>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 bg-secondary text-center">
        <h2 className="text-3xl font-bold mb-4">Start Clipping Today</h2>
        <p className="text-muted-foreground mb-6">
          Upload your podcast and get viral clips in minutes.
        </p>
        <Link href="/dashboard">
          <Button size="lg" className="text-lg">
            Get Started
          </Button>
        </Link>
      </section>

      <SiteFooter />
    </SessionProvider>
  );
}
