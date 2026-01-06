import { Link } from 'react-router-dom';

const artifacts = [
  {
    id: 'skill-forge',
    title: 'Skill Forge Visualizer',
    description: 'Interactive educational component explaining the Skill Forge pattern for heterogeneous AI deliberation.',
    linesOfCode: 1176,
    languages: ['EN', 'ES', 'ZH'],
    status: 'ILLUSTRATIVE',
    path: '/skill-forge',
  },
];

const deferredArtifacts = [
  {
    id: 'context-sage',
    title: 'Context Sage Website',
    description: 'Tufte-inspired content site explaining the Knowledge System.',
    status: 'Deferred to v1.2.0',
  },
  {
    id: 'artifact-demo',
    title: 'Artifact Demo',
    description: 'Comprehensive Context Sage demo with learning loop visualization.',
    status: 'Deferred to v1.3.0',
  },
];

function ArtifactCard({ artifact }) {
  return (
    <Link
      to={artifact.path}
      style={{
        display: 'block',
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        padding: '20px',
        backgroundColor: '#ffffff',
        textDecoration: 'none',
        color: 'inherit',
        transition: 'border-color 0.2s',
      }}
      onMouseOver={(e) => e.currentTarget.style.borderColor = '#1d4ed8'}
      onMouseOut={(e) => e.currentTarget.style.borderColor = '#e2e8f0'}
    >
      <h3 style={{
        fontSize: '16px',
        fontWeight: '600',
        color: '#1e293b',
        margin: '0 0 8px 0',
      }}>
        {artifact.title}
      </h3>
      <p style={{
        fontSize: '14px',
        color: '#475569',
        margin: '0 0 12px 0',
        lineHeight: '1.5',
      }}>
        {artifact.description}
      </p>
      <div style={{
        display: 'flex',
        gap: '12px',
        alignItems: 'center',
        fontSize: '12px',
      }}>
        <span style={{
          backgroundColor: '#dbeafe',
          color: '#1e40af',
          padding: '2px 8px',
          borderRadius: '4px',
          fontWeight: '500',
        }}>
          [{artifact.status}]
        </span>
        <span style={{ color: '#64748b' }}>
          {artifact.linesOfCode} LOC
        </span>
        <span style={{ color: '#64748b' }}>
          {artifact.languages.join(', ')}
        </span>
      </div>
    </Link>
  );
}

function DeferredCard({ artifact }) {
  return (
    <div style={{
      border: '1px dashed #cbd5e1',
      borderRadius: '8px',
      padding: '16px',
      backgroundColor: '#ffffff',
    }}>
      <h3 style={{
        fontSize: '14px',
        fontWeight: '500',
        color: '#475569',
        margin: '0 0 4px 0',
      }}>
        {artifact.title}
      </h3>
      <p style={{
        fontSize: '12px',
        color: '#64748b',
        margin: '0 0 8px 0',
      }}>
        {artifact.description}
      </p>
      <span style={{
        fontSize: '11px',
        color: '#64748b',
        fontStyle: 'italic',
      }}>
        {artifact.status}
      </span>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div>
      <section aria-labelledby="artifacts-section">
        <h2 id="artifacts-section" style={{
          fontSize: '18px',
          fontWeight: '600',
          color: '#1e293b',
          margin: '0 0 16px 0',
        }}>
          Artifacts
        </h2>

        <div style={{
          display: 'grid',
          gap: '16px',
          marginBottom: '32px',
        }}>
          {artifacts.map(artifact => (
            <ArtifactCard key={artifact.id} artifact={artifact} />
          ))}
        </div>
      </section>

      <section aria-labelledby="deferred-section">
        <h2 id="deferred-section" style={{
          fontSize: '14px',
          fontWeight: '500',
          color: '#64748b',
          margin: '0 0 12px 0',
        }}>
          Deferred Artifacts
        </h2>
        <div style={{
          display: 'grid',
          gap: '12px',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        }}>
          {deferredArtifacts.map(artifact => (
            <DeferredCard key={artifact.id} artifact={artifact} />
          ))}
        </div>
      </section>
    </div>
  );
}
