//14.1. Tabela de usuários
import { Avatar, Button, Card, Input, Space, Switch, Table, Tag, Typography } from 'antd';
import { format } from 'date-fns';
import { User } from 'marcioasan-sdk';
import { useEffect } from 'react';
import useUsers from '../../core/hooks/useUsers';
import { EyeOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import { ColumnProps } from 'antd/lib/table';

export default function UserList() {
  const { users, fetchUsers, toggleUserStatus, fetching } = useUsers();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  //14.11. Filtro de busca personalizado e reutilizável - 3' INICIO
  const handleReset = (clearFilters: () => void) => {
    clearFilters();
  };

  const getColumnSearchProps = (
    dataIndex: keyof User.Summary,
    displayName?: string
  ): ColumnProps<User.Summary> => ({
    filterDropdown: ({ selectedKeys, setSelectedKeys, confirm, clearFilters }) => (
      <Card>
        <Input
          style={{ marginBottom: 8, display: 'block' }}
          value={selectedKeys[0]}
          placeholder={`Buscar ${displayName || dataIndex}`}
          onChange={(e) => {
            setSelectedKeys(e.target.value ? [e.target.value] : []);
          }}
          onPressEnter={() => confirm()}
        />
        <Space>
          <Button
            type={'primary'}
            size={'small'}
            style={{ width: 90 }}
            onClick={() => confirm()}
            icon={<SearchOutlined />}
          >
            Buscar
          </Button>
          {/* https://app.algaworks.com/forum/topicos/86696/botao-limpar-nao-esta-funcionando - A forma como foi feita na aula não funciona mais, essa foi a solução de um aluno*/}
          <Button
            size={'small'}
            style={{ width: 90 }}
            onClick={() => {
              clearFilters && handleReset(clearFilters);
              confirm();
            }}
          >
            Limpar
          </Button>
          {/* 
          <Button onClick={clearFilters} size={'small'} style={{ width: 90 }}>
            Limpar
          </Button>
           */}
        </Space>
      </Card>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#0099ff' : undefined }} />
    ),
    //14.11. Filtro de busca personalizado e reutilizável - 17'
    // @ts-ignore
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes((value as string).toLowerCase())
        : '',
  });
  //14.11. Filtro de busca personalizado e reutilizável - 3' FIM

  return (
    <>
      <Table<User.Summary>
        loading={fetching} //14.12. Controlando loading da tabela
        dataSource={users}
        columns={[
          {
            dataIndex: 'name',
            title: 'Nome',
            width: 160,
            ...getColumnSearchProps('name', 'Nome'),
            //14.3. Recuperando dados além da coluna
            render(name: string, row) {
              return (
                <Space>
                  <Avatar size={'small'} src={row.avatarUrls.small} />
                  <Typography.Text ellipsis style={{ maxWidth: 120 }}>
                    {name}
                  </Typography.Text>
                </Space>
              );
            },
          },
          {
            dataIndex: 'email',
            title: 'Email',
            ellipsis: true,
            width: 240,
            ...getColumnSearchProps('email', 'Email'),
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
            render(active: boolean, user) {
              return (
                <Switch
                  onChange={() => {
                    toggleUserStatus(user);
                  }}
                  defaultChecked={active}
                />
              );
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
