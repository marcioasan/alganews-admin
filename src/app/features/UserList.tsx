//14.1. Tabela de usuários
import { Avatar, Button, Space, Switch, Table, Tag, Typography } from 'antd';
import { format } from 'date-fns';
import { User } from 'marcioasan-sdk';
import { useEffect } from 'react';
import useUsers from '../../core/hooks/useUsers';
import { EyeOutlined, EditOutlined } from '@ant-design/icons';

export default function UserList() {
  const { users, fetchUsers } = useUsers();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <>
      <Table<User.Summary>
        dataSource={users}
        columns={[
          {
            dataIndex: 'name',
            title: 'Nome',
            //14.3. Recuperando dados além da coluna
            render(name: string, row) {
              return (
                <Space>
                  <Avatar size={'small'} src={row.avatarUrls.small} />
                  <Typography.Text>{name}</Typography.Text>
                </Space>
              );
            },
          },
          {
            dataIndex: 'email',
            title: 'Email',
          },
          {
            dataIndex: 'role',
            title: 'Perfil',
            align: 'center',
            render(role) {
              return (
                //14.2. Customizando renderização das colunas da tabela
                <Tag color={role === 'MANAGER' ? 'red' : 'blue'}>
                  {role === 'EDITOR' ? 'Editor' : role === 'MANAGER' ? 'Gerente' : 'Assistente'}
                </Tag>
              );
            },
          },
          {
            dataIndex: 'createdAt',
            title: 'Criação',
            align: 'center',
            render(createdAt: string) {
              return format(new Date(createdAt), 'dd/MM/yyy');
            },
          },
          {
            dataIndex: 'active',
            title: 'Ativo',
            align: 'center',
            render(active: boolean) {
              return <Switch defaultChecked={active} />;
            },
          },
          {
            dataIndex: 'id',
            title: 'Ações',
            align: 'center',
            render() {
              return (
                <>
                  <Button size='small' icon={<EyeOutlined />} />
                  <Button size='small' icon={<EditOutlined />} />
                </>
              );
            },
          },
        ]}
      />
    </>
  );
}
