let GET_ALL_COMMENTS = 'comments/GET_ALL_COMMENTS';
let NEW_COMMENT = 'comments/NEW_COMMENT';
let DELETE_COMMENT = 'comments/DELETE_COMMENT';

const setAllComments = (comments) => ({
    type: GET_ALL_COMMENTS,
    payload: comments
})

const postNewComment = (commentData) => ({
    type: NEW_COMMENT,
    payload: commentData
})

const deleteComment = (commentId) => ({
    type: DELETE_COMMENT,
    payload: commentId
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

export const deleteCommentThunk = (commentId) => async(dispatch) => {
    let response = await fetch(`/api/comments/${commentId}/delete`);

    if (response.ok) {
        dispatch(deleteComment(commentId))
    }
}

export const updateCommentThunk = (commentId, commentData) => async(dispatch) => {
    let response = await fetch(`/api/comments/${commentId}/update`, {
        method: "POST",
        body: commentData
    })

    if (response.ok) {
        await dispatch(getAllCommentsThunk())
        return "Update successful!"
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
        case DELETE_COMMENT:
            delete newState[action.payload]
            return newState
        default:
            return state
    }
}
