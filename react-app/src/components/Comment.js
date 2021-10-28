import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteCommentThunk, updateCommentThunk } from '../store/Comments';
import './Comment.css';

export default function Comment({ commentId }) {
    const dispatch = useDispatch();
    let currentUser = useSelector(state => state.session.user);
    let comments = useSelector(state => state.Comments);
    const [isOpen, setIsOpen] = useState('');
    const [mouseOver, setMouseOver] = useState('');
    const [openEditor, setOpenEditor] = useState('');
    let comment = comments[commentId]
    const [commentContent, setCommentContent] = useState(comment.content);

    const deleteComment = async (comment_id) => {
        return await dispatch(deleteCommentThunk(comment_id))
    }

    const updateComment = async (e) => {
        e.preventDefault()

        const formData = new FormData();
        formData.append("content", commentContent)
        formData.append("duck_id", currentUser.id)

        await dispatch(updateCommentThunk(commentId, formData))
        setOpenEditor('')
        return "comment updated!";
    }

    return (
        <div
            className="comment"
            onMouseOver={() => currentUser.id === comment.user_id ? setMouseOver('mouse-over') : null}
            onMouseLeave={() => currentUser.id === comment.user_id ? setMouseOver('') : null}
        >
            <div className="comment-user-profile-pic-container">
                <img src={comment.user.profile_pic} alt="user-profile-pic"className="comment-user-profile-pic"/>
            </div>
            <div className="everything-but-the-user-profile-pic">
                <div className="username-and-options-container">
                    <div className="comment-username">{comment.user.username}</div>
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
                                    setOpenEditor('open')
                                    setIsOpen('')
                                    // return openUpdateFormModal(post.id)
                                }}
                            >
                                <p>Edit</p>
                            </div>
                            <div
                                className="post-option"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    return deleteComment(commentId)
                                }}
                            >
                                <p>Delete</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/*
                    To make the input appear when the edit dropdown option is clicked:
                    where the content is rendered, conditionally render either the content or a form and input field
                    which contains the comments content based on a state variable
                */}
                <div className="comment-content">
                    {
                        openEditor ?
                        <form onSubmit={updateComment}>
                            <input type="text" value={commentContent} onChange={(e) => setCommentContent(e.target.value)}/>
                            <button>Update</button>
                        </form>
                        :
                        comment.content
                    }
                </div>
            </div>
        </div>
    )
}
