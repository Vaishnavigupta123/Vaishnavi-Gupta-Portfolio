/**
 * Single source of truth for every piece of copy on the site.
 * Edit this file to update the portfolio — components read from here.
 */

export const profile = {
  name: 'Vaishnavi Gupta',
  firstName: 'Vaishnavi',
  lastName: 'Gupta',
  role: 'Full Stack Developer',
  location: 'Kolkata, India',
  available: true,
  tagline: 'I build healthcare software that clinicians actually trust.',
  roles: [
    'Full Stack Developer',
    'React & Next.js Engineer',
    'Python · Django Backend',
    'Healthcare SaaS Builder',
  ],
  blurb:
    'Full Stack Developer shipping an ABDM-compliant Electronic Health Record platform as a multi-tenant SaaS — from IPD dashboards and CPOE order management to real-time vitals over WebSocket. I work across React, Next.js, Python and Django, and care about the details that make clinical software fast and dependable.',
  email: 'vaishnavigupta724@gmail.com',
  phone: '+91 7667719181',
  resumeUrl: '/Vaishnavi-Gupta-Resume.pdf',
  socials: [
    {
      label: 'GitHub',
      handle: 'Vaishnavigupta123',
      url: 'https://github.com/Vaishnavigupta123',
      icon: 'github',
    },
    {
      label: 'LinkedIn',
      handle: 'vaishnavi-gupta-558246225',
      url: 'https://linkedin.com/in/vaishnavi-gupta-558246225',
      icon: 'linkedin',
    },
    {
      label: 'LeetCode',
      handle: 'Vaishnavi12_gupta',
      url: 'https://leetcode.com/u/Vaishnavi12_gupta/',
      icon: 'code',
    },
    {
      label: 'Email',
      handle: 'vaishnavigupta724@gmail.com',
      url: 'mailto:vaishnavigupta724@gmail.com',
      icon: 'mail',
    },
  ],
}

export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'stack', label: 'Stack' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'contact', label: 'Contact' },
]

export const stats = [
  { value: 8, suffix: '+', label: 'EHR modules shipped' },
  { value: 15, suffix: '+', label: 'Technologies in daily use' },
  { value: 3, suffix: '', label: 'Product teams shipped with' },
  { value: 100, suffix: '%', label: 'Ownership, end to end' },
]

export const about = {
  heading: 'Engineering for the people on the other side of the screen',
  paragraphs: [
    'I am a Full Stack Developer at HlthTek Optimus, where I build an ABDM-compliant Electronic Health Record platform delivered as a multi-tenant SaaS for hospitals. Multi-tenancy means one codebase serving many hospitals at once — so every decision about state, caching and access control has to hold up under real clinical load.',
    'My day to day spans the IPD Doctor’s Dashboard, CPOE order management, and Lab & Radiology workflows — server-side pagination, debounced search, WebSocket vitals streaming, barcode sample labelling, PDF requisitions. On the backend side I work with Python, Django and PostgreSQL, design REST APIs, and deploy on AWS with Docker and CI/CD.',
    'I started out as a UI/UX and front-end developer, and that background still shapes how I build: skeleton loaders instead of spinners, debouncing instead of hammering the API, and interfaces that stay legible at 3am on a hospital ward.',
  ],
  highlights: [
    {
      icon: 'activity',
      title: 'Healthcare-grade',
      text: 'ABDM-compliant EHR, multi-tenant SaaS for hospitals',
    },
    {
      icon: 'layers',
      title: 'Full stack',
      text: 'React & Next.js on the front, Python & Django behind it',
    },
    {
      icon: 'zap',
      title: 'Performance-minded',
      text: 'Debouncing, throttling, Redis caching, skeleton UI',
    },
    {
      icon: 'cloud',
      title: 'Cloud native',
      text: 'AWS EC2 · S3 · Lambda, Docker, CI/CD pipelines',
    },
  ],
}

export const skillGroups = [
  {
    title: 'Frontend',
    icon: 'monitor',
    glow: 'rgba(110,231,255,0.35)',
    skills: [
      'React.js',
      'Next.js',
      'JavaScript (ES6+)',
      'MUI v5',
      'Redux',
      'React Router v5',
      'HTML5',
      'CSS3',
    ],
  },
  {
    title: 'Backend',
    icon: 'server',
    glow: 'rgba(139,92,246,0.35)',
    skills: ['Python', 'Django', 'REST APIs', 'JWT Auth', 'WebSocket'],
  },
  {
    title: 'Database',
    icon: 'database',
    glow: 'rgba(52,211,153,0.35)',
    skills: ['PostgreSQL', 'Redis', 'Schema design', 'Server-side pagination', 'Query optimisation'],
  },
  {
    title: 'Cloud & DevOps',
    icon: 'cloud',
    glow: 'rgba(251,191,36,0.32)',
    skills: ['AWS EC2', 'AWS S3', 'AWS Lambda', 'Docker', 'CI/CD', 'AWS CodeCommit', 'Git'],
  },
  {
    title: 'Tools',
    icon: 'wrench',
    glow: 'rgba(244,114,182,0.32)',
    skills: ['Postman', 'GitHub', 'VS Code', 'Figma', 'jsPDF', 'JsBarcode'],
  },
  {
    title: 'Core Concepts',
    icon: 'brain',
    glow: 'rgba(129,140,248,0.35)',
    skills: ['Data Structures & Algorithms', 'OOPs', 'System Design', 'Multi-tenant architecture'],
  },
]

export const experience = [
  {
    company: 'HlthTek Optimus',
    role: 'Software Developer',
    period: '08/2026 — Present',
    current: true,
    context: 'ABDM-compliant EHR platform · Multi-tenant SaaS for hospitals',
    summary:
      'Own major clinical modules end to end on a multi-tenant EHR platform serving hospitals — from the doctor’s dashboard to order management, labs and radiology.',
    points: [
      'Developed the IPD Doctor’s Dashboard with patient worklists, server-side pagination and sorting, care plans and vitals monitoring using React 17, MUI v5, React Router v5, Axios and JWT authentication',
      'Built the CPOE / Order Management module with debounced medicine search, order workflows and an Order Sets Admin Panel using React Hooks, Axios CRUD, debouncing, react-toastify and REST APIs',
      'Migrated key modules to Redux for centralised state management, reducing prop-drilling across components',
      'Implemented skeleton loading screens across worklists and dashboards to improve perceived performance',
      'Applied debouncing and throttling on search and vitals-polling APIs to reduce redundant network calls',
      'Enabled real-time vitals monitoring and lab/radiology status updates using WebSocket, removing the dependency on polling',
      'Built Lab & Radiology workflows with order placement, sample/report lifecycle, barcode-based sample labelling (JsBarcode) and requisition printing using jsPDF, Axios and JWT-based role access',
      'Collaborated with the backend team on Redis caching for frequently accessed reference data to improve API response times',
      'Supported AWS-based deployment workflows using S3 for storage and EC2 for staging environments',
      'Tested JWT-authenticated REST APIs using Postman, validating headers, payloads, status codes and error handling',
      'Used Docker, Git and AWS CodeCommit for local development and version control',
    ],
    tags: ['React 17', 'MUI v5', 'Redux', 'WebSocket', 'JWT', 'jsPDF', 'Docker', 'AWS'],
  },
  {
    company: 'HlthTek Optimus',
    role: 'Software Developer Intern',
    period: '02/2026 — 07/2026',
    current: false,
    context: 'Marketing site in Next.js · Telemedicine module in the EMR',
    summary:
      'Shipped the company marketing site in Next.js and built the telemedicine video-consult module inside the EMR product.',
    points: [
      'Built HlthTek’s company website in Next.js — fully responsive marketing pages using SSR/SSG, page routing, metadata/SEO optimisation and high-performance user interfaces',
      'Implemented the Telemedicine module in the EMR app using the Zego Cloud SDK (WebRTC), with dynamic script loading, screen sharing and a guest join-call flow',
      'Enhanced telemedicine with loading states, error handling and participant name mapping using React Hooks',
      'Built a reusable share sheet component enabling one-tap sharing of consultation links across channels',
      'Used JWT authentication, Axios interceptors, React Router v5 and react-toastify',
    ],
    tags: ['Next.js', 'SSR/SSG', 'WebRTC', 'Zego Cloud', 'SEO', 'React Hooks'],
  },
  {
    company: 'Primacy Infotech',
    role: 'UI/UX & Frontend Developer',
    period: '09/2025 — 12/2025',
    current: false,
    context: 'Website design and front-end development',
    summary:
      'Worked as a designer and front-end developer, handling website design alongside implementation.',
    points: [
      'Handled website designing and front-end development using HTML, CSS and JavaScript',
      'Created responsive layouts and implemented UI designs from concept through to production',
      'Improved user experience across pages through iterative design and front-end refinement',
    ],
    tags: ['HTML', 'CSS', 'JavaScript', 'Responsive design', 'UI/UX'],
  },
]

export const education = {
  degree: 'B.Tech, Computer Science',
  school: 'Sister Nivedita University',
  location: 'Kolkata',
  period: '2021 — 2025',
}

export const projects = [
  {
    title: 'ABDM-Compliant EHR Platform',
    category: 'Product',
    featured: true,
    period: '2026 — Present',
    tagline: 'Multi-tenant Electronic Health Record SaaS for hospitals',
    description:
      'The platform I build day to day at HlthTek Optimus. I own the IPD Doctor’s Dashboard, CPOE order management, and Lab & Radiology workflows — with real-time vitals over WebSocket, barcode sample labelling and PDF requisition printing.',
    highlights: [
      'Server-side pagination and sorting across patient worklists',
      'Real-time vitals and lab status via WebSocket, replacing polling',
      'Barcode sample labelling (JsBarcode) plus jsPDF requisitions',
      'Redux state management with JWT role-based access',
    ],
    tech: ['React 17', 'MUI v5', 'Redux', 'WebSocket', 'Django', 'PostgreSQL', 'Redis', 'AWS'],
    links: [],
    note: 'Proprietary — source not public',
    accent: '#6ee7ff',
  },
  {
    title: 'HlthTek’s Website',
    category: 'Web',
    featured: true,
    period: '02/2026 — 04/2026',
    tagline: 'SEO-first company website built with Next.js',
    description:
      'A full-scale company website built with Next.js and JavaScript, focused on SEO-friendly, high-performance user interfaces. Implemented API integrations and applied SEO best practices to improve search visibility, and worked with web crawling concepts to enhance data indexing and overall search relevance.',
    highlights: [
      'SSR/SSG rendering with metadata-driven SEO',
      'API integrations across marketing pages',
      'Web crawling concepts for indexing and search relevance',
      'Fully responsive, performance-tuned interfaces',
    ],
    tech: ['Next.js', 'JavaScript', 'SSR/SSG', 'SEO', 'REST APIs'],
    links: [],
    accent: '#8b5cf6',
  },
  {
    title: 'Voice Writer',
    category: 'Product',
    featured: true,
    period: '11/2024 — 03/2025',
    tagline: 'Speech-to-text across surfaces, powered by generative AI',
    description:
      'A machine and companion app that transcribes spoken language into written text on different surfaces. Built out real-time voice transcription with generative AI, seamless app integration, language learning support and user-facing customisation options.',
    highlights: [
      'Real-time voice transcription pipeline',
      'Generative AI for cleanup and formatting',
      'Language learning support built in',
      'Seamless integration with the companion app',
    ],
    tech: ['JavaScript', 'Generative AI', 'Speech-to-Text', 'React'],
    links: [],
    accent: '#f472b6',
  },
  {
    title: 'Agri-Tech',
    category: 'Design',
    featured: false,
    period: 'Smart India Hackathon',
    tagline: 'Figma prototype for an agriculture marketplace',
    description:
      'Designed a Figma prototype for an Agriculture Farming application under a Smart India Hackathon problem statement, focusing on user flow, role-based access for buyers and sellers, and a clean, intuitive UI.',
    highlights: [
      'Role-based flows for buyers and sellers',
      'End-to-end user journey mapping',
      'Clean, intuitive interface system',
    ],
    tech: ['Figma', 'UI/UX', 'Prototyping', 'User flows'],
    links: [],
    accent: '#34d399',
  },
  {
    title: 'VoiceWriter — UI Prototype',
    category: 'Design',
    featured: false,
    period: 'College project',
    tagline: 'Accessibility-friendly speech-to-text interface',
    description:
      'A UI prototype focused on converting speech into text in real time, with simple navigation and an accessibility-friendly design. Created in Figma to visualise user flow, core features and a clean, minimal interface for practical usage.',
    highlights: [
      'Accessibility-first interface decisions',
      'Simple navigation for real-time capture',
      'Minimal, practical visual system',
    ],
    tech: ['Figma', 'UI/UX', 'Accessibility', 'Prototyping'],
    links: [],
    accent: '#fbbf24',
  },
]

export const projectFilters = ['All', 'Product', 'Web', 'Design']

export const techStack = [
  { name: 'React', group: 'Frontend' },
  { name: 'Next.js', group: 'Frontend' },
  { name: 'JavaScript', group: 'Frontend' },
  { name: 'Redux', group: 'Frontend' },
  { name: 'MUI', group: 'Frontend' },
  { name: 'HTML5', group: 'Frontend' },
  { name: 'CSS3', group: 'Frontend' },
  { name: 'Python', group: 'Backend' },
  { name: 'Django', group: 'Backend' },
  { name: 'REST APIs', group: 'Backend' },
  { name: 'WebSocket', group: 'Backend' },
  { name: 'JWT', group: 'Backend' },
  { name: 'PostgreSQL', group: 'Data' },
  { name: 'Redis', group: 'Data' },
  { name: 'AWS EC2', group: 'Cloud' },
  { name: 'AWS S3', group: 'Cloud' },
  { name: 'AWS Lambda', group: 'Cloud' },
  { name: 'Docker', group: 'Cloud' },
  { name: 'CI/CD', group: 'Cloud' },
  { name: 'Git', group: 'Tools' },
  { name: 'Postman', group: 'Tools' },
  { name: 'Figma', group: 'Tools' },
]

export const achievements = [
  {
    title: 'IBM — Introduction to Cloud Computing',
    kind: 'Certification',
    year: 'Certified',
    description:
      'Hands-on understanding of cloud infrastructure components, service and deployment models, virtualisation and cloud-native development.',
    icon: 'award',
    span: true,
  },
  {
    title: 'Smart India Hackathon',
    kind: 'Hackathon',
    year: 'Participant',
    description:
      'Designed an Agriculture Farming application prototype against a national-level problem statement, covering role-based buyer/seller access and complete user flows.',
    icon: 'trophy',
  },
  {
    title: 'Intern to Full Stack Developer',
    kind: 'Growth',
    year: 'Within 6 months',
    description:
      'Converted from intern to full-time Software Developer at HlthTek Optimus, moving from the marketing site and telemedicine module to owning core clinical EHR modules.',
    icon: 'trending',
  },
  {
    title: 'B.Tech in Computer Science',
    kind: 'Education',
    year: '2021 — 2025',
    description:
      'Sister Nivedita University, Kolkata. Foundation in Data Structures & Algorithms, OOPs and System Design.',
    icon: 'graduation',
  },
  {
    title: 'DSA on LeetCode',
    kind: 'Practice',
    year: 'Ongoing',
    description:
      'Consistent problem solving in data structures and algorithms to keep fundamentals sharp alongside product work.',
    icon: 'code',
    link: 'https://leetcode.com/u/Vaishnavi12_gupta/',
  },
  {
    title: 'Real-time clinical workflows',
    kind: 'Engineering',
    year: 'Shipped',
    description:
      'Replaced polling with WebSocket-driven vitals and lab status updates, and cut redundant network calls through debouncing and throttling.',
    icon: 'zap',
    span: true,
  },
]

export const contact = {
  heading: 'Let’s build something',
  subheading:
    'I am open to Full Stack and Frontend roles, and always happy to talk about healthcare tech, React architecture, or whatever you are building.',
  items: [
    { label: 'Email', value: profile.email, url: `mailto:${profile.email}`, icon: 'mail' },
    {
      label: 'Phone',
      value: profile.phone,
      url: `tel:${profile.phone.replace(/\s/g, '')}`,
      icon: 'phone',
    },
    { label: 'Location', value: 'Kolkata, India', url: null, icon: 'pin' },
  ],
}
