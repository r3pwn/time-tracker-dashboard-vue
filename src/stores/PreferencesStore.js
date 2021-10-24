const PreferencesStore = {
    namespaced: true,
    state: () => ({
      timespanPreference: 'weekly'
    }),
    mutations: {
        setTimespan(state, timespan) {
            state.timespanPreference = timespan;
        }
    },
    actions: {
        setTimespan({ commit }, timespan) {
          commit('setTimespan', timespan);
        }
    }
};

export default PreferencesStore;