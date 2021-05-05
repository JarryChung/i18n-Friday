import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { Tooltip, Empty, Button, Spin, Card, Avatar, message } from 'antd';
import { PlusCircleTwoTone, SettingTwoTone, DeleteTwoTone, UserOutlined } from '@ant-design/icons';
import { FilterBar, IFilterData } from 'components/FilterBar';
import { RoleDrawer } from './components/RoleDrawer';

interface IUser {
  id: string;
  name: string;
  avatar?: string;
}
export interface IRole {
  id?: string;
  name: string;
  userIds: string[];
  users: IUser[];
  updateTime: string;
  updater: string;
}

const defaultRoleDrawerData: IRole = {
  id: '',
  name: '',
  userIds: [''],
  users: [{ id: '', name: '', avatar: '' }],
  updater: '',
  updateTime: '',
};

export const Role = () => {
  const [filterData, setFilterData] = useState<IFilterData>({ keyword: '', rangeDate: ['', ''] });
  const [roleList, setRoleList] = useState<IRole[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [isRoleDrawerVisible, setIsRoleDrawerVisible] = useState(false);
  const [roleDrawerMode, setRoleDrawerMode] = useState<'add' | 'edit'>('add');
  const [roleDrawerData, setRoleDrawerData] = useState<IRole>(defaultRoleDrawerData);

  const onAddRole = () => {
    setRoleDrawerMode('add');
    setRoleDrawerData(defaultRoleDrawerData);
    setIsRoleDrawerVisible(true);
  };

  const onEditRole = (role: IRole) => {
    setRoleDrawerMode('edit');
    setRoleDrawerData(role);
    setIsRoleDrawerVisible(true);
  };

  const onDeleteRole = (role: IRole) => {
    message.info('紧急开发中');
  };

  const fetchRoleList = () => {
    setIsLoading(true);
    const list: IRole[] = [];
    for (let i = 0; i < 10; i++) {
      list.push({
        id: 'id' + i,
        name: '角色名称' + i,
        updateTime: '123456',
        updater: 'Jarry Chung',
        userIds: ['id1', 'id2', 'id3', 'id4', 'id5', 'id6', 'id7', 'id8', 'id9'],
        users: [
          { id: 'id1', name: 'Tigaaa' + i },
          { id: 'id2', name: 'Tigaaa' + i },
          { id: 'id3', name: 'Tigaaa' + i },
          { id: 'id4', name: 'Tigaaa' + i },
          { id: 'id5', name: 'Tigaaa' + i },
          { id: 'id6', name: 'Tigaaa' + i },
          { id: 'id7', name: 'Tigaaa' + i },
          { id: 'id8', name: 'Tigaaa' + i },
          { id: 'id9', name: 'Tigaaa' + i },
        ],
      });
    }
    setTimeout(() => {
      setRoleList(list);
      setIsLoading(false);
    }, 2000);
  };

  useEffect(() => {
    fetchRoleList();
  }, []);

  useEffect(() => {
    fetchRoleList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterData]);

  return (
    <div>
      <Header>
        <h1 style={{ display: 'inline-block' }}>角色管理</h1>
        <Tooltip title="新增角色">
          <PlusCircleTwoTone
            twoToneColor="#1890ff"
            onClick={onAddRole}
            style={{ fontSize: '2rem' }}
          />
        </Tooltip>
      </Header>

      <FilterBar filterData={filterData} setFilterData={setFilterData} />

      {isLoading ? (
        <Loading>
          <Spin />
        </Loading>
      ) : roleList?.length ? (
        <CardContainer>
          {roleList.map((role) => (
            <Card
              key={role.id}
              type="inner"
              style={{ marginBottom: '.8rem' }}
              size="small"
              title={
                <div>
                  <span style={{ fontWeight: 600, marginRight: '1.6rem' }}>{role.name}</span>
                  <span style={{ fontSize: '1rem', color: '#555' }}>
                    {role.updater} 于 {role.updateTime} 更新
                  </span>
                </div>
              }
              extra={
                <ActionButtons>
                  <SettingTwoTone onClick={() => onEditRole(role)} />
                  <DeleteTwoTone twoToneColor="#ff7875" onClick={() => onDeleteRole(role)} />
                </ActionButtons>
              }
            >
              {role.users.map((user) => (
                <User key={user.id}>
                  <Avatar icon={<UserOutlined />} />
                  <span>{user.name}</span>
                </User>
              ))}
            </Card>
          ))}
        </CardContainer>
      ) : (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          imageStyle={{ height: 200 }}
          description="暂无角色"
        >
          <Button type="primary">立即新增角色</Button>
        </Empty>
      )}

      <RoleDrawer
        data={roleDrawerData}
        mode={roleDrawerMode}
        isVisible={isRoleDrawerVisible}
        setIsVisible={setIsRoleDrawerVisible}
      />
    </div>
  );
};

const Header = styled.div`
  display: inline-block;
  & > * {
    margin-right: 2rem;
  }
`;

const Loading = styled.div`
  text-align: center;
  padding-top: 20rem;
`;

const CardContainer = styled.div`
  margin-top: 0.8rem;
  height: calc(100vh - 20rem);
  overflow-y: auto;
`;

const ActionButtons = styled.div`
  & > * {
    margin-left: 0.8rem;
    cursor: pointer;
  }
`;

const User = styled.span`
  margin-right: 0.8rem;
  & > * {
    margin-right: 0.4rem;
  }
`;
