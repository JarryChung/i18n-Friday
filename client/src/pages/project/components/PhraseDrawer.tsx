import { Drawer, Button, Form, Input, Checkbox, Select } from 'antd';
import { useEffect, useState } from 'react';
import cloneDeep from 'lodash.clonedeep';
import { IPhrase } from '../Detail';

interface IPhraseDrawerProps {
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
  mode: 'add' | 'edit';
  data: IPhrase;
}

export const PhraseDrawer = (props: IPhraseDrawerProps) => {
  const [formRef] = Form.useForm();
  const { data, mode, isVisible, setIsVisible } = props;
  const [drawerData, setDrawerData] = useState(cloneDeep(data));
  const [moduleOptions, setModuleOptions] = useState<{ value: string; label: string }[]>();
  const [isCustomizeId, setIsCustomizeId] = useState(true);

  const onClose = () => {
    setIsVisible(false);
  };
  const onSubmit = () => {
    // TODO 提交数据并刷新表格数据
    const data = formRef.getFieldsValue();
    console.log(data);
  };
  const onChangeCustomizeId = () => {
    // isCustomizeId 是 set 之前的值
    const id = isCustomizeId ? '123456' : '';
    const data = formRef.getFieldsValue();
    setIsCustomizeId(!isCustomizeId);
    setDrawerData({ ...data, id });
  };

  const fetchModuleOptions = () => {
    const options: { value: string; label: string }[] = [];
    for (let i = 0; i < 10; i++) {
      options.push({ label: 'label' + i, value: 'value' + i });
    }
    setTimeout(() => {
      setModuleOptions(options);
    }, 1000);
  };

  useEffect(() => {
    setDrawerData(props.data);
    fetchModuleOptions();
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
      title={mode === 'add' ? '新增词条' : '编辑词条'}
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
          name="id"
          initialValue={drawerData.id}
          label={
            <span>
              <span style={{ marginRight: '1.6rem' }}>ID</span>
              {mode === 'add' && (
                <Checkbox checked={isCustomizeId} onChange={() => onChangeCustomizeId()}>
                  自定义
                </Checkbox>
              )}
            </span>
          }
          rules={[{ required: true, message: 'Please enter id' }]}
        >
          <Input disabled={mode === 'edit' || !isCustomizeId} placeholder="Please enter" />
        </Form.Item>

        <Form.Item
          name="module"
          initialValue={drawerData.module}
          label="所属模块"
          rules={[{ required: true, message: 'Please enter sc' }]}
        >
          <Select>
            {moduleOptions?.map((opt) => (
              <Select.Option key={opt.value} value={opt.value}>
                {opt.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="sc"
          initialValue={drawerData.sc}
          label="简体"
          rules={[{ required: true, message: 'Please enter sc' }]}
        >
          <Input.TextArea placeholder="Please enter" />
        </Form.Item>

        <Form.Item
          name="tc"
          initialValue={drawerData.tc}
          label="繁体"
          rules={[{ required: true, message: 'Please enter tc' }]}
        >
          <Input.TextArea placeholder="Please enter" />
        </Form.Item>

        <Form.Item
          name="en"
          initialValue={drawerData.en}
          label="英文"
          rules={[{ required: true, message: 'Please enter en' }]}
        >
          <Input.TextArea placeholder="Please enter" />
        </Form.Item>
      </Form>
    </Drawer>
  );
};
