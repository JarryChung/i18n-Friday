import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { Tooltip, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { PlusCircleTwoTone, SettingTwoTone, FileZipTwoTone } from '@ant-design/icons';
import { FilterBar, IFilterData } from 'components/FilterBar';

export interface IPhrase {
  id?: string;
  name: string;
  updateTime: string;
}
type TColumns = ColumnsType<IPhrase>;

export const Detail = () => {
  const [filterData, setFilterData] = useState<IFilterData>({ keyword: '', rangeDate: ['', ''] });
  const [tableData, setTableData] = useState<IPhrase[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const onAddPhrase = () => {};
  const onGenerateConfig = () => {};
  const onEditProject = () => {};

  const columns: TColumns = [{ dataIndex: 'name', title: '项目名称' }];

  const fetchTableData = () => {
    setIsLoading(true);
    const { keyword, rangeDate } = filterData;
    const data = { keyword, startDate: rangeDate[0], endDate: rangeDate[1] };
    // TODO 获取数据

    console.log(data);
    const list: IPhrase[] = [];
    for (let i = 0; i < 100; i++) {
      list.push({
        id: '11111' + i,
        name: '123' + i,
        updateTime: '12345' + i,
      });
    }
    setTimeout(() => {
      setTableData(list);
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    console.log(123);
    fetchTableData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Header>
        <h1 style={{ display: 'inline-block' }}>这是一个炫酷的项目名称</h1>
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
        loading={isLoading}
        style={{ marginTop: '.8rem' }}
        size="small"
        rowKey="id"
        scroll={{ y: 'calc(100vh - 28rem)' }}
      />
    </div>
  );
};

const Header = styled.div`
  & > * {
    margin-right: 2rem;
  }
`;
