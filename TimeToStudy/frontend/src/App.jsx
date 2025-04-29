import { Routes, Route, useNavigate } from 'react-router-dom';
import RegisterForm from './components/Register';
import './App.css';

// HomePage component
function HomePage() {
  const navigate = useNavigate();

  const handleGoToRegister = () => {
    navigate('/register');
  };

  return (
    <div>
      <h1>Welcome to Time To Study!</h1>
      <button onClick={handleGoToRegister}>Register</button>
    </div>
  );
}

// App component
function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<RegisterForm />} />
    </Routes>
  );
}

export default App;


