import { AppShell } from '@astryxdesign/core/AppShell';
import { Avatar } from '@astryxdesign/core/Avatar';
import { Link } from '@astryxdesign/core/Link';
import { Section } from '@astryxdesign/core/Section';
import { HStack, StackItem, VStack } from '@astryxdesign/core/Stack';
import { Text } from '@astryxdesign/core/Text';
import { Theme } from '@astryxdesign/core/theme';
import type { ReactNode } from 'react';
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
                                    <Text as="p" type="large" weight="semibold">
                                        {title}
                                    </Text>
                                    {subtitle && (
                                        <Text as="p" type="supporting" color="secondary">
                                            {subtitle}
                                        </Text>
                                    )}
                                    {socialLinks.length > 0 && (
                                        <HStack gap={3} wrap="wrap">
                                            {socialLinks.map((link) => (
                                                <Link key={link.href} href={link.href} isExternalLink isStandalone color="secondary">
                                                    {link.text}
                                                </Link>
                                            ))}
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
