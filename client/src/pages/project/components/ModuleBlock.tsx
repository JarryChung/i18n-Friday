import styled from '@emotion/styled';
import { Input, Popconfirm } from 'antd';
import { PlusCircleTwoTone, MinusCircleTwoTone } from '@ant-design/icons';

interface ILangsBlockProps {
  modules: string[];
  setModules(langs: string[]): void;
}

export const ModulesBlock = (props: ILangsBlockProps) => {
  const { modules, setModules } = props;

  const onAdd = (index: number) => {
    modules.splice(index + 1, 0, '');
    setModules(modules);
  };
  const onDelete = (index: number) => {
    modules.splice(index, 1);
    setModules(modules);
  };
  const onInputLang = (index: number, lang: string) => {
    modules[index] = lang;
    setModules(modules);
  };

  return (
    <div>
      {modules.map((module, index) => (
        <Row key={index}>
          <Input
            defaultValue={module}
            onBlur={(e) => onInputLang(index, e.target.value)}
            placeholder="请输入语言名称"
          />
          <PlusCircleTwoTone onClick={() => onAdd(index)} twoToneColor="#1890ff" />
          {modules.length > 1 && (
            <Popconfirm
              title={
                <p>
                  删除模块后，该模块后的词条
                  <br />
                  将自动移入首个有效模块
                </p>
              }
              onConfirm={() => onDelete(index)}
              okText="确认"
              cancelText="取消"
            >
              <MinusCircleTwoTone twoToneColor="#ff4d4f" />
            </Popconfirm>
          )}
        </Row>
      ))}
    </div>
  );
};

const Row = styled.div`
  margin-bottom: 0.8rem;
  &:last-child {
    margin: 0;
  }
  & > input {
    width: 50%;
  }
  & > * {
    margin-right: 1.6rem;
  }
`;
