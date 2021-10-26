import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentDuckThunk } from '../store/Ducks';
import './PostDetails.css';

export default function PostDetails({ postId }) {
    let dispatch = useDispatch();

    let currentDuck = useSelector(state => state.Ducks.currentDuck);

    useEffect(() => (
        dispatch(setCurrentDuckThunk(postId))
    ), [dispatch, postId])

    return (
        <div className="post-details-container">
            <h1 className="duck-name">{currentDuck.name}</h1>
            <div className="media-container">
                <img src={currentDuck.image} className="duck-media" alt="duck"/>
            </div>
            <p className="duck-description">{currentDuck.description}</p>
            <div className="comments-section"></div>
        </div>
    )
}
