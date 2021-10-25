import React from 'react';
import './DeletionConfirmation.css';

export default function DeletionConfirmation({ postId }) {

    return (
        <div className="deletion-modal-container">
            <h1>Are you sure you want to delete this post?</h1>
            <div className="deletion-options">
                <div className="deletion-option yes">
                    <h1>Yes</h1>
                </div>
                <div className="deletion-option no">
                    <h1>No</h1>
                </div>
            </div>
        </div>
    )
}
