import { Field } from '../localFiles/fields';

export const getLabelByValue = (fields: Field[], value: any) => {
  if (fields instanceof Array) {
    const result = fields.find(item => item.value === value);
    return result && result.label;
  } else {
    return undefined;
  }
};
