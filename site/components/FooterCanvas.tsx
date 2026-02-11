"use client";

import { useEffect, useRef } from "react";

export function FooterCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let mouseX = -1000;
        let mouseY = -1000;

        // Configuration
        const text = "A";
        const baseLetterCount = 7;
        const lerpSpeed = 0.07; // Smooth interpolation factor — lower = smoother
        const influenceRadius = 0.45; // As fraction of canvas width
        const maxWeightBump = 500; // How much weight to add at full influence

        // Per-letter animated weights
        const currentWeights = new Array(baseLetterCount).fill(0);

        // Initialize base weights
        for (let i = 0; i < baseLetterCount; i++) {
            const progress = i / (baseLetterCount - 1);
            currentWeights[i] = 100 + progress * 800; // 100 to 900
        }

        // Resize handler
        const handleResize = () => {
            const { width, height } = container.getBoundingClientRect();
            const dpr = window.devicePixelRatio || 1;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.scale(dpr, dpr);
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
        };

        // Mouse handlers
        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
        };

        const handleMouseLeave = () => {
            mouseX = -1000;
            mouseY = -1000;
        };

        // Lerp helper
        const lerp = (current: number, target: number, factor: number) =>
            current + (target - current) * factor;

        // Animation Loop
        const render = () => {
            if (!ctx || !canvas) return;
            const { width, height } = canvas.getBoundingClientRect();

            ctx.clearRect(0, 0, width, height);

            // Font sizing — fill most of the height
            const fontSize = height * 0.95;
            const stepX = width / baseLetterCount;

            // Font Family
            const fontFamily =
                getComputedStyle(document.body).getPropertyValue("--font-sans") ||
                "sans-serif";
            const cleanFontFamily = fontFamily.replace(/['"]/g, "").trim();

            const maxDist = width * influenceRadius;

            for (let i = 0; i < baseLetterCount; i++) {
                const progress = i / (baseLetterCount - 1);
                const baseWeight = 100 + progress * 800; // 100 to 900

                let targetWeight = baseWeight;

                // Mouse proximity influence
                const letterCenterX = i * stepX + stepX / 2;
                const letterCenterY = height / 2;

                const dx = mouseX - letterCenterX;
                const dy = mouseY - letterCenterY;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < maxDist) {
                    // Smooth falloff curve — cubic ease out for organic feel
                    const normalizedDist = dist / maxDist;
                    const influence = 1 - normalizedDist * normalizedDist * normalizedDist;
                    targetWeight += influence * maxWeightBump;
                }

                targetWeight = Math.max(100, Math.min(targetWeight, 900));

                // Smoothly interpolate current weight toward target
                currentWeights[i] = lerp(currentWeights[i], targetWeight, lerpSpeed);

                // Clamp after lerp
                currentWeights[i] = Math.max(100, Math.min(currentWeights[i], 900));

                ctx.fillStyle = "#ffffff";
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";

                ctx.font = `${Math.floor(currentWeights[i])} ${fontSize}px ${cleanFontFamily}`;

                const x = i * stepX + stepX / 2;
                const y = height / 2;

                ctx.fillText(text, x, y);
            }

            animationFrameId = requestAnimationFrame(render);
        };

        // Initialize
        window.addEventListener("resize", handleResize);
        canvas.addEventListener("mousemove", handleMouseMove);
        canvas.addEventListener("mouseleave", handleMouseLeave);

        handleResize();
        render();

        return () => {
            window.removeEventListener("resize", handleResize);
            canvas.removeEventListener("mousemove", handleMouseMove);
            canvas.removeEventListener("mouseleave", handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div ref={containerRef} className="w-full h-full bg-black overflow-hidden relative">
            <canvas ref={canvasRef} className="block w-full h-full" />
        </div>
    );
}
