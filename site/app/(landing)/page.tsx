"use client";

import Link from "next/link";

import { gsap } from "gsap";
import { Copy } from "@/custom/copy";
import { ScrollImage } from "@/custom/scroll-image";
import { Button } from "@/components/custom/button";
import { useCallback, useEffect, useRef } from "react";

import { LandingHeader } from "@/components/landing/landing-header";
import { usePreloader } from "@/components/providers/preloader-context";


import { PROGRESS_STEPS } from "@/constants/data";
import { SlidingText } from "@/components/custom/sliding-text";
import { BaseText, BigText, MediumText, Section, SlidingButton, SmallText } from "@/components/components";


export default function Page() {
  const pageWrapperRef = useRef<HTMLDivElement>(null);

  const { registerOnComplete } = usePreloader();

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
    const unregister = registerOnComplete(animateRevealTexts);
    return unregister;
  }, [registerOnComplete, animateRevealTexts]);

  return (
    <div ref={pageWrapperRef} className="flex flex-col min-h-screen gap-10 w-full">
      <LandingHeader />

      <div className="flex flex-col gap-30">

        {/* Variant 1 About section*/}
        {/* <Section className="relative">
          <BigText className="hidden lg:flex">
            Experience <br />
            focused design
          </BigText>

          <div className="flex flex-col gap-5 max-w-lg mx-auto">
            <SmallText className="lg:absolute lg:right-5 lg:top-[60%]">(Our Studio)</SmallText>
            <ScrollImage src="/images/sec1.jpg" className="mx-auto hidden lg:flex" alt="section-1-image" width={1920} height={1080} />
            <Copy>
              <p className="text-xl font-medium">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
            </Copy>
            <Copy>
              <p className="text-xl font-medium">It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            </Copy>
            <Button className="w-max">Learn more about our studio</Button>
          </div>
        </Section> */}
        {/* Variant 1 About Section*/}


        {/* Variant 2 About section */}
        <Section className="relative lg:gap-20">
          <div className="flex flex-col gap-5">
            <SmallText>(Our Studio)</SmallText>
            <BigText className="hidden lg:flex">
              Experience <br />
              focused design
            </BigText>
          </div>

          <div className="flex flex-col ml-auto gap-5 max-w-2xl">
            <Copy>
              <p className="text-xl font-medium">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
            </Copy>
            <Copy>
              <p className="text-xl font-medium">It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            </Copy>
            <Button className="w-max">Learn more about our studio</Button>
          </div>

          <div className="hidden lg:flex items-end gap-5">
            <ScrollImage src="/images/section1/image3.jpg" className="w-[30%] shrink-0 aspect-[3/4]" imageClassName="object-cover" alt="section-1-image" width={1920} height={1080} />
            <ScrollImage src="/images/section1/image2.jpg" className="w-[25%] shrink-0 aspect-[4/5]" imageClassName="object-cover" alt="section-2-image" width={1920} height={1080} />
            <ScrollImage src="/images/section1/image1.jpg" className="w-[20%] shrink-0 aspect-[3/4]" imageClassName="object-cover" alt="section-3-image" width={1920} height={1080} />
          </div>
        </Section>
        {/* Variant 2 About section */}

        {/* Gallery Section */}
        <Section className="lg:gap-20">
          <div className="flex items-center justify-between gap-5">
            <BigText>
              featured <br /> Works
            </BigText>
            <BigText>(06)</BigText>
          </div>

          <div className="flex flex-col gap-5 lg:gap-50">
            <div className="flex flex-col lg:flex-row gap-5 w-full">
              <Link href={"#"} className="flex flex-col lg:flex-row gap-3 w-full group h-max">
                <ScrollImage src="/images/gallery/image1.png" className="w-full" alt="section-2-1-image" width={1920} height={1080} />
                <div className="flex flex-col">
                  <SmallText>(01)</SmallText>
                  <SmallText>S Tower</SmallText>
                  <SmallText>
                    <SlidingText hoverText={<SlidingButton>View Project</SlidingButton>}>Present</SlidingText>
                  </SmallText>
                </div>
              </Link>
              <Link href={"#"} className="flex flex-col lg:flex-row lg:items-end gap-3 w-full group">
                <div className="order-last lg:order-first flex flex-col">
                  <SmallText>(02)</SmallText>
                  <SmallText>NV TOWER</SmallText>
                  <SmallText>
                    <SlidingText hoverText={<SlidingButton>View Project</SlidingButton>}>2021</SlidingText>
                  </SmallText>
                </div>
                <ScrollImage src="/images/gallery/image2.png" className="w-full" alt="section-1-image" width={1920} height={1080} />
              </Link>
            </div>

            <div className="flex flex-col gap-5 lg:gap-20 w-full">
              <div className="w-full">
                <Link href={"#"} className="flex flex-col lg:flex-row gap-3 lg:w-max group h-max">
                  <ScrollImage src="/images/gallery/image3.png" className="w-full xl:w-[1000px] xl:h-[500px]" imageClassName="object-cover" alt="section-2-1-image" width={1000} height={500} />
                  <div className="flex flex-col">
                    <SmallText>(03)</SmallText>
                    <SmallText>Adora 3</SmallText>
                    <SmallText>
                      <SlidingText hoverText={<SlidingButton>View Project</SlidingButton>}>2021</SlidingText>
                    </SmallText>
                  </div>
                </Link>
              </div>
              <div className="w-full flex lg:justify-center">
                <Link href={"#"} className="flex flex-col lg:flex-row lg:items-end gap-3 w-full lg:w-max group">
                  <ScrollImage src="/images/gallery/image4.png" className="h-[500px]" imageClassName="object-cover lg:object-contain" alt="section-1-image" width={1000} height={500} />
                  <div className="flex flex-col">
                    <SmallText>(04)</SmallText>
                    <SmallText>Summer villa R1</SmallText>
                    <SmallText>
                      <SlidingText hoverText={<SlidingButton>View Project</SlidingButton>}>2020</SlidingText>
                    </SmallText>
                  </div>
                </Link>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-5 w-full">
              <Link href={"#"} className="flex flex-col lg:flex-row  gap-3 w-full group">
                <ScrollImage src="/images/gallery/image5.jpg" className="w-full" alt="section-1-image" width={1920} height={1080} />
                <div className="flex flex-col">
                  <SmallText>(05)</SmallText>
                  <SmallText>Amari Residence</SmallText>
                  <SmallText>
                    <SlidingText hoverText={<SlidingButton>View Project</SlidingButton>}>2023</SlidingText>
                  </SmallText>
                </div>
              </Link>

              <Link href={"#"} className="flex flex-col lg:flex-row gap-3 w-full group h-max">
                <div className="order-last lg:order-first flex flex-col">
                  <SmallText>(06)</SmallText>
                  <SmallText>Desizo Monni Administrative Building</SmallText>
                  <SmallText>
                    <SlidingText hoverText={<SlidingButton>View Project</SlidingButton>}>2018</SlidingText>
                  </SmallText>
                </div>
                <ScrollImage src="/images/gallery/image6.jpg" className="w-full" alt="section-2-1-image" width={1920} height={1080} />
              </Link>
            </div>
          </div>

          <Button className="w-max mx-auto">View All projects</Button>
        </Section>


        {/* Progress Section */}
        <Section className="flex flex-col lg:flex-row gap-20 justify-start">
          <div className="flex flex-col gap-3">
            <SmallText>(progress)</SmallText>
            <ScrollImage src="/images/section2/image1.jpg" className="max-w-2xl" alt="Muzeiko image" width={1920} height={1080} imageClassName="object-cover" />
            {PROGRESS_STEPS.map((step, idnex) => (
              <div key={idnex} className="flex items-center gap-2 border-b-2 border-neutral-200 pb-1">
                <BaseText className="text-stone-400">(0{idnex + 1})</BaseText>
                <BaseText>{step.name}</BaseText>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-10 w-full">
            <Copy>
              <MediumText className="font-bold leading-[1.2]">
                Our approach at AAA Architecture
                is designed to make your journey
                from concept to completion as
                smooth and enjoyable as possible.
              </MediumText>
            </Copy>

            <Copy>
              <MediumText className="font-bold leading-[1.2]">
                With our 6-stage process, we
                prioritise clarity, collaboration, and
                your unique vision. At every step, we&apos;ll
                keep you informed, inspired, and
                involved.
              </MediumText>
            </Copy>
          </div>
        </Section>
        {/* Progress Section */}

      </div >
    </div >
  );
}


