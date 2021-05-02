import styled from '@emotion/styled';
import { Avatar, Dropdown, Menu, Tooltip } from 'antd';
import { MenuOutlined, LogoutOutlined, GithubOutlined, SmileOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { useAuth } from './AuthProvider';

interface IMenu {
  path: string;
  name: string;
}

const menus: IMenu[] = [
  { name: '项目', path: '/project' },
  { name: '角色', path: '/role' },
];

export const Header = () => {
  const { user, logout } = useAuth();

  const DropdownList = (
    <Menu>
      <Menu.Item key="logout" onClick={logout}>
        <LogoutOutlined /> Logout
      </Menu.Item>
      <Menu.Item key="usage">
        <a
          href="https://github.com/JarryChung/i18n-Friday/blob/main/docs/how-to-manage.md"
          target="_blank"
          rel="noopener noreferrer"
        >
          <SmileOutlined /> Usage
        </a>
      </Menu.Item>
      <Menu.Item key="github">
        <a
          href="https://github.com/JarryChung/i18n-Friday"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GithubOutlined /> Github
        </a>
      </Menu.Item>
    </Menu>
  );

  return (
    <Container>
      <Menubar between={true}>
        <MenuLeft gap={2}>
          <Logo>I18N Friday</Logo>

          {menus.map((menu) => (
            <Link
              to={menu.path}
              key={menu.path}
              activeStyle={{ color: '#1890ff', fontWeight: 600 }}
            >
              {menu.name}
            </Link>
          ))}
        </MenuLeft>

        <MenuRight gap={2}>
          <Dropdown overlay={DropdownList} placement="bottomCenter" arrow>
            <MenuOutlined style={{ fontSize: '1.6rem' }} />
          </Dropdown>
          <Tooltip title={user!.name} placement="topRight">
            <Avatar style={{ backgroundColor: '#1890ff' }}>{user!.name}</Avatar>
          </Tooltip>
        </MenuRight>
      </Menubar>
    </Container>
  );
};

const HEADER_HEIGHT = '6rem';

const Container = styled.div`
  height: ${HEADER_HEIGHT};
  width: 100%;
  box-shadow: 0px -10px 20px 0px black;
`;

const Logo = styled.div`
  font-size: 2.4rem;
  line-height: ${HEADER_HEIGHT};
  width: 17rem;
  text-align: center;
  font-weight: 600;
`;

const Row = styled.div<{
  gap?: number | boolean;
  between?: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.between ? 'space-between' : undefined)};
  > * {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    margin-right: ${(props) =>
      typeof props.gap === 'number' ? props.gap + 'rem' : props.gap ? '2rem' : undefined};
  }
`;

const Menubar = styled(Row)``;
const MenuLeft = styled(Row)``;
const MenuRight = styled(Row)``;

const Link = styled(NavLink)`
  color: rgba(0, 0, 0, 0.85);
`;
