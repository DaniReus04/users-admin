import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';
import { useRef, useState } from 'react';

interface ProfileImageModalProps {
  open: boolean;
  onClose: () => void;
  onUpload(file: File): void;
}

const ProfileImageModal = ({ open, onClose, onUpload }: ProfileImageModalProps) => {
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleConfirm = () => {
    if (file) onUpload(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] || null;
    setFile(selected);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{
          backgroundColor: '#800000',
          color: 'white',
          fontWeight: 'bold',
          textAlign: 'center',
        }}
      >
        Update Profile Image
      </DialogTitle>
      <DialogContent
        className='!pt-5'
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        <Button
          variant="outlined"
          onClick={() => fileInputRef.current?.click()}
          sx={{
            padding: '8px 20px',
            fontWeight: 'bold',
            borderColor: '#800000',
            '&:hover': {
              backgroundColor: '#f5f5f5',
            },
          }}
        >
          Choose Image
        </Button>
        <Typography
          variant="body2"
          sx={{ mt: 2, textAlign: 'center', color: 'gray' }}
        >
          {file ? `Selected Image: ${file.name}` : 'No image selected'}
        </Typography>
      </DialogContent>
      <DialogActions
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '16px',
        }}
      >
        <Button
          onClick={onClose}
          variant="outlined"
          color="error"
          sx={{
            padding: '8px 20px',
            fontWeight: 'bold',
            borderColor: '#800000',
            '&:hover': {
              backgroundColor: '#f5f5f5',
            },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleConfirm}
          disabled={!file}
          variant="contained"
          color="error"
          sx={{
            padding: '8px 20px',
            fontWeight: 'bold',
            backgroundColor: '#800000',
            '&:hover': {
              backgroundColor: '#600000',
            },
            '&:disabled': {
              backgroundColor: '#e57373',
            },
          }}
        >
          Upload
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProfileImageModal;
