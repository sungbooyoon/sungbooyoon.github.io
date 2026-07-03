import { defineTheme } from '@astryxdesign/core/theme';
import { neutralTheme } from '@astryxdesign/theme-neutral';

export const siteTheme = defineTheme({
    name: 'site',
    extends: neutralTheme,
    typography: {
        scale: {
            base: 16,
            ratio: 1.2
        },
        body: {
            family: 'Noto Sans KR Variable',
            fallbacks: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
        },
        heading: {
            family: 'Noto Serif KR Variable',
            fallbacks: 'Georgia, serif'
        },
        code: {
            family: 'SFMono-Regular',
            fallbacks: 'Consolas, "Liberation Mono", monospace'
        }
    }
});
