import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QuestionProvider } from './contexts/QuestionContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Category from './pages/Category';
import Questions from './pages/Questions';
import Create from './pages/Create';

function App() {
  return (
    <QuestionProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category" element={<Category />} />
            <Route path="/questions/:category" element={<Questions />} />
            <Route path="/create" element={<Create />} />
          </Routes>
        </Layout>
      </Router>
    </QuestionProvider>
  );
}

export default App;