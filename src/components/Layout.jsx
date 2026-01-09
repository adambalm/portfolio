import { Outlet } from 'react-router-dom';
import { Linkedin, Twitter } from 'lucide-react';
import Navigation from './Navigation';

export default function Layout() {
  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '32px 24px',
      fontFamily: 'system-ui, -apple-system, sans-serif',
    }}>
      {/* Shell header */}
      <header style={{
        borderBottom: '1px solid #e2e8f0',
        paddingBottom: '24px',
        marginBottom: '24px',
      }}>
        <h1 style={{
          fontSize: '24px',
          fontWeight: '700',
          color: '#0f172a',
          margin: '0 0 8px 0',
        }}>
          Portfolio
        </h1>
        {/* === HUMAN INTRO PLACEHOLDER === */}
        {/* Replace this paragraph with your human-authored intro (1-2 sentences) */}
        <p style={{
          color: '#475569',
          margin: '0 0 12px 0',
          fontSize: '14px',
          lineHeight: '1.5',
        }}>
          [YOUR INTRO HERE: A brief human-authored statement about who you are and what this portfolio demonstrates.]
        </p>
        {/* === END PLACEHOLDER === */}
        <p style={{
          color: '#64748b',
          margin: 0,
          fontSize: '12px',
        }}>
          AI-generated artifacts with explicit epistemic boundaries — Staging environment
        </p>
        <Navigation />
      </header>

      {/* Route content */}
      <main>
        <Outlet />
      </main>

      {/* Shell footer */}
      <footer style={{
        marginTop: '48px',
        paddingTop: '24px',
        borderTop: '1px solid #e2e8f0',
        fontSize: '12px',
        color: '#475569',
        textAlign: 'center',
      }}>
        <p style={{ margin: '0 0 12px 0' }}>
          Each artifact is wrapped with boundary markers indicating provenance,
          epistemic status, and authorship. WCAG 2.1 AA compliance enforced via CI.
        </p>
        <p style={{ margin: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
          <span>Ed O'Connell</span>
          <a
            href="https://www.linkedin.com/in/ed-o-connell-4b38483/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Ed O'Connell on LinkedIn"
            style={{ color: '#475569', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
          >
            <Linkedin style={{ width: 16, height: 16 }} aria-hidden="true" />
          </a>
          <a
            href="https://x.com/edoconnell"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="@edoconnell on X"
            style={{ color: '#475569', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
          >
            <Twitter style={{ width: 16, height: 16 }} aria-hidden="true" />
            <span>@edoconnell</span>
          </a>
        </p>
      </footer>
    </div>
  );
}
