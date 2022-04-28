import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import ScrollToTop from './components/common/ScrollToTop';

// PAGES
import Home from './pages/Home';
import MyPage from './pages/MyPage';
import Page1 from './pages/Page1';
import Page2 from './pages/Page2';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Test from './pages/Test';
import Chatbot from './components/Chatbot';

import StudyFramePage from './pages/StudyPage/StudyFramePage';
import StudyDetailPage from './pages/StudyPage/StudyDetailPage';
import Classification from './pages/Classification';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/test" element={<Test />} />
          <Route path="/StudyFramePage" element={<StudyFramePage />} />
          <Route path="/StudyDetailPage" element={<StudyDetailPage />} />
          <Route path="/page2" element={<Page2 />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/classification" element={<Classification />} />
        </Routes>
        <Chatbot />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
