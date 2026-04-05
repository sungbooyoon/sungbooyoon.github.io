import avatar from '../assets/images/avatar.jpg';
import type { SiteConfig } from '../types';

const siteConfig: SiteConfig = {
    website: 'https://sungbooyoon.github.io',
    avatar: {
        src: avatar,
        alt: 'Sungboo'
    },
    title: 'Sungboo Yoon (윤성부)',
    subtitle: 'PhD Candidate @ Seoul National University\n Seoul, South Korea',
    description: 'Construction Robotics, Human-Robot Interaction, Robot Learning',
    image: {
        src: '/dante-preview.jpg',
        alt: 'Dante - Astro.js and Tailwind CSS theme'
    },
    headerNavLinks: [
        {
            text: 'Home',
            href: '/'
        },
        {
            text: 'Projects',
            href: '/projects'
        },
        {
            text: 'Blog',
            href: '/blog'
        },
        {
            text: 'Tags',
            href: '/tags'
        }
    ],
    footerNavLinks: [
        {
            text: 'About',
            href: '/about'
        },
        {
            text: 'Contact',
            href: '/contact'
        },
        {
            text: 'Terms',
            href: '/terms'
        },
    ],
    socialLinks: [
        {
            text: 'Dribbble',
            href: 'https://dribbble.com/'
        },
        {
            text: 'Instagram',
            href: 'https://instagram.com/'
        },
        {
            text: 'X/Twitter',
            href: 'https://twitter.com/'
        }
    ],
    hero: {
        title: 'Hi There & Welcome to My Corner of the Web!',
        text: `Hello! I am a fifth-year Ph.D. candidate in the [Department of Architecture & Architectural Engineering](https://architecture.snu.ac.kr/) at [Seoul National University](https://en.snu.ac.kr/). I am fortunate to be advised by Professor [Changbum R. Ahn](https://scholar.google.com/citations?user=PJfny7sAAAAJ&hl=en&oi=ao), and I am a member of the [Construction Engineering & Management Lab](https://cem.snu.ac.kr/). My research interests include construction robotics, human-robot interaction, and robot learning. I have published 10+ papers <a href='https://scholar.google.com/citations?user=QFeaFbwAAAAJ'><img src="https://img.shields.io/endpoint?logo=Google%20Scholar&url=https%3A%2F%2Fcdn.jsdelivr.net%2Fgh%2Fsungbooyoon%2Fsungbooyoon.github.io@google-scholar-stats%2Fgs_data_shieldsio.json&labelColor=f6f6f6&color=9cf&style=flat&label=citations"></a> in major international journals and conferences in civil engineering, including Automation in Construction, JCEM, JCCE, and Advanced Engineering Informatics. I am passionate about bringing ideas into reality and developing systems that have tangible impacts on the work and safety of real human workers on construction sites.

I previously completed both my bachelor's and master's degrees in Architectural Engineering at Seoul National University, where I conducted research on modular construction and human-robot interaction under the advisement of Professor [Moonseo Park](https://scholar.google.com/citations?user=lkrSqmIAAAAJ&hl=en).

I am honored to be a recipient of the [Basic Science Research Program](https://www.nrf.re.kr/biz/info/info/view?menu_no=378&biz_no=416) (Ph.D. Fellowship) from the National Research Foundation of Korea (NRF).

Currently, I serve as a student coordinator of a joint project funded by the Ministry of Land, Infrastructure and Transport & Ministry of Trade, Industry and Energy, South Korea, on developing a multipurpose robotic platform and XR-based human-robot collaboration system for construction work at height. If you are interested, please visit [this page](https://cem.snu.ac.kr/research/90) for more details.`,
        images: [
            { src: '../assets/images/hero1.jpg', alt: '' },
            { src: '../assets/images/hero2.jpeg', alt: '' }
        ],
        actions: [
            {
                text: 'Curriculum Vitae',
                href: 'https://docs.google.com/document/d/1Tnd3iKZz4WaJ9mfMOJuBAnpDzHikDSTn2WGahqZOZII/edit?usp=sharing'
            }
        ]

    },
    subscribe: {
        enabled: true,
        title: 'Subscribe to Dante Newsletter',
        text: 'One update per week. All the latest posts directly in your inbox.',
        form: {
            action: '#'
        }
    },
    postsPerPage: 8,
    projectsPerPage: 8
};

export default siteConfig;
