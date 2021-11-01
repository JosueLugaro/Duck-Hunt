import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentDuckThunk } from '../store/Ducks';
import { addNewCommentThunk } from '../store/Comments';
import Comment from './Comment';
import './PostDetails.css';

export default function PostDetails({ postId }) {
    const [commentContent, setCommentContent] = useState('');
    const [errors, setErrors] = useState();
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

        let errors = [];

        if (commentContent.length === 0 || commentContent.trim() === '') errors.push("You cannot submit an empty comment");

        if (errors.length) {
            setErrors(errors);
            return null
        }

        const formData = new FormData();
        formData.append("duck_id", postId)
        formData.append("content", commentContent)
        await dispatch(addNewCommentThunk(formData));
        setCommentContent('');
        setErrors()
        return null;
    }

    return (
        <div className="post-details-container">
            <h1 className="duck-name">{currentDuck.name}</h1>
            <div className="media-container">
                <img src={currentDuck.image} className="duck-media" alt="duck"/>
            </div>
            <p className="duck-description">{currentDuck.description}</p>
            {comments.length &&
                <div className="comments-section">
                    <div className="discussion">
                        <p>Discussion</p>
                    </div>
                    <div className="comment-form-container">
                        <form className="comment-input-form">
                            <div className="comment-input-container">
                                <input onClick={(e) => e.stopPropagation()} type="text" placeholder="What do you think of this duck?" className="comment-input" value={commentContent} onChange={(e) => setCommentContent(e.target.value)}/>
                            </div>
                            <button className="comment-submit-button" onClick={submitComment}>
                                <span className="comment-submit-text">Send</span>
                            </button>
                        </form>
                        {errors &&
                                    <div className="comment-errors-container">
                                        { errors.map(e => (
                                            <p key={e}>{e}</p>
                                        ))}
                                    </div>
                        }
                    </div>
                    <div className="comments-container">
                        {comments.reverse().map(comment => (
                            (comment.duck_id === postId) ? <Comment commentId={comment.id} commentContent={comment.content} key={Math.floor(Math.random() * 10000)}/> :null
                        ))}
                    </div>
                </div>
            }
        </div>
    )
}
