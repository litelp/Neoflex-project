import { Route, Routes } from 'react-router-dom';
import { Layout } from './Layout';
import { HomePage } from './components/pages/HomePage/HomePage';
import { LoanPage } from './components/pages/LoanPage/LoanPage';
import { NotFoundPage } from './components/pages/NotFoundPage/NotFoundPage';
import { ApplicationIdPage } from './components/pages/ApplicationIdPage/ApplicationIdPage';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/loan" element={<LoanPage />} />
        <Route path="/loan/:applicationId" element={<ApplicationIdPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
