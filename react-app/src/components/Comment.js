import React from 'react';
import { useSelector } from 'react-redux';
import './Comment.css';

export default function Comment({ commentId }) {
    let comments = useSelector(state => state.Comments);

    return (
        <div className="comment">
            <div className="user-info">
                <img src={comments[commentId].user.profile_pic} alt="user-profile-pic"className="comment-user-profile-pic"/>
            </div>
            <div>
                <div className="comment-username">{comments[commentId].user.username}</div>
                <div className="comment-content">
                    {comments[commentId].content}
                </div>
            </div>
        </div>
    )
}
