import { AppShell } from '@astryxdesign/core/AppShell';
import { Avatar } from '@astryxdesign/core/Avatar';
import { IconButton } from '@astryxdesign/core/IconButton';
import { Link } from '@astryxdesign/core/Link';
import { Section } from '@astryxdesign/core/Section';
import { HStack, StackItem, VStack } from '@astryxdesign/core/Stack';
import { Text } from '@astryxdesign/core/Text';
import { Theme } from '@astryxdesign/core/theme';
import type { ReactNode } from 'react';
import { siGithub, siGooglescholar, siOrcid, siYoutube, type SimpleIcon } from 'simple-icons';
import { siteTheme } from '../../themes/site.js';

type NavLink = {
    text: string;
    href: string;
};

type SiteShellProps = {
    title: string;
    subtitle?: string;
    avatarSrc?: string;
    showHeader?: boolean;
    footerNavLinks: NavLink[];
    socialLinks: NavLink[];
    navigation?: ReactNode;
    children: ReactNode;
};

type BrandIconData = Pick<SimpleIcon, 'path' | 'title'>;

const linkedInIcon: BrandIconData = {
    title: 'LinkedIn',
    path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.447-2.136 2.941v5.665H9.352V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.123 2.062 2.062 0 0 1 0 4.123zM3.56 20.452h3.555V9H3.56v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z'
};

const socialIcons: Record<string, BrandIconData> = {
    Github: siGithub,
    YouTube: siYoutube,
    LinkedIn: linkedInIcon,
    'Google Scholar': siGooglescholar,
    Orcid: siOrcid
};

function BrandIcon({ icon }: { icon: BrandIconData }) {
    return (
        <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
            <path d={icon.path} />
        </svg>
    );
}

export default function SiteShell({ title, subtitle, avatarSrc, showHeader = true, footerNavLinks, socialLinks, navigation, children }: SiteShellProps) {
    return (
        <Theme theme={siteTheme} mode="system">
            <AppShell contentPadding={4} height="auto" variant="surface" topNav={navigation} mobileNav={false}>
                <VStack width="100%" gap={10} className="site-content">
                    {showHeader && (
                        <HStack as="header" gap={4} vAlign="center" width="100%">
                            {avatarSrc && (
                                <Link href="/" label={title}>
                                    <Avatar src={avatarSrc} name={title} size="large" />
                                </Link>
                            )}
                            <StackItem size="fill">
                                <VStack gap={0.5}>
                                    <Text as="p" type="large">
                                        {title}
                                    </Text>
                                    {subtitle && (
                                        <Text as="p" type="supporting" color="secondary">
                                            {subtitle}
                                        </Text>
                                    )}
                                    {socialLinks.length > 0 && (
                                        <HStack gap={1} wrap="wrap">
                                            {socialLinks.map((link) => {
                                                const icon = socialIcons[link.text];
                                                return (
                                                    <IconButton
                                                        key={link.href}
                                                        label={link.text}
                                                        tooltip={link.text}
                                                        href={link.href}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        variant="ghost"
                                                        size="sm"
                                                        icon={icon ? <BrandIcon icon={icon} /> : <span aria-hidden="true">↗</span>}
                                                    />
                                                );
                                            })}
                                        </HStack>
                                    )}
                                </VStack>
                            </StackItem>
                        </HStack>
                    )}

                    <VStack width="100%">{children}</VStack>

                    <VStack as="footer" width="100%">
                        <Section variant="transparent" padding={0} paddingBlock={6} dividers={['top']} width="100%">
                            <VStack gap={4}>
                                <HStack gap={4} wrap="wrap">
                                    {footerNavLinks.map((link) => (
                                        <Link key={link.href} href={link.href} isStandalone>
                                            {link.text}
                                        </Link>
                                    ))}
                                    {socialLinks.map((link) => (
                                        <Link key={link.href} href={link.href} isExternalLink isStandalone>
                                            {link.text}
                                        </Link>
                                    ))}
                                </HStack>
                                <Text as="p" type="supporting" color="secondary">
                                    © {new Date().getFullYear()} {title}. All rights reserved.
                                </Text>
                            </VStack>
                        </Section>
                    </VStack>
                </VStack>
            </AppShell>
        </Theme>
    );
}
