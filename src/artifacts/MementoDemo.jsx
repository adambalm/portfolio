/*
MANIFEST
=========
Artifact: Memento Demo
Version: 1.0.0
Generated: 2026-01-05T14:30:00Z
Generator: Claude (Opus 4.5) via Claude Desktop

SECTIONS:
- Overview (lines ~180-210)
- LiveSession (lines ~212-310)
- Architecture (lines ~312-390)
- Schema (lines ~392-450)
- OpenQuestions (lines ~452-500)
- Roadmap (lines ~502-550)

SUBCOMPONENTS:
- CategoryBar (lines ~155-165) — visual bar chart for category distribution
- DeepDiveCard (lines ~167-178) — card displaying deep dive analysis result

DEPENDENCIES:
- react (useState)
- No external icon library (using Unicode/CSS)

CONSTRAINTS:
- Claude Desktop preview compatible
- No localStorage
- Tailwind-style inline styles only
- Single default export

KNOWN_ISSUES:
- Line numbers approximate (content is data-heavy)
- Real session data embedded (December 31, 2025 capture)

CANARY: MEMENTO-DEMO-2026-01-05-VITE-READY
*/

import React, { useState } from 'react';

/* ========== DATA: Trilingual Content ========== */
const content = {
  en: {
    nav: {
      overview: 'Overview',
      liveSession: 'Live Session',
      architecture: 'Architecture',
      schema: 'Schema',
      openQuestions: 'Open Questions',
      roadmap: 'Roadmap'
    },
    overview: {
      title: 'Memento',
      subtitle: 'Browser Session Capture & Classification',
      lead: 'What were you working on? The tabs you have open tell a story, but that story evaporates the moment you close them. Memento captures browser sessions, classifies tabs using local or cloud LLMs, and persists structured artifacts for longitudinal analysis.',
      partOf: 'Part of Context Sage',
      partOfDesc: 'Memento is the capture layer of a larger system for governed multi-agent collaboration. It feeds behavioral data—what you actually browse—into a knowledge base that AI agents can query, challenge, and reason about.',
      statusLabel: 'Status',
      status: 'MVP functional. Local inference via Ollama, cloud inference via Anthropic API. MCP server enables Claude Desktop integration.',
      coreInsight: 'The art of distilling intent from browser sessions is new territory. A tab titled "2504.19413" tells you nothing until you know it\'s an arXiv paper. Classification requires context, and context requires collaboration.'
    },
    liveSession: {
      title: 'A Real Session',
      subtitle: 'Captured December 31, 2025 at 7:57 AM',
      intro: 'This is not a mock-up. The data below was captured by Memento and classified by Claude 3.5 Haiku via the Anthropic API. 27 tabs across 11 categories, with 4 flagged for deep analysis.',
      narrativeLabel: 'Session Narrative',
      narrative: 'The user is exploring various technical domains, with a focus on AI development, content management, and educational projects.',
      categoriesLabel: 'Categories Detected',
      deepDiveLabel: 'Deep Dive Results',
      deepDiveIntro: 'Four tabs were flagged for deeper content extraction:',
      reasoningLabel: 'Classification Reasoning',
      metaLabel: 'Session Metadata'
    },
    architecture: {
      title: 'Architecture',
      subtitle: 'How the pipeline works',
      flowTitle: 'Data Flow',
      flowSteps: [
        { num: '1', label: 'Capture', desc: 'Chrome extension captures all open tabs' },
        { num: '2', label: 'POST', desc: 'Tab data sent to Node.js backend' },
        { num: '3', label: 'Classify', desc: 'Model dispatch to Ollama or Anthropic' },
        { num: '4', label: 'Persist', desc: 'JSON written to memory/sessions/' },
        { num: '5', label: 'Query', desc: 'MCP server exposes to Claude Desktop' }
      ],
      twoPassTitle: 'Two-Pass Classification',
      twoPassDesc: 'Pass 1 classifies all tabs and triages. Pass 2 extracts structured data from flagged tabs only.',
      infrastructureTitle: 'Infrastructure'
    },
    schema: {
      title: 'Session Schema',
      subtitle: 'What gets persisted',
      intro: 'Each session is a self-contained JSON artifact with full provenance.',
      schemaVersion: '1.1.0',
      fieldsTitle: 'Key Fields',
      fields: [
        { name: 'timestamp', desc: 'ISO 8601 capture time' },
        { name: 'narrative', desc: 'LLM-generated summary' },
        { name: 'groups', desc: 'Tabs by category' },
        { name: 'reasoning.perTab', desc: 'Classification rationale' },
        { name: 'meta.engine', desc: 'Which LLM processed' }
      ]
    },
    openQuestions: {
      title: 'Open Questions',
      subtitle: 'This is research, not a finished product',
      intro: 'We don\'t have canonical answers. These are questions we\'re actively exploring:',
      questions: [
        { q: 'What taxonomy should categories follow?', detail: 'Generic vs opinionated (Deep Work, Admin, Distraction)' },
        { q: 'How do we handle low-confidence classifications?', detail: 'Ask? Flag? Default to Other?' },
        { q: 'What constitutes a "session"?', detail: 'All tabs? Since last capture? Active in last N minutes?' },
        { q: 'How should sessions aggregate over time?', detail: 'Pattern detection across 100 sessions' },
        { q: 'What\'s the capability floor for local models?', detail: 'qwen3 works. Does llama3.2?' }
      ]
    },
    roadmap: {
      title: 'Roadmap',
      phases: [
        { phase: '1', name: 'MVP: Capture → Classify → Log', status: 'complete' },
        { phase: '2', name: 'Two-pass Deep Dive', status: 'complete' },
        { phase: '3', name: 'Engine picker', status: 'complete' },
        { phase: '4', name: 'MCP Server', status: 'complete' },
        { phase: '5', name: 'Launchpad Mode', status: 'in-progress' },
        { phase: '6', name: 'Learning Loop', status: 'planned' },
        { phase: '7', name: 'Longitudinal Analysis', status: 'future' }
      ]
    },
    footer: { copyright: '© 2025 Ed O\'Connell' }
  },
  zh: {
    nav: { overview: '概述', liveSession: '实时会话', architecture: '架构', schema: '模式', openQuestions: '开放问题', roadmap: '路线图' },
    overview: {
      title: 'Memento',
      subtitle: '浏览器会话捕获与分类',
      lead: '你在做什么？打开的标签页讲述故事，但关闭时就消失了。Memento 捕获会话并使用 LLM 分类。',
      partOf: 'Context Sage 的一部分',
      partOfDesc: 'Memento 是多代理协作治理系统的捕获层。',
      statusLabel: '状态',
      status: 'MVP 功能完成。支持 Ollama 本地推理和 Anthropic API。',
      coreInsight: '从浏览器会话中提炼意图是新领域。分类需要上下文，上下文需要协作。'
    },
    liveSession: { title: '真实会话', subtitle: '2025年12月31日捕获', intro: '真实数据，27个标签页，11个类别。', narrativeLabel: '会话叙述', narrative: '用户正在探索技术领域。', categoriesLabel: '检测到的类别', deepDiveLabel: '深度分析', deepDiveIntro: '四个标签页被标记：', reasoningLabel: '分类推理', metaLabel: '元数据' },
    architecture: { title: '架构', subtitle: '流水线', flowTitle: '数据流', flowSteps: [{ num: '1', label: '捕获', desc: '扩展捕获标签页' }, { num: '2', label: 'POST', desc: '发送到后端' }, { num: '3', label: '分类', desc: '路由到模型' }, { num: '4', label: '持久化', desc: '写入 JSON' }, { num: '5', label: '查询', desc: 'MCP 暴露' }], twoPassTitle: '两阶段分类', twoPassDesc: '第一阶段分类，第二阶段深度分析。', infrastructureTitle: '基础设施' },
    schema: { title: '会话模式', subtitle: '持久化内容', intro: '每个会话是独立 JSON。', schemaVersion: '1.1.0', fieldsTitle: '字段', fields: [{ name: 'timestamp', desc: '捕获时间' }, { name: 'narrative', desc: '摘要' }, { name: 'groups', desc: '分类' }, { name: 'reasoning.perTab', desc: '推理' }, { name: 'meta.engine', desc: '引擎' }] },
    openQuestions: { title: '开放问题', subtitle: '研究中', intro: '我们正在探索：', questions: [{ q: '分类法？', detail: '通用 vs 有观点' }, { q: '低置信度？', detail: '询问？标记？' }, { q: '会话定义？', detail: '所有标签？最近？' }, { q: '时间聚合？', detail: '模式检测' }, { q: '模型下限？', detail: 'qwen3 可以' }] },
    roadmap: { title: '路线图', phases: [{ phase: '1', name: 'MVP', status: 'complete' }, { phase: '2', name: '两阶段', status: 'complete' }, { phase: '3', name: '引擎选择', status: 'complete' }, { phase: '4', name: 'MCP', status: 'complete' }, { phase: '5', name: '启动板', status: 'in-progress' }, { phase: '6', name: '学习循环', status: 'planned' }, { phase: '7', name: '纵向分析', status: 'future' }] },
    footer: { copyright: '© 2025 Ed O\'Connell' }
  },
  es: {
    nav: { overview: 'Resumen', liveSession: 'Sesión Real', architecture: 'Arquitectura', schema: 'Esquema', openQuestions: 'Preguntas', roadmap: 'Hoja de Ruta' },
    overview: {
      title: 'Memento',
      subtitle: 'Captura y Clasificación de Sesiones',
      lead: '¿En qué trabajabas? Las pestañas cuentan una historia que desaparece al cerrarlas. Memento captura y clasifica.',
      partOf: 'Parte de Context Sage',
      partOfDesc: 'Memento es la capa de captura del sistema multi-agente.',
      statusLabel: 'Estado',
      status: 'MVP funcional. Ollama local y Anthropic API.',
      coreInsight: 'Destilar intención de sesiones es territorio nuevo. La clasificación requiere contexto y colaboración.'
    },
    liveSession: { title: 'Sesión Real', subtitle: '31 diciembre 2025', intro: 'Datos reales: 27 pestañas, 11 categorías.', narrativeLabel: 'Narrativa', narrative: 'Usuario explorando dominios técnicos.', categoriesLabel: 'Categorías', deepDiveLabel: 'Análisis Profundo', deepDiveIntro: 'Cuatro pestañas marcadas:', reasoningLabel: 'Razonamiento', metaLabel: 'Metadatos' },
    architecture: { title: 'Arquitectura', subtitle: 'Pipeline', flowTitle: 'Flujo', flowSteps: [{ num: '1', label: 'Captura', desc: 'Extensión captura' }, { num: '2', label: 'POST', desc: 'Envía al backend' }, { num: '3', label: 'Clasificar', desc: 'Despacha a modelo' }, { num: '4', label: 'Persistir', desc: 'Escribe JSON' }, { num: '5', label: 'Consultar', desc: 'MCP expone' }], twoPassTitle: 'Dos Pasadas', twoPassDesc: 'Pasada 1 clasifica, Pasada 2 analiza.', infrastructureTitle: 'Infraestructura' },
    schema: { title: 'Esquema', subtitle: 'Persistencia', intro: 'Cada sesión es JSON autocontenido.', schemaVersion: '1.1.0', fieldsTitle: 'Campos', fields: [{ name: 'timestamp', desc: 'Tiempo' }, { name: 'narrative', desc: 'Resumen' }, { name: 'groups', desc: 'Categorías' }, { name: 'reasoning.perTab', desc: 'Razones' }, { name: 'meta.engine', desc: 'Motor' }] },
    openQuestions: { title: 'Preguntas', subtitle: 'Investigación', intro: 'Explorando:', questions: [{ q: '¿Taxonomía?', detail: 'Genérica vs con opinión' }, { q: '¿Baja confianza?', detail: '¿Preguntar? ¿Marcar?' }, { q: '¿Definición de sesión?', detail: '¿Todas? ¿Recientes?' }, { q: '¿Agregación temporal?', detail: 'Patrones' }, { q: '¿Piso de modelo?', detail: 'qwen3 funciona' }] },
    roadmap: { title: 'Hoja de Ruta', phases: [{ phase: '1', name: 'MVP', status: 'complete' }, { phase: '2', name: 'Dos pasadas', status: 'complete' }, { phase: '3', name: 'Selector', status: 'complete' }, { phase: '4', name: 'MCP', status: 'complete' }, { phase: '5', name: 'Launchpad', status: 'in-progress' }, { phase: '6', name: 'Aprendizaje', status: 'planned' }, { phase: '7', name: 'Longitudinal', status: 'future' }] },
    footer: { copyright: '© 2025 Ed O\'Connell' }
  }
};

/* ========== DATA: Real Session (December 31, 2025) ========== */
const sessionData = {
  timestamp: '2025-12-31T07:57:12.197Z',
  totalTabs: 27,
  categories: {
    'Research': 7,
    'Development: Memento': 3,
    'Development': 5,
    'Productivity': 2,
    'Creative Writing': 2,
    'Social Media': 1,
    'Education': 3,
    'Other': 3,
    'News': 1
  },
  deepDiveResults: [
    { title: 'MedGemma Integration', summary: 'DICOM and FHIR support for clinical workflows', entities: ['MedGemma', 'FHIR'] },
    { title: 'Multi-Agent Debate', summary: 'MAD strategies with judge mechanism', entities: ['Gemini-Pro', 'PaLM 2'] },
    { title: 'Prompt Patterns', summary: '13 patterns for software design', entities: ['ChatGPT', 'Vanderbilt'] },
    { title: 'Healthcare API', summary: 'MCP Toolbox integration', entities: ['Google Cloud', 'ADK'] }
  ],
  sampleReasoning: [
    { tab: 'Pierre Menard - Wikipedia', category: 'Creative Writing', signals: ['Borges', 'authorship'], confidence: 'high' },
    { tab: 'Emily Dickinson | Poetry Foundation', category: 'Creative Writing', signals: ['Emily Dickinson'], confidence: 'high' },
    { tab: 'Multi-Agent Debate Strategies', category: 'Research', signals: ['AI research'], confidence: 'high' },
    { tab: 'Untitled document - Google Docs', category: 'Productivity', signals: ['untitled'], confidence: 'low' }
  ],
  meta: { engine: 'anthropic', model: 'claude-3-5-haiku', passes: 3, time: '42.5s', cost: '$0.007' }
};

/* ========== SUBCOMPONENT: CategoryBar ========== */
const CategoryBar = ({ name, count, max }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5em', marginBottom: '0.4em' }}>
    <div style={{ height: '12px', width: `${(count / max) * 180}px`, backgroundColor: '#1a4a6e', minWidth: '4px' }} />
    <span style={{ fontSize: '0.9em' }}>{name}</span>
    <span style={{ color: '#6b6b6b', fontSize: '0.85em' }}>({count})</span>
  </div>
);

/* ========== SUBCOMPONENT: DeepDiveCard ========== */
const DeepDiveCard = ({ title, summary, entities }) => (
  <div style={{ backgroundColor: '#f9f9f5', padding: '1em', marginBottom: '1em', borderLeft: '3px solid #8b5a2b' }}>
    <div style={{ fontWeight: '500', marginBottom: '0.5em' }}>{title}</div>
    <p style={{ margin: '0 0 0.5em 0', fontSize: '0.95em' }}>{summary}</p>
    <div style={{ fontSize: '0.85em', color: '#6b6b6b' }}>
      {entities.map((e, j) => (
        <span key={j} style={{ fontFamily: 'monospace', fontSize: '0.9em', backgroundColor: '#f0f0e8', padding: '0.1em 0.3em', marginRight: '0.5em' }}>{e}</span>
      ))}
    </div>
  </div>
);

/* ========== MAIN COMPONENT ========== */
export default function MementoDemo() {
  const [lang, setLang] = useState('en');
  const [section, setSection] = useState('overview');
  const [expandedQ, setExpandedQ] = useState(null);

  const t = content[lang];
  const maxCat = Math.max(...Object.values(sessionData.categories));

  const baseStyles = {
    container: { fontFamily: 'Palatino, Georgia, serif', fontSize: '15px', lineHeight: '1.7', color: '#111', backgroundColor: '#fffff8', maxWidth: '55em', margin: '0 auto', padding: '2em', minHeight: '100vh' },
    header: { borderBottom: '1px solid #e0ddd5', paddingBottom: '1.5em', marginBottom: '2em' },
    title: { fontSize: '2.2em', fontWeight: '400', fontStyle: 'italic', margin: '0 0 0.25em 0' },
    subtitle: { fontSize: '1.1em', color: '#454545', fontStyle: 'italic', margin: 0 },
    sectionTitle: { fontSize: '1.5em', fontWeight: '400', fontStyle: 'italic', margin: '1.5em 0 0.5em 0' },
    lead: { fontSize: '1.1em', lineHeight: '1.8', marginBottom: '1.5em' },
    label: { fontSize: '0.8em', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#6b6b6b', marginBottom: '0.25em' },
    pullQuote: { borderLeft: '3px solid #a00000', paddingLeft: '1em', margin: '1.5em 0', fontStyle: 'italic', color: '#454545' },
    table: { width: '100%', borderCollapse: 'collapse', margin: '1em 0', fontSize: '0.95em' },
    th: { textAlign: 'left', padding: '0.5em', borderBottom: '2px solid #e0ddd5', fontWeight: '400', fontStyle: 'italic' },
    td: { padding: '0.5em', borderBottom: '1px solid #e0ddd5', verticalAlign: 'top' },
    code: { fontFamily: 'Consolas, monospace', fontSize: '0.9em', backgroundColor: '#f9f9f5', padding: '0.1em 0.3em' },
    flowStep: { display: 'flex', gap: '1em', marginBottom: '0.75em', alignItems: 'flex-start' },
    flowNum: { width: '1.5em', height: '1.5em', borderRadius: '50%', backgroundColor: '#1a4a6e', color: '#fffff8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85em', flexShrink: 0 },
    qBox: { border: '1px solid #e0ddd5', marginBottom: '0.75em' },
    qHeader: { padding: '0.75em 1em', cursor: 'pointer', display: 'flex', justifyContent: 'space-between' },
    qDetail: { padding: '0 1em 1em 1em', color: '#454545', borderTop: '1px solid #e0ddd5', backgroundColor: '#f9f9f5' },
    footer: { marginTop: '4em', paddingTop: '2em', borderTop: '1px solid #e0ddd5', color: '#6b6b6b', fontSize: '0.9em', textAlign: 'center' }
  };

  const langBtn = (l) => ({ padding: '0.25em 0.75em', border: lang === l ? '1px solid #111' : '1px solid #e0ddd5', background: lang === l ? '#111' : 'transparent', color: lang === l ? '#fffff8' : '#111', cursor: 'pointer', fontFamily: 'inherit', fontSize: '0.85em' });
  const navBtn = (s) => ({ background: 'none', border: 'none', padding: '0.25em 0', cursor: 'pointer', fontFamily: 'inherit', fontSize: '0.95em', color: section === s ? '#111' : '#6b6b6b', borderBottom: section === s ? '2px solid #a00000' : '2px solid transparent' });
  const statusDot = (st) => ({ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', marginRight: '0.5em', backgroundColor: st === 'complete' ? '#2f5233' : st === 'in-progress' ? '#8b5a2b' : '#6b6b6b' });

  /* ========== SECTION: Overview ========== */
  const renderOverview = () => (
    <section data-section="overview">
      <p style={baseStyles.lead}>{t.overview.lead}</p>
      <div style={{ marginBottom: '2em' }}>
        <div style={baseStyles.label}>{t.overview.partOf}</div>
        <p>{t.overview.partOfDesc}</p>
      </div>
      <div style={{ marginBottom: '2em' }}>
        <div style={baseStyles.label}>{t.overview.statusLabel}</div>
        <p><span style={{ display: 'inline-block', padding: '0.2em 0.6em', backgroundColor: '#2f5233', color: '#fffff8', fontSize: '0.8em', borderRadius: '2px' }}>MVP</span> {t.overview.status}</p>
      </div>
      <div style={baseStyles.pullQuote}>{t.overview.coreInsight}</div>
    </section>
  );

  /* ========== SECTION: LiveSession ========== */
  const renderLiveSession = () => (
    <section data-section="liveSession">
      <p style={baseStyles.lead}>{t.liveSession.intro}</p>
      <div style={{ marginBottom: '2em' }}>
        <div style={baseStyles.label}>{t.liveSession.narrativeLabel}</div>
        <p style={{ fontStyle: 'italic' }}>{t.liveSession.narrative}</p>
      </div>
      <div style={{ marginBottom: '2em' }}>
        <div style={baseStyles.label}>{t.liveSession.categoriesLabel}</div>
        {Object.entries(sessionData.categories).map(([cat, count]) => (
          <CategoryBar key={cat} name={cat} count={count} max={maxCat} />
        ))}
      </div>
      <div style={{ marginBottom: '2em' }}>
        <div style={baseStyles.label}>{t.liveSession.deepDiveLabel}</div>
        <p style={{ fontSize: '0.95em', color: '#454545' }}>{t.liveSession.deepDiveIntro}</p>
        {sessionData.deepDiveResults.map((r, i) => (
          <DeepDiveCard key={i} {...r} />
        ))}
      </div>
      <div style={{ marginBottom: '2em' }}>
        <div style={baseStyles.label}>{t.liveSession.reasoningLabel}</div>
        <table style={baseStyles.table}>
          <thead><tr><th style={baseStyles.th}>Tab</th><th style={baseStyles.th}>Category</th><th style={baseStyles.th}>Signals</th><th style={baseStyles.th}>Confidence</th></tr></thead>
          <tbody>
            {sessionData.sampleReasoning.map((item, i) => (
              <tr key={i}><td style={baseStyles.td}>{item.tab}</td><td style={baseStyles.td}>{item.category}</td><td style={baseStyles.td}>{item.signals.join(', ')}</td><td style={baseStyles.td}>{item.confidence}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <div style={baseStyles.label}>{t.liveSession.metaLabel}</div>
        <table style={baseStyles.table}><tbody>
          <tr><td style={baseStyles.td}>Engine</td><td style={baseStyles.td}><span style={baseStyles.code}>{sessionData.meta.engine}</span></td></tr>
          <tr><td style={baseStyles.td}>Model</td><td style={baseStyles.td}><span style={baseStyles.code}>{sessionData.meta.model}</span></td></tr>
          <tr><td style={baseStyles.td}>Passes</td><td style={baseStyles.td}>{sessionData.meta.passes}</td></tr>
          <tr><td style={baseStyles.td}>Time</td><td style={baseStyles.td}>{sessionData.meta.time}</td></tr>
          <tr><td style={baseStyles.td}>Cost</td><td style={baseStyles.td}>{sessionData.meta.cost}</td></tr>
        </tbody></table>
      </div>
    </section>
  );

  /* ========== SECTION: Architecture ========== */
  const renderArchitecture = () => (
    <section data-section="architecture">
      <h3 style={baseStyles.sectionTitle}>{t.architecture.flowTitle}</h3>
      {t.architecture.flowSteps.map((step, i) => (
        <div key={i} style={baseStyles.flowStep}>
          <div style={baseStyles.flowNum}>{step.num}</div>
          <div><strong>{step.label}</strong><div style={{ color: '#454545', fontSize: '0.95em' }}>{step.desc}</div></div>
        </div>
      ))}
      <h3 style={baseStyles.sectionTitle}>{t.architecture.twoPassTitle}</h3>
      <p>{t.architecture.twoPassDesc}</p>
      <h3 style={baseStyles.sectionTitle}>{t.architecture.infrastructureTitle}</h3>
      <table style={baseStyles.table}>
        <thead><tr><th style={baseStyles.th}>Machine</th><th style={baseStyles.th}>OS</th><th style={baseStyles.th}>Role</th></tr></thead>
        <tbody>
          <tr><td style={baseStyles.td}><span style={baseStyles.code}>SupHouse</span></td><td style={baseStyles.td}>Windows 11</td><td style={baseStyles.td}>Extension + Backend</td></tr>
          <tr><td style={baseStyles.td}><span style={baseStyles.code}>adambalm</span></td><td style={baseStyles.td}>Ubuntu 24.04</td><td style={baseStyles.td}>LLM Inference (Ollama)</td></tr>
        </tbody>
      </table>
    </section>
  );

  /* ========== SECTION: Schema ========== */
  const renderSchema = () => (
    <section data-section="schema">
      <p style={baseStyles.lead}>{t.schema.intro}</p>
      <div style={{ marginBottom: '1.5em' }}>
        <div style={baseStyles.label}>Schema Version</div>
        <span style={baseStyles.code}>{t.schema.schemaVersion}</span>
      </div>
      <h3 style={baseStyles.sectionTitle}>{t.schema.fieldsTitle}</h3>
      <table style={baseStyles.table}>
        <thead><tr><th style={baseStyles.th}>Field</th><th style={baseStyles.th}>Description</th></tr></thead>
        <tbody>
          {t.schema.fields.map((f, i) => (
            <tr key={i}><td style={baseStyles.td}><span style={baseStyles.code}>{f.name}</span></td><td style={baseStyles.td}>{f.desc}</td></tr>
          ))}
        </tbody>
      </table>
    </section>
  );

  /* ========== SECTION: OpenQuestions ========== */
  const renderOpenQuestions = () => (
    <section data-section="openQuestions">
      <p style={baseStyles.lead}>{t.openQuestions.intro}</p>
      {t.openQuestions.questions.map((q, i) => (
        <div key={i} style={baseStyles.qBox} data-testid={`question-${i}`}>
          <div style={baseStyles.qHeader} onClick={() => setExpandedQ(expandedQ === i ? null : i)} data-testid={`question-toggle-${i}`}>
            <span>{q.q}</span><span>{expandedQ === i ? '−' : '+'}</span>
          </div>
          {expandedQ === i && <div style={baseStyles.qDetail}>{q.detail}</div>}
        </div>
      ))}
    </section>
  );

  /* ========== SECTION: Roadmap ========== */
  const renderRoadmap = () => (
    <section data-section="roadmap">
      <table style={baseStyles.table}>
        <thead><tr><th style={baseStyles.th}>Phase</th><th style={baseStyles.th}>Name</th><th style={baseStyles.th}>Status</th></tr></thead>
        <tbody>
          {t.roadmap.phases.map((p, i) => (
            <tr key={i} style={{ opacity: p.status === 'future' ? 0.6 : 1 }}>
              <td style={baseStyles.td}>{p.phase}</td>
              <td style={baseStyles.td}>{p.name}</td>
              <td style={baseStyles.td}><span style={statusDot(p.status)} />{p.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );

  const renderSection = () => {
    switch (section) {
      case 'overview': return renderOverview();
      case 'liveSession': return renderLiveSession();
      case 'architecture': return renderArchitecture();
      case 'schema': return renderSchema();
      case 'openQuestions': return renderOpenQuestions();
      case 'roadmap': return renderRoadmap();
      default: return renderOverview();
    }
  };

  return (
    <div style={baseStyles.container}>
      <header style={baseStyles.header}>
        <div style={{ display: 'flex', gap: '0.5em', marginBottom: '1em' }}>
          {['en', 'zh', 'es'].map(l => (
            <button key={l} style={langBtn(l)} onClick={() => setLang(l)} data-testid={`lang-${l}`}>{l.toUpperCase()}</button>
          ))}
        </div>
        <h1 style={baseStyles.title}>{t.overview.title}</h1>
        <p style={baseStyles.subtitle}>{t.overview.subtitle}</p>
      </header>

      <nav style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25em 1em', marginBottom: '2em' }}>
        {Object.entries(t.nav).map(([key, label]) => (
          <button key={key} style={navBtn(key)} onClick={() => setSection(key)} data-testid={`nav-${key}`}>{label}</button>
        ))}
      </nav>

      <main>
        <h2 style={baseStyles.sectionTitle}>{t.nav[section]}</h2>
        {renderSection()}
      </main>

      <footer style={baseStyles.footer}>
        <div>{t.footer.copyright}</div>
        <div style={{ marginTop: '1em', fontSize: '0.8em', color: '#6b6b6b' }}>MEMENTO-DEMO-2026-01-05-VITE-READY</div>
      </footer>
    </div>
  );
}
