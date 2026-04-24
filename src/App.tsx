import { Route, Routes } from 'react-router-dom';
import { Layout } from './Layout';
import { HomePage } from './components/pages/HomePage/HomePage';
import { LoanPage } from './components/pages/LoanPage/LoanPage';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/loan" element={<LoanPage />} />
      </Route>
    </Routes>
  );
}

export default App;
