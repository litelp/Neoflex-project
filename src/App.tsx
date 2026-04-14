import { Route, Routes } from 'react-router-dom';
import { Layout } from './Layout';
import { HomePage } from './components/pages/HomePage/HomePage';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
      </Route>
    </Routes>
  );
}

export default App;
