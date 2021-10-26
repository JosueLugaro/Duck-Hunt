let GET_ALL_COMMENTS = 'comments/GET_ALL_COMMENTS';

const setAllComments = (comments) => ({
    type: GET_ALL_COMMENTS,
    payload: comments
})

export const getAllCommentsThunk = () => async(dispatch) => {
    let response = await fetch('/api/comments/');

    if (response.ok) {
        let data = await response.json();
        dispatch(setAllComments(data.comments))
        return data
    }
}


let initialState = {};

export default function CommentsReducer(state = initialState, action) {
    let newState = {...state}
    switch(action.type) {
        case GET_ALL_COMMENTS:
            action.payload.forEach(comment => newState[comment.id] = comment);
            return newState
        default:
            return state
    }
}
