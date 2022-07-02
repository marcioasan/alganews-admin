//14.1. Tabela de usuários
import { User } from 'marcioasan-sdk';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import * as UserActions from '../store/User.reducer';

export default function useUsers() {
  //const [users, setUsers] = useState<User.Summary[]>([]);
  //14.6. Usuários no Redux - 7'20"
  const dispatch = useDispatch();

  const users = useSelector((state: RootState) => state.user.list);
  const fetching = useSelector((state: RootState) => state.user.fetching);

  const fetchUsers = useCallback(() => {
    dispatch(UserActions.getAllUsers());
  }, [dispatch]);

  //14.7. Alterando o status do usuário no Redux - 3'
  const toggleUserStatus = useCallback(
    (user: User.Datailed | User.Summary) => {
      dispatch(UserActions.toggleUserStatus(user));
    },
    [dispatch]
  );

  return {
    fetchUsers,
    users,
    fetching,
    toggleUserStatus,
  };
}
