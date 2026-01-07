import { Routes, Route } from 'react-router-dom';
import { Layout } from './components';
import LandingPage from './pages/LandingPage';
import SkillForgePage from './pages/SkillForgePage';
import ContextSagePage from './pages/ContextSagePage';
import DemoWithBoundaries from './DemoWithBoundaries';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route path="reference" element={<DemoWithBoundaries />} />
        <Route path="skill-forge" element={<SkillForgePage />} />
        <Route path="context-sage" element={<ContextSagePage />} />
      </Route>
    </Routes>
  );
}

export default App;
