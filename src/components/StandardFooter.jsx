/**
 * StandardFooter - Compliant artifact footer per footer-standard.md (v2)
 *
 * Required fields: canary, version (WCAG 2.1 AA is hardcoded)
 * Optional fields: copyright, citationStyle, contact
 *
 * Responsive: Stacks vertically on mobile (<480px)
 */

import { Linkedin, Twitter } from 'lucide-react';

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
  contactLine: {
    fontSize: '12px',
    color: '#6b6b6b',
    marginTop: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
  },
  contactLink: {
    color: '#6b6b6b',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    textDecoration: 'none',
  },
};

export default function StandardFooter({
  canary,
  version,
  copyright = null,
  citationStyle = null,
  contact = null, // { name, linkedin, x }
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
      {contact && (
        <p style={styles.contactLine}>
          <span>{contact.name}</span>
          {contact.linkedin && (
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${contact.name} on LinkedIn`}
              style={styles.contactLink}
            >
              <Linkedin style={{ width: 14, height: 14 }} aria-hidden="true" />
            </a>
          )}
          {contact.x && (
            <a
              href={`https://x.com/${contact.x.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${contact.x} on X`}
              style={styles.contactLink}
            >
              <Twitter style={{ width: 14, height: 14 }} aria-hidden="true" />
              <span>{contact.x}</span>
            </a>
          )}
        </p>
      )}
    </footer>
  );
}
