import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import { fetchGoods } from '../services/api';

type GoodsState = {
  goods: string[];
  loading: boolean;
  error: string;
};

const initialState: GoodsState = {
  goods: [],
  loading: false,
  error: '',
};

const goodsSlice = createSlice({
  name: 'goods',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    set: (state, action: PayloadAction<string[]>) => {
      state.goods = action.payload;
    },
    // #region add, take, clear actions
    add: (state, action: PayloadAction<string>) => {
      state.goods.push(action.payload);
    },
    take: (state, action: PayloadAction<string>) => {
      state.goods = state.goods.filter(good => good !== action.payload);
    },
    clear: (state) => {
      state.goods = [];
    },
    // #endregion
  }
});

export default goodsSlice.reducer;
export const { set, add, take, clear, setLoading, setError } = goodsSlice.actions;

export const init = () => {
  return (dispatch: Dispatch) => {
    dispatch(setLoading(true));

    fetchGoods()
      .then(goodsFromServer => {
        dispatch(set(goodsFromServer));
      })
      .catch(() => {
        dispatch(setError('Something went wrong'));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };
}