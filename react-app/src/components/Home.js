import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDucksThunk } from '../store/Ducks';
import './Home.css'

function Home() {
    let dispatch = useDispatch();

    let posts = useSelector(state => state.Ducks.allDucks)

    useEffect(() => {
        dispatch(getAllDucksThunk())
    }, [dispatch])

    return (
        <>
            <div className="posts-container">
                {posts.map(post => (
                    <div className="post-container">
                        <div className="post">
                            <div className="post-image-container">
                                <img src={post.image} className="post-image" alt="beautiful duck"/>
                            </div>
                            <div className="post-text">
                                <h2>{post.name}</h2>
                                <p>{post.description}</p>
                                <div className="comment-count">Comment count</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
     );
}

export default Home;
