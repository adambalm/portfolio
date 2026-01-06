/**
 * EpistemicBadge - Visual indicator of epistemic status
 */

const EPISTEMIC_STATUS = {
  VERIFIED: {
    label: 'VERIFIED',
    description: 'Claims checked against sources',
    color: '#166534',
    bgColor: '#dcfce7',
  },
  ILLUSTRATIVE: {
    label: 'ILLUSTRATIVE',
    description: 'Shows capability, not making truth claims',
    color: '#1e40af',
    bgColor: '#dbeafe',
  },
  EXPLORATORY: {
    label: 'EXPLORATORY',
    description: 'Work in progress, may contain errors',
    color: '#92400e',
    bgColor: '#fef3c7',
  },
};

export default function EpistemicBadge({ status }) {
  const config = EPISTEMIC_STATUS[status];
  if (!config) return null;

  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      padding: '6px 12px',
      backgroundColor: config.bgColor,
      border: `1px solid ${config.color}`,
      borderRadius: '4px',
      marginBottom: '16px',
    }}>
      <span style={{
        fontWeight: '700',
        fontSize: '12px',
        letterSpacing: '0.05em',
        color: config.color,
      }}>
        [{config.label}]
      </span>
      <span style={{
        fontSize: '12px',
        color: '#475569',
      }}>
        {config.description}
      </span>
    </div>
  );
}

export { EPISTEMIC_STATUS };
