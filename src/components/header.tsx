import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';

function Header() {
  return (
    <div className="flex items-center justify-between px-9 py-5 bg-[#800000] shadow-sm shadow-[#800000] border-b border-[#e57373]">
      <div>
        <Link
          to="/home"
          className="flex gap-5 text-white border border-[#800000] py-1.5 px-3.5 hover:border-white hover:rounded-xl hover:shadow-md hover:border"
        >
          <HomeIcon sx={{ color: 'white' }} />
          <p className='font-bold'>Home</p>
        </Link>
      </div>
    </div>
  );
}

export default Header;
