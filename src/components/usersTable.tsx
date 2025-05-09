import {
  IconButton,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { Circle, FindInPage } from '@mui/icons-material';
import type { IUser } from '../interfaces/users';
import { useNavigate } from 'react-router-dom';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#dc2626',
    color: theme.palette.common.white,
    fontSize: 16,
    fontWeight: 700,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

interface UsersTableProps {
  users: IUser[];
}

function UsersTable({ users }: UsersTableProps) {
  const navigate = useNavigate();

  return (
    <div className="mt-6 px-4">
      <TableContainer component={Paper} className="shadow-lg rounded-xl">
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Status</StyledTableCell>
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">Company</StyledTableCell>
              <StyledTableCell align="center">Email</StyledTableCell>
              <StyledTableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((row) => (
              <TableRow
                key={row.id}
                hover
                onClick={() => navigate(`/user/${row.id}`)}
                className="transition-all duration-200 hover:bg-red-50 cursor-pointer"
              >
                <StyledTableCell align="center">
                  <Circle sx={{ color: row.online ? 'green' : 'gray' }} />
                </StyledTableCell>
                <StyledTableCell align="center">{row.name}</StyledTableCell>
                <StyledTableCell align="center">
                  {row.companyId}
                </StyledTableCell>
                <StyledTableCell align="center">{row.email}</StyledTableCell>
                <StyledTableCell align="center">
                  <IconButton
                    href={`/user/${row.id}`}
                    aria-label="View user details"
                    sx={{
                      color: '#6b7280',
                      '&:hover': {
                        color: '#dc2626',
                      },
                    }}
                  >
                    <FindInPage />
                  </IconButton>
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default UsersTable;
