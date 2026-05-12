import { Route, Routes } from 'react-router-dom';
import { Layout } from './Layout';
import { HomePage } from './components/pages/HomePage/HomePage';
import { LoanPage } from './components/pages/LoanPage/LoanPage';
import { NotFoundPage } from './components/pages/NotFoundPage/NotFoundPage';
import { ApplicationIdPage } from './components/pages/ApplicationIdPage/ApplicationIdPage';
import { DocumentPage } from './components/pages/DocumentPage/DocumentPage';
import { SignPage } from './components/pages/SignPage/SignPage';
import { CodePage } from './components/pages/CodePage/CodePage';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/loan" element={<LoanPage />} />
        <Route path="/loan/:applicationId" element={<ApplicationIdPage />} />
        <Route
          path="/loan/:applicationId/document"
          element={<DocumentPage />}
        />
        <Route
          path="/loan/:applicationId/document/sign"
          element={<SignPage />}
        />
        <Route path="/loan/:applicationId/code" element={<CodePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
