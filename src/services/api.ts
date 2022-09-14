import { wait } from './wait'

export const fetchGoods = async () => {
  await wait(300);
  return ['A', 'B', 'C'];
};
