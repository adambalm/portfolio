import { NavLink } from 'react-router-dom';

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/reference', label: 'Reference' },
  { path: '/skill-forge', label: 'Skill Forge' },
];

export default function Navigation() {
  return (
    <nav aria-label="Main navigation" style={{
      display: 'flex',
      gap: '24px',
      marginTop: '16px',
    }}>
      {navItems.map(item => (
        <NavLink
          key={item.path}
          to={item.path}
          style={({ isActive }) => ({
            color: isActive ? '#1d4ed8' : '#475569',
            textDecoration: 'none',
            fontWeight: isActive ? '600' : '400',
            fontSize: '14px',
            padding: '4px 0',
            borderBottom: isActive ? '2px solid #1d4ed8' : '2px solid transparent',
          })}
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}
