import { Outlet } from 'react-router-dom';
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
        <p style={{
          color: '#475569',
          margin: 0,
          fontSize: '14px',
        }}>
          AI-generated artifacts with explicit epistemic boundaries.
          <br />
          <span style={{ fontSize: '12px', color: '#64748b' }}>
            Staging environment — GitHub Pages
          </span>
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
      }}>
        <p>
          Each artifact is wrapped with boundary markers indicating provenance,
          epistemic status, and authorship. WCAG 2.1 AA compliance enforced via CI.
        </p>
      </footer>
    </div>
  );
}
