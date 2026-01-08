{/*
MANIFEST
=========
Artifact: SkillForgeVisualizer
Version: 2.2.0
Generated: 2025-01-05T21:45:00Z
Generator: Claude (Opus 4.5) via Claude Desktop

SECTIONS:
- Process (~lines 700-800)
- Verification (~lines 800-870)
- Example (~lines 870-900)
- Economics (~lines 900-1030)
- Accumulation (~lines 1030-1200) [EXPANDED: thin skill explainer + inventory]
- References (~lines 1200-1300)

SUBCOMPONENTS:
- CitationLink (~lines 400-430) — APA 7th external links
- SkipLink (~lines 430-460) — WCAG skip navigation
- FlowStep (~lines 460-520) — Process step button
- Gate (~lines 520-570) — UG/AG status indicator
- SwissCheeseVisualization (~lines 570-630) — SVG diagram
- Slider (~lines 630-660) — Accessible range input
- CostCurve (~lines 750-830) — Economics SVG chart
- NavTab (~lines 830-870) — ARIA tab button
- ExpandablePanel (~lines 870-930) — Accordion
- SkillInventoryTable (~lines 930-980) — Thin skill inventory
- LaTeX (~lines 300-350) — KaTeX with fallback
- ConditionalLink (~lines 350-380) — Props-based linking

DEPENDENCIES:
- react (useState, useEffect, useRef)
- lucide-react (Check, X, AlertCircle, User, Layers, TrendingUp, Clock, FileText, Target, GitBranch, ChevronRight, ChevronDown, ExternalLink, Database, Zap)

CONSTRAINTS:
- Claude Desktop preview compatible
- No localStorage
- Tailwind core utilities only
- Single default export
- Links prop contract for parent site composition

CHANGES FROM 2.1.1:
- Added `links` prop for parent site routing
- Expanded Accumulation section with thin skill explainer
- Added SkillInventoryTable component with real inventory
- Added ConditionalLink component for props-based navigation
- ~60 new i18n keys for thin skill content

CANARY: SKILLFORGE-V2.2.0-2025-01-05
*/}

import React, { useState, useEffect, useRef } from 'react';
import { 
  Check, X, AlertCircle, User, 
  Layers, TrendingUp, Clock, FileText, Target,
  GitBranch, ChevronRight, ChevronDown, ExternalLink,
  Database, Zap
} from 'lucide-react';

// =============================================================================
// i18n INFRASTRUCTURE
// =============================================================================

const i18n = {
  en: {
    // Header
    title: 'Skill Forge Pattern',
    subtitle: 'Deliberation → Human Qualification → Reusable Skill',
    
    // Navigation
    navProcess: 'Process Flow',
    navVerification: 'Verification',
    navExample: 'Example',
    navEconomics: 'Economics',
    navAccumulation: 'Accumulation',
    navReferences: 'References',
    
    // Introduction
    introStrong: 'Skill Forge',
    introText: 'is a deliberative process for decisions too complex or consequential to trust to a single model or a single human judgment. Building on',
    introIrvingCite: 'Irving et al.\'s (2018)',
    introInsight: 'insight that humans can judge debates they couldn\'t generate, but departing from same-model debate by exploiting',
    introHeterogeneous: 'heterogeneous priors',
    introHeterogeneousExplain: '—the pattern uses models with genuinely different training to surface each other\'s blindspots. Unlike consensus-seeking approaches (',
    introAHMAD: 'A-HMAD',
    introLLMCouncil: 'LLM Council',
    introGoalNot: '), the goal is not model agreement but',
    introQualifiedJudgment: 'qualified human judgment',
    introQualifiedExplain: ': the human must articulate the decision before approving a model-produced skill. Unlike agent-centric skill accumulation (',
    introExpeL: 'ExpeL',
    introFinalClause: '), nothing enters the skill library without a human who demonstrated understanding.',
    
    // Process
    processTitle: 'Single Problem Flow Through the Forge',
    processDesc: 'Unlike role-specialized approaches (A-HMAD\'s researcher/critic/synthesizer), models here aren\'t assigned roles—they\'re chosen for genuinely different priors. The value comes from different training, not from prompting one model to act as critic.',
    step1Title: 'Novel Problem Arrives',
    step1Desc: 'Existing skills don\'t apply or have failed',
    step2Title: 'Model A Proposes',
    step2Desc: 'Human prompts first model for initial approach',
    step3Title: 'Model B Verifies',
    step3Desc: 'Paraphrases AND flags each claim with status',
    step4Title: 'Understanding Gate',
    step4Desc: 'Model A responds to all flags (not when all green)',
    step5Title: 'Model B Critiques',
    step5Desc: 'Only after UG: surfaces failure modes, proposes tests',
    step6Title: 'Agreement Gate',
    step6Desc: 'Executable test or qualified agreement',
    step7Title: 'Human Articulation Gate',
    step7Desc: 'Must restate decision to prove qualification',
    step8Title: 'Skill Compiled',
    step8Desc: 'Model skeleton + human approval = authorized skill',
    step1Example: 'Example: The portfolio site needs to display AI-generated artifacts with clear epistemic status markers—existing React components don\'t handle provenance display.',
    step2Example: 'Example: Claude proposes four boundary components: ProvenanceHeader (agent, date, context), EpistemicBadge (VERIFIED/ILLUSTRATIVE/EXPLORATORY), AuthorshipMarker (Human/AI/Collaborative), and DemoContainer (visual containment).',
    step3Example: 'Example: GPT paraphrases the proposal and flags concerns: "How do nested markers behave? Are badge colors WCAG 2.1 AA compliant? What\'s the fallback when evidence URLs return 404?"',
    step5Example: 'Example: After UG closes, GPT surfaces failure modes: "VERIFIED status implies evidence exists—what if the URL breaks post-deploy? Badge colors may fail contrast on dark backgrounds."',
    step8Example: 'Example: Skill \'boundary-marker-components\' compiles with component API specs, WCAG color constraints (#1d4ed8, #1e40af for blue badges), and fallback behaviors for missing evidence.',
    step4Example: 'Example: Claude responds to GPT\'s flags—concedes the WCAG concern (commits to testing badge colors), defends the nesting approach (markers won\'t nest in practice), acknowledges uncertainty on 404 handling (proposes fallback badge).',
    step6Example: 'Example: Models reach "AG-QUALIFIED": boundary markers approved with named uncertainty—"evidence URL validation deferred to build-time checks." Executable test: Lighthouse accessibility audit must pass.',
    step7Example: 'Example: The human articulates: "We\'re adding four components that mark AI content boundaries. VERIFIED needs evidence URLs. Colors must pass WCAG." This grounds their qualification to approve.',
    stepOf: 'of',
    completed: 'Completed',
    currentStep: 'Current step',
    ugDetailText: 'Model A must respond to every flag—defend, concede, or acknowledge uncertainty. The gate closes when A has responded, not when all flags are green.',
    agDetailText: 'Three outcomes possible: AG-HIGH (full agreement with executable test), AG-QUALIFIED (agreement with named uncertainties), or ESCALATE.',
    hagDetailTitle: 'Human Articulation Gate',
    hagDetailText: 'The human must restate the core decision in their own words. This qualifies them to steer the outcome and anchors their judgment in something that compounds—cognitive capital that amortizes across future decisions.',
    gateOpen: 'Open',
    gateClosed: 'Closed',
    gateFailed: 'Failed',
    understandingGate: 'Understanding',
    agreementGate: 'Agreement',
    
    // Verification
    swissCheeseTitle: 'Swiss Cheese Model: Heterogeneous models cover each other\'s blindspots',
    swissCheeseDesc: 'Diagram showing two cheese slices representing Claude and GPT models, each with holes in different positions representing blindspots. When combined, the holes don\'t align, resulting in full coverage.',
    swissCheeseCoverage: 'Coverage',
    swissCheeseSection: 'Swiss Cheese Coverage',
    swissCheeseExplain: 'James Reason\'s (2000) accident causation model: stack defenses with different failure modes.',
    swissCheeseApplied: 'applied this to AI safety guardrails. We apply it to',
    swissCheeseEpistemic: 'epistemic coverage',
    swissCheeseEpistemicExplain: '—different training corpora create different blindspots.',
    verificationTitle: 'Why Paraphrase? Adversarial Verification Through Different Priors',
    coreInsight: 'The Core Insight',
    coreInsightText: 'showed that humans can judge debates they couldn\'t generate. But same-model debate shares blindspots. Our mechanism is',
    coreInsightMechanism: 'active adversarial verification across different priors',
    coreInsightFinal: ': each model must treat the other\'s output as suspect and possibly hallucinated.',
    
    // Economics
    economicsTitle: 'When Does Skill Forge Pay Off?',
    economicsDesc: 'Most multi-agent patterns don\'t account for cost. Skill Forge makes the tradeoff explicit: deliberation is expensive, but amortizes when the problem class recurs. If N=1, don\'t use the forge.',
    paramDeliberation: 'Deliberation Cost',
    paramSkill: 'Skill Invocation Cost',
    paramFailure: 'Skill Failure Rate',
    paramProblems: 'Problem Count',
    formulaTitle: 'Formulas',
    formulaWithout: 'Without Forge',
    formulaWith: 'With Forge',
    formulaBreakeven: 'Break-even',
    costForge: 'forge',
    costWithout: 'without',
    probFail: 'fail',
    totalWithout: 'Total without Forge',
    totalWith: 'Total with Forge',
    savings: 'Savings',
    units: 'units',
    problems: 'problems',
    
    // Accumulation - EXPANDED
    accumulationTitle: 'What Builds Up Over Time?',
    accumulationDesc: 'Unlike agent workflow memory (ExpeL, MACLA) where skills accumulate automatically from execution traces, Skill Forge accumulation is human-gated: nothing enters the skill library without a human who demonstrated understanding by articulating the decision.',
    
    skillLibrary: 'Skill Library',
    skillLibraryDesc: 'Each forged skill becomes available for future problems. More skills = more domain coverage = fewer full deliberations needed.',
    
    humanExpertise: 'Human Expertise',
    humanExpertiseDesc: 'The human\'s ability to articulate outcomes improves. Pattern recognition develops. Executive capacity compounds.',
    
    provenanceRecord: 'Provenance Record',
    provenanceDesc: 'Not all decisions have equal weight. Well-contested decisions with clear rationale score higher than quick judgments.',
    
    // Thin Skill Architecture - NEW
    thinSkillTitle: 'Thin Skill Architecture',
    thinSkillSubtitle: 'How forged skills persist and compound',
    
    thinSkillIntro: 'Forged skills compile to',
    thinSkillName: 'thin skills',
    thinSkillIntroEnd: '— lightweight instruction files that live in the knowledge base, not bundled with code.',
    
    thinSkillWhatTitle: 'What is a Thin Skill?',
    thinSkillWhat: 'A thin skill is a markdown file containing execution instructions, quality criteria, and anti-patterns. Any model with MCP access can read and execute it. The key insight: the neural network is borrowed capability—an instance does work and ceases to exist. The instructions persist.',
    
    thinSkillVsNativeTitle: 'Thin Skills vs Native Plugins',
    thinSkillVsNativeIntro: 'Platform-native plugins (like Anthropic\'s .claude-plugin format) bundle instructions with execution code. Thin skills separate them:',
    
    comparisonNative: 'Native Plugin',
    comparisonThin: 'Thin Skill',
    comparisonStorage: 'Storage',
    comparisonStorageNative: 'Bundled with code',
    comparisonStorageThin: 'Knowledge base',
    comparisonPortability: 'Portability',
    comparisonPortabilityNative: 'Single platform',
    comparisonPortabilityThin: 'Any MCP client',
    comparisonLearning: 'Learning Loop',
    comparisonLearningNative: 'None',
    comparisonLearningThin: 'Feedback → update → next use benefits',
    comparisonGating: 'Human Gating',
    comparisonGatingNative: 'Optional',
    comparisonGatingThin: 'Required (Skill Forge)',
    
    thinSkillBenefits: 'This architecture means a skill forged in Claude can be executed by GPT, Gemini, or any future model with Basic Memory access. Knowledge compounds across the entire system, not locked to one vendor.',
    
    // Skill Inventory - NEW
    inventoryTitle: 'Current Skill Inventory',
    inventoryIntro: 'Skills currently registered in the Context Sage knowledge base:',
    inventorySkill: 'Skill',
    inventoryPurpose: 'Purpose',
    inventoryStatus: 'Status',
    inventoryLastVerified: 'Last Verified',
    
    skillTriage: 'Session Triage',
    skillTriagePurpose: 'Surface open work at session start',
    skillArtifactBuilder: 'Artifact Builder',
    skillArtifactBuilderPurpose: 'Generate React artifacts with manifests',
    skillGovernanceDashboard: 'Governance Dashboard',
    skillGovernanceDashboardPurpose: 'Visualize KB health metrics',
    skillBasicMemoryDemo: 'Basic Memory Demo',
    skillBasicMemoryDemoPurpose: 'Generate Context Sage presentation',
    
    statusCanonical: 'canonical',
    statusDraft: 'draft',
    
    inventoryNote: 'Each skill includes a canary string proving it was loaded from the KB, not hallucinated. Stale skills (>14 days unverified) are flagged for review.',
    
    learnMoreThinSkill: 'Learn more about Thin Skill Architecture',
    
    // References
    referencesTitle: 'References',
    referencesDesc: 'Skill Forge draws on several research threads while differing from each in important ways. Citations follow APA 7th Edition format.',
    whatsNovel: 'What\'s Novel in Skill Forge',
    novel1: 'Heterogeneous models with genuinely different priors',
    novel1Note: '— not just role specialization',
    novel2: 'Adversarial paraphrase as active verification',
    novel2Note: '— each model flags claims with status',
    novel3: 'Human articulation as qualification gate',
    novel3Note: '— must restate before approval',
    novel4: 'Human certification with accountability',
    novel4Note: '— certify only after articulating',
    novel5: 'Model produces skill, human approves',
    novel5Note: '— clear division of labor',
    novel6: 'Amortization economics',
    novel6Note: '— explicit cost model for recurring problems',
    
    // Example - Full Deliberation
    exampleTitle: 'Example: Boundary Marker Components',
    exampleDesc: 'A complete Skill Forge deliberation for the portfolio site\'s epistemic boundary markers. Click each step to see the actual exchange.',

    exStep1Title: 'Step 1: Novel Problem Arrives',
    exStep1Summary: 'Portfolio needs clear visual distinction for AI-generated artifacts',
    exStep1Content: 'The portfolio umbrella site will display demo artifacts generated by AI. Users need to immediately understand: (1) that content is AI-generated, (2) what epistemic status claims are being made, (3) who authored/approved it, and (4) that it\'s demo content not production features. No existing React component library handles this combination of concerns.',

    exStep2Title: 'Step 2: Model A (Claude) Proposes',
    exStep2Summary: 'Claude proposes four orthogonal boundary marker components',
    exStep2Content: 'I propose four boundary marker components, each addressing one concern:\n\n1. **ProvenanceHeader** — Shows agent (Claude/GPT), generation date, context description, and source link\n2. **EpistemicBadge** — VERIFIED (with evidence URL), ILLUSTRATIVE, or EXPLORATORY status\n3. **AuthorshipMarker** — Human, AI, or Collaborative attribution\n4. **DemoContainer** — Visual containment with dashed border and "Demo Content" label\n\nThese are orthogonal: any combination is valid. A demo could be VERIFIED (tested behavior) but AI-authored.',

    exStep3Title: 'Step 3: Model B (GPT) Verifies',
    exStep3Summary: 'GPT paraphrases and flags three concerns',
    exStep3Content: '**Paraphrase**: The proposal defines four independent components for marking AI artifact boundaries—provenance metadata, epistemic claims, authorship type, and visual containment.\n\n**Flags**:\n• 🟡 UNCERTAIN: How do nested markers behave? (DemoContainer inside DemoContainer)\n• 🟡 UNCERTAIN: Are badge colors WCAG 2.1 AA compliant? (4.5:1 contrast ratio)\n• 🔴 GAP: What\'s the fallback when VERIFIED evidence URLs return 404?',

    exStep4Title: 'Step 4: Understanding Gate',
    exStep4Summary: 'Claude responds: defend nesting, concede WCAG, acknowledge 404 uncertainty',
    exStep4Content: '**Nesting (DEFEND)**: Markers won\'t nest in practice—each artifact gets one DemoContainer at its root. The component doesn\'t need to handle recursion.\n\n**WCAG (CONCEDE)**: Valid concern. I commit to using tested color values: #1d4ed8 (blue), #1e40af (dark blue), #475569 (slate) which pass AAA.\n\n**404 Fallback (ACKNOWLEDGE UNCERTAINTY)**: This is a real gap. Proposal: VERIFIED badge shows warning state if evidence URL fails health check at build time. Runtime 404s show "Evidence unavailable" tooltip.',

    exStep5Title: 'Step 5: Model B (GPT) Critiques',
    exStep5Summary: 'GPT surfaces failure modes and proposes executable tests',
    exStep5Content: '**Failure Modes Identified**:\n1. Evidence URL validation at build-time may miss URLs that fail later\n2. "Demo Content" label may be missed by screen readers if only visual\n3. Epistemic badge colors alone may not distinguish states for colorblind users\n\n**Proposed Tests**:\n• Lighthouse accessibility audit must score 100\n• All badges must have aria-label with full status text\n• Evidence URLs should include Last-Modified check, not just 200 OK',

    exStep6Title: 'Step 6: Agreement Gate',
    exStep6Summary: 'AG-QUALIFIED reached: approved with named uncertainties',
    exStep6Content: '**Status**: AG-QUALIFIED\n\n**Approved**: Four-component boundary marker architecture with WCAG-compliant colors and accessibility requirements.\n\n**Named Uncertainties**:\n• Evidence URL runtime validation deferred to build-time checks only\n• Long-term URL stability not guaranteed\n\n**Executable Tests**:\n1. npm run lint passes (ESLint a11y plugin)\n2. Lighthouse accessibility = 100\n3. Manual test: each badge readable with color filter simulation',

    exStep7Title: 'Step 7: Human Articulation Gate',
    exStep7Summary: 'Human demonstrates understanding by restating the decision',
    exStep7Content: '"We\'re implementing four React components that visually mark AI-generated content boundaries:\n\n• ProvenanceHeader shows who made it and when\n• EpistemicBadge claims VERIFIED/ILLUSTRATIVE/EXPLORATORY\n• AuthorshipMarker distinguishes human/AI/collaborative\n• DemoContainer wraps everything with a visual boundary\n\nVERIFIED status requires a working evidence URL—we check at build time, show warning if it fails. All colors pass WCAG AA. This decision compounds: future artifacts use the same markers."',

    exStep8Title: 'Step 8: Skill Compiled',
    exStep8Summary: 'Skill "boundary-marker-components" enters the library',
    exStep8Content: '**Skill**: boundary-marker-components\n**Status**: canonical | **Verified**: 2026-01-05\n\n**Instructions**: When creating demo artifacts for the portfolio site:\n1. Wrap in DemoContainer with "Demo Content" label\n2. Add ProvenanceHeader with agent, date, context\n3. Add EpistemicBadge matching content status\n4. Add AuthorshipMarker if authorship is relevant\n\n**Constraints**:\n• Colors: #1d4ed8, #1e40af, #475569 only\n• VERIFIED requires evidence URL (validated at build)\n• All badges need aria-label\n\n**Anti-patterns**:\n• Don\'t nest DemoContainers\n• Don\'t use VERIFIED without evidence\n• Don\'t rely on color alone for status',

    exSpeakerContext: 'Context',
    exSpeakerClaude: 'Claude (GA)',
    exSpeakerGPT: 'GPT (IA)',
    exSpeakerHuman: 'Human (HO)',
    exSpeakerOutcome: 'Outcome',
    
    // Accessibility
    skipToMain: 'Skip to main content',
    selectView: 'Select a view',
    processSteps: 'Process steps',
    costModelParams: 'Cost Model Parameters',
    costCurveTitle: 'Cost Comparison Chart',
    costCurveDesc: 'Line chart comparing cumulative costs with and without Skill Forge across problem count N.',
    linkOpensNewTab: 'opens in new tab',
    
    // Footer
    footerTitle: 'Skill Forge Pattern Visualization',
    footerVersion: 'Version 2.2.0 | WCAG 2.1 AA | APA 7th Edition',
    footerAuthor: '© Ed O\'Connell',
    footerPubDate: 'January 2026',
    canary: 'SKILLFORGE-V2.2.0-2025-01-05',
  },
  
  es: {
    title: 'Patrón Skill Forge',
    subtitle: 'Deliberación → Cualificación Humana → Habilidad Reutilizable',
    navProcess: 'Flujo del Proceso',
    navVerification: 'Verificación',
    navExample: 'Ejemplo',
    navEconomics: 'Economía',
    navAccumulation: 'Acumulación',
    navReferences: 'Referencias',
    introStrong: 'Skill Forge',
    introText: 'es un proceso deliberativo para decisiones demasiado complejas o importantes para confiar en un solo modelo o un solo juicio humano. Basándose en',
    introIrvingCite: 'la perspectiva de Irving et al. (2018)',
    introInsight: 'de que los humanos pueden juzgar debates que no podrían generar, pero apartándose del debate de modelos idénticos al explotar',
    introHeterogeneous: 'priors heterogéneos',
    introHeterogeneousExplain: '—el patrón usa modelos con entrenamiento genuinamente diferente para revelar los puntos ciegos mutuos. A diferencia de enfoques de búsqueda de consenso (',
    introAHMAD: 'A-HMAD',
    introLLMCouncil: 'LLM Council',
    introGoalNot: '), el objetivo no es el acuerdo entre modelos sino',
    introQualifiedJudgment: 'juicio humano cualificado',
    introQualifiedExplain: ': el humano debe articular la decisión antes de aprobar una habilidad producida por el modelo. A diferencia de la acumulación de habilidades centrada en agentes (',
    introExpeL: 'ExpeL',
    introFinalClause: '), nada entra a la biblioteca de habilidades sin un humano que demostró comprensión.',
    processTitle: 'Flujo de un Problema Individual a Través de la Forja',
    processDesc: 'A diferencia de enfoques con roles especializados, aquí los modelos no tienen roles asignados—se eligen por sus priors genuinamente diferentes.',
    step1Title: 'Llega Problema Nuevo',
    step1Desc: 'Las habilidades existentes no aplican o han fallado',
    step2Title: 'Modelo A Propone',
    step2Desc: 'Humano solicita enfoque inicial al primer modelo',
    step3Title: 'Modelo B Verifica',
    step3Desc: 'Parafrasea Y marca cada afirmación con estado',
    step4Title: 'Portal de Entendimiento',
    step4Desc: 'Modelo A responde a todas las marcas (no cuando todas verdes)',
    step5Title: 'Modelo B Critica',
    step5Desc: 'Solo después de PE: revela modos de fallo, propone pruebas',
    step6Title: 'Portal de Acuerdo',
    step6Desc: 'Prueba ejecutable o acuerdo cualificado',
    step7Title: 'Portal de Articulación Humana',
    step7Desc: 'Debe reformular decisión para probar cualificación',
    step8Title: 'Habilidad Compilada',
    step8Desc: 'Esqueleto del modelo + aprobación humana = habilidad autorizada',
    stepOf: 'de',
    completed: 'Completado',
    currentStep: 'Paso actual',
    ugDetailText: 'El Modelo A debe responder a cada marca—defender, conceder o reconocer incertidumbre. El portal se cierra cuando A ha respondido, no cuando todas las marcas son verdes.',
    agDetailText: 'Tres resultados posibles: PA-ALTO, PA-CUALIFICADO, o ESCALAR.',
    hagDetailTitle: 'Portal de Articulación Humana',
    hagDetailText: 'El humano debe reformular la decisión central en sus propias palabras. Esto es un portal, no un paso de producción.',
    gateOpen: 'Abierto',
    gateClosed: 'Cerrado',
    gateFailed: 'Fallido',
    understandingGate: 'Entendimiento',
    agreementGate: 'Acuerdo',
    swissCheeseTitle: 'Modelo Queso Suizo: Modelos heterogéneos cubren los puntos ciegos mutuos',
    swissCheeseDesc: 'Diagrama mostrando dos rebanadas de queso representando modelos Claude y GPT.',
    swissCheeseCoverage: 'Cobertura',
    swissCheeseSection: 'Cobertura Queso Suizo',
    swissCheeseExplain: 'El modelo de causación de accidentes de James Reason (2000).',
    swissCheeseApplied: 'aplicó esto a barreras de seguridad de IA. Nosotros lo aplicamos a',
    swissCheeseEpistemic: 'cobertura epistémica',
    swissCheeseEpistemicExplain: '—diferentes corpus de entrenamiento crean diferentes puntos ciegos.',
    verificationTitle: '¿Por Qué Parafrasear? Verificación Adversarial',
    coreInsight: 'La Idea Central',
    coreInsightText: 'demostró que los humanos pueden juzgar debates que no podrían generar. Nuestro mecanismo es',
    coreInsightMechanism: 'verificación adversarial activa a través de priors diferentes',
    coreInsightFinal: ': cada modelo debe tratar la salida del otro como sospechosa.',
    economicsTitle: '¿Cuándo Conviene Skill Forge?',
    economicsDesc: 'La mayoría de patrones multi-agente no consideran el costo. Skill Forge hace explícito el intercambio.',
    paramDeliberation: 'Costo de Deliberación',
    paramSkill: 'Costo de Invocación',
    paramFailure: 'Tasa de Fallo',
    paramProblems: 'Cantidad de Problemas',
    formulaTitle: 'Fórmulas',
    formulaWithout: 'Sin Forja',
    formulaWith: 'Con Forja',
    formulaBreakeven: 'Punto de equilibrio',
    costForge: 'forja',
    costWithout: 'sin',
    probFail: 'fallo',
    totalWithout: 'Total sin Forja',
    totalWith: 'Total con Forja',
    savings: 'Ahorro',
    units: 'unidades',
    problems: 'problemas',
    accumulationTitle: '¿Qué Se Acumula con el Tiempo?',
    accumulationDesc: 'La acumulación de Skill Forge está controlada por humanos: nada entra a la biblioteca sin un humano que demostró comprensión.',
    skillLibrary: 'Biblioteca de Habilidades',
    skillLibraryDesc: 'Cada habilidad forjada queda disponible para problemas futuros.',
    humanExpertise: 'Experiencia Humana',
    humanExpertiseDesc: 'La capacidad del humano para articular resultados mejora.',
    provenanceRecord: 'Registro de Procedencia',
    provenanceDesc: 'No todas las decisiones tienen igual peso.',
    thinSkillTitle: 'Arquitectura de Habilidades Ligeras',
    thinSkillSubtitle: 'Cómo las habilidades forjadas persisten y se acumulan',
    thinSkillIntro: 'Las habilidades forjadas se compilan a',
    thinSkillName: 'habilidades ligeras',
    thinSkillIntroEnd: '— archivos de instrucciones ligeros que viven en la base de conocimiento, no empaquetados con código.',
    thinSkillWhatTitle: '¿Qué es una Habilidad Ligera?',
    thinSkillWhat: 'Una habilidad ligera es un archivo markdown con instrucciones de ejecución, criterios de calidad y anti-patrones. Cualquier modelo con acceso MCP puede leerlo y ejecutarlo.',
    thinSkillVsNativeTitle: 'Habilidades Ligeras vs Plugins Nativos',
    thinSkillVsNativeIntro: 'Los plugins nativos empaquetan instrucciones con código. Las habilidades ligeras los separan:',
    comparisonNative: 'Plugin Nativo',
    comparisonThin: 'Habilidad Ligera',
    comparisonStorage: 'Almacenamiento',
    comparisonStorageNative: 'Empaquetado con código',
    comparisonStorageThin: 'Base de conocimiento',
    comparisonPortability: 'Portabilidad',
    comparisonPortabilityNative: 'Una sola plataforma',
    comparisonPortabilityThin: 'Cualquier cliente MCP',
    comparisonLearning: 'Bucle de Aprendizaje',
    comparisonLearningNative: 'Ninguno',
    comparisonLearningThin: 'Feedback → actualizar → siguiente uso beneficia',
    comparisonGating: 'Control Humano',
    comparisonGatingNative: 'Opcional',
    comparisonGatingThin: 'Requerido (Skill Forge)',
    thinSkillBenefits: 'Esta arquitectura significa que una habilidad forjada en Claude puede ser ejecutada por GPT, Gemini, o cualquier modelo futuro con acceso a Basic Memory.',
    inventoryTitle: 'Inventario Actual de Habilidades',
    inventoryIntro: 'Habilidades actualmente registradas en la base de conocimiento de Context Sage:',
    inventorySkill: 'Habilidad',
    inventoryPurpose: 'Propósito',
    inventoryStatus: 'Estado',
    inventoryLastVerified: 'Última Verificación',
    skillTriage: 'Triaje de Sesión',
    skillTriagePurpose: 'Revelar trabajo abierto al inicio de sesión',
    skillArtifactBuilder: 'Constructor de Artefactos',
    skillArtifactBuilderPurpose: 'Generar artefactos React con manifiestos',
    skillGovernanceDashboard: 'Panel de Gobernanza',
    skillGovernanceDashboardPurpose: 'Visualizar métricas de salud de KB',
    skillBasicMemoryDemo: 'Demo de Basic Memory',
    skillBasicMemoryDemoPurpose: 'Generar presentación de Context Sage',
    statusCanonical: 'canónico',
    statusDraft: 'borrador',
    inventoryNote: 'Cada habilidad incluye una cadena canary que prueba que fue cargada desde la KB.',
    learnMoreThinSkill: 'Más sobre Arquitectura de Habilidades Ligeras',
    referencesTitle: 'Referencias',
    referencesDesc: 'Skill Forge se basa en varias líneas de investigación.',
    whatsNovel: 'Qué es Novedoso en Skill Forge',
    novel1: 'Modelos heterogéneos con priors genuinamente diferentes',
    novel1Note: '— no solo especialización de roles',
    novel2: 'Paráfrasis adversarial como verificación activa',
    novel2Note: '— cada modelo marca afirmaciones con estado',
    novel3: 'Articulación humana como portal de cualificación',
    novel3Note: '— debe reformular antes de aprobar',
    novel4: 'Certificación humana con responsabilidad',
    novel4Note: '— certificar solo después de articular',
    novel5: 'El modelo produce habilidad, el humano aprueba',
    novel5Note: '— división clara de labor',
    novel6: 'Economía de amortización',
    novel6Note: '— modelo de costos explícito',
    exampleTitle: 'Ejemplo: Flujo de Artefacto Demo',
    exampleDesc: 'Un ejemplo concreto de Skill Forge.',
    examplePlaceholder: 'Ver ejemplo completo en documento de especificación.',
    skipToMain: 'Saltar al contenido principal',
    selectView: 'Seleccionar una vista',
    processSteps: 'Pasos del proceso',
    costModelParams: 'Parámetros del Modelo de Costo',
    costCurveTitle: 'Gráfico de Comparación de Costos',
    costCurveDesc: 'Gráfico de líneas comparando costos.',
    linkOpensNewTab: 'se abre en nueva pestaña',
    footerTitle: 'Visualización del Patrón Skill Forge',
    footerVersion: 'Versión 2.2.0 | WCAG 2.1 AA | APA 7ª Ed.',
    canary: 'SKILLFORGE-V2.2.0-2025-01-05',
  },
  
  zh: {
    title: '技能锻造模式',
    subtitle: '审议 → 人类资格认证 → 可复用技能',
    navProcess: '流程',
    navVerification: '验证',
    navExample: '示例',
    navEconomics: '经济性',
    navAccumulation: '积累',
    navReferences: '参考文献',
    introStrong: '技能锻造',
    introText: '是一个审议过程，用于处理过于复杂或重要的决策。基于',
    introIrvingCite: 'Irving等人(2018)的洞见',
    introInsight: '——人类可以评判他们无法生成的辩论——但通过利用',
    introHeterogeneous: '异构先验',
    introHeterogeneousExplain: '而偏离同模型辩论。与寻求共识的方法(',
    introAHMAD: 'A-HMAD',
    introLLMCouncil: 'LLM Council',
    introGoalNot: ')不同，目标不是模型间的一致，而是',
    introQualifiedJudgment: '合格的人类判断',
    introQualifiedExplain: '：人类必须在批准技能之前阐明决策。与以代理为中心的技能积累(',
    introExpeL: 'ExpeL',
    introFinalClause: ')不同，没有证明理解的人类，任何内容都不会进入技能库。',
    processTitle: '单一问题通过锻造的流程',
    processDesc: '这里的模型没有分配角色——它们因真正不同的先验而被选择。',
    step1Title: '新问题到达',
    step1Desc: '现有技能不适用或已失败',
    step2Title: '模型A提议',
    step2Desc: '人类提示第一个模型',
    step3Title: '模型B验证',
    step3Desc: '复述并标记每个声明',
    step4Title: '理解门',
    step4Desc: '模型A回应所有标记',
    step5Title: '模型B批评',
    step5Desc: '揭示失败模式，提出测试',
    step6Title: '协议门',
    step6Desc: '可执行测试或有条件协议',
    step7Title: '人类阐述门',
    step7Desc: '必须重述决策以证明资格',
    step8Title: '技能编译',
    step8Desc: '模型骨架 + 人类批准 = 授权技能',
    stepOf: '/',
    completed: '已完成',
    currentStep: '当前步骤',
    ugDetailText: '模型A必须回应每个标记。门在A回应后关闭。',
    agDetailText: '三种可能结果：协议门-高，协议门-有条件，或升级。',
    hagDetailTitle: '人类阐述门',
    hagDetailText: '人类必须用自己的话重述核心决策。',
    gateOpen: '开启',
    gateClosed: '关闭',
    gateFailed: '失败',
    understandingGate: '理解',
    agreementGate: '协议',
    swissCheeseTitle: '瑞士奶酪模型：异构模型覆盖彼此的盲点',
    swissCheeseDesc: '图示显示两片奶酪代表Claude和GPT模型。',
    swissCheeseCoverage: '覆盖',
    swissCheeseSection: '瑞士奶酪覆盖',
    swissCheeseExplain: 'James Reason(2000)的事故因果模型。',
    swissCheeseApplied: '将此应用于AI安全护栏。我们将其应用于',
    swissCheeseEpistemic: '认知覆盖',
    swissCheeseEpistemicExplain: '——不同的训练语料创造不同的盲点。',
    verificationTitle: '为何复述？对抗验证',
    coreInsight: '核心洞见',
    coreInsightText: '表明人类可以评判他们无法生成的辩论。我们的机制是',
    coreInsightMechanism: '跨不同先验的主动对抗验证',
    coreInsightFinal: '：每个模型必须将另一个的输出视为可疑。',
    economicsTitle: '技能锻造何时值得？',
    economicsDesc: '技能锻造明确权衡：审议昂贵，但当问题类别重复时会摊销。',
    paramDeliberation: '审议成本',
    paramSkill: '技能调用成本',
    paramFailure: '技能失败率',
    paramProblems: '问题数量',
    formulaTitle: '公式',
    formulaWithout: '无锻造',
    formulaWith: '有锻造',
    formulaBreakeven: '盈亏平衡',
    costForge: '锻',
    costWithout: '无',
    probFail: '失',
    totalWithout: '无锻造总成本',
    totalWith: '有锻造总成本',
    savings: '节省',
    units: '单位',
    problems: '问题',
    accumulationTitle: '随时间积累什么？',
    accumulationDesc: '技能锻造的积累是人类把关的：没有证明理解的人类，任何内容都不会进入技能库。',
    skillLibrary: '技能库',
    skillLibraryDesc: '每个锻造的技能都可用于未来问题。',
    humanExpertise: '人类专业知识',
    humanExpertiseDesc: '人类阐述结果的能力提高。',
    provenanceRecord: '来源记录',
    provenanceDesc: '并非所有决策都具有同等权重。',
    thinSkillTitle: '轻量技能架构',
    thinSkillSubtitle: '锻造的技能如何持久化和累积',
    thinSkillIntro: '锻造的技能编译为',
    thinSkillName: '轻量技能',
    thinSkillIntroEnd: '——存储在知识库中的轻量指令文件，而非与代码捆绑。',
    thinSkillWhatTitle: '什么是轻量技能？',
    thinSkillWhat: '轻量技能是包含执行指令、质量标准和反模式的markdown文件。任何具有MCP访问权限的模型都可以读取和执行它。',
    thinSkillVsNativeTitle: '轻量技能 vs 原生插件',
    thinSkillVsNativeIntro: '平台原生插件将指令与代码捆绑。轻量技能将它们分离：',
    comparisonNative: '原生插件',
    comparisonThin: '轻量技能',
    comparisonStorage: '存储',
    comparisonStorageNative: '与代码捆绑',
    comparisonStorageThin: '知识库',
    comparisonPortability: '可移植性',
    comparisonPortabilityNative: '单一平台',
    comparisonPortabilityThin: '任何MCP客户端',
    comparisonLearning: '学习循环',
    comparisonLearningNative: '无',
    comparisonLearningThin: '反馈 → 更新 → 下次使用受益',
    comparisonGating: '人类把关',
    comparisonGatingNative: '可选',
    comparisonGatingThin: '必需（技能锻造）',
    thinSkillBenefits: '这种架构意味着在Claude中锻造的技能可以被GPT、Gemini或任何具有Basic Memory访问权限的未来模型执行。',
    inventoryTitle: '当前技能清单',
    inventoryIntro: 'Context Sage知识库中当前注册的技能：',
    inventorySkill: '技能',
    inventoryPurpose: '用途',
    inventoryStatus: '状态',
    inventoryLastVerified: '最后验证',
    skillTriage: '会话分诊',
    skillTriagePurpose: '在会话开始时揭示待处理工作',
    skillArtifactBuilder: '工件构建器',
    skillArtifactBuilderPurpose: '生成带清单的React工件',
    skillGovernanceDashboard: '治理仪表板',
    skillGovernanceDashboardPurpose: '可视化KB健康指标',
    skillBasicMemoryDemo: 'Basic Memory演示',
    skillBasicMemoryDemoPurpose: '生成Context Sage演示',
    statusCanonical: '规范',
    statusDraft: '草案',
    inventoryNote: '每个技能包含一个canary字符串，证明它是从KB加载的，而非幻觉。',
    learnMoreThinSkill: '了解更多轻量技能架构',
    referencesTitle: '参考文献',
    referencesDesc: '技能锻造借鉴多条研究线索。',
    whatsNovel: '技能锻造的创新点',
    novel1: '具有真正不同先验的异构模型',
    novel1Note: '——不仅仅是角色专门化',
    novel2: '对抗性复述作为主动验证',
    novel2Note: '——每个模型标记声明状态',
    novel3: '人类阐述作为资格门',
    novel3Note: '——批准前必须重述',
    novel4: '带责任的人类认证',
    novel4Note: '——仅在阐述后认证',
    novel5: '模型产生技能，人类批准',
    novel5Note: '——明确的劳动分工',
    novel6: '摊销经济学',
    novel6Note: '——针对重复问题的显式成本模型',
    exampleTitle: '示例：演示工件工作流',
    exampleDesc: '技能锻造的具体示例。',
    examplePlaceholder: '完整示例见规格文档。',
    skipToMain: '跳至主要内容',
    selectView: '选择视图',
    processSteps: '流程步骤',
    costModelParams: '成本模型参数',
    costCurveTitle: '成本比较图表',
    costCurveDesc: '折线图比较成本。',
    linkOpensNewTab: '在新标签页中打开',
    footerTitle: '技能锻造模式可视化',
    footerVersion: '版本 2.2.0 | WCAG 2.1 AA | APA第7版',
    canary: 'SKILLFORGE-V2.2.0-2025-01-05',
  },
};

const t = (lang, key) => i18n[lang]?.[key] || i18n.en[key] || key;

// =============================================================================
// REFERENCES
// =============================================================================

const REFERENCES = {
  irving2018: { id: 'irving2018', authors: 'Irving, G., Christiano, P., & Amodei, D.', year: 2018, title: 'AI safety via debate', source: 'arXiv preprint', url: 'https://arxiv.org/abs/1805.00899', shortCite: 'Irving et al., 2018' },
  reason2000: { id: 'reason2000', authors: 'Reason, J.', year: 2000, title: 'Human error: Models and management', source: 'BMJ, 320(7237), 768–770', url: 'https://doi.org/10.1136/bmj.320.7237.768', shortCite: 'Reason, 2000' },
  shamsujjoha2024: { id: 'shamsujjoha2024', authors: 'Shamsujjoha, M., et al.', year: 2024, title: 'A Swiss cheese model for AI safety', source: 'arXiv preprint', url: 'https://arxiv.org/abs/2408.02205', shortCite: 'Shamsujjoha et al., 2024' },
  zhou2025: { id: 'zhou2025', authors: 'Zhou, Y., & Chen, X.', year: 2025, title: 'A-HMAD: Heterogeneous multi-agent deliberation', source: 'Journal of King Saud University', url: 'https://doi.org/10.1016/j.jksuci.2024.102252', shortCite: 'Zhou & Chen, 2025' },
  karpathy2024: { id: 'karpathy2024', authors: 'Karpathy, A.', year: 2024, title: 'LLM Council', source: 'GitHub repository', url: 'https://github.com/karpathy/llm-council', shortCite: 'Karpathy, 2024' },
  zhao2023: { id: 'zhao2023', authors: 'Zhao, A., et al.', year: 2023, title: 'ExpeL: LLM agents are experiential learners', source: 'arXiv preprint', url: 'https://arxiv.org/abs/2308.10144', shortCite: 'Zhao et al., 2023' },
};

// =============================================================================
// SKILL INVENTORY DATA
// =============================================================================

const SKILL_INVENTORY = [
  { id: 'triage', nameKey: 'skillTriage', purposeKey: 'skillTriagePurpose', status: 'draft', lastVerified: '2025-12-30' },
  { id: 'artifact-builder', nameKey: 'skillArtifactBuilder', purposeKey: 'skillArtifactBuilderPurpose', status: 'canonical', lastVerified: '2025-12-10' },
  { id: 'governance-dashboard', nameKey: 'skillGovernanceDashboard', purposeKey: 'skillGovernanceDashboardPurpose', status: 'draft', lastVerified: '2025-12-16' },
  { id: 'basic-memory-demo', nameKey: 'skillBasicMemoryDemo', purposeKey: 'skillBasicMemoryDemoPurpose', status: 'draft', lastVerified: '2025-12-13' },
];

// =============================================================================
// KATEX SINGLETON
// =============================================================================

let katexLoadPromise = null;

const loadKaTeX = () => {
  if (katexLoadPromise) return katexLoadPromise;
  if (window.katex) return Promise.resolve(true);
  
  katexLoadPromise = new Promise((resolve) => {
    if (!document.querySelector('link[href*="katex"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.css';
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    }
    
    if (!document.querySelector('script[src*="katex"]')) {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.js';
      script.crossOrigin = 'anonymous';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.head.appendChild(script);
    } else if (window.katex) {
      resolve(true);
    }
  });
  
  return katexLoadPromise;
};

const useKaTeX = () => {
  const [katexReady, setKatexReady] = useState(!!window.katex);
  const [katexFailed, setKatexFailed] = useState(false);

  useEffect(() => {
    if (window.katex) { setKatexReady(true); return; }
    loadKaTeX().then((success) => {
      if (success) setKatexReady(true);
      else setKatexFailed(true);
    });
  }, []);

  return { katexReady, katexFailed };
};

const LaTeX = ({ children, display = false }) => {
  const { katexReady, katexFailed } = useKaTeX();
  const containerRef = useRef(null);

  useEffect(() => {
    if (katexReady && containerRef.current && window.katex) {
      try {
        window.katex.render(children, containerRef.current, { displayMode: display, throwOnError: false, trust: true });
      } catch (e) { console.warn('KaTeX render error:', e); }
    }
  }, [katexReady, children, display]);

  if (katexFailed || !katexReady) {
    return (
      <span style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', whiteSpace: 'nowrap' }}>
        {display ? <div style={{ textAlign: 'center', margin: '1em 0' }}>{children}</div> : children}
      </span>
    );
  }

  return <span ref={containerRef} aria-label={`Formula: ${children}`} style={display ? { display: 'block', textAlign: 'center', margin: '1em 0' } : {}} />;
};

// =============================================================================
// CONDITIONAL LINK (props-based navigation)
// =============================================================================

const ConditionalLink = ({ href, children, style = {} }) => {
  if (href) {
    return <a href={href} style={{ color: '#a00000', textDecoration: 'underline', ...style }}>{children}</a>;
  }
  return <em style={style}>{children}</em>;
};

// =============================================================================
// SUBCOMPONENTS
// =============================================================================

const CitationLink = ({ reference, children, lang }) => {
  const ref = REFERENCES[reference];
  if (!ref) return <span>{children}</span>;
  return (
    <a href={ref.url} target="_blank" rel="noopener noreferrer" data-testid={`cite-${reference}`}
      style={{ color: '#a00000', textDecoration: 'underline', textUnderlineOffset: '2px' }}
      aria-label={`${ref.shortCite}, ${ref.title}, ${t(lang, 'linkOpensNewTab')}`}>
      {children || ref.shortCite}
      <ExternalLink style={{ display: 'inline-block', width: 12, height: 12, marginLeft: 4, verticalAlign: 'baseline' }} aria-hidden="true" />
    </a>
  );
};

const SkipLink = ({ lang }) => (
  <a href="#main-content" data-testid="skip-link"
    style={{ position: 'absolute', left: -9999, top: 'auto', width: 1, height: 1, overflow: 'hidden' }}
    onFocus={(e) => { Object.assign(e.target.style, { position: 'fixed', left: '16px', top: '16px', width: 'auto', height: 'auto', overflow: 'visible', padding: '12px 16px', background: '#fff', color: '#111', boxShadow: '0 2px 8px rgba(0,0,0,0.2)', borderRadius: '4px', zIndex: 9999 }); }}
    onBlur={(e) => { Object.assign(e.target.style, { position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }); }}>
    {t(lang, 'skipToMain')}
  </a>
);

const FlowStep = ({ number, title, description, active, completed, onClick, totalSteps, lang }) => (
  <button onClick={onClick} data-testid={`step-${number}`}
    style={{ width: '100%', textAlign: 'left', padding: 16, borderLeft: `4px solid ${active ? '#a00000' : completed ? '#2d5a3d' : '#ccc'}`, background: active ? '#fff5f5' : completed ? '#f5fff5' : '#fff', border: 'none', borderBottom: '1px solid #ccc', cursor: 'pointer', fontFamily: 'Palatino, Georgia, serif', transition: 'all 0.2s', outline: 'none' }}
    aria-current={active ? 'step' : undefined}
    aria-label={`${number} ${t(lang, 'stepOf')} ${totalSteps}: ${title}. ${description}.`}
    onFocus={(e) => { e.target.style.boxShadow = 'inset 0 0 0 2px #a00000'; }}
    onBlur={(e) => { e.target.style.boxShadow = 'none'; }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <span style={{ width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 500, background: active ? '#a00000' : completed ? '#2d5a3d' : '#e5e5e5', color: active || completed ? '#fff' : '#555' }} aria-hidden="true">
        {completed ? <Check style={{ width: 16, height: 16 }} /> : number}
      </span>
      <div>
        <div style={{ fontWeight: 500, color: '#111', fontStyle: 'italic' }}>{title}</div>
        <div style={{ fontSize: 14, color: '#555' }}>{description}</div>
      </div>
    </div>
  </button>
);

const Gate = ({ type, status, label, lang }) => {
  const colors = { open: { border: '#b8860b', bg: '#fffaf0', text: '#8b6914' }, closed: { border: '#2d5a3d', bg: '#f5fff5', text: '#1e3d29' }, failed: { border: '#a00000', bg: '#fff5f5', text: '#a00000' } };
  const statusText = { open: t(lang, 'gateOpen'), closed: t(lang, 'gateClosed'), failed: t(lang, 'gateFailed') };
  return (
    <div data-testid={`gate-${type.toLowerCase()}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 12px', border: `2px solid ${colors[status].border}`, borderRadius: 4, background: colors[status].bg, color: colors[status].text }} role="status" aria-label={`${type} Gate: ${statusText[status]} - ${label}`}>
      {status === 'open' && <AlertCircle style={{ width: 20, height: 20 }} aria-hidden="true" />}
      {status === 'closed' && <Check style={{ width: 20, height: 20 }} aria-hidden="true" />}
      {status === 'failed' && <X style={{ width: 20, height: 20 }} aria-hidden="true" />}
      <span style={{ fontWeight: 500 }}>{type}</span>
      <span style={{ fontSize: 14 }}>({label})</span>
    </div>
  );
};

const SwissCheeseVisualization = ({ lang }) => (
  <figure role="img" aria-labelledby="swiss-cheese-caption" style={{ margin: '24px 0' }}>
    <svg viewBox="0 0 450 180" style={{ width: '100%', maxWidth: 450, display: 'block', margin: '0 auto' }} aria-labelledby="swiss-cheese-title swiss-cheese-desc" data-testid="swiss-cheese-svg">
      <title id="swiss-cheese-title">{t(lang, 'swissCheeseTitle')}</title>
      <desc id="swiss-cheese-desc">{t(lang, 'swissCheeseDesc')}</desc>
      <g><rect x="20" y="20" width="100" height="140" rx="8" fill="#b8860b" stroke="#8b6914" strokeWidth="2" /><circle cx="50" cy="45" r="12" fill="#fffff8" stroke="#ccc" /><circle cx="85" cy="75" r="10" fill="#fffff8" stroke="#ccc" /><circle cx="45" cy="110" r="14" fill="#fffff8" stroke="#ccc" /><circle cx="90" cy="135" r="8" fill="#fffff8" stroke="#ccc" /><text x="70" y="170" textAnchor="middle" fill="#111" fontSize="12" fontFamily="Palatino, Georgia, serif">Claude</text></g>
      <text x="145" y="95" textAnchor="middle" fill="#555" fontSize="24" fontWeight="bold">+</text>
      <g><rect x="170" y="20" width="100" height="140" rx="8" fill="#2d5a3d" stroke="#1e3d29" strokeWidth="2" /><circle cx="220" cy="40" r="11" fill="#fffff8" stroke="#ccc" /><circle cx="190" cy="80" r="13" fill="#fffff8" stroke="#ccc" /><circle cx="240" cy="105" r="9" fill="#fffff8" stroke="#ccc" /><circle cx="205" cy="140" r="12" fill="#fffff8" stroke="#ccc" /><text x="220" y="170" textAnchor="middle" fill="#111" fontSize="12" fontFamily="Palatino, Georgia, serif">GPT</text></g>
      <text x="295" y="95" textAnchor="middle" fill="#555" fontSize="24" fontWeight="bold">=</text>
      <g><rect x="320" y="20" width="100" height="140" rx="8" fill="#f5fff5" stroke="#2d5a3d" strokeWidth="2" /><path d="M355 85 L365 95 L390 70" stroke="#2d5a3d" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" /><text x="370" y="120" textAnchor="middle" fill="#2d5a3d" fontSize="12" fontFamily="Palatino, Georgia, serif" fontWeight="500">{t(lang, 'swissCheeseCoverage')}</text></g>
    </svg>
    <figcaption id="swiss-cheese-caption" style={{ textAlign: 'center', fontSize: 14, fontStyle: 'italic', color: '#555', marginTop: 8 }}>{t(lang, 'swissCheeseTitle')}</figcaption>
  </figure>
);

const Slider = ({ id, label, value, onChange, min, max, step, unit }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <label htmlFor={id} style={{ fontSize: 14, color: '#555' }}>{label}</label>
      <span style={{ fontSize: 14, fontWeight: 500, color: '#111' }}>{value}{unit}</span>
    </div>
    <input type="range" id={id} data-testid={`slider-${id}`} min={min} max={max} step={step} value={value} onChange={(e) => onChange(parseFloat(e.target.value))} style={{ width: '100%', height: 8, background: '#e5e5e5', borderRadius: 4, appearance: 'none', cursor: 'pointer', outline: 'none' }} aria-valuemin={min} aria-valuemax={max} aria-valuenow={value} aria-valuetext={`${value}${unit}`} />
  </div>
);

const CostCurve = ({ D, S, pFail, maxN, lang }) => {
  const width = 400, height = 250;
  const padding = { top: 30, right: 20, bottom: 50, left: 60 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  const withoutForge = (n) => n * D;
  const withForge = (n) => D + (n - 1) * (S + pFail * D);
  const maxCost = withoutForge(maxN);
  const scaleX = (n) => padding.left + (n / maxN) * chartWidth;
  const scaleY = (cost) => padding.top + chartHeight - (cost / maxCost) * chartHeight;
  const pathWithout = Array.from({ length: maxN + 1 }, (_, i) => `${i === 0 ? 'M' : 'L'} ${scaleX(i)} ${scaleY(withoutForge(i))}`).join(' ');
  const pathWith = Array.from({ length: maxN + 1 }, (_, i) => `${i === 0 ? 'M' : 'L'} ${scaleX(i)} ${scaleY(withForge(i))}`).join(' ');
  const breakEven = D / (D - S - pFail * D);

  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', maxWidth: width }} data-testid="cost-curve-svg" aria-labelledby="cost-curve-title cost-curve-desc">
      <title id="cost-curve-title">{t(lang, 'costCurveTitle')}</title>
      <desc id="cost-curve-desc">{t(lang, 'costCurveDesc')}</desc>
      {[0, 0.25, 0.5, 0.75, 1].map((frac) => (<g key={frac}><line x1={padding.left} y1={padding.top + frac * chartHeight} x2={width - padding.right} y2={padding.top + frac * chartHeight} stroke="#ccc" strokeDasharray="2,4" /><text x={padding.left - 8} y={padding.top + frac * chartHeight + 4} textAnchor="end" fontSize="11" fill="#555" fontFamily="Palatino, Georgia, serif">{Math.round(maxCost * (1 - frac))}</text></g>))}
      {[0, Math.round(maxN/4), Math.round(maxN/2), Math.round(3*maxN/4), maxN].map((n) => (<text key={n} x={scaleX(n)} y={height - padding.bottom + 20} textAnchor="middle" fontSize="11" fill="#555" fontFamily="Palatino, Georgia, serif">{n}</text>))}
      <text x={width / 2} y={height - 8} textAnchor="middle" fontSize="12" fill="#111" fontFamily="Palatino, Georgia, serif" fontStyle="italic">N ({t(lang, 'problems')})</text>
      <text x={15} y={height / 2} textAnchor="middle" fontSize="12" fill="#111" fontFamily="Palatino, Georgia, serif" fontStyle="italic" transform={`rotate(-90, 15, ${height / 2})`}>Cost ({t(lang, 'units')})</text>
      <path d={pathWithout} fill="none" stroke="#555" strokeWidth="2" />
      <path d={pathWith} fill="none" stroke="#a00000" strokeWidth="2" />
      {breakEven > 0 && breakEven < maxN && (<g><line x1={scaleX(breakEven)} y1={padding.top} x2={scaleX(breakEven)} y2={height - padding.bottom} stroke="#a00000" strokeDasharray="4,4" strokeOpacity="0.5" /><circle cx={scaleX(breakEven)} cy={scaleY(withoutForge(breakEven))} r="4" fill="#a00000" /></g>)}
      <g transform={`translate(${padding.left + 10}, ${padding.top + 10})`}><line x1="0" y1="0" x2="20" y2="0" stroke="#555" strokeWidth="2" /><text x="28" y="4" fontSize="11" fill="#111" fontFamily="Palatino, Georgia, serif">{t(lang, 'formulaWithout')}</text><line x1="0" y1="18" x2="20" y2="18" stroke="#a00000" strokeWidth="2" /><text x="28" y="22" fontSize="11" fill="#111" fontFamily="Palatino, Georgia, serif">{t(lang, 'formulaWith')}</text></g>
    </svg>
  );
};

const NavTab = ({ id, label, icon: Icon, active, onClick }) => (
  <button role="tab" id={`tab-${id}`} data-testid={`nav-${id}`} aria-selected={active} aria-controls={`panel-${id}`} tabIndex={active ? 0 : -1} onClick={onClick}
    style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 8, border: 'none', borderBottom: `2px solid ${active ? '#a00000' : 'transparent'}`, background: 'transparent', color: active ? '#a00000' : '#555', fontFamily: 'Palatino, Georgia, serif', fontWeight: active ? 500 : 400, cursor: 'pointer', transition: 'all 0.2s', outline: 'none' }}
    onFocus={(e) => { e.target.style.boxShadow = 'inset 0 -2px 0 0 #a00000'; }}
    onBlur={(e) => { if (!active) e.target.style.boxShadow = 'none'; }}>
    <Icon style={{ width: 16, height: 16 }} aria-hidden="true" />
    <span style={{ fontSize: 14 }}>{label}</span>
  </button>
);

const ExpandablePanel = ({ id, icon: Icon, title, expanded, onToggle, children }) => (
  <div style={{ background: '#fff', border: '1px solid #ccc', borderRadius: 4, overflow: 'hidden' }}>
    <button id={`${id}-header`} data-testid={`collapse-${id}`} onClick={onToggle}
      style={{ width: '100%', padding: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'Palatino, Georgia, serif', outline: 'none' }}
      aria-expanded={expanded} aria-controls={`${id}-content`}
      onFocus={(e) => { e.target.style.boxShadow = 'inset 0 0 0 2px #a00000'; }}
      onBlur={(e) => { e.target.style.boxShadow = 'none'; }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Icon style={{ width: 20, height: 20, color: '#555' }} aria-hidden="true" />
        <span style={{ fontWeight: 500, color: '#111', fontStyle: 'italic' }}>{title}</span>
      </div>
      {expanded ? <ChevronDown style={{ width: 20, height: 20, color: '#555' }} aria-hidden="true" /> : <ChevronRight style={{ width: 20, height: 20, color: '#555' }} aria-hidden="true" />}
    </button>
    {expanded && (<div id={`${id}-content`} role="region" aria-labelledby={`${id}-header`} style={{ padding: '0 16px 16px', borderTop: '1px solid #ccc' }}>{children}</div>)}
  </div>
);

const SkillInventoryTable = ({ lang, links }) => (
  <div style={{ overflowX: 'auto' }}>
    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14, fontFamily: 'Palatino, Georgia, serif' }} data-testid="skill-inventory">
      <thead>
        <tr style={{ borderBottom: '2px solid #ccc' }}>
          <th style={{ textAlign: 'left', padding: '8px 12px', fontStyle: 'italic', fontWeight: 500 }}>{t(lang, 'inventorySkill')}</th>
          <th style={{ textAlign: 'left', padding: '8px 12px', fontStyle: 'italic', fontWeight: 500 }}>{t(lang, 'inventoryPurpose')}</th>
          <th style={{ textAlign: 'center', padding: '8px 12px', fontStyle: 'italic', fontWeight: 500 }}>{t(lang, 'inventoryStatus')}</th>
          <th style={{ textAlign: 'center', padding: '8px 12px', fontStyle: 'italic', fontWeight: 500 }}>{t(lang, 'inventoryLastVerified')}</th>
        </tr>
      </thead>
      <tbody>
        {SKILL_INVENTORY.map((skill) => (
          <tr key={skill.id} style={{ borderBottom: '1px solid #e5e5e5' }}>
            <td style={{ padding: '10px 12px', fontWeight: 500 }}>
              {links?.[skill.id] ? (
                <a href={links[skill.id]} style={{ color: '#a00000', textDecoration: 'underline' }}>{t(lang, skill.nameKey)}</a>
              ) : (
                t(lang, skill.nameKey)
              )}
            </td>
            <td style={{ padding: '10px 12px', color: '#555' }}>{t(lang, skill.purposeKey)}</td>
            <td style={{ padding: '10px 12px', textAlign: 'center' }}>
              <span style={{
                display: 'inline-block', padding: '2px 8px', borderRadius: 4, fontSize: 12,
                background: skill.status === 'canonical' ? '#f5fff5' : '#fffaf0',
                color: skill.status === 'canonical' ? '#2d5a3d' : '#8b6914',
                border: `1px solid ${skill.status === 'canonical' ? '#2d5a3d' : '#b8860b'}`
              }}>
                {t(lang, skill.status === 'canonical' ? 'statusCanonical' : 'statusDraft')}
              </span>
            </td>
            <td style={{ padding: '10px 12px', textAlign: 'center', fontFamily: 'SF Mono, Consolas, monospace', fontSize: 12 }}>{skill.lastVerified}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export default function SkillForgeVisualizer({ lang = 'en', links = {} }) {
  const validLang = ['en', 'es', 'zh'].includes(lang) ? lang : 'en';
  
  const [view, setView] = useState('process');
  const [processStep, setProcessStep] = useState(0);
  const [deliberationCost, setDeliberationCost] = useState(100);
  const [skillCost, setSkillCost] = useState(10);
  const [failureRate, setFailureRate] = useState(0.1);
  const [problemCount, setProblemCount] = useState(10);
  const [expandedPhase, setExpandedPhase] = useState(null);
  const [expandedExample, setExpandedExample] = useState(null);

  // Example deliberation step metadata
  const exampleSteps = [
    { step: 1, speaker: 'context', color: '#f5f5f5', borderColor: '#999' },
    { step: 2, speaker: 'claude', color: '#fffaf0', borderColor: '#b8860b' },
    { step: 3, speaker: 'gpt', color: '#f5fff5', borderColor: '#2d5a3d' },
    { step: 4, speaker: 'claude', color: '#fffaf0', borderColor: '#b8860b' },
    { step: 5, speaker: 'gpt', color: '#f5fff5', borderColor: '#2d5a3d' },
    { step: 6, speaker: 'outcome', color: '#f0f8ff', borderColor: '#0066cc' },
    { step: 7, speaker: 'human', color: '#fff5f5', borderColor: '#a00000' },
    { step: 8, speaker: 'outcome', color: '#f0f8ff', borderColor: '#0066cc' },
  ];

  const views = [
    { id: 'process', label: t(validLang, 'navProcess'), icon: GitBranch },
    { id: 'paraphrase', label: t(validLang, 'navVerification'), icon: Layers },
    { id: 'example', label: t(validLang, 'navExample'), icon: FileText },
    { id: 'economics', label: t(validLang, 'navEconomics'), icon: TrendingUp },
    { id: 'accumulation', label: t(validLang, 'navAccumulation'), icon: Target },
    { id: 'references', label: t(validLang, 'navReferences'), icon: Clock }
  ];

  const handleTabKeyDown = (e, currentIndex) => {
    let newIndex = currentIndex;
    if (e.key === 'ArrowRight') newIndex = (currentIndex + 1) % views.length;
    else if (e.key === 'ArrowLeft') newIndex = (currentIndex - 1 + views.length) % views.length;
    else if (e.key === 'Home') newIndex = 0;
    else if (e.key === 'End') newIndex = views.length - 1;
    else return;
    e.preventDefault();
    setView(views[newIndex].id);
    document.getElementById(`tab-${views[newIndex].id}`)?.focus();
  };

  const withoutForgeCost = problemCount * deliberationCost;
  const withForgeCost = deliberationCost + (problemCount - 1) * (skillCost + failureRate * deliberationCost);
  const savings = withoutForgeCost - withForgeCost;
  const savingsPercent = ((1 - withForgeCost / withoutForgeCost) * 100).toFixed(0);
  const costSub = t(validLang, 'costForge');
  const costSubWithout = t(validLang, 'costWithout');
  const pFailSub = t(validLang, 'probFail');
  const breakEven = deliberationCost / (deliberationCost - skillCost - failureRate * deliberationCost);

  return (
    <div style={{ minHeight: '100vh', background: '#fffff8', color: '#111', fontFamily: 'Palatino, "Palatino Linotype", Georgia, serif' }} lang={validLang} className="skill-forge">
      <SkipLink lang={validLang} />
      
      <header style={{ background: '#fff', borderBottom: '1px solid #ccc', padding: '16px 24px' }}>
        <h1 style={{ fontSize: 28, fontWeight: 400, fontStyle: 'italic', margin: 0, color: '#111' }}>{t(validLang, 'title')}</h1>
        <p style={{ color: '#555', marginTop: 4, fontSize: 16 }}>{t(validLang, 'subtitle')}</p>
      </header>

      <nav style={{ background: '#fff', borderBottom: '1px solid #ccc', padding: '0 24px' }} aria-label={t(validLang, 'selectView')}>
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }} role="tablist">
          {views.map((v, index) => (
            <div key={v.id} onKeyDown={(e) => handleTabKeyDown(e, index)}>
              <NavTab id={v.id} label={v.label} icon={v.icon} active={view === v.id} onClick={() => setView(v.id)} />
            </div>
          ))}
        </div>
      </nav>

      <main id="main-content" style={{ padding: '32px 24px', maxWidth: 1000, margin: '0 auto' }}>
        
        {/* Introduction */}
        <section style={{ marginBottom: 32, paddingBottom: 24, borderBottom: '1px solid #ccc' }} data-section="intro">
          <p style={{ lineHeight: 1.7, fontSize: 16 }}>
            <strong style={{ fontStyle: 'italic' }}>{t(validLang, 'introStrong')}</strong> {t(validLang, 'introText')} <CitationLink reference="irving2018" lang={validLang}>{t(validLang, 'introIrvingCite')}</CitationLink> {t(validLang, 'introInsight')} <em>{t(validLang, 'introHeterogeneous')}</em>{t(validLang, 'introHeterogeneousExplain')}<CitationLink reference="zhou2025" lang={validLang}>{t(validLang, 'introAHMAD')}</CitationLink>, <CitationLink reference="karpathy2024" lang={validLang}>{t(validLang, 'introLLMCouncil')}</CitationLink>{t(validLang, 'introGoalNot')} <em>{t(validLang, 'introQualifiedJudgment')}</em>{t(validLang, 'introQualifiedExplain')}<CitationLink reference="zhao2023" lang={validLang}>{t(validLang, 'introExpeL')}</CitationLink>{t(validLang, 'introFinalClause')}
          </p>
        </section>

        {/* ========== SECTION: Process ========== */}
        {view === 'process' && (
          <section id="panel-process" role="tabpanel" aria-labelledby="tab-process" tabIndex={0} data-section="process">
            <h2 style={{ fontSize: 22, fontWeight: 400, fontStyle: 'italic', marginBottom: 16 }}>{t(validLang, 'processTitle')}</h2>
            <p style={{ color: '#555', marginBottom: 24, lineHeight: 1.6 }}>{t(validLang, 'processDesc')}</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
              <div role="group" aria-label={t(validLang, 'processSteps')}>
                {[1,2,3,4,5,6,7,8].map((num) => (
                  <FlowStep key={num} number={num} title={t(validLang, `step${num}Title`)} description={t(validLang, `step${num}Desc`)} active={processStep === num - 1} completed={processStep > num - 1} onClick={() => setProcessStep(num - 1)} totalSteps={8} lang={validLang} />
                ))}
              </div>
              <div style={{ background: '#fff', border: '1px solid #ccc', borderRadius: 4, padding: 24 }} aria-live="polite" data-testid="step-detail">
                {processStep === 3 && (<div><Gate type="UG" status="open" label={t(validLang, 'understandingGate')} lang={validLang} /><p style={{ marginTop: 16, lineHeight: 1.6, color: '#555' }}>{t(validLang, 'ugDetailText')}</p><div style={{ marginTop: 16, padding: 12, background: '#fafafa', borderLeft: '3px solid #a00000', borderRadius: 2 }}><p style={{ fontSize: 13, fontStyle: 'italic', color: '#555', margin: 0, lineHeight: 1.6 }}>{t(validLang, 'step4Example')}</p></div></div>)}
                {processStep === 5 && (<div><Gate type="AG" status="open" label={t(validLang, 'agreementGate')} lang={validLang} /><p style={{ marginTop: 16, lineHeight: 1.6, color: '#555' }}>{t(validLang, 'agDetailText')}</p><div style={{ marginTop: 16, padding: 12, background: '#fafafa', borderLeft: '3px solid #a00000', borderRadius: 2 }}><p style={{ fontSize: 13, fontStyle: 'italic', color: '#555', margin: 0, lineHeight: 1.6 }}>{t(validLang, 'step6Example')}</p></div></div>)}
                {processStep === 6 && (<div><div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}><User style={{ width: 20, height: 20, color: '#a00000' }} aria-hidden="true" /><span style={{ fontWeight: 500, fontStyle: 'italic' }}>{t(validLang, 'hagDetailTitle')}</span></div><p style={{ lineHeight: 1.6, color: '#555' }}>{t(validLang, 'hagDetailText')}</p><div style={{ marginTop: 16, padding: 12, background: '#fafafa', borderLeft: '3px solid #a00000', borderRadius: 2 }}><p style={{ fontSize: 13, fontStyle: 'italic', color: '#555', margin: 0, lineHeight: 1.6 }}>{t(validLang, 'step7Example')}</p></div></div>)}
                {![3, 5, 6].includes(processStep) && (<div><p style={{ lineHeight: 1.6, color: '#555' }}>{t(validLang, `step${processStep + 1}Desc`)}</p>{t(validLang, `step${processStep + 1}Example`) !== `step${processStep + 1}Example` && (<div style={{ marginTop: 16, padding: 12, background: '#fafafa', borderLeft: '3px solid #a00000', borderRadius: 2 }}><p style={{ fontSize: 13, fontStyle: 'italic', color: '#555', margin: 0, lineHeight: 1.6 }}>{t(validLang, `step${processStep + 1}Example`)}</p></div>)}</div>)}
              </div>
            </div>
          </section>
        )}

        {/* ========== SECTION: Verification ========== */}
        {view === 'paraphrase' && (
          <section id="panel-paraphrase" role="tabpanel" aria-labelledby="tab-paraphrase" tabIndex={0} data-section="verification">
            <h2 style={{ fontSize: 22, fontWeight: 400, fontStyle: 'italic', marginBottom: 24 }}>{t(validLang, 'verificationTitle')}</h2>
            <div style={{ background: '#fff', border: '1px solid #ccc', borderRadius: 4, padding: 24, marginBottom: 24 }}>
              <h3 style={{ fontStyle: 'italic', fontWeight: 400, marginBottom: 16 }}>{t(validLang, 'swissCheeseSection')}</h3>
              <p style={{ fontSize: 14, color: '#555', marginBottom: 16, lineHeight: 1.6 }}>
                <CitationLink reference="reason2000" lang={validLang}>{t(validLang, 'swissCheeseExplain')}</CitationLink> <CitationLink reference="shamsujjoha2024" lang={validLang}>Shamsujjoha et al. (2024)</CitationLink> {t(validLang, 'swissCheeseApplied')} <em>{t(validLang, 'swissCheeseEpistemic')}</em>{t(validLang, 'swissCheeseEpistemicExplain')}
              </p>
              <SwissCheeseVisualization lang={validLang} />
            </div>
            <div style={{ background: '#fff5f5', border: '1px solid rgba(160,0,0,0.25)', borderRadius: 4, padding: 24 }}>
              <h3 style={{ fontStyle: 'italic', fontWeight: 400, marginBottom: 16 }}>{t(validLang, 'coreInsight')}</h3>
              <p style={{ lineHeight: 1.7 }}>
                <CitationLink reference="irving2018" lang={validLang}>Irving et al. (2018)</CitationLink> {t(validLang, 'coreInsightText')} <strong>{t(validLang, 'coreInsightMechanism')}</strong>{t(validLang, 'coreInsightFinal')}
              </p>
            </div>
          </section>
        )}

        {/* ========== SECTION: Example ========== */}
        {view === 'example' && (
          <section id="panel-example" role="tabpanel" aria-labelledby="tab-example" tabIndex={0} data-section="example">
            <h2 style={{ fontSize: 22, fontWeight: 400, fontStyle: 'italic', marginBottom: 24 }}>{t(validLang, 'exampleTitle')}</h2>
            <p style={{ color: '#555', marginBottom: 24, lineHeight: 1.6 }}>{t(validLang, 'exampleDesc')}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {exampleSteps.map(({ step, speaker, color, borderColor }) => (
                <div key={step} style={{ background: '#fff', border: '1px solid #ccc', borderRadius: 4, overflow: 'hidden' }}>
                  <button
                    onClick={() => setExpandedExample(expandedExample === step ? null : step)}
                    style={{ width: '100%', padding: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'Palatino, Georgia, serif', textAlign: 'left' }}
                    aria-expanded={expandedExample === step}
                  >
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 500, color: '#111', marginBottom: 4 }}>{t(validLang, `exStep${step}Title`)}</div>
                      <div style={{ fontSize: 14, color: '#555' }}>{t(validLang, `exStep${step}Summary`)}</div>
                    </div>
                    {expandedExample === step ? <ChevronDown style={{ width: 20, height: 20, color: '#555', flexShrink: 0 }} /> : <ChevronRight style={{ width: 20, height: 20, color: '#555', flexShrink: 0 }} />}
                  </button>
                  {expandedExample === step && (
                    <div style={{ padding: '0 16px 16px', borderTop: '1px solid #ccc' }}>
                      <div style={{ marginTop: 12, padding: 16, background: color, borderLeft: `4px solid ${borderColor}`, borderRadius: 2 }}>
                        <div style={{ fontSize: 11, fontWeight: 600, color: borderColor, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                          {speaker === 'context' && t(validLang, 'exSpeakerContext')}
                          {speaker === 'claude' && t(validLang, 'exSpeakerClaude')}
                          {speaker === 'gpt' && t(validLang, 'exSpeakerGPT')}
                          {speaker === 'human' && t(validLang, 'exSpeakerHuman')}
                          {speaker === 'outcome' && t(validLang, 'exSpeakerOutcome')}
                        </div>
                        <div style={{ fontSize: 14, lineHeight: 1.7, color: '#333', whiteSpace: 'pre-line' }}>
                          {t(validLang, `exStep${step}Content`).split('**').map((part, i) =>
                            i % 2 === 1 ? <strong key={i}>{part}</strong> : part
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ========== SECTION: Economics ========== */}
        {view === 'economics' && (
          <section id="panel-economics" role="tabpanel" aria-labelledby="tab-economics" tabIndex={0} data-section="economics">
            <h2 style={{ fontSize: 22, fontWeight: 400, fontStyle: 'italic', marginBottom: 16 }}>{t(validLang, 'economicsTitle')}</h2>
            <p style={{ color: '#555', marginBottom: 24, lineHeight: 1.6 }}>{t(validLang, 'economicsDesc')}</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
              <div>
                <fieldset style={{ background: '#fff', border: '1px solid #ccc', borderRadius: 4, padding: 20, marginBottom: 24 }}>
                  <legend style={{ fontStyle: 'italic', fontWeight: 500, padding: '0 8px' }}>{t(validLang, 'costModelParams')}</legend>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <Slider id="deliberation-cost" label={`${t(validLang, 'paramDeliberation')} (D)`} value={deliberationCost} onChange={setDeliberationCost} min={20} max={200} step={10} unit={` ${t(validLang, 'units')}`} />
                    <Slider id="skill-cost" label={`${t(validLang, 'paramSkill')} (S)`} value={skillCost} onChange={setSkillCost} min={1} max={50} step={1} unit={` ${t(validLang, 'units')}`} />
                    <Slider id="failure-rate" label={`${t(validLang, 'paramFailure')} (P)`} value={failureRate} onChange={setFailureRate} min={0} max={0.5} step={0.05} unit="" />
                    <Slider id="problem-count" label={`${t(validLang, 'paramProblems')} (N)`} value={problemCount} onChange={setProblemCount} min={2} max={50} step={1} unit={` ${t(validLang, 'problems')}`} />
                  </div>
                </fieldset>
                <div style={{ background: '#fff', border: '1px solid #ccc', borderRadius: 4, padding: 20 }}>
                  <h3 style={{ fontStyle: 'italic', fontWeight: 400, marginBottom: 16 }}>{t(validLang, 'formulaTitle')}</h3>
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ fontSize: 14, color: '#555', marginBottom: 4 }}>{t(validLang, 'formulaWithout')}:</div>
                    <LaTeX display>{`C_{${costSubWithout}} = N \\times D = ${problemCount} \\times ${deliberationCost} = ${withoutForgeCost}`}</LaTeX>
                  </div>
                  <div style={{ marginBottom: 16, paddingTop: 16, borderTop: '1px solid #ccc' }}>
                    <div style={{ fontSize: 14, color: '#555', marginBottom: 4 }}>{t(validLang, 'formulaWith')}:</div>
                    <LaTeX display>{`C_{${costSub}} = D + (N-1) \\times [S + P_{${pFailSub}} \\times D]`}</LaTeX>
                    <LaTeX display>{`= ${deliberationCost} + ${problemCount - 1} \\times [${skillCost} + ${failureRate} \\times ${deliberationCost}] = ${withForgeCost.toFixed(0)}`}</LaTeX>
                  </div>
                  <div style={{ paddingTop: 16, borderTop: '1px solid #ccc' }}>
                    <div style={{ fontSize: 14, color: '#555', marginBottom: 4 }}>{t(validLang, 'formulaBreakeven')} N:</div>
                    <LaTeX display>{`N^* = \\frac{D}{D - S - P_{${pFailSub}} \\times D} = ${breakEven.toFixed(1)}`}</LaTeX>
                  </div>
                </div>
              </div>
              <div>
                <div style={{ background: '#fff', border: '1px solid #ccc', borderRadius: 4, padding: 20, marginBottom: 24 }}>
                  <CostCurve D={deliberationCost} S={skillCost} pFail={failureRate} maxN={problemCount} lang={validLang} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
                  <div style={{ padding: 12, background: '#f5f5f5', borderRadius: 4 }}><div style={{ fontSize: 12, color: '#555' }}>{t(validLang, 'totalWithout')}</div><div style={{ fontSize: 20, fontWeight: 500 }}>{withoutForgeCost}</div></div>
                  <div style={{ padding: 12, background: '#f5fff5', borderRadius: 4 }}><div style={{ fontSize: 12, color: '#555' }}>{t(validLang, 'totalWith')}</div><div style={{ fontSize: 20, fontWeight: 500, color: '#2d5a3d' }}>{withForgeCost.toFixed(0)}</div></div>
                </div>
                <div style={{ padding: 12, background: '#fff5f5', borderRadius: 4 }}><div style={{ fontSize: 12, color: '#555' }}>{t(validLang, 'savings')}</div><div style={{ fontSize: 20, fontWeight: 500, color: '#a00000' }}>{savings.toFixed(0)} {t(validLang, 'units')} ({savingsPercent}%)</div></div>
              </div>
            </div>
          </section>
        )}

        {/* ========== SECTION: Accumulation (EXPANDED) ========== */}
        {view === 'accumulation' && (
          <section id="panel-accumulation" role="tabpanel" aria-labelledby="tab-accumulation" tabIndex={0} data-section="accumulation">
            <h2 style={{ fontSize: 22, fontWeight: 400, fontStyle: 'italic', marginBottom: 16 }}>{t(validLang, 'accumulationTitle')}</h2>
            <p style={{ color: '#555', marginBottom: 24, lineHeight: 1.6 }}>{t(validLang, 'accumulationDesc')}</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
              <ExpandablePanel id="skills" icon={FileText} title={t(validLang, 'skillLibrary')} expanded={expandedPhase === 'skills'} onToggle={() => setExpandedPhase(expandedPhase === 'skills' ? null : 'skills')}>
                <p style={{ fontSize: 14, color: '#555', lineHeight: 1.6 }}>{t(validLang, 'skillLibraryDesc')}</p>
              </ExpandablePanel>
              <ExpandablePanel id="human" icon={User} title={t(validLang, 'humanExpertise')} expanded={expandedPhase === 'human'} onToggle={() => setExpandedPhase(expandedPhase === 'human' ? null : 'human')}>
                <p style={{ fontSize: 14, color: '#555', lineHeight: 1.6 }}>{t(validLang, 'humanExpertiseDesc')}</p>
              </ExpandablePanel>
              <ExpandablePanel id="provenance" icon={Clock} title={t(validLang, 'provenanceRecord')} expanded={expandedPhase === 'provenance'} onToggle={() => setExpandedPhase(expandedPhase === 'provenance' ? null : 'provenance')}>
                <p style={{ fontSize: 14, color: '#555', lineHeight: 1.6 }}>{t(validLang, 'provenanceDesc')}</p>
              </ExpandablePanel>
            </div>

            {/* Thin Skill Architecture Section */}
            <div style={{ background: '#f0f8ff', border: '1px solid #cce5ff', borderRadius: 4, padding: 24, marginBottom: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <Database style={{ width: 24, height: 24, color: '#0066cc' }} aria-hidden="true" />
                <h3 style={{ fontSize: 18, fontStyle: 'italic', fontWeight: 400, margin: 0 }}>{t(validLang, 'thinSkillTitle')}</h3>
              </div>
              <p style={{ fontSize: 14, color: '#555', marginBottom: 8 }}>{t(validLang, 'thinSkillSubtitle')}</p>
              
              <p style={{ lineHeight: 1.7, marginBottom: 16 }}>
                {t(validLang, 'thinSkillIntro')} <strong><ConditionalLink href={links.thinSkillArchitecture}>{t(validLang, 'thinSkillName')}</ConditionalLink></strong>{t(validLang, 'thinSkillIntroEnd')}
              </p>

              <h4 style={{ fontSize: 14, fontStyle: 'italic', fontWeight: 500, marginBottom: 8 }}>{t(validLang, 'thinSkillWhatTitle')}</h4>
              <p style={{ fontSize: 14, color: '#555', lineHeight: 1.6, marginBottom: 16 }}>{t(validLang, 'thinSkillWhat')}</p>

              <h4 style={{ fontSize: 14, fontStyle: 'italic', fontWeight: 500, marginBottom: 8 }}>{t(validLang, 'thinSkillVsNativeTitle')}</h4>
              <p style={{ fontSize: 14, color: '#555', lineHeight: 1.6, marginBottom: 12 }}>{t(validLang, 'thinSkillVsNativeIntro')}</p>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                <div style={{ background: '#fff', border: '1px solid #ccc', borderRadius: 4, padding: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid #e5e5e5' }}>
                    <Zap style={{ width: 16, height: 16, color: '#555' }} aria-hidden="true" />
                    <span style={{ fontWeight: 500, fontSize: 14 }}>{t(validLang, 'comparisonNative')}</span>
                  </div>
                  <div style={{ fontSize: 13, color: '#555' }}>
                    <div style={{ marginBottom: 6 }}><strong>{t(validLang, 'comparisonStorage')}:</strong> {t(validLang, 'comparisonStorageNative')}</div>
                    <div style={{ marginBottom: 6 }}><strong>{t(validLang, 'comparisonPortability')}:</strong> {t(validLang, 'comparisonPortabilityNative')}</div>
                    <div style={{ marginBottom: 6 }}><strong>{t(validLang, 'comparisonLearning')}:</strong> {t(validLang, 'comparisonLearningNative')}</div>
                    <div><strong>{t(validLang, 'comparisonGating')}:</strong> {t(validLang, 'comparisonGatingNative')}</div>
                  </div>
                </div>
                <div style={{ background: '#f5fff5', border: '1px solid #2d5a3d', borderRadius: 4, padding: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid #c5e5c5' }}>
                    <Database style={{ width: 16, height: 16, color: '#2d5a3d' }} aria-hidden="true" />
                    <span style={{ fontWeight: 500, fontSize: 14, color: '#2d5a3d' }}>{t(validLang, 'comparisonThin')}</span>
                  </div>
                  <div style={{ fontSize: 13, color: '#1e3d29' }}>
                    <div style={{ marginBottom: 6 }}><strong>{t(validLang, 'comparisonStorage')}:</strong> {t(validLang, 'comparisonStorageThin')}</div>
                    <div style={{ marginBottom: 6 }}><strong>{t(validLang, 'comparisonPortability')}:</strong> {t(validLang, 'comparisonPortabilityThin')}</div>
                    <div style={{ marginBottom: 6 }}><strong>{t(validLang, 'comparisonLearning')}:</strong> {t(validLang, 'comparisonLearningThin')}</div>
                    <div><strong>{t(validLang, 'comparisonGating')}:</strong> {t(validLang, 'comparisonGatingThin')}</div>
                  </div>
                </div>
              </div>

              <p style={{ fontSize: 14, color: '#555', lineHeight: 1.6 }}>{t(validLang, 'thinSkillBenefits')}</p>
            </div>

            {/* Skill Inventory */}
            <div style={{ background: '#fff', border: '1px solid #ccc', borderRadius: 4, padding: 24 }}>
              <h3 style={{ fontSize: 16, fontStyle: 'italic', fontWeight: 400, marginBottom: 8 }}>{t(validLang, 'inventoryTitle')}</h3>
              <p style={{ fontSize: 14, color: '#555', marginBottom: 16 }}>{t(validLang, 'inventoryIntro')}</p>
              
              <SkillInventoryTable lang={validLang} links={links} />
              
              <p style={{ fontSize: 13, color: '#555', marginTop: 16, fontStyle: 'italic' }}>{t(validLang, 'inventoryNote')}</p>
              
              {links.thinSkillArchitecture && (
                <p style={{ marginTop: 16 }}>
                  <a href={links.thinSkillArchitecture} style={{ color: '#a00000', textDecoration: 'underline', fontSize: 14 }}>
                    {t(validLang, 'learnMoreThinSkill')} →
                  </a>
                </p>
              )}
            </div>
          </section>
        )}

        {/* ========== SECTION: References ========== */}
        {view === 'references' && (
          <section id="panel-references" role="tabpanel" aria-labelledby="tab-references" tabIndex={0} data-section="references">
            <h2 style={{ fontSize: 22, fontWeight: 400, fontStyle: 'italic', marginBottom: 16 }}>{t(validLang, 'referencesTitle')}</h2>
            <p style={{ color: '#555', marginBottom: 24, lineHeight: 1.6 }}>{t(validLang, 'referencesDesc')}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {Object.values(REFERENCES).map((ref) => (
                <article key={ref.id} style={{ background: '#fff', border: '1px solid #ccc', borderRadius: 4, padding: 16 }}>
                  <p style={{ fontSize: 14, lineHeight: 1.6 }}>
                    {ref.authors} ({ref.year}). <em>{ref.title}</em>. {ref.source}. <a href={ref.url} style={{ color: '#a00000', textDecoration: 'underline' }} target="_blank" rel="noopener noreferrer" aria-label={`${ref.title}, ${t(validLang, 'linkOpensNewTab')}`}>{ref.url}</a>
                  </p>
                </article>
              ))}
            </div>
            <div style={{ marginTop: 32, background: '#f0f8ff', border: '1px solid #cce5ff', borderRadius: 4, padding: 24 }}>
              <h3 style={{ fontStyle: 'italic', fontWeight: 400, marginBottom: 16 }}>{t(validLang, 'whatsNovel')}</h3>
              <ol style={{ paddingLeft: 20, lineHeight: 1.8, fontSize: 14 }}>
                <li><strong>{t(validLang, 'novel1')}</strong> {t(validLang, 'novel1Note')}</li>
                <li><strong>{t(validLang, 'novel2')}</strong> {t(validLang, 'novel2Note')}</li>
                <li><strong>{t(validLang, 'novel3')}</strong> {t(validLang, 'novel3Note')}</li>
                <li><strong>{t(validLang, 'novel4')}</strong> {t(validLang, 'novel4Note')}</li>
                <li><strong>{t(validLang, 'novel5')}</strong> {t(validLang, 'novel5Note')}</li>
                <li><strong>{t(validLang, 'novel6')}</strong> {t(validLang, 'novel6Note')}</li>
              </ol>
            </div>
          </section>
        )}
      </main>

      <footer style={{ borderTop: '1px solid #ccc', padding: '16px 24px', textAlign: 'center' }}>
        <p style={{ fontSize: 14, color: '#555' }}>{t(validLang, 'footerTitle')}</p>
        <p style={{ fontSize: 12, color: '#555', marginTop: 4 }}>{t(validLang, 'footerVersion')}</p>
        <p style={{ fontSize: 12, color: '#555', marginTop: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
          <span>{t(validLang, 'footerAuthor')}</span>
          <span style={{ color: '#ccc' }}>·</span>
          <span>{t(validLang, 'footerPubDate')}</span>
          <span style={{ color: '#ccc' }}>·</span>
          <a href="https://www.linkedin.com/in/ed-o-connell-4b38483/" target="_blank" rel="noopener noreferrer" style={{ color: '#555', display: 'inline-flex', alignItems: 'center', gap: 4 }} aria-label="Ed O'Connell on LinkedIn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            <span>LinkedIn</span>
          </a>
          <span style={{ color: '#ccc' }}>·</span>
          <a href="https://x.com/edoconnell" target="_blank" rel="noopener noreferrer" style={{ color: '#555', display: 'inline-flex', alignItems: 'center', gap: 4 }} aria-label="@edoconnell on X">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            <span>@edoconnell</span>
          </a>
        </p>
        <p style={{ fontSize: 10, color: '#666', marginTop: 8 }} data-testid="canary">{t(validLang, 'canary')}</p>
      </footer>
    </div>
  );
}
