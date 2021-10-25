import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteDuckThunk } from '../store/Ducks';
import { useModal } from '../context/Modal';
import './DeletionConfirmation.css';

export default function DeletionConfirmation({ postId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const confirmation = async (post_id) => {
        await dispatch(deleteDuckThunk(post_id));
    }

    return (
        <div className="deletion-modal-container">
            <h1>Are you sure you want to delete this post?</h1>
            <div className="deletion-options">
                <div
                    className="deletion-option yes"
                    onClick={() => {
                        confirmation(postId)
                        closeModal()
                    }}
                >
                    <h1>Yes</h1>
                </div>
                <div className="deletion-option no" onClick={closeModal}>
                    <h1>No</h1>
                </div>
            </div>
        </div>
    )
}
