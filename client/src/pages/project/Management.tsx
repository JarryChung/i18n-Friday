import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { PlusCircleTwoTone } from '@ant-design/icons';
import { Tooltip, Table, Button, Popconfirm } from 'antd';
import { FilterBar, IFilterData } from 'components/FilterBar';
import { ColumnsType } from 'antd/lib/table';
import { useEffect, useState } from 'react';
import { ProjectDrawer } from './components/ProjectDrawer';

export interface IRole {
  name: string;
  permission: { r: boolean; w: boolean; d: boolean; [key: string]: boolean };
}
export interface IProject {
  id?: string;
  name: string;
  updateTime: string;
  tag: string;
  langs: string[];
  roles: IRole[];
  modules: string[];
}
type TColumns = ColumnsType<IProject>;

const defaultProjectModalData: IProject = {
  id: '',
  name: '',
  updateTime: '',
  tag: '',
  langs: [''],
  roles: [{ name: '', permission: { r: false, w: false, d: false } }],
  modules: [''],
};

export const Management = () => {
  const [filterData, setFilterData] = useState<IFilterData>({ keyword: '', rangeDate: ['', ''] });
  const [tableData, setTableData] = useState<IProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isProjectModalVisible, setIsProjectModalVisible] = useState(false);
  const [projectModalMode, setProjectModalMode] = useState<'add' | 'edit'>('add');
  const [projectModalData, setProjectModalData] = useState<IProject>(defaultProjectModalData);

  const onAddProject = () => {
    setProjectModalMode('add');
    setIsProjectModalVisible(true);
    setProjectModalData(defaultProjectModalData);
  };

  const onEditProject = (record: IProject) => {
    setProjectModalMode('edit');
    setIsProjectModalVisible(true);
    setProjectModalData(record);
  };

  const onDeleteProject = (record: IProject) => {
    // TODO 删除项目
    console.log(record);
  };

  const fetchTableData = () => {
    setIsLoading(true);
    const { keyword, rangeDate } = filterData;
    const data = { keyword, startDate: rangeDate[0], endDate: rangeDate[1] };
    // TODO 获取数据

    console.log(data);
    const list: IProject[] = [];
    for (let i = 0; i < 100; i++) {
      list.push({
        id: '11111' + i,
        name: '22222' + i,
        updateTime: '12345' + i,
        tag: 'test',
        langs: ['1' + i],
        roles: [{ name: 't', permission: { r: true, w: false, d: false } }],
        modules: [''],
      });
    }
    setTimeout(() => {
      setTableData(list);
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    fetchTableData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterData]);

  const columns: TColumns = [
    {
      dataIndex: 'id',
      title: 'ID',
      width: 200,
      render: (text: string, record: IProject) => <Link to={`project/${record.id}`}>{text}</Link>,
    },
    { dataIndex: 'name', title: '项目名称' },
    { dataIndex: 'tag', title: '标签' },
    { dataIndex: 'updateTime', title: '更新时间' },
    {
      dataIndex: 'action',
      title: '操作',
      width: 150,
      render: (_: string, record: IProject) => (
        <>
          <Button type="link" onClick={() => onEditProject(record)}>
            编辑
          </Button>
          <Popconfirm
            title="确认删除？"
            onConfirm={() => onDeleteProject(record)}
            okText="确认"
            cancelText="取消"
          >
            <Button type="link">删除</Button>
          </Popconfirm>
        </>
      ),
    },
  ].map((item) => ({ align: 'center', ...item }));

  return (
    <div>
      <Header>
        <h1 style={{ display: 'inline-block' }}>项目管理</h1>
        <Tooltip title="新增项目">
          <PlusCircleTwoTone
            twoToneColor="#1890ff"
            onClick={onAddProject}
            style={{ fontSize: '2rem' }}
          />
        </Tooltip>
      </Header>

      <FilterBar filterData={filterData} setFilterData={setFilterData} />

      <Table
        columns={columns}
        dataSource={tableData}
        loading={isLoading}
        style={{ marginTop: '.8rem' }}
        size="small"
        rowKey="id"
        scroll={{ y: 'calc(100vh - 28rem)' }}
      />

      <ProjectDrawer
        data={projectModalData}
        mode={projectModalMode}
        isVisible={isProjectModalVisible}
        setIsVisible={setIsProjectModalVisible}
      />
    </div>
  );
};

const Header = styled.div`
  & > * {
    margin-right: 2rem;
  }
`;
