"use client"

import Image from "next/image"

import { MediumText, Section, SmallText } from "@/components/components"
import { OFFICE_HOURS } from "@/constants/data"
import { Button } from "@/custom/button"
import { SlidingText } from "@/custom/text/sliding-text"
import { Text } from "@/custom/text/text"
import { format, toZonedTime } from "date-fns-tz"
import { useEffect, useState } from "react"
import { ContactSheet } from "./ContactSheet"

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
                    <Text>
                        <MediumText className="leading-[1.2] w-full">
                            Let&apos;s explore how we can <br className="hidden lg:flex" />help you achieve your goals.
                        </MediumText>
                    </Text>
                    <ContactSheet>
                        <Button className="w-max">Tell us about your project</Button>
                    </ContactSheet>
                </div>
                <div className="flex flex-col gap-5">
                    <Text>
                        <SmallText>
                            (info)
                        </SmallText>
                    </Text>

                    <div className="flex flex-col max-w-sm">
                        <SmallText className="mb-2"><span className="font-bold">A:</span> Bulgaria, Sofia 1766, Mladost IV, Business Park Sofia, Building 4, fl. 6</SmallText>
                        <SmallText><span className="font-bold">E:</span> office@aaa.bg</SmallText>
                        <SmallText><span className="font-bold">P:</span> (+359 2) 489 9999</SmallText>
                        <SmallText><span className="font-bold">H:</span> Monday to Friday, {OFFICE_HOURS.open}am - {OFFICE_HOURS.close}pm</SmallText>
                    </div>

                    <Image src="/images/footer/cert-image.png" alt="certificate image" width={100} height={100} />
                </div>
            </div>

            <div className="border-t border-neutral-200 p-5 flex flex-col gap-10 lg:gap-0 lg:flex-row justify-between lg:items-end content-center">
                <div className="flex flex-col order-last lg:order-none">
                    <SmallText>
                        © AAA {new Date().getFullYear()}
                    </SmallText>
                    <SmallText className="min-h-[1.5em]">
                        {timeString && status ? `${timeString}, ${status}` : "Loading..."}
                    </SmallText>

                    <SmallText className="flex lg:hidden mt-5">
                        <SlidingText>
                            Site by AIVANOV
                        </SlidingText>
                    </SmallText>
                </div>
                {/* <div className="flex flex-row justify-between"> */}
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
                <SlidingText>
                    <SmallText link className="hidden lg:flex">
                        Site by AIVANOV
                    </SmallText>
                </SlidingText>
                {/* </div> */}
            </div>

            <Image src="/svgs/footer-bg.svg" alt="footer background" className="hidden lg:flex w-full h-full object-cover" width={100} height={100} />
        </Section >
    )
}

export { Footer }
