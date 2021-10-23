let GET_All_DUCKS = 'ducks/GET_ALL_DUCKS';
let GET_CURRENT_DUCK = 'ducks/GET_CURRENT_DUCK';
let NEW_DUCK = 'ducks/NEW_DUCK';

const setAllDucks = (posts) => ({
    type: GET_All_DUCKS,
    payload: posts
})

const setCurrentDuck = (postId) => ({
    type: GET_CURRENT_DUCK,
    payload: postId
})

const postNewDuck = (postData) => ({
    type: NEW_DUCK,
    payload: postData
})

export const getAllDucksThunk = () => async (dispatch) => {
    let response = await fetch('/api/ducks/');
    if (response.ok) {
        let data = await response.json();
        console.log(data.ducks);
        dispatch(setAllDucks(data.ducks));
        return data
    }
}

export const setCurrentDuckThunk = (postId) => async (dispatch) => {
    return dispatch(setCurrentDuck(postId))
}

export const addNewDuckThunk = (postData) => async (dispatch) => {
    let response = await fetch('/api/ducks/new',{
        method: 'POST',
        body: postData
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(postNewDuck(data));
        return null;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors
        }
    }

    return ['An error occured']
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
