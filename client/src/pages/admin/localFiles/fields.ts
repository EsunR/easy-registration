export interface Field {
  label: any;
  value: any;
}

export const Sex: Field[] = [
  {
    label: '男',
    value: 1,
  },
  {
    label: '女',
    value: 2,
  },
];

export const WantToJoin: Field[] = [
  {
    label: '编采部',
    value: 1,
  },
  {
    label: '运营部',
    value: 2,
  },
  {
    label: '技术部',
    value: 3,
  },
];
