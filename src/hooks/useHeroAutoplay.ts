import { useEffect, useRef } from 'react';

const INTERVAL = 5000;

/** Keep Astryx's native scrolling and controls, with identical copies at both ends. */
export function useHeroAutoplay(imageCount: number, paused: boolean) {
    const carouselRef = useRef<HTMLDivElement>(null);
    const pausedRef = useRef(paused);
    pausedRef.current = paused;

    useEffect(() => {
        const root = carouselRef.current;
        // Astryx Carousel places its scroll container directly inside its region.
        const scroller = root?.firstElementChild as HTMLElement | null;
        if (!root || !scroller || imageCount < 2) return;

        const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
        const canHover = window.matchMedia('(hover: hover)');
        const items = Array.from(scroller.children) as HTMLElement[];
        const stride = () => items[1].getBoundingClientRect().left - items[0].getBoundingClientRect().left;
        let step = stride();
        let lastInteraction = 0;
        let pointerDown = false;
        let settleTimer: ReturnType<typeof setTimeout>;
        let position = imageCount;

        const jumpTo = (index: number) => scroller.scrollTo({ left: index * step, behavior: 'instant' });
        jumpTo(position);

        const settle = () => {
            clearTimeout(settleTimer);
            if (pointerDown) return;
            position = Math.round(scroller.scrollLeft / step);
            // Move only between visually identical copies, never animate the reset.
            if (position < imageCount || position >= imageCount * 2) {
                position = imageCount + (((position % imageCount) + imageCount) % imageCount);
                jumpTo(position);
            }
        };
        const onScroll = () => {
            clearTimeout(settleTimer);
            settleTimer = setTimeout(settle, 150);
        };
        const interact = () => {
            lastInteraction = performance.now();
        };
        const onPointerDown = () => {
            pointerDown = true;
            interact();
        };
        const onPointerUp = () => {
            pointerDown = false;
            settle();
        };
        const onVisibility = () => {
            lastInteraction = performance.now();
        };
        const resize = new ResizeObserver(() => {
            const nextStep = stride();
            if (nextStep === step || nextStep <= 0) return;
            step = nextStep;
            position = imageCount + (((position % imageCount) + imageCount) % imageCount);
            jumpTo(position);
        });
        resize.observe(scroller);
        scroller.addEventListener('scroll', onScroll, { passive: true });
        scroller.addEventListener('scrollend', settle);
        window.addEventListener('pointerdown', onPointerDown);
        window.addEventListener('pointerup', onPointerUp);
        window.addEventListener('pointercancel', onPointerUp);
        window.addEventListener('wheel', interact, { passive: true });
        window.addEventListener('keydown', interact);
        document.addEventListener('visibilitychange', onVisibility);

        const timer = setInterval(() => {
            if (
                pausedRef.current ||
                motion.matches ||
                document.hidden ||
                pointerDown ||
                (canHover.matches && root.matches(':hover')) ||
                root.contains(document.activeElement) ||
                performance.now() - lastInteraction < INTERVAL
            )
                return;
            const next = Math.round(scroller.scrollLeft / step) - 1;
            const image = items[next]?.querySelector('img');
            if (!image?.complete || !image.naturalWidth) return;
            // Decreasing scrollLeft moves the images physically to the right.
            scroller.scrollTo({ left: next * step, behavior: 'smooth' });
        }, INTERVAL);

        return () => {
            clearInterval(timer);
            clearTimeout(settleTimer);
            resize.disconnect();
            scroller.removeEventListener('scroll', onScroll);
            scroller.removeEventListener('scrollend', settle);
            window.removeEventListener('pointerdown', onPointerDown);
            window.removeEventListener('pointerup', onPointerUp);
            window.removeEventListener('pointercancel', onPointerUp);
            window.removeEventListener('wheel', interact);
            window.removeEventListener('keydown', interact);
            document.removeEventListener('visibilitychange', onVisibility);
        };
    }, [imageCount]);

    return carouselRef;
}
