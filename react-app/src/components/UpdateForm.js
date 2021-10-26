import React from 'react';
import './UpdateForm.css';

export default function UpdateForm({ postId }) {
    return (
        <div className="update-form-modal-container">
            <h1>This is the update form! {postId}</h1>
        </div>
    )
}
