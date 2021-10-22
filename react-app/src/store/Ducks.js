let GET_All_DUCKS = 'ducks/GET_ALL_DUCKS'
let GET_CURRENT_DUCK = 'ducks/GET_CURRENT_DUCK';

const setAllDucks = (posts) => ({
    type: GET_All_DUCKS,
    payload: posts
})

const setCurrentDuck = (postId) => ({
    type: GET_CURRENT_DUCK,
    payload: postId
})

export const getAllDucksThunk = () => async (dispatch) => {
    let response = await fetch('/api/ducks/');
    if (response.ok) {
        let data = await response.json();
        dispatch(setAllDucks(data.ducks));
        return data
    }
}

export const setCurrentDuckThunk = (postId) => async (dispatch) => {
    return dispatch(setCurrentDuck(postId))
}

let initialState = { allDucks: null, currentDuck: null}
    // let initialState = {};

export default function DucksReducer(state = initialState, action) {
    let newState = {...state}
    switch(action.type) {
        case GET_All_DUCKS:
            newState.allDucks = {};
            action.payload.forEach(post => newState.allDucks[post.id] = post)
            newState.currentDuck = []
            // newState["allDucks"] = {}
            // action.payload.forEach(post => newState["allDucks"][post.id] = post)
            // newState["currentDuck"] = []
            return newState;
        case GET_CURRENT_DUCK:
            newState.currentDuck = newState.allDucks[action.payload]
            return newState;
        default:
            return state
    }
}
