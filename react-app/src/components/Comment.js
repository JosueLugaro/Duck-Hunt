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
    const [commentContent, setCommentContent] = useState();
    const [errors, setErrors] = useState();
    let comment = comments[commentId]

    const deleteComment = async (comment_id) => {
        return await dispatch(deleteCommentThunk(comment_id))
    }

    const updateComment = async (e) => {
        e.preventDefault()

        let errors = [];

        if (commentContent.length === 0 || commentContent.trim() === '') errors.push("You cannot submit an empty comment");

        if (errors.length) {
            setErrors(errors);
            setCommentContent(comment.content)
            return null
        }

        const formData = new FormData();
        formData.append("content", commentContent)
        formData.append("duck_id", currentUser.id)

        await dispatch(updateCommentThunk(commentId, formData))
        setOpenEditor('')
        setCommentContent('')
        setErrors()
        return "comment updated!"
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
                    {   currentUser.id === comment.user_id ?
                        <div className="options-container" onMouseLeave={() => setIsOpen('')}>
                            <div
                                className={`options-icon-container ${openEditor}`}
                                onClick={(e) => {
                                    e.stopPropagation()
                                    return isOpen ? setIsOpen('') : setIsOpen('open')
                                }}
                            >
                                <span className={`material-icons post-options-icon ${mouseOver}`}>more_horiz</span>
                            </div>
                                <div className={`dropdown-options ${isOpen}`}>
                                    <div
                                        className="post-option"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            setCommentContent(comment.content)
                                            setOpenEditor('open')
                                            setIsOpen('')
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
                        : null
                    }
                </div>
                <div className="comment-content">
                    {
                        openEditor ?
                        <form onSubmit={updateComment} className="comment-edit-form">
                            <input type="text" value={commentContent} onChange={(e) => setCommentContent(e.target.value)}/>
                            <button className="comment-update-submit">Update</button>
                            <button className="comment-update-submit" onClick={(e) => {e.preventDefault(); setOpenEditor(''); setErrors()}}>Cancel</button>
                        </form>
                        :
                        comment.content
                    }
                    { errors &&
                        errors.map(e => (
                            <p key={e}>{e}</p>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
