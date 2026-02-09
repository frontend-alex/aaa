"use client";

import { gsap } from "gsap";
import { isDev, isProd } from "@/config/env";
import { Copy } from "@/custom/copy";
import { Preloader } from "@/components/Preloader";
import { ScrollImage } from "@/custom/scroll-image";
import { Button } from "@/components/custom/button";
import { useCallback, useEffect, useRef } from "react";
import { LandingHeader } from "@/components/landing/landing-header";


export default function Page() {
  const pageWrapperRef = useRef<HTMLDivElement>(null);

  // Animate reveal-text elements
  const animateRevealTexts = useCallback(() => {
    const tl = gsap.timeline();

    if (pageWrapperRef.current) {
      const allTexts = pageWrapperRef.current.querySelectorAll(".reveal-text");

      if (allTexts.length) {
        gsap.set(allTexts, { yPercent: 100, y: 0 });

        tl.to(allTexts, {
          yPercent: 0,
          duration: 1.0,
          stagger: 0.05,
          ease: "power3.out",
        }, 0);
      }
    }
  }, []);

  useEffect(() => {
    if (!isProd) {
      animateRevealTexts();
    }
  }, [animateRevealTexts]);

  return (
    <div ref={pageWrapperRef} className="flex flex-col min-h-screen w-full">
      {isProd && <Preloader onComplete={animateRevealTexts} />}

      <LandingHeader onPreloaderComplete={animateRevealTexts} />

      {/* Next section - z-20 (covers the fixed content) */}
      <section className="min-h-screen z-20 p-5 py-10 flex flex-col gap-5">
        <h1 className="big-text hidden lg:flex">Experience <br />
          focused design</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3">
          <div />
          <ScrollImage src="/images/sec1.jpg" className="mx-auto" alt="section-1-image" width={1920} height={1080} />
          <div />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3">
          <div />
          <div className="mx-auto flex flex-col gap-5 font-medium text-lg">
            <Copy>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
            </Copy>
            <Copy>
              <p>It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            </Copy>
          </div>
          <p className="small-text flex justify-end">(Our Studio)</p>
        </div>

        <Button className="mx-auto">Learn about our studio</Button>
      </section>
    </div>
  );
}

