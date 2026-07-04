import { Avatar } from '@astryxdesign/core/Avatar';
import { Button } from '@astryxdesign/core/Button';
import { CommandPalette } from '@astryxdesign/core/CommandPalette';
import { Icon } from '@astryxdesign/core/Icon';
import { IconButton } from '@astryxdesign/core/IconButton';
import { MobileNav } from '@astryxdesign/core/MobileNav';
import { SideNavItem, SideNavSection } from '@astryxdesign/core/SideNav';
import { HStack, VStack } from '@astryxdesign/core/Stack';
import { TopNav, TopNavHeading, TopNavItem } from '@astryxdesign/core/TopNav';
import { createStaticSource, type SearchableItem } from '@astryxdesign/core/Typeahead';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { useEffect, useMemo, useState } from 'react';
import { siGooglescholar } from 'simple-icons';

type NavLink = {
    text: string;
    href: string;
};

type SiteNavigationProps = {
    pathname: string;
    title: string;
    avatarSrc?: string;
    scholarHref?: string;
    links: NavLink[];
    searchItems: SearchLink[];
};

type SearchLink = NavLink & {
    group: string;
};

type SiteSearchItem = SearchableItem<{
    group: string;
    href: string;
}>;

const THEME_STORAGE_KEY = 'astryx-theme';
function isSelected(pathname: string, href: string) {
    if (!href.startsWith('/')) return false;
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(`${href}/`);
}

function applyTheme(mode: 'light' | 'dark') {
    document.documentElement.dataset.theme = mode;
    window.localStorage.setItem(THEME_STORAGE_KEY, mode);
}

function ScholarIcon() {
    return (
        <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
            <path d={siGooglescholar.path} />
        </svg>
    );
}

export default function SiteNavigation({ pathname, title, avatarSrc, scholarHref, links, searchItems }: SiteNavigationProps) {
    const [isDark, setIsDark] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const searchEntries = useMemo(
        () =>
            searchItems.map((item, index) => ({
                id: `${item.group}-${index}`,
                label: item.text,
                auxiliaryData: { group: item.group, href: item.href }
            })),
        [searchItems]
    );
    const searchSource = useMemo(() => createStaticSource<SiteSearchItem>(searchEntries), [searchEntries]);
    const desktopLinks = links.filter((link) => link.href !== '/about');

    useEffect(() => {
        const savedMode = window.localStorage.getItem(THEME_STORAGE_KEY);
        const dark = savedMode === 'dark' || (savedMode !== 'light' && window.matchMedia('(prefers-color-scheme: dark)').matches);
        setIsDark(dark);
        if (savedMode === 'light' || savedMode === 'dark') applyTheme(savedMode);
    }, []);

    useEffect(() => {
        const openSearch = (event: KeyboardEvent) => {
            if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
                event.preventDefault();
                setIsSearchOpen(true);
            }
        };
        window.addEventListener('keydown', openSearch);
        return () => window.removeEventListener('keydown', openSearch);
    }, []);

    const toggleTheme = () => {
        const nextIsDark = !isDark;
        setIsDark(nextIsDark);
        applyTheme(nextIsDark ? 'dark' : 'light');
    };

    const navigateToSearchItem = (id: string) => {
        const item = searchEntries.find((candidate) => candidate.id === id);
        if (item) window.location.assign(item.auxiliaryData.href);
    };

    const searchButton = (
        <IconButton
            label="Search site"
            tooltip="Search site (⌘K)"
            variant="ghost"
            size="sm"
            icon={<Icon icon="search" color="inherit" size="sm" />}
            onClick={() => setIsSearchOpen(true)}
        />
    );
    const themeButton = (
        <IconButton
            label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            tooltip={isDark ? 'Light mode' : 'Dark mode'}
            variant="ghost"
            size="sm"
            icon={<Icon icon={isDark ? SunIcon : MoonIcon} color="inherit" size="sm" />}
            onClick={toggleTheme}
        />
    );
    const scholarButton = scholarHref ? (
        <IconButton
            label="Google Scholar"
            tooltip="Google Scholar"
            href={scholarHref}
            target="_blank"
            rel="noopener noreferrer"
            variant="ghost"
            size="sm"
            icon={<ScholarIcon />}
        />
    ) : null;
    const navHeading = <TopNavHeading logo={avatarSrc ? <Avatar src={avatarSrc} name={title} size={24} /> : undefined} headingHref="/" />;

    const renderNavItem = (link: NavLink) => {
        const isExternal = link.href.startsWith('http');
        return (
            <TopNavItem
                key={link.href}
                label={link.text}
                href={link.href}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                isSelected={isSelected(pathname, link.href)}
            >
                {link.text}
                {isExternal && <Icon icon="externalLink" size="sm" color="inherit" />}
            </TopNavItem>
        );
    };

    return (
        <>
            <VStack className="site-desktop-navigation">
                <TopNav
                    label="Primary navigation"
                    heading={navHeading}
                    centerContent={<>{desktopLinks.map(renderNavItem)}</>}
                    endContent={
                        <HStack gap={1} vAlign="center">
                            {searchButton}
                            {scholarButton}
                            {themeButton}
                            <Button label="About me" href="/about" variant="primary" size="md" className="site-about-button" />
                        </HStack>
                    }
                />
            </VStack>

            <VStack className="site-mobile-navigation">
                <TopNav
                    label="Primary navigation"
                    heading={navHeading}
                    endContent={
                        <HStack gap={1} vAlign="center">
                            {searchButton}
                            {scholarButton}
                            {themeButton}
                            <IconButton
                                label="Open navigation"
                                variant="ghost"
                                size="sm"
                                icon={<Icon icon="menu" color="inherit" size="sm" />}
                                tooltip="Open navigation"
                                onClick={() => setIsMobileOpen(true)}
                            />
                        </HStack>
                    }
                />
                <MobileNav isOpen={isMobileOpen} onOpenChange={setIsMobileOpen} header={navHeading} label="Navigation">
                    <SideNavSection title="Navigation" isHeaderHidden>
                        {links.map((link) => {
                            const isExternal = link.href.startsWith('http');
                            return (
                                <SideNavItem
                                    key={link.href}
                                    label={link.text}
                                    href={link.href}
                                    isSelected={isSelected(pathname, link.href)}
                                    endContent={isExternal ? <Icon icon="externalLink" size="sm" color="secondary" /> : undefined}
                                />
                            );
                        })}
                    </SideNavSection>
                </MobileNav>
            </VStack>

            <CommandPalette
                isOpen={isSearchOpen}
                onOpenChange={setIsSearchOpen}
                searchSource={searchSource}
                onValueChange={navigateToSearchItem}
                label="Search site"
                emptySearchText="No matching pages"
            />
        </>
    );
}
