import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { Tooltip, Table, Popconfirm, Skeleton, message } from 'antd';
import { ColumnsType, TablePaginationConfig } from 'antd/lib/table';
import {
  PlusCircleTwoTone,
  SettingTwoTone,
  FileZipTwoTone,
  LeftSquareOutlined,
} from '@ant-design/icons';
import { FilterBar, IFilterData } from 'components/FilterBar';
import { CopyToClipboard } from 'components/CopyToClipboard';
import { TextButton } from 'components/StyledLib';
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
    // TODO ????????????
    console.log(record);
  };

  const onGenerateConfig = () => {
    // TODO ????????????????????????
    message.info('???????????????');
  };

  const onEditProject = () => {
    setIsProjectDrawerVisible(true);
  };

  const onTableChange = (pagination: TablePaginationConfig) => {
    fetchTableData(pagination.current, pagination.pageSize);
  };

  const columns: TColumns = [
    {
      dataIndex: 'id',
      title: 'ID',
      align: 'center',
      render: (text: string) => <CopyToClipboard text={text}>{text}</CopyToClipboard>,
    },
    { dataIndex: 'sc', title: '????????????' },
    { dataIndex: 'tc', title: '????????????' },
    { dataIndex: 'en', title: '??????' },
    { dataIndex: 'module', title: '??????', align: 'center' },
    { dataIndex: 'updateTime', title: '????????????', align: 'center' },
    { dataIndex: 'updater', title: '?????????', align: 'center' },
    {
      dataIndex: 'action',
      title: '??????',
      align: 'center',
      width: 120,
      render: (_: string, record: IPhrase) => (
        <>
          <TextButton color="#1890ff" onClick={() => onEditPhrase(record)}>
            ??????
          </TextButton>
          <Popconfirm
            title="???????????????"
            onConfirm={() => onDeletePhrase(record)}
            okText="??????"
            cancelText="??????"
          >
            <TextButton color="#ff4d4f">??????</TextButton>
          </Popconfirm>
        </>
      ),
    },
  ];

  const fetchProjectData = () => {
    setIsLoadingProject(true);
    setTimeout(() => {
      setProjectData({
        id: '11111',
        name: '?????????????????????????????????',
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
    // TODO ????????????

    console.log(data);
    const list: IPhrase[] = [];
    for (let i = 0; i < 100; i++) {
      list.push({
        id: '11111' + i,
        sc: '??????',
        tc: '??????',
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

  useEffect(() => {
    fetchTableData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterData]);

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
        <Tooltip title="????????????">
          <SettingTwoTone
            twoToneColor="#1890ff"
            onClick={onEditProject}
            style={{ fontSize: '2rem' }}
          />
        </Tooltip>
        <Tooltip title="????????????????????????">
          <FileZipTwoTone
            twoToneColor="#1890ff"
            onClick={onGenerateConfig}
            style={{ fontSize: '2rem' }}
          />
        </Tooltip>
        <Tooltip title="????????????">
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
