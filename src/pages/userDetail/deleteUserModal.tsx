import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  CircularProgress,
} from '@mui/material';

interface DeleteUserModalProps {
  open: boolean;
  onClose: (content: string) => void;
  onConfirm: () => void;
  isLoading?: boolean;
  userId?: string;
  name?: string;
}

function DeleteUserModal({
  open,
  onClose,
  onConfirm,
  isLoading = false,
  name,
  userId,
}: DeleteUserModalProps) {
  return (
    <Dialog
      open={open}
      onClose={() => onClose('delete')}
      aria-labelledby="confirm-delete-title"
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle
        id="confirm-delete-title"
        sx={{
          backgroundColor: '#800000',
          color: 'white',
          fontWeight: 'bold',
          textAlign: 'center',
        }}
      >
        Confirm Deletion
      </DialogTitle>
      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingTop: 4
        }}
      >
        <Typography
          variant="body1"
          sx={{ textAlign: 'center', color: 'gray', paddingTop: 2 }}
        >
          {`Are you sure you want to delete ${name ? name : 'this user'} ?`}
        </Typography>
        <Typography
          variant="body2"
          sx={{ textAlign: 'center', color: 'gray', paddingTop: 2 }}
        >
          User ID: {userId}
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
          onClick={() => onClose('delete')}
          variant="outlined"
          color="error"
          disabled={isLoading}
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
          onClick={onConfirm}
          color="error"
          variant="contained"
          disabled={isLoading}
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
          {isLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            'Delete'
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteUserModal;
