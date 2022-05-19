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
import Chat from './pages/Chat';
import Chatbot from './components/Chatbot';

import StudyFramePage from './pages/StudyPage/StudyFramePage';
import StudyDetailPage from './pages/StudyPage/StudyDetailPage';
import IntensivePage from './pages/StudyPage/IntensivePage';

import Classification from './pages/Classification';
import InterviewList from './pages/InterviewList';
import Community from './pages/Community';
import Interview from './pages/Interview';
import InterviewTest from './pages/InterviewTest';
import ChatRoom from './pages/ChatRoom';
import EditProfile from './pages/EditProfile';
import Timer from './components/Timer';
import InterviewDetail from './pages/InterviewDetail';
import CSTest from './pages/CSTest';
import ReviewNote from './pages/ReviewNote';
import CSTestDetail from './pages/CSTestDetail';
import CSTestResult from './pages/CSTestResult';
import Payment from './pages/Payment';
import KakaopaySuccess from './pages/handler/KakaopaySuccess';
import KakaopayCancel from './pages/handler/KakaopayCancel';
import KakaopayFail from './pages/handler/KakaopayFail';
import NotFound from './pages/handler/NotFound';
import SpentTime from './pages/SpentTime';
import AuthHandler from './pages/handler/AuthHandler';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import UserChat from './pages/UserChat';
import ReviewNoteDetail from './pages/ReviewNoteDetail';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/community" element={<Community />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/editProfile" element={<EditProfile />} />
          <Route path="/userChat" element={<UserChat />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/chat/:roomName" element={<ChatRoom />} />
          <Route path="/StudyFramePage" element={<StudyFramePage />} />
          <Route path="/StudyDetailPage" element={<StudyDetailPage />} />
          <Route exact path="/IntensivePage" element={<IntensivePage />} />
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
          <Route path="/CSTest" element={<CSTest />} />
          <Route path="/CSTestDetail/:testTitle" element={<CSTestDetail />} />
          <Route path="/CSTestResult/:testTitle" element={<CSTestResult />} />
          <Route path="/reviewNote" element={<ReviewNote />} />
          <Route path="/reviewNote/:round" element={<ReviewNoteDetail />} />
          {/* <Route path="/payment" element={<Payment />} /> */}
          <Route path="/oauth/redirect" element={<AuthHandler />} />
          <Route path="/kakaoPay/success" element={<KakaopaySuccess />} />
          <Route path="/kakaoPay/cancel" element={<KakaopayCancel />} />
          <Route path="/kakaoPay/fail" element={<KakaopayFail />} />
          <Route path="/*" element={<NotFound />} />
          {/*  */}
          <Route path="/timer" element={<Timer />} />
          <Route path="/spentTime" element={<SpentTime />} />
        </Routes>
        <Chatbot />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
