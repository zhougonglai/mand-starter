import { Toast } from "mand-mobile";
// TODO root级state
export const state = () => ({
  loading: false
});

export const actions = {
  setLoading: ({ state: { loading }, commit }, status) => {
    if (loading !== status) {
      commit("CHANGE_LOADING", status);
    }
  }
};

export const mutations = {
  CHANGE_LOADING: (state, status) => {
    console.log(status);
    if (!status) {
      console.log("hide");
      Toast.hide();
    }
    state.loading = status;
  }
};
