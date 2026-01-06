/**
 * DemoContainer - Visual containment that distinguishes demo from shell
 */
export default function DemoContainer({ children, title }) {
  return (
    <div style={{
      border: '2px dashed #475569',
      borderRadius: '8px',
      padding: '24px',
      backgroundColor: '#ffffff',
      position: 'relative',
      marginTop: '24px',
    }}>
      {/* Corner label indicating this is contained demo content */}
      <div style={{
        position: 'absolute',
        top: '-12px',
        left: '16px',
        backgroundColor: '#475569',
        color: '#ffffff',
        padding: '4px 12px',
        borderRadius: '4px',
        fontSize: '11px',
        fontWeight: '600',
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
      }}>
        Demo Content
      </div>

      {title && (
        <h3 style={{
          margin: '8px 0 16px 0',
          fontSize: '18px',
          fontWeight: '600',
          color: '#1e293b',
        }}>
          {title}
        </h3>
      )}

      {children}
    </div>
  );
}
