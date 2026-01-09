/**
 * StandardFooter - Compliant artifact footer per footer-standard.md
 *
 * Required fields: canary, version (WCAG 2.1 AA is hardcoded)
 * Optional fields: copyright, citationStyle
 *
 * Responsive: Stacks vertically on mobile (<480px)
 */

const styles = {
  container: {
    borderTop: '1px solid #e0ddd5',
    padding: '16px 24px',
    textAlign: 'center',
    marginTop: '4em',
  },
  requiredLine: {
    fontSize: '13px',
    color: '#454545',
    margin: 0,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '4px 0',
  },
  separator: {
    margin: '0 8px',
    color: '#ccc',
  },
  optionalLine: {
    fontSize: '12px',
    color: '#6b6b6b',
    marginTop: '8px',
  },
};

export default function StandardFooter({
  canary,
  version,
  copyright = null,
  citationStyle = null,
}) {
  // Build optional line content
  const optionalParts = [];
  if (copyright) optionalParts.push(copyright);
  if (citationStyle) optionalParts.push(citationStyle);

  return (
    <footer style={styles.container}>
      <p style={styles.requiredLine}>
        <span>Canary: {canary}</span>
        <span style={styles.separator} aria-hidden="true">|</span>
        <span>Version {version}</span>
        <span style={styles.separator} aria-hidden="true">|</span>
        <span>WCAG 2.1 AA</span>
      </p>
      {optionalParts.length > 0 && (
        <p style={styles.optionalLine}>
          {optionalParts.join(' | ')}
        </p>
      )}
    </footer>
  );
}
