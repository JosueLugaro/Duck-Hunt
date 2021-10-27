import { useState } from 'react';
import { useSelector } from 'react-redux';
import './Comment.css';

export default function Comment({ commentId }) {
    let currentUser = useSelector(state => state.session.user);
    let comments = useSelector(state => state.Comments);
    const [isOpen, setIsOpen] = useState('');
    const [mouseOver, setMouseOver] = useState('');
    let comment = comments[commentId]

    return (
        <div
            className="comment"
            onMouseOver={() => currentUser.id === comment.user_id ? setMouseOver('mouse-over') : null}
            onMouseLeave={() => currentUser.id === comment.user_id ? setMouseOver('') : null}
        >
            <div className="user-info">
                <img src={comment.user.profile_pic} alt="user-profile-pic"className="comment-user-profile-pic"/>
            </div>
            <div>
                <div className="comment-username">{comment.user.username}</div>
                <div className="comment-content">
                    {comment.content}
                </div>
            </div>
            <div className="options-container" onMouseLeave={() => setIsOpen('')}>
                <div
                    className="options-icon-container"
                    onClick={(e) => {
                        e.stopPropagation()
                        return isOpen ? setIsOpen('') : setIsOpen('open')
                    }}
                >
                    {currentUser.id === comment.user_id ? <span className={`material-icons post-options-icon ${mouseOver}`}>more_horiz</span> : null}
                </div>
                <div className={`dropdown-options ${isOpen}`}>
                    <div
                        className="post-option"
                        onClick={(e) => {
                            e.stopPropagation()
                            // return openUpdateFormModal(post.id)
                        }}
                    >
                        <p>Edit</p>
                    </div>
                    <div
                        className="post-option"
                        onClick={(e) => {
                            e.stopPropagation()
                            // return openDeletionConfirmationModal(post.id)
                        }}
                    >
                        <p>Delete</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
