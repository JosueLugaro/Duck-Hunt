let GET_All_DUCKS = 'ducks/GET_ALL_DUCKS'


const setAllDucks = (posts) => ({
    type: GET_All_DUCKS,
    payload: posts
})

export const getAllDucksThunk = () => async (dispatch) => {
    let response = await fetch('/api/ducks/');
    if (response.ok) {
        let data = await response.json();
        dispatch(setAllDucks(data.ducks));
    }
}

let initialState = { allDucks: {}, currentDuck: {}}

export default function DucksReducer(state = initialState, action) {
    let newState = {...state}
    switch(action.type) {
        case GET_All_DUCKS:
            action.payload.forEach(post => newState.allDucks[post.id] = post)
            newState.currentDuck = []
            return newState
        default:
            return state
    }
}
