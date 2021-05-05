import styled from '@emotion/styled';
import { Drawer, Form, Button, Input, Select } from 'antd';
import { PlusCircleTwoTone, MinusCircleTwoTone } from '@ant-design/icons';
import cloneDeep from 'lodash.clonedeep';
import { useEffect, useState } from 'react';
import { IRole } from '../Role';

interface IRoleDrawerProps {
  data: IRole;
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
  mode: 'add' | 'edit';
}

export const RoleDrawer = (props: IRoleDrawerProps) => {
  const [formRef] = Form.useForm();
  const { data, mode, isVisible, setIsVisible } = props;
  const [drawerData, setDrawerData] = useState(cloneDeep(data));
  const [userOptions, setUserOptions] = useState<{ value: string; label: string }[]>();

  const onClose = () => {
    setIsVisible(false);
  };
  const onSubmit = () => {
    // TODO 提交数据并刷新表格数据
    const data = formRef.getFieldsValue();
    console.log(data);
  };
  const onAddUser = (index: number) => {
    const userIds = cloneDeep(drawerData.userIds);
    userIds.splice(index + 1, 0, '');
    setDrawerData({ ...drawerData, userIds });
  };
  const onDeleteUser = (index: number) => {
    const userIds = cloneDeep(drawerData.userIds);
    userIds.splice(index, 1);
    setDrawerData({ ...drawerData, userIds });
  };
  const onChangeUser = (index: number, value: string) => {
    const userIds = cloneDeep(drawerData.userIds);
    userIds[index] = value;
    setDrawerData({ ...drawerData, userIds });
  };

  const fetchUserOptions = () => {
    const options: { value: string; label: string }[] = [];
    for (let i = 0; i < 20; i++) {
      options.push({ value: 'id' + i, label: 'Tigaaa' + i });
    }
    setTimeout(() => {
      setUserOptions(options);
    }, 500);
  };

  useEffect(() => {
    fetchUserOptions();
    setDrawerData(props.data);
  }, [props.data]);

  useEffect(() => {
    formRef.setFieldsValue(drawerData);
    return () => {
      formRef.resetFields();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drawerData]);

  return (
    <Drawer
      title={mode === 'add' ? '新增角色' : '编辑角色'}
      width={520}
      onClose={onClose}
      visible={isVisible}
      bodyStyle={{ paddingBottom: 80 }}
      forceRender
      footer={
        <div style={{ textAlign: 'right' }}>
          <Button onClick={onClose} style={{ marginRight: 8 }}>
            取消
          </Button>
          <Button onClick={onSubmit} type="primary">
            确认
          </Button>
        </div>
      }
    >
      <Form form={formRef} layout="vertical" requiredMark={false}>
        <Form.Item
          name="name"
          label="角色名称"
          rules={[{ required: true, message: 'Please enter' }]}
        >
          <Input maxLength={10} placeholder="请输入角色名称，最长10个字符" />
        </Form.Item>

        <Form.Item label="用户列表" rules={[{ required: true, message: 'Please enter' }]}>
          {drawerData.userIds.map((id, index) => (
            <Row key={id + index}>
              <Select
                style={{ width: '60%' }}
                defaultValue={id}
                options={userOptions}
                onChange={(value) => onChangeUser(index, value)}
              />
              <PlusCircleTwoTone onClick={() => onAddUser(index)} twoToneColor="#1890ff" />
              {drawerData.userIds.length > 1 && (
                <MinusCircleTwoTone onClick={() => onDeleteUser(index)} twoToneColor="#ff4d4f" />
              )}
            </Row>
          ))}
        </Form.Item>
      </Form>
    </Drawer>
  );
};

const Row = styled.div`
  margin-bottom: 0.8rem;
  & > * {
    margin-right: 1.6rem;
  }
`;
