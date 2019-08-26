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
    state.loading = status;
  }
};
