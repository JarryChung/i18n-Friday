import styled from '@emotion/styled';
import { Checkbox, Select } from 'antd';
import { PlusCircleTwoTone, MinusCircleTwoTone } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { IRole } from '../Management';

interface IRolesBlockProps {
  roles: IRole[];
  setRoles(roles: IRole[]): void;
}

const permissionOptions: { value: string; label: string }[] = [
  { value: 'r', label: '查询' },
  { value: 'w', label: '编辑' },
  { value: 'd', label: '删除' },
];

export const RolesBlock = (props: IRolesBlockProps) => {
  const { roles, setRoles } = props;
  const [roleOptions, setRoleOptions] = useState<{ value: string; label: string }[]>();

  const onChangeRole = (index: number, v: string) => {
    roles[index].name = v;
    setRoles(roles);
  };
  const onChangePermission = (index: number, p: string) => {
    const hasPermission = roles[index].permission[p];
    const map: { [key: string]: string[][] } = {
      r: [['r', 'w', 'd'], ['r']],
      w: [
        ['w', 'd'],
        ['r', 'w'],
      ],
      d: [['d'], ['r', 'w', 'd']],
    };
    hasPermission
      ? map[p][0].forEach((per) => (roles[index].permission[per] = false))
      : map[p][1].forEach((per) => (roles[index].permission[per] = true));

    setRoles(roles);
  };
  const onAdd = (index: number) => {
    roles.splice(index + 1, 0, { name: '', permission: { r: true, w: false, d: false } });
    setRoles(roles);
  };
  const onDelete = (index: number) => {
    roles.splice(index, 1);
    setRoles(roles);
  };

  useEffect(() => {
    setRoleOptions([{ value: 't', label: 'T' }]);
  }, []);

  return (
    <div>
      {roles.map((role, index) => (
        <Row key={index}>
          <Select
            defaultValue={role.name}
            style={{ width: 120 }}
            onChange={(v) => onChangeRole(index, v)}
          >
            {roleOptions?.map((opt) => (
              <Select.Option key={opt.value} value={opt.value}>
                {opt.label}
              </Select.Option>
            ))}
          </Select>
          <CheckboxRow>
            {permissionOptions.map((p) => (
              <Checkbox
                key={p.value}
                checked={role.permission[p.value]}
                onChange={() => onChangePermission(index, p.value)}
              >
                {p.label}
              </Checkbox>
            ))}
          </CheckboxRow>
          <BtnRow>
            <PlusCircleTwoTone onClick={() => onAdd(index)} twoToneColor="#1890ff" />
            {roles.length > 1 && (
              <MinusCircleTwoTone onClick={() => onDelete(index)} twoToneColor="#ff4d4f" />
            )}
          </BtnRow>
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
`;

const CheckboxRow = styled.div`
  display: inline-block;
  border: 1px solid #d9d9d9;
  padding: 0.4rem 1rem;
`;

const BtnRow = styled.div`
  display: inline-block;
  & > * {
    margin-left: 1.6rem;
  }
`;
