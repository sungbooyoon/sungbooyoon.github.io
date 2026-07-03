import { Button } from '@astryxdesign/core/Button';
import { Icon } from '@astryxdesign/core/Icon';
import { MobileNav } from '@astryxdesign/core/MobileNav';
import { SideNavItem, SideNavSection } from '@astryxdesign/core/SideNav';
import { HStack, VStack } from '@astryxdesign/core/Stack';
import { TopNav, TopNavHeading, TopNavItem, TopNavMenu } from '@astryxdesign/core/TopNav';
import { useEffect, useState } from 'react';

type NavLink = {
    text: string;
    href: string;
};

type SiteNavigationProps = {
    pathname: string;
    title: string;
    links: NavLink[];
};

const THEME_STORAGE_KEY = 'astryx-theme';
const PRIMARY_PATHS = ['/', '/publications', '/projects', '/blog'];

function isSelected(pathname: string, href: string) {
    if (!href.startsWith('/')) return false;
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(`${href}/`);
}

function applyTheme(mode: 'light' | 'dark') {
    document.documentElement.dataset.theme = mode;
    window.localStorage.setItem(THEME_STORAGE_KEY, mode);
}

export default function SiteNavigation({ pathname, title, links }: SiteNavigationProps) {
    const [isDark, setIsDark] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    useEffect(() => {
        const savedMode = window.localStorage.getItem(THEME_STORAGE_KEY);
        const dark = savedMode === 'dark' || (savedMode !== 'light' && window.matchMedia('(prefers-color-scheme: dark)').matches);
        setIsDark(dark);
        if (savedMode === 'light' || savedMode === 'dark') applyTheme(savedMode);
    }, []);

    const toggleTheme = () => {
        const nextIsDark = !isDark;
        setIsDark(nextIsDark);
        applyTheme(nextIsDark ? 'dark' : 'light');
    };

    const primaryLinks = links.filter((link) => PRIMARY_PATHS.includes(link.href));
    const secondaryLinks = links.filter((link) => !primaryLinks.includes(link));
    const themeButton = <Button label={isDark ? 'Light mode' : 'Dark mode'} variant="ghost" size="sm" onClick={toggleTheme} />;

    return (
        <>
            <VStack className="site-desktop-navigation">
                <TopNav
                    label="Primary navigation"
                    heading={<TopNavHeading heading={title} headingHref="/" />}
                    startContent={
                        <>
                            {primaryLinks.map((link) => (
                                <TopNavItem key={link.href} label={link.text} href={link.href} isSelected={isSelected(pathname, link.href)} />
                            ))}
                            {secondaryLinks.length > 0 && (
                                <TopNavMenu
                                    label="More"
                                    items={secondaryLinks.map((link) => ({
                                        title: link.text,
                                        href: link.href
                                    }))}
                                />
                            )}
                        </>
                    }
                    endContent={themeButton}
                />
            </VStack>

            <VStack className="site-mobile-navigation">
                <TopNav
                    label="Primary navigation"
                    heading={<TopNavHeading heading={title} headingHref="/" />}
                    endContent={
                        <HStack gap={1} vAlign="center">
                            {themeButton}
                            <Button
                                label="Open navigation"
                                variant="ghost"
                                size="sm"
                                icon={<Icon icon="menu" color="inherit" size="sm" />}
                                isIconOnly
                                tooltip="Open navigation"
                                onClick={() => setIsMobileOpen(true)}
                            />
                        </HStack>
                    }
                />
                <MobileNav isOpen={isMobileOpen} onOpenChange={setIsMobileOpen} header="Navigation">
                    <SideNavSection title="Navigation">
                        {links.map((link) => (
                            <SideNavItem key={link.href} label={link.text} href={link.href} isSelected={isSelected(pathname, link.href)} />
                        ))}
                    </SideNavSection>
                </MobileNav>
            </VStack>
        </>
    );
}
