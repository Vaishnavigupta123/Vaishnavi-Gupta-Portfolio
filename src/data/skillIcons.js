import {
  SiCss,
  SiDjango,
  SiDocker,
  SiFigma,
  SiGit,
  SiGithub,
  SiGithubactions,
  SiHtml5,
  SiJavascript,
  SiJsonwebtokens,
  SiMui,
  SiNextdotjs,
  SiPostgresql,
  SiPostman,
  SiPython,
  SiReact,
  SiReactrouter,
  SiRedis,
  SiRedux,
  SiSocketdotio,
} from 'react-icons/si'
import { FaAws } from 'react-icons/fa6'
import { VscVscode } from 'react-icons/vsc'
import {
  Barcode,
  Database,
  Mic,
  PenTool,
  Sparkles,
  Binary,
  Blocks,
  Boxes,
  Building2,
  FileText,
  Gauge,
  Network,
  Rows3,
  Server,
  Table2,
} from 'lucide-react'

/**
 * Maps a skill / tech name to its icon and brand colour.
 * Brand marks come from simple-icons; concepts that have no logo
 * fall back to a semantic lucide icon in the section accent.
 */
const ICON_MAP = {
  // ---- Frontend ----
  'React.js': { Icon: SiReact, color: '#61DAFB' },
  React: { Icon: SiReact, color: '#61DAFB' },
  'React 17': { Icon: SiReact, color: '#61DAFB' },
  'Next.js': { Icon: SiNextdotjs, color: '#FFFFFF' },
  'JavaScript (ES6+)': { Icon: SiJavascript, color: '#F7DF1E' },
  JavaScript: { Icon: SiJavascript, color: '#F7DF1E' },
  'MUI v5': { Icon: SiMui, color: '#007FFF' },
  MUI: { Icon: SiMui, color: '#007FFF' },
  Redux: { Icon: SiRedux, color: '#764ABC' },
  'React Router v5': { Icon: SiReactrouter, color: '#F44250' },
  HTML5: { Icon: SiHtml5, color: '#E34F26' },
  CSS3: { Icon: SiCss, color: '#663399' },

  // ---- Backend ----
  Python: { Icon: SiPython, color: '#3776AB' },
  Django: { Icon: SiDjango, color: '#44B78B' },
  'REST APIs': { Icon: Network, color: '#38bdf8' },
  'JWT Auth': { Icon: SiJsonwebtokens, color: '#FB015B' },
  JWT: { Icon: SiJsonwebtokens, color: '#FB015B' },
  WebSocket: { Icon: SiSocketdotio, color: '#FFFFFF' },

  // ---- Database ----
  PostgreSQL: { Icon: SiPostgresql, color: '#4169E1' },
  SQL: { Icon: Database, color: '#38bdf8' },
  Redis: { Icon: SiRedis, color: '#FF4438' },
  'Schema design': { Icon: Table2, color: '#34d399' },
  'Server-side pagination': { Icon: Rows3, color: '#34d399' },
  'Query optimisation': { Icon: Gauge, color: '#34d399' },

  // ---- Cloud & DevOps ----
  'AWS EC2': { Icon: FaAws, color: '#FF9900' },
  'AWS S3': { Icon: FaAws, color: '#FF9900' },
  'AWS Lambda': { Icon: FaAws, color: '#FF9900' },
  'AWS CodeCommit': { Icon: FaAws, color: '#FF9900' },
  Docker: { Icon: SiDocker, color: '#2496ED' },
  'CI/CD': { Icon: SiGithubactions, color: '#2088FF' },
  Git: { Icon: SiGit, color: '#F05032' },

  // ---- Tools ----
  Postman: { Icon: SiPostman, color: '#FF6C37' },
  GitHub: { Icon: SiGithub, color: '#FFFFFF' },
  'VS Code': { Icon: VscVscode, color: '#007ACC' },
  Figma: { Icon: SiFigma, color: '#F24E1E' },
  jsPDF: { Icon: FileText, color: '#a78bfa' },
  JsBarcode: { Icon: Barcode, color: '#a78bfa' },

  // ---- Project / misc ----
  'Speech-to-Text': { Icon: Mic, color: '#a78bfa' },
  'Generative AI': { Icon: Sparkles, color: '#a78bfa' },
  'UI/UX': { Icon: PenTool, color: '#34d399' },
  Prototyping: { Icon: PenTool, color: '#34d399' },

  // ---- Core Concepts ----
  'Data Structures & Algorithms': { Icon: Binary, color: '#818cf8' },
  OOPs: { Icon: Boxes, color: '#818cf8' },
  'System Design': { Icon: Blocks, color: '#818cf8' },
  'Multi-tenant architecture': { Icon: Building2, color: '#818cf8' },
}

const FALLBACK = { Icon: Server, color: '#94a3b8' }

export function getSkillIcon(name) {
  return ICON_MAP[name] ?? FALLBACK
}

export default ICON_MAP
