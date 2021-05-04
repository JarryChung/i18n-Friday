import styled from '@emotion/styled';
import { Input, DatePicker } from 'antd';
import { useDebounce } from 'helpers/hooks';
import { useEffect, useState } from 'react';

export interface IFilterData {
  keyword: string;
  rangeDate: [string, string];
}

interface FilterBarProps {
  filterData: IFilterData;
  setFilterData(data: IFilterData): void;
}

const { RangePicker } = DatePicker;

export const FilterBar = (props: FilterBarProps) => {
  const { filterData, setFilterData } = props;
  const [keyword, setKeyword] = useState(filterData.keyword);
  const debouncedKeyword = useDebounce(keyword, 500);

  const setRangeData = (v: [string, string]) => {
    setFilterData({ ...filterData, rangeDate: v });
  };

  useEffect(() => {
    setFilterData({ ...filterData, keyword: debouncedKeyword });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedKeyword]);

  return (
    <Row>
      <div>
        <Label>关键字</Label>
        <Input
          allowClear
          style={{ width: '70%' }}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="请输入关键字以搜索"
        />
      </div>
      <div>
        <Label>更新时间</Label>
        <RangePicker style={{ width: '70%' }} onChange={(_, v) => setRangeData(v)} />
      </div>
    </Row>
  );
};

const Row = styled.div`
  border-top: 0.1rem solid #eee;
  border-bottom: 0.1rem solid #eee;
  & > * {
    display: inline-block;
    width: 33.33%;
  }
`;

const Label = styled.div`
  display: inline-block;
  padding: 0 1.6rem;
  height: 4rem;
  line-height: 4rem;
  margin-right: 1rem;
  text-align: center;
  background-color: #eee;
`;
