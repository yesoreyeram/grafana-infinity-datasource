import chunk from 'lodash/chunk';
import last from 'lodash/last';
import { SelectableValue } from '@grafana/data';

export const CollectionLookupVariable = (query: string): Array<SelectableValue<string>> => {
  let querySplit = query.split(',');
  let chunkCollection = chunk(querySplit, 2);
  let out = chunkCollection
    .slice(0, -1)
    .map(value => {
      return {
        key: value[0],
        value: value[1],
      };
    })
    .find(v => {
      return v.key === last(querySplit);
    });
  return out
    ? [
        {
          text: out.value,
          value: out.value,
        },
      ]
    : [];
};
