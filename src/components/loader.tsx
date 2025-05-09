import { CircularProgress } from '@mui/material';

function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#f5f5f5] z-[9999]">
      <CircularProgress size={40} color="error" />
    </div>
  );
}

export default Loader;
