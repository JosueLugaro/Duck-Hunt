import { useState } from 'react'
import { useSelector } from 'react-redux';
import PostDetails from './PostDetails';
import DeletionConfirmation from './DeletionConfirmation';
import { useModal } from '../context/Modal';
import './Post.css';

export default function Post({ postId }) {
    const [isOpen, setIsOpen] = useState('');
    const [mouseOver, setMouseOver] = useState('');
    const { toggleModal, setModalContent } = useModal();

    let currentUser = useSelector(state => state.session.user)
    let posts = useSelector(state => state.Ducks.allDucks)

    function openPostDetailsModal(postId) {
        setModalContent((
            <PostDetails postId={postId}/>
        ))
        toggleModal();
    }

    function openDeletionConfirmationModal(postId) {
        setModalContent((
            <DeletionConfirmation postId={postId}/>
        ))
        toggleModal();
    }

    return (
        <div className="post-container">
            <div
                className="post"
                onClick={() => openPostDetailsModal(posts[postId].id)}
                onMouseOver={() => currentUser.id === posts[postId].user_id ? setMouseOver('mouse-over') : null}
                onMouseLeave={() => currentUser.id === posts[postId].user_id ? setMouseOver('') : null}
            >
                <div className="post-image-container">
                    <img src={posts[postId].image} className="post-image" alt="beautiful duck"/>
                </div>
                <div className="post-text">
                    <h2>{posts[postId].name}</h2>
                    <p>{posts[postId].description}</p>
                    <div className="comment-count">Comment count</div>
                </div>
                <div className="options-container" onMouseLeave={() => setIsOpen('')}>
                    <div
                        className="options-icon-container"
                        onClick={(e) => {
                            e.stopPropagation()
                            return isOpen ? setIsOpen('') : setIsOpen('open')
                        }}
                    >
                        {currentUser.id === posts[postId].user_id ? <span className={`material-icons post-options-icon ${mouseOver}`}>more_horiz</span> : null}
                    </div>
                    <div className={`dropdown-options ${isOpen}`}>
                        <div className="post-option">
                            <p>Edit</p>
                        </div>
                        <div
                            className="post-option"
                            onClick={(e) => {
                                e.stopPropagation()
                                return openDeletionConfirmationModal(postId)
                            }}
                        >
                            <p>Delete</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
