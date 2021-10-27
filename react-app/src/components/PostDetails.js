import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentDuckThunk } from '../store/Ducks';
import { addNewCommentThunk, getAllCommentsThunk } from '../store/Comments';
import './PostDetails.css';

export default function PostDetails({ postId }) {
    const [commentContent, setCommentContent] = useState('');
    let currentDuck = useSelector(state => state.Ducks.currentDuck);
    let comments = useSelector(state => Object.values(state.Comments));
    let dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            await dispatch(setCurrentDuckThunk(postId))
        })()
    }, [dispatch, postId])


    const submitComment = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("duck_id", postId)
        formData.append("content", commentContent)
        console.log("BEFORE THE THUNK DISPATCH")
        const data = await dispatch(addNewCommentThunk(formData));
        console.log("AFTER THE THUNK DISPATCH")
        setCommentContent('');
        return null;
    }

    return (
        <div className="post-details-container">
            <h1 className="duck-name">{currentDuck.name}</h1>
            <div className="media-container">
                <img src={currentDuck.image} className="duck-media" alt="duck"/>
            </div>
            <p className="duck-description">{currentDuck.description}</p>
            {comments.length && <div className="comments-section">
                <div className="discussion">
                    <p>Discussion</p>
                </div>
                <div className="comment-form-container">
                    <form className="comment-input-form">
                        <input type="text" placeholder="What do you think of this duck?" className="comment-input" value={commentContent} onChange={(e) => setCommentContent(e.target.value)}/>
                        <div className="comment-submit-container" onClick={submitComment}>
                            <p>Send</p>
                        </div>
                    </form>
                </div>
                {comments.reverse().map(comment => (
                    (comment.duck_id === postId) ?
                        <div>
                            {comment.content}
                        </div> :
                        null
                ))}
            </div>}
        </div>
    )
}
