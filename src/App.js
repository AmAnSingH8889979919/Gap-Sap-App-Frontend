 import './App.css';
 import { LoginForm } from './component/loginForm';
 import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChatRoom } from './component/chatRoom';

function App() {
  return (
<div className="container-fluid bg-dark text-light d-flex align-items-center justify-content-center" style={{height: "100vh"}}>
      <Router>
        <Routes>
          <Route index element={ <LoginForm/>} />
          <Route path="/chat/:id" element={ <ChatRoom/>} />
          <Route path="*" element={<h1>4O4 Not Found !</h1>} />

        </Routes>
      </Router>
       {/* <h1>Speed Hnuman</h1>   */}
    </div>
  );
}

export default App;
