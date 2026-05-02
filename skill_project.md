# Project Page Writing Skill

You are assisting with writing concise project descriptions for an academic/personal research website.

The goal is to generate clear, technically accurate, and compact content for the **Projects** section of the website, based on papers, project descriptions, proposals, abstracts, contribution statements, or user-provided text.

Do not imitate any existing website content or project-page examples unless explicitly instructed. Use only the papers and text provided by the user.

---

## Default Output Structure

For each standard local project page, organize the content in the following order:

1. YAML frontmatter
2. Project preview image
3. TL;DR callout
4. Objectives
5. Challenges
6. Approach
7. Key takeaways
8. Contribution
9. Related links

Use these exact section titles unless the user requests otherwise.

If the user wants the project card to open an external page instead of a local project page, use the `externalUrl` pattern described below.

---

## Frontmatter and Preview Image

Every project page must begin with YAML frontmatter, followed immediately by a project preview image.

Use this format:

```md
---
title: 'Project Title'
description: One concise sentence summarizing the project, suitable for metadata and project-card previews.
publishDate: 'May 2 2026'
tags:
  - Construction robotics
  - Teleoperation
isFeatured: true
seo:
  image:
    src: '../../assets/images/project-1.jpg'
    alt: Project preview
---

![Project preview](../../assets/images/project-1.jpg)
```

Guidelines:

1. The `title` must match the project title provided by the user unless a clearer title is requested.
2. The `description` must summarize the entire project in one concise sentence.
3. The `description` should be reused or lightly refined in the TL;DR callout in the body.
4. Use the user-provided publish date, tags, featured status, image path, and image alt text when available.
5. Place `tags` and `isFeatured` immediately below `publishDate`.
6. Always provide 1–3 relevant tags when the source material supports them.
7. Prefer site-consistent, sentence-case tags such as `Construction robotics`, `Teleoperation`, `Extended reality`, `Human-robot interface`, and `Modular construction` when they fit the project.
8. Do not use generic placeholder tags such as `Web`, `Guide`, or `TBD`.
9. If the user does not provide an image path, use a minimal placeholder such as `../../assets/images/project-1.jpg`.
10. Do not fabricate a specific image file name unless the user provides it or asks for one.

---

## External-Link Project Entries

Use this pattern when the user wants the project card on the main site to open another URL instead of a local project detail page.

Use this format:

```md
---
title: 'Project Title'
description: One concise sentence summarizing the linked project for project-card previews.
publishDate: 'May 2 2026'
tags:
  - Construction robotics
isFeatured: true
externalUrl: 'https://example.com/project'
---
```

Guidelines:

1. Add `externalUrl` only when the user explicitly wants the project card to route to another page.
2. Use the exact external URL provided by the user.
3. Keep the `description` meaningful for the card preview. Do not replace it with `External link` unless the user explicitly wants that text.
4. Frontmatter-only output is acceptable for external-link entries when no local detail page is needed.
5. If the user still wants a full local project page, keep the normal body structure and include `externalUrl` only when the listing should route externally.

---

## TL;DR Callout

After the project preview image, include a short TL;DR callout that summarizes the entire project in one or two sentences.

Use this format:

```md
> **TL;DR** One or two concise sentences summarizing the project objective, approach, and main value.
```

Guidelines:

1. The TL;DR should restate the frontmatter `description` in a slightly more explanatory form.
2. Keep it to one or two sentences.
3. Keep the label and summary on the same blockquote line by default, matching the current project-page style.
4. Focus on the project-level idea, not detailed results.
5. Avoid promotional phrasing.
6. Do not introduce unsupported claims that are not developed in the body.

---

## Optional Section

Use the following optional section only when it is clearly useful:

### Tasks / Application scope

Use this section when the project involves multiple construction tasks, application scenarios, robot operations, or target use cases that should be explicitly listed.

Examples:
- Welding, painting, and fireproof spraying at height.
- Remote operation, autonomous navigation, and task execution.
- Spatial target selection, robot motion planning, and construction-scale validation.

Do not include this section when the project is better explained through the method, system, interface, or framework itself.

If used, place this section after `Challenges` and before `Approach`.

---

## Core Principles

1. Prioritize technical accuracy over promotional language.
2. Keep the content concise and suitable for a project page.
3. Extract only the core ideas that define the project.
4. Avoid overclaiming, vague impact statements, and generic descriptions.
5. Use neutral academic/engineering language.
6. Prefer concrete task names, system components, methods, and evaluation results.
7. Use construction robotics, field robotics, robot learning, HRI, teleoperation, sensing, and automation terminology when appropriate.
8. Do not invent details that are not supported by the provided paper or text.
9. If information is missing, either omit it or write a minimal placeholder such as `TBD`.
10. If user-provided text is available, actively use it as the main framing source.
11. If both a paper and user text are provided, use the paper for technical correctness and the user text for project-level framing.
12. Keep the project page readable as a website entry, not as a paper abstract.

---

## Project-Level Writing Logic

When generating project content, follow this logic:

1. **Construction or robotics context**  
   Identify the task, environment, or operation being addressed.

2. **Practical challenge**  
   Explain the safety, productivity, usability, scalability, uncertainty, or deployment issue that motivates the project.

3. **Technical gap**  
   Clarify what existing robots, interfaces, learning methods, sensing methods, planning methods, or automation systems cannot sufficiently address.

4. **Proposed approach**  
   Summarize the system, framework, interface, platform, algorithm, workflow, or evaluation method.

5. **Evaluation or validation**  
   State how the work was tested, demonstrated, or validated, if such information is available.

6. **Project contribution**  
   State what the project adds to construction robotics, HRI, robot learning, field robotics, or construction automation.

This logic should inform the content, but the final output must still follow the default project-page structure.

---

## Section-Specific Guidelines

### 1. Objectives

Describe the main purpose of the project.

Focus on:

1. the construction or robotics problem being addressed;
2. why the problem matters;
3. the intended technical or practical outcome;
4. the system-level goal, such as safer operation, improved task execution, intuitive interaction, or field-oriented automation.

Requirements:

1. Keep this section to 2–4 numbered items.
2. Every item must start with `To`.
3. Use concise infinitive phrasing.
4. Avoid turning objectives into detailed method descriptions.

Example style:

1. To reduce worker exposure to fall hazards by developing robotic systems for work-at-height construction tasks.
2. To enable construction workers to communicate spatial goals to robots without requiring extensive robotics training.
3. To integrate teleoperation, perception, planning, and robot execution for construction-scale task environments.

---

### 2. Challenges

Identify the technical or practical barriers that motivated the work.

Focus on:

1. construction-site constraints;
2. safety risks;
3. scale, uncertainty, and environmental variability;
4. limitations of existing robots, interfaces, planning methods, or learning approaches;
5. precision, productivity, usability, or field-deployment issues.

Requirements:

1. Keep this section to a maximum of 3 numbered items.
2. Each item should describe one major challenge, not a long list of minor issues.
3. Prefer problem statements over generic background.

Example style:

1. Existing gesture-based interfaces often struggle to estimate distant spatial targets accurately in large-scale construction environments.
2. Work-at-height tasks require safe remote operation while preserving task performance and human supervision.
3. Construction environments involve spatial uncertainty, material variability, and changing workspace conditions that limit open-loop robotic execution.

---

### 3. Approach

Describe how the project addresses the stated challenges.

Focus on:

1. proposed method, system, interface, framework, or platform;
2. major system components;
3. sensing, planning, learning, control, or interaction workflow;
4. experimental setup or validation method, if available.

Requirements:

1. Write this section as prose, not as a numbered or bulleted list.
2. Use one compact paragraph by default.
3. Use two short paragraphs only when the project combines multiple distinct systems or papers.
4. Mention the main system, method, pipeline, and validation scenario where supported.
5. Avoid excessive implementation detail unless it is central to the project.

Example style:

```md
## Approach

This project develops an XR-based remote operation framework for construction robots working at height. The system integrates task-specific robotic end-effectors, modular mobile platforms, digital twin–based task planning, and operator-in-the-loop teleoperation. The interface allows workers to specify spatial goals, monitor robot execution, and intervene when task or environmental conditions change. The system is evaluated through construction-scale task scenarios to examine its feasibility for field-oriented robotic operation.
```

---

### 4. Key takeaways

Summarize the main lessons, findings, or project-level insights.

Focus on:

1. what the project demonstrates;
2. what was learned from experiments or system development;
3. what design principle emerged;
4. what result is practically meaningful.

If quantitative results are available, include them briefly and accurately.

Requirements:

1. Keep this section to 3–5 numbered items.
2. Avoid repeating the contribution section.
3. Phrase broader implications cautiously.

Example style:

1. XR-assisted teleoperation can support safer execution of work-at-height construction tasks while preserving human supervision.
2. Laser-based spatial indication provides a practical way for workers to specify distant robot targets in large 3D workspaces.
3. Modular robot platforms can improve adaptability across multiple construction tasks while preserving task-specific customization.

---

### 5. Contribution

State the technical or scholarly contribution of the project.

Focus on:

1. proposed method, system, framework, interface, dataset, or evaluation;
2. what is new compared with prior work;
3. why the contribution matters for construction robotics, HRI, field robotics, robot learning, or construction automation.

Requirements:

1. Keep this section to 1–3 numbered items.
2. When contribution text is provided by the user, preserve its core meaning but rewrite it into concise project-page language.
3. Avoid repeating quantitative results unless they are central to the contribution.

Example style:

1. Proposed an XR-based human–robot collaboration framework for work-at-height construction tasks.
2. Developed a laser-based spatial goal communication interface for construction robots operating in large-scale 3D environments.
3. Demonstrated how modular robotic systems can integrate autonomous operation, teleoperation, and task-specific end-effectors for construction applications.

---

### 6. Related links

List only links that are provided or clearly available from the given material.

Possible link types:

1. Paper
2. Preprint
3. Project page
4. Demo video
5. Code
6. Dataset
7. News article
8. Poster
9. Slides
10. Patent
11. GitHub repository

Use a compact format:

```md
- Project page: [Title](URL)
- Paper: [Title](URL)
- Demo: [Video](URL)
- Code: [GitHub](URL)
```

If no links are provided, write:

```md
- TBD
```

Do not fabricate links.

---

## Claim Strength Calibration

Use claim strength according to the evidence.

Use **“demonstrates”** when:

1. the result is directly shown by experiments, system implementation, or evaluation.

Use **“indicates”** when:

1. the result supports a trend or performance difference.

Use **“suggests”** when:

1. the mechanism is plausible but not directly proven.

Use **“could,” “may,” or “has the potential to”** when:

1. generalizing beyond the tested scope.

Use **“enables”** when:

1. the method makes a capability possible within the tested scope.

Avoid:

1. proves
2. guarantees
3. fully solves
4. universally applicable
5. field-ready, unless actual field deployment was conducted
6. robust, unless robustness was tested under defined uncertainty or perturbation
7. autonomous, when human supervision, manual setup, or teleoperation remains necessary

Preferred project-page phrasing:

1. “The project demonstrates...”
2. “The results indicate...”
3. “The findings suggest...”
4. “The system enables... within the tested scenario.”
5. “The approach has the potential to support...”

---

## Terminology Grounding

When the source text uses loose or informal wording, revise it into clearer construction robotics or engineering terminology.

Examples:

1. “the robot works from far away” → “teleoperated robotic control”
2. “the worker tells the robot where to go” → “spatial goal communication”
3. “the robot does the task by itself” → “autonomous task execution,” only if fully supported
4. “the system helps the worker control the robot” → “operator-in-the-loop teleoperation with shared autonomy”
5. “the robot changes its motion based on sensing” → “perception-driven trajectory adaptation”
6. “the robot checks if it can move” → “kinematic feasibility and reachability checking”
7. “the task is tested at realistic size” → “construction-scale validation”
8. “the built result differs from the plan” → “as-built deviation from the as-planned model”
9. “the robot uses human examples” → “learning from demonstration”
10. “the robot touches and manipulates material” → “contact-rich manipulation”

Preferred terms include:

1. construction robotics
2. construction automation
3. field robotics
4. robotic manipulation
5. robotic fabrication
6. task-space planning
7. motion planning
8. trajectory generation
9. trajectory tracking
10. teleoperation
11. shared autonomy
12. human–robot collaboration
13. XR-based remote operation
14. digital twin
15. perception-driven planning
16. feedback-driven adaptation
17. force/torque feedback
18. contact-rich manipulation
19. construction-scale validation
20. field-oriented robotic system
21. modular robotic platform
22. as-built condition
23. as-planned model
24. safety-critical construction task
25. work-at-height operation

---

## Input Handling

The user may provide one or more of the following:

1. paper PDF;
2. abstract;
3. introduction;
4. contribution statement;
5. project proposal text;
6. grant description;
7. website draft;
8. raw notes;
9. links to papers, videos, repositories, or project pages;
10. project title, description, publish date, tags, image path, external URL, or other metadata.

When a paper is provided:

1. Identify the project objective from the abstract, introduction, and problem statement.
2. Identify challenges from the motivation, related work, and limitations.
3. Identify the approach from the method, system design, experiment, or case study sections.
4. Identify key takeaways from the results, discussion, and conclusion.
5. Identify contributions from the contribution paragraph, abstract, and conclusion.
6. Extract only links explicitly provided by the user or contained in the material.
7. Add `Tasks / Application scope` only when the task types or application scenarios are central to the project.

When only contribution text is provided:

1. Use the contribution text as the main source.
2. Infer the objective and challenges only when they are directly implied.
3. Keep uncertain sections short.
4. Do not add unsupported experimental results or technical details.
5. Omit optional sections unless they are clearly supported.

When rich project text is provided:

1. Preserve the core framing.
2. Compress it into the default project-page structure.
3. Remove redundancy.
4. Keep only the most important technical details, tasks, targets, and implications.
5. Use the optional `Tasks / Application scope` section only if it improves readability.

When metadata is provided:

1. Use the provided title, publish date, tags, image path, and external URL exactly unless correction is clearly needed.
2. Write the frontmatter `description` as a one-sentence project summary.
3. Reuse or lightly expand the description in the TL;DR callout.
4. If `externalUrl` is provided and the user wants a link-out entry, the body may be omitted.

---

## Handling Quantitative Information

If quantitative values are provided, preserve them accurately.

Examples:

1. task speed;
2. accuracy;
3. success rate;
4. error;
5. deviation;
6. coverage;
7. productivity;
8. number of trials;
9. workspace size;
10. experiment scale;
11. system performance targets.

Do not round, reinterpret, or generalize numbers unless the user requests it.

When quantitative results are weakly supported or context-dependent, phrase them cautiously.

Example:

1. “The system achieved a welding speed of 18.8 cm/min under the specified target condition.”
2. “The results indicate improved surface quality under the tested construction-scale setup.”

Avoid:

1. “significantly improved” unless statistical significance is reported.
2. “outperformed skilled workers” unless directly shown by the provided source.
3. “field-ready” unless field validation is explicitly reported.

---

## Writing Style

Default language: English, unless the user asks for Korean.

Tone:

1. concise;
2. neutral;
3. technically precise;
4. project-page friendly;
5. suitable for construction robotics, HRI, robot learning, teleoperation, sensing, field robotics, and construction automation.

Preferred wording:

1. develop
2. propose
3. evaluate
4. demonstrate
5. integrate
6. enable
7. support
8. implement
9. validate
10. investigate
11. indicate
12. suggest

Avoid:

1. novel, unless clearly justified;
2. state-of-the-art, unless supported by the paper;
3. fully autonomous, unless the system truly is fully autonomous;
4. real-world deployment, unless actual field deployment is reported;
5. smart, advanced, innovative, or practical without technical explanation;
6. broad claims about transforming the construction industry.

---

## Length Guidelines

Default project-page version:

### TL;DR

1–2 sentences.

### Objectives

2–4 numbered items. Every item must start with `To`.

### Challenges

Up to 3 numbered items.

### Approach

One compact prose paragraph by default. Two short paragraphs may be used for multi-part projects.

### Key takeaways

3–5 numbered items.

### Contribution

1–3 numbered items.

### Related links

As many as provided, usually 1–7 links.

Optional:

### Tasks / Application scope

3–6 numbered items, only when useful.

Keep each numbered item to one sentence when possible.

---

## Output Format

Use clean Markdown. Standard local project pages should start with YAML frontmatter, followed by a preview image, a TL;DR callout, and the project sections. External-link entries may use frontmatter only.

Default example:

```md
---
title: 'Project Title'
description: One concise sentence summarizing the project.
publishDate: 'May 2 2026'
tags:
  - Construction robotics
  - Teleoperation
isFeatured: true
seo:
  image:
    src: '../../assets/images/project-1.jpg'
    alt: Project preview
---

![Project preview](../../assets/images/project-1.jpg)

> **TL;DR** One or two concise sentences summarizing the project objective, approach, and main value.

## Objectives

1. To ...
2. To ...

## Challenges

1. ...
2. ...
3. ...

## Approach

This project ...

## Key takeaways

1. ...
2. ...
3. ...

## Contribution

1. ...
2. ...

## Related links

- Project page: [Title](URL)
- Paper: [Title](URL)
```

External-link entry example:

```md
---
title: 'Project Title'
description: One concise sentence summarizing the linked project.
publishDate: 'May 2 2026'
tags:
  - Construction robotics
isFeatured: true
externalUrl: 'https://example.com/project'
---
```
