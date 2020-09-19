import { Button, Input, Radio } from 'antd';
import Form, { useForm } from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';
import React from 'react';

interface SearchProps {
  onSearch: (values: any) => void;
  onReset: (values: any) => void;
}

const Search: React.FC<SearchProps> = props => {
  const [form] = useForm();
  return (
    <Form
      form={form}
      onFinish={values => {
        props.onSearch(values);
      }}
    >
      <FormItem name="name" label="姓名">
        <Input />
      </FormItem>

      <FormItem name="sex" label="性别">
        <Radio.Group>
          <Radio value={1}>男</Radio>
          <Radio value={2}>女</Radio>
        </Radio.Group>
      </FormItem>

      <FormItem name="want_to_join" label="想要加入的部门">
        <Radio.Group>
          <Radio value={1}>采编部</Radio>
          <Radio value={2}>运营部</Radio>
          <Radio value={3}>技术部</Radio>
        </Radio.Group>
      </FormItem>

      <Button
        onClick={() => {
          form.submit();
        }}
      >
        搜索
      </Button>

      <Button
        onClick={() => {
          props.onReset();
        }}
      >
        重置
      </Button>
    </Form>
  );
};

export default Search;
