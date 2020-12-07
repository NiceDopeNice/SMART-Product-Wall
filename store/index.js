import Vuex from 'vuex'

const createStore = () => {
    return new Vuex.Store({
        state: ()=> ({
            screenCount: [
                { screen: false, activeID: '' },
                { screen: false, activeID: '' },
                { screen: false, activeID: '' },
                { screen: false, activeID: '' },
                { screen: false, activeID: '' },
                { screen: false, activeID: '' },
                { screen: false, activeID: '' },
                { screen: false, activeID: '' }
            ]
        })
    })
}

export default createStore