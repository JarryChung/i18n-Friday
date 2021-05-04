import { Drawer, Button, Form, Input } from 'antd';
import { useEffect, useState } from 'react';
import cloneDeep from 'lodash.clonedeep';
import { IProject, IRole } from '../Management';
import { LangsBlock } from './LangsBlock';
import { RolesBlock } from './RolesBlock';
import { ModulesBlock } from './ModuleBlock';

interface IProjectModalProps {
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
  mode: 'add' | 'edit';
  data: IProject;
}

export const ProjectDrawer = (props: IProjectModalProps) => {
  const [formRef] = Form.useForm();
  const { data, mode, isVisible, setIsVisible } = props;
  const [drawerData, setDrawerData] = useState(cloneDeep(data));

  const setLangs = (langs: string[]) => {
    setDrawerData({ ...drawerData, langs });
  };
  const setRoles = (roles: IRole[]) => {
    setDrawerData({ ...drawerData, roles });
  };
  const setModules = (modules: string[]) => {
    setDrawerData({ ...drawerData, modules });
  };

  const onClose = () => {
    setIsVisible(false);
  };
  const onSubmit = () => {
    // TODO 提交数据并刷新表格数据
    const data = formRef.getFieldsValue();
    console.log(data);
  };

  useEffect(() => {
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
      title={mode === 'add' ? '新增项目' : '编辑项目'}
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
          label="项目名称"
          rules={[{ required: true, message: 'Please enter user name' }]}
        >
          <Input placeholder="Please enter user name" />
        </Form.Item>

        <Form.Item
          name="modules"
          label="模块设置"
          rules={[{ required: true, message: 'Please enter user name' }]}
        >
          <ModulesBlock modules={drawerData.modules} setModules={setModules} />
        </Form.Item>

        <Form.Item
          name="langs"
          label="语言设置"
          rules={[{ required: true, message: 'Please enter user name' }]}
        >
          <LangsBlock langs={drawerData.langs} setLangs={setLangs} />
        </Form.Item>

        <Form.Item
          name="roles"
          label="角色设置"
          rules={[{ required: true, message: 'Please enter user name' }]}
        >
          <RolesBlock roles={drawerData.roles} setRoles={setRoles} />
        </Form.Item>
      </Form>
    </Drawer>
  );
};
