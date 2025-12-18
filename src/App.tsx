import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import SalesDetail from './pages/SalesDetail';
import MatrixPage from './pages/MatrixPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-bg-light">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/detail/:customerId" element={<SalesDetail />} />
            <Route path="/matrix" element={<MatrixPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
