import { AspectRatio } from '@astryxdesign/core/AspectRatio';
import { Button } from '@astryxdesign/core/Button';
import { Carousel } from '@astryxdesign/core/Carousel';
import { Markdown } from '@astryxdesign/core/Markdown';
import { HStack, VStack } from '@astryxdesign/core/Stack';
import { Heading, Text } from '@astryxdesign/core/Text';

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
    return (
        <VStack as="section" gap={8} width="100%">
            {title && (
                <Heading level={1} type="display-2">
                    {title}
                </Heading>
            )}
            {images.length > 0 && (
                <Carousel aria-label="Research highlights" gap={3} hasSnap>
                    {images.map((image) => (
                        <VStack as="figure" key={image.src} gap={0} width="min(88vw, 960px)" className="hero-media">
                            <AspectRatio ratio={16 / 9}>
                                <img className="hero-image" src={image.src} alt={image.alt} loading="eager" />
                            </AspectRatio>
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
            )}
            {text && <Markdown contentWidth="100%">{text}</Markdown>}
            {actions.length > 0 && (
                <HStack gap={3} wrap="wrap">
                    {actions.map((action, index) => (
                        <Button
                            key={action.href}
                            label={action.text}
                            href={action.href}
                            variant={index === 0 ? 'primary' : 'secondary'}
                            target={action.href.startsWith('http') ? '_blank' : undefined}
                            rel={action.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        />
                    ))}
                </HStack>
            )}
        </VStack>
    );
}
