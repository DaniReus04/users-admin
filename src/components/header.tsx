import { Link } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Home from '../assets/img/home.webp';

function Header() {
  return (
    <div className="flex items-center justify-between px-9 py-2 bg-[#800000] shadow-xs shadow-[#800000]">
      <div>
        <Link to="/">
          <img src={Home} alt="Home Logo" height={82} width={82} />
        </Link>
      </div>
      <div className="flex gap-5">
        <Link
          to="/"
          className="text-white border border-[#800000] py-1.5 px-3.5 hover:border-white hover:rounded-xl hover:shadow-md hover:border"
        >
          Home
        </Link>
        <Link
          to="/user/:id"
          className="text-white border border-[#800000] py-1.5 px-3.5 hover:border-white hover:rounded-xl hover:shadow-md hover:border"
        >
            <AccountCircleIcon />
        </Link>
      </div>
    </div>
  );
}

export default Header;
