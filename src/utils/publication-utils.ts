export type PublicationBadge = 'Best Paper' | "Editor's Choice" | 'Invited';

export type PublicationEntry = {
    id: string;
    year: number;
    authors: string;
    title: string;
    venue: string;
    type: 'Journal' | 'Conference' | 'Preprint';
    doi?: string;
    video?: string;
    badges: PublicationBadge[];
};

export type PublicationPageData = {
    intro: string;
    entries: PublicationEntry[];
};

const badgePattern = /\{\{badge:(Best Paper|Editor's Choice|Invited)\}\}/g;
const actionPattern = /\[(DOI|Video)\]\(([^)]+)\)/g;
const conferencePattern = /\b(conference|workshop|isarc|proceedings)\b/i;
const preprintPattern = /\b(preprint|ssrn)\b/i;

function stripMarkdown(value: string) {
    return value.replace(/\*+/g, '').replace(/\s+/g, ' ').trim();
}

function createEntry(raw: string, fallbackYear: number, index: number): PublicationEntry {
    const badges = [...raw.matchAll(badgePattern)].map((match) => match[1] as PublicationBadge);
    const actions = Object.fromEntries([...raw.matchAll(actionPattern)].map((match) => [match[1].toLowerCase(), match[2]]));
    const citation = raw.replace(badgePattern, '').replace(actionPattern, '').replace(/\s+/g, ' ').trim();
    const citationMatch = citation.match(/^(.*?)\s+\((\d{4})\)\.\s+([\s\S]+)$/);
    const authors = (citationMatch?.[1]?.trim() ?? '').replace(/,?\s*&\s*/g, ', ');
    const year = Number(citationMatch?.[2] ?? fallbackYear);
    const body = citationMatch?.[3]?.trim() ?? citation;
    const titleAndVenue = body.match(/^(.*?)\.\s+((?:In\s+)?\*[\s\S]+)$/);
    const title = stripMarkdown(titleAndVenue?.[1] ?? body);
    const venue = stripMarkdown(titleAndVenue?.[2] ?? '');
    const type = preprintPattern.test(venue)
        ? 'Preprint'
        : titleAndVenue?.[2]?.startsWith('In ') || conferencePattern.test(venue)
          ? 'Conference'
          : 'Journal';

    return {
        id: `${year}-${index}-${title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '')}`,
        year,
        authors,
        title,
        venue,
        type,
        doi: actions.doi,
        video: actions.video,
        badges
    };
}

export function parsePublicationsMarkdown(content: string): PublicationPageData {
    const lines = content.split(/\r?\n/);
    const firstYearHeading = lines.findIndex((line) => /^##\s+\d{4}\s*$/.test(line));
    const intro = lines
        .slice(0, firstYearHeading < 0 ? lines.length : firstYearHeading)
        .join('\n')
        .trim();
    const entries: PublicationEntry[] = [];
    let currentYear = new Date().getFullYear();
    let currentItem: string[] = [];

    const commitItem = () => {
        if (currentItem.length === 0) return;
        entries.push(createEntry(currentItem.join(' '), currentYear, entries.length));
        currentItem = [];
    };

    lines.slice(Math.max(firstYearHeading, 0)).forEach((line) => {
        const yearMatch = line.match(/^##\s+(\d{4})\s*$/);
        if (yearMatch) {
            commitItem();
            currentYear = Number(yearMatch[1]);
            return;
        }

        if (line.startsWith('- ')) {
            commitItem();
            currentItem = [line.slice(2).trim()];
            return;
        }

        if (currentItem.length > 0 && line.trim()) currentItem.push(line.trim());
    });
    commitItem();

    return { intro, entries };
}
