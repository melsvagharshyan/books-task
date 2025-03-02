import { createSlice } from '@reduxjs/toolkit';

type TModalState = {
  isOpenCreateBookModal: boolean;
  isOpenUpdateBookModal: boolean;
};

const initialState: TModalState = {
  isOpenCreateBookModal: false,
  isOpenUpdateBookModal: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openCreateBookModal: (state) => {
      state.isOpenCreateBookModal = true;
    },
    closeCreateBookModal: (state) => {
      state.isOpenCreateBookModal = false;
    },
    openUpdateBookModal: (state) => {
      state.isOpenUpdateBookModal = true;
    },
    closeUpdateBookModal: (state) => {
      state.isOpenUpdateBookModal = false;
    },
  },
});

export const {
  openCreateBookModal,
  closeCreateBookModal,
  openUpdateBookModal,
  closeUpdateBookModal,
} = modalSlice.actions;

export default modalSlice.reducer;
