import { Reducer } from 'redux';
import { WordState, WordTypes } from './types';

const INITIAL_STATE: WordState = {
  data: '',
};

const reducer: Reducer<WordState> = (state = INITIAL_STATE, action) => {
  const updatedWordState = state;

  switch (action.type) {
    case WordTypes.UPDATE_WORD:
      updatedWordState.data = action.payload;

      return { ...state, ...updatedWordState };

    case WordTypes.REMOVE_WORD:
      INITIAL_STATE.data = '';

      return { ...state, ...INITIAL_STATE };

    default:
      return state;
  }
};

export default reducer;
