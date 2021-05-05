import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { Tooltip, Table, Button, Popconfirm, Skeleton, message } from 'antd';
import { ColumnsType, TablePaginationConfig } from 'antd/lib/table';
import {
  PlusCircleTwoTone,
  SettingTwoTone,
  FileZipTwoTone,
  LeftSquareOutlined,
} from '@ant-design/icons';
import { FilterBar, IFilterData } from 'components/FilterBar';
import { defaultPageSize, IProject, defaultProjectDrawerData } from './Management';
import { ProjectDrawer } from './components/ProjectDrawer';
import { PhraseDrawer } from './components/PhraseDrawer';
import { Link } from 'react-router-dom';

export interface IPhrase {
  id?: string;
  updateTime: string;
  updater: string;
  module: string;
  [key: string]: string | undefined;
}
type TColumns = ColumnsType<IPhrase>;

const defaultPhraseDrawerData: IPhrase = {
  id: '',
  updater: '',
  updateTime: '',
  module: '',
  sc: '',
  tc: '',
  en: '',
};

export const Detail = () => {
  const [filterData, setFilterData] = useState<IFilterData>({ keyword: '', rangeDate: ['', ''] });
  const [tableData, setTableData] = useState<IPhrase[]>([]);
  const [projectData, setProjectData] = useState<IProject>(defaultProjectDrawerData);
  const [isProjectDrawerVisible, setIsProjectDrawerVisible] = useState(false);
  const [isLoadingTable, setIsLoadingTable] = useState(false);
  const [isLoadingProject, setIsLoadingProject] = useState(false);
  const [pagination, setPagination] = useState({ total: 0, current: 1, pageSize: defaultPageSize });
  const [isPhraseDrawerVisible, setIsPhraseDrawerVisible] = useState(false);
  const [phraseDrawerMode, setPhraseDrawerMode] = useState<'add' | 'edit'>('add');
  const [phraseDrawerData, setPhraseDrawerData] = useState<IPhrase>(defaultPhraseDrawerData);

  const onAddPhrase = () => {
    setPhraseDrawerMode('add');
    setPhraseDrawerData(defaultPhraseDrawerData);
    setIsPhraseDrawerVisible(true);
  };

  const onEditPhrase = (record: IPhrase) => {
    setPhraseDrawerMode('edit');
    setPhraseDrawerData(record);
    setIsPhraseDrawerVisible(true);
  };

  const onDeletePhrase = (record: IPhrase) => {
    // TODO 删除词条
    console.log(record);
  };

  const onGenerateConfig = () => {
    // TODO 生成词条配置文件
    message.info('紧急开发中');
  };

  const onEditProject = () => {
    setIsProjectDrawerVisible(true);
  };

  const onTableChange = (pagination: TablePaginationConfig) => {
    fetchTableData(pagination.current, pagination.pageSize);
  };

  const columns: TColumns = [
    { dataIndex: 'id', title: 'ID' },
    { dataIndex: 'sc', title: '简体中文' },
    { dataIndex: 'tc', title: '繁体中文' },
    { dataIndex: 'en', title: '英文' },
    { dataIndex: 'module', title: '模块' },
    { dataIndex: 'updateTime', title: '更新时间' },
    { dataIndex: 'updater', title: '更新人' },
    {
      dataIndex: 'action',
      title: '操作',
      width: 150,
      render: (_: string, record: IPhrase) => (
        <>
          <Button type="link" onClick={() => onEditPhrase(record)}>
            编辑
          </Button>
          <Popconfirm
            title="确认删除？"
            onConfirm={() => onDeletePhrase(record)}
            okText="确认"
            cancelText="取消"
          >
            <Button type="link">删除</Button>
          </Popconfirm>
        </>
      ),
    },
  ].map((item) => ({ align: 'center', ...item }));

  const fetchProjectData = () => {
    setIsLoadingProject(true);
    setTimeout(() => {
      setProjectData({
        id: '11111',
        name: '这是一个酷炫的项目名称',
        updateTime: '12345',
        tag: 'test',
        langs: ['1'],
        roles: [{ name: 't', permission: { r: true, w: false, d: false } }],
        modules: [''],
      });
      setIsLoadingProject(false);
    }, 1000);
  };

  const fetchTableData = (current: number = 1, pageSize: number = pagination.pageSize) => {
    setIsLoadingTable(true);
    const { keyword, rangeDate } = filterData;
    const data = { keyword, startDate: rangeDate[0], endDate: rangeDate[1] };
    // TODO 获取数据

    console.log(data);
    const list: IPhrase[] = [];
    for (let i = 0; i < 100; i++) {
      list.push({
        id: '11111' + i,
        sc: '你好',
        tc: '你好',
        en: 'hello',
        updateTime: '12345' + i,
        updater: 'tigaaa',
        module: i + '',
      });
    }
    setTimeout(() => {
      setTableData(list);
      setPagination({ current, pageSize, total: 100 });
      setIsLoadingTable(false);
    }, 1000);
  };

  useEffect(() => {
    fetchProjectData();
    fetchTableData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Link to="/project">
        <BackIcon />
      </Link>
      <Header>
        {isLoadingProject ? (
          <Skeleton.Input
            style={{
              width: 200,
              marginBottom: '14px',
              verticalAlign: 'middle',
              height: '4.4rem',
            }}
            active={true}
          />
        ) : (
          <h1 style={{ display: 'inline-block' }}>{projectData?.name}</h1>
        )}
        <Tooltip title="项目设置">
          <SettingTwoTone
            twoToneColor="#1890ff"
            onClick={onEditProject}
            style={{ fontSize: '2rem' }}
          />
        </Tooltip>
        <Tooltip title="生成词条配置文件">
          <FileZipTwoTone
            twoToneColor="#1890ff"
            onClick={onGenerateConfig}
            style={{ fontSize: '2rem' }}
          />
        </Tooltip>
        <Tooltip title="新增词条">
          <PlusCircleTwoTone
            twoToneColor="#1890ff"
            onClick={onAddPhrase}
            style={{ fontSize: '2rem' }}
          />
        </Tooltip>
      </Header>

      <FilterBar filterData={filterData} setFilterData={setFilterData} />

      <Table
        columns={columns}
        dataSource={tableData}
        loading={isLoadingTable}
        style={{ marginTop: '.8rem' }}
        size="small"
        rowKey="id"
        scroll={{ y: 'calc(100vh - 28rem)' }}
        pagination={pagination}
        onChange={onTableChange}
      />

      <ProjectDrawer
        data={projectData}
        mode="edit"
        isVisible={isProjectDrawerVisible}
        setIsVisible={setIsProjectDrawerVisible}
      />

      <PhraseDrawer
        data={phraseDrawerData}
        mode={phraseDrawerMode}
        isVisible={isPhraseDrawerVisible}
        setIsVisible={setIsPhraseDrawerVisible}
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

const BackIcon = styled(LeftSquareOutlined)`
  color: #555;
  font-size: 2.8rem;
  margin-right: 1.2rem;
  vertical-align: sub;
`;
