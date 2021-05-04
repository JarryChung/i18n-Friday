import styled from '@emotion/styled';
import { Input } from 'antd';
import { PlusCircleTwoTone, MinusCircleTwoTone } from '@ant-design/icons';

interface ILangsBlockProps {
  langs: string[];
  setLangs(langs: string[]): void;
}

export const LangsBlock = (props: ILangsBlockProps) => {
  const { langs, setLangs } = props;

  const onAdd = (index: number) => {
    langs.splice(index + 1, 0, '');
    setLangs(langs);
  };
  const onDelete = (index: number) => {
    langs.splice(index, 1);
    setLangs(langs);
  };
  const onInputLang = (index: number, lang: string) => {
    langs[index] = lang;
    setLangs(langs);
  };

  return (
    <div>
      {langs.map((lang, index) => (
        <Row key={index}>
          <Input
            defaultValue={lang}
            onBlur={(e) => onInputLang(index, e.target.value)}
            placeholder="请输入语言名称"
          />
          <PlusCircleTwoTone onClick={() => onAdd(index)} twoToneColor="#1890ff" />
          {langs.length > 1 && (
            <MinusCircleTwoTone onClick={() => onDelete(index)} twoToneColor="#ff4d4f" />
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
