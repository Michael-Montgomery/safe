import { useNavigate } from 'react-router-dom';
import './header.css';

export default function Header() {

const navigate = useNavigate();

const goHome = () => {
    navigate('/');
};

  return (
    <header className="header">
      <p onClick={goHome}>Safe Space <span>with Sheena Rayvon</span></p>
    </header>
  );
}