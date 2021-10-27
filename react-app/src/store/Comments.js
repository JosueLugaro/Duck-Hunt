let GET_ALL_COMMENTS = 'comments/GET_ALL_COMMENTS';
let NEW_COMMENT = 'comments/NEW_COMMENT';

const setAllComments = (comments) => ({
    type: GET_ALL_COMMENTS,
    payload: comments
})

const postNewComment = (commentData) => ({
    type: NEW_COMMENT,
    payload: commentData
})

export const getAllCommentsThunk = () => async(dispatch) => {
    let response = await fetch('/api/comments/');

    if (response.ok) {
        let data = await response.json();
        dispatch(setAllComments(data.comments))
        return data
    }
}

export const addNewCommentThunk = (commentData) => async(dispatch) => {
    console.log('BEFORE FETCH IN THUNK')
    let response = await fetch('/api/comments/new', {
        method: "POST",
        body: commentData
    });
    
    if (response.ok) {
        let data = await response.json();
        dispatch(postNewComment(data.comment));
        return null;
    }
}

let initialState = {};

export default function CommentsReducer(state = initialState, action) {
    let newState = {...state}
    switch(action.type) {
        case GET_ALL_COMMENTS:
            action.payload.forEach(comment => newState[comment.id] = comment);
            return newState
        case NEW_COMMENT:
            newState[action.payload.id] = action.payload
            return newState
        default:
            return state
    }
}
