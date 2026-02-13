"use client"

import Image from "next/image"

import { Copy } from "./custom/copy"
import { Button } from "./custom/button"
import { MediumText, Section, SmallText } from "./components"
import { OFFICE_HOURS } from "@/constants/data"
import { useEffect, useState } from "react"
import { toZonedTime, format } from "date-fns-tz"
import { SlidingText } from "./custom/sliding-text"

function Footer() {
    const [timeString, setTimeString] = useState<string>("")
    const [status, setStatus] = useState<string>("")

    useEffect(() => {
        const updateTime = () => {
            const now = new Date()
            const timeZone = OFFICE_HOURS.timeZone
            const zonedDate = toZonedTime(now, timeZone)

            // Format: "11:47 PM Sofia"
            setTimeString(`${format(zonedDate, 'hh:mm a', { timeZone })} Sofia`)

            // Check status
            const hour = zonedDate.getHours()
            const day = zonedDate.getDay() // 0 = Sun, 1 = Mon, ... 6 = Sat

            const isOpenDay = day !== 0 && day !== 6
            const isOpenHour = hour >= OFFICE_HOURS.open && hour < OFFICE_HOURS.close

            if (isOpenDay && isOpenHour) {
                setStatus("we are open")
            } else {
                setStatus("we are closed")
            }
        }

        updateTime()
        const interval = setInterval(updateTime, 1000 * 60)
        return () => clearInterval(interval)
    }, [])

    return (
        <Section className="z-20 p-0 gap-0">
            <div className="flex flex-col lg:flex-row justify-between gap-10 border-t border-neutral-200 min-h-[50dvh] py-10 px-5">
                <div className="flex flex-col gap-10">
                    <Copy>
                        <MediumText>
                            Let&apos;s explore how we can <br className="hidden lg:flex" />help you achieve your goals.
                        </MediumText>
                    </Copy>
                    <Button className="w-max">Tell us about your project</Button>
                </div>
                <div className="flex flex-col gap-5">
                    <Copy>
                        <SmallText>
                            (info)
                        </SmallText>
                    </Copy>

                    <div className="flex flex-col max-w-sm">
                        <SmallText className="mb-2"><span className="font-bold">A:</span> Bulgaria, Sofia 1766, Mladost IV, Business Park Sofia, Building 4, fl. 6</SmallText>
                        <SmallText><span className="font-bold">E:</span> office@aaa.bg</SmallText>
                        <SmallText><span className="font-bold">P:</span> (+359 2) 489 9999</SmallText>
                        <SmallText><span className="font-bold">H:</span> Monday to Friday, {OFFICE_HOURS.open}am - {OFFICE_HOURS.close}pm</SmallText>
                    </div>

                    <Image src="/images/footer/cert-image.png" alt="certificate image" width={100} height={100} />
                </div>
            </div>

            <div className="border-t border-neutral-200 p-5 flex flex-col lg:flex-row justify-between lg:items-end content-center">
                <div className="flex flex-col">
                    <SmallText>
                        © AAA {new Date().getFullYear()}
                    </SmallText>
                    <SmallText className="min-h-[1.5em]">
                        {timeString && status ? `${timeString}, ${status}` : "Loading..."}
                    </SmallText>
                </div>
                <div className="flex flex-col">
                    <SmallText>
                        <SlidingText>
                            Privacy Policy
                        </SlidingText>
                    </SmallText>
                    <SmallText >
                        <SlidingText>
                            Terms & Conditions
                        </SlidingText>
                    </SmallText>
                </div>
                <SmallText>
                    <SlidingText>
                        Instagram
                    </SlidingText>
                </SmallText>
                <SmallText>
                    <SlidingText>
                        Site by AIVANOV
                    </SlidingText>
                </SmallText>
            </div>

            <Image src="/svgs/footer-bg.svg" alt="footer background" className="w-full h-full object-cover" width={100} height={100} />
        </Section>
    )
}

export { Footer }