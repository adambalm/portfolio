/**
 * AuthorshipMarker - Indicates who/what created the content
 */

const AUTHORSHIP = {
  HUMAN: 'Human-authored',
  AI: 'AI-generated',
  COLLABORATIVE: 'Human-AI collaborative',
};

export default function AuthorshipMarker({ type, details }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '12px',
      color: '#475569',
      marginBottom: '16px',
    }}>
      <span style={{
        backgroundColor: '#e2e8f0',
        padding: '2px 8px',
        borderRadius: '4px',
        fontWeight: '500',
      }}>
        {AUTHORSHIP[type] || type}
      </span>
      {details && <span>— {details}</span>}
    </div>
  );
}

export { AUTHORSHIP };
