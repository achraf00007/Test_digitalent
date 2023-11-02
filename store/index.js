import createEasyAccess, { defaultMutations } from 'vuex-easy-access'

const easyAccess = createEasyAccess()
export const plugins = [easyAccess]

export const state = () => ({
    token: '',
    user: null,
    users: []
})

export const mutations = {
    ...defaultMutations(state())
}

export const actions = {

}

export const getters = {
    isLoggedIn: (state) => {
        return state.token !== ''
    }
}