import { AspectRatio } from '@astryxdesign/core/AspectRatio';
import { Button } from '@astryxdesign/core/Button';
import { Carousel } from '@astryxdesign/core/Carousel';
import { Icon } from '@astryxdesign/core/Icon';
import { Lightbox, type LightboxMedia } from '@astryxdesign/core/Lightbox';
import { Markdown } from '@astryxdesign/core/Markdown';
import { HStack, VStack } from '@astryxdesign/core/Stack';
import { Heading, Text } from '@astryxdesign/core/Text';
import { useMemo, useState } from 'react';
import { useHeroAutoplay } from '../../hooks/useHeroAutoplay';

type HeroImage = {
    src: string;
    alt: string;
    caption?: string;
};

type HeroAction = {
    text: string;
    href: string;
};

type HeroContentProps = {
    title?: string;
    text?: string;
    images: HeroImage[];
    actions: HeroAction[];
};

export default function HeroContent({ title, text, images, actions }: HeroContentProps) {
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const carouselRef = useHeroAutoplay(images.length, isPaused || isLightboxOpen);
    const slides = images.length > 1 ? [...images, ...images, ...images] : images;
    const lightboxMedia = useMemo<LightboxMedia[]>(() => images.map((image) => ({ src: image.src, alt: image.alt, caption: image.caption })), [images]);

    const openImage = (index: number) => {
        setLightboxIndex(index);
        setIsLightboxOpen(true);
    };

    return (
        <>
            <VStack as="section" gap={8} width="100%">
                {title && (
                    <Heading level={1} type="display-2">
                        {title}
                    </Heading>
                )}
                {images.length > 0 && (
                    <VStack gap={2} width="100%">
                        <Carousel ref={carouselRef} aria-label="Research highlights" gap={3} hasSnap>
                            {slides.map((image, index) => (
                                <VStack
                                    as="figure"
                                    key={`${index}-${image.src}`}
                                    gap={0}
                                    width="min(88vw, 960px)"
                                    className="hero-media"
                                    aria-hidden={images.length > 1 && (index < images.length || index >= images.length * 2) ? true : undefined}
                                    inert={images.length > 1 && (index < images.length || index >= images.length * 2)}
                                >
                                    <button
                                        type="button"
                                        className="hero-lightbox-trigger"
                                        aria-label={`Open image: ${image.alt || `Research highlight ${(index % images.length) + 1}`}`}
                                        onClick={() => openImage(index % images.length)}
                                    >
                                        <AspectRatio ratio={16 / 9}>
                                            <img className="hero-image" src={image.src} alt={image.alt} loading="eager" />
                                        </AspectRatio>
                                    </button>
                                    {image.caption && (
                                        <VStack as="figcaption">
                                            <Text type="supporting" color="secondary">
                                                {image.caption}
                                            </Text>
                                        </VStack>
                                    )}
                                </VStack>
                            ))}
                        </Carousel>
                        {images.length > 1 && (
                            <Button
                                label={isPaused ? 'Play slideshow' : 'Pause slideshow'}
                                variant="ghost"
                                size="sm"
                                onClick={() => setIsPaused((paused) => !paused)}
                            />
                        )}
                    </VStack>
                )}
                {text && (
                    <Markdown contentWidth="100%" contentAlign="start" density="default" headingLevelStart={1} autolink="gfm">
                        {text}
                    </Markdown>
                )}
                {actions.length > 0 && (
                    <HStack gap={2} wrap="wrap">
                        {actions.map((action, index) => {
                            const isExternal = action.href.startsWith('http');
                            return (
                                <Button
                                    key={action.href}
                                    label={action.text}
                                    href={action.href}
                                    variant={index === 0 ? 'primary' : 'secondary'}
                                    size="md"
                                    target={isExternal ? '_blank' : undefined}
                                    rel={isExternal ? 'noopener noreferrer' : undefined}
                                    endContent={isExternal ? <Icon icon="externalLink" size="sm" color="inherit" /> : undefined}
                                />
                            );
                        })}
                    </HStack>
                )}
            </VStack>
            {lightboxMedia.length > 0 && (
                <Lightbox
                    isOpen={isLightboxOpen}
                    onOpenChange={setIsLightboxOpen}
                    media={lightboxMedia}
                    index={lightboxIndex}
                    onIndexChange={setLightboxIndex}
                    hasZoom
                />
            )}
        </>
    );
}
