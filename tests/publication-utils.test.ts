import assert from 'node:assert/strict';
import test from 'node:test';

import { parsePublicationsMarkdown } from '../src/utils/publication-utils.ts';

test('classifies SSRN entries as preprints instead of journal papers', () => {
    const markdown = `## 2026

- Chaewon Yang, Sungboo Yoon, Moonseo Park, & Changbum R. Ahn (2026). Closed-Loop Perception–Action Framework for VLM-Based Relational Safety Monitoring in Construction. *SSRN preprint*.
  [DOI](https://doi.org/10.2139/ssrn.7201051)`;

    const { entries } = parsePublicationsMarkdown(markdown);

    assert.equal(entries.length, 1);
    assert.equal(entries[0].type, 'Preprint');
    assert.equal(entries[0].doi, 'https://doi.org/10.2139/ssrn.7201051');
});
