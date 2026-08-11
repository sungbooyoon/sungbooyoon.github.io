import projectHri from '../assets/images/project-hri.jpg';
import projectViewpoint1 from '../assets/images/project-viewpoint1.jpg';
import projectViewpoint2 from '../assets/images/project-viewpoint2.jpg';

const selectedPublications = [
    {
        title: 'Learning viewpoint control from human-initiated transitions for teleoperation in construction',
        venue: 'Advanced Engineering Informatics',
        year: 2025,
        doi: 'https://doi.org/10.1016/j.aei.2025.103665',
        image: projectViewpoint2,
        imageAlt: 'Viewpoint transition model for construction teleoperation'
    },
    {
        title: 'Comparing dynamic viewpoint control techniques for teleoperated robotic welding in construction',
        venue: 'Automation in Construction',
        year: 2025,
        doi: 'https://doi.org/10.1016/j.autcon.2025.106053',
        image: projectViewpoint1,
        imageAlt: 'Virtual-reality robotic welding teleoperation study'
    },
    {
        title: 'LaserDex: Improvising spatial tasks using deictic gestures and laser pointing for human-robot collaboration in construction',
        venue: 'Journal of Computing in Civil Engineering',
        year: 2024,
        doi: 'https://doi.org/10.1061/JCCEE5.CPENG-5715',
        image: projectHri,
        imageAlt: 'LaserDex human-robot interaction workflow',
        badges: ["Editor's Choice"] as const
    }
];

export default selectedPublications;
