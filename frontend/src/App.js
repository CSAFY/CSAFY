import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import ScrollToTop from './components/common/ScrollToTop';

// PAGES
import Home from './pages/Home';
import MyPage from './pages/MyPage';
import Page2 from './pages/Page2';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Test from './pages/Test';
import Chatbot from './components/Chatbot';

import StudyFramePage from './pages/StudyPage/StudyFramePage';
import StudyDetailPage from './pages/StudyPage/StudyDetailPage';
import Classification from './pages/Classification';
import InterviewList from './pages/InterviewList';
import Community from './pages/Community';
import Interview from './pages/Interview';
import InterviewTest from './pages/InterviewTest';
import TestRoom from './pages/TestRoom';
import EditProfile from './pages/EditProfile';
import Timer from './components/Timer';
import InterviewDetail from './pages/InterviewDetail';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/community" element={<Community />} />
          <Route path="/" element={<Home />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/editProfile" element={<EditProfile />} />
          <Route path="/test" element={<Test />} />
          <Route path="/test/:roomName" element={<TestRoom />} />
          <Route path="/StudyFramePage" element={<StudyFramePage />} />
          <Route path="/StudyDetailPage" element={<StudyDetailPage />} />
          <Route path="/page2" element={<Page2 />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/classification" element={<Classification />} />
          <Route path="/interviewList" element={<InterviewList />} />
          <Route path="/interview" element={<Interview />} />
          <Route path="/InterviewTest" element={<InterviewTest />} />
          <Route
            path="/InterviewDetail/:interviewSeq"
            element={<InterviewDetail />}
          />

          {/*  */}
          <Route path="/timer" element={<Timer />} />
        </Routes>
        <Chatbot />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
