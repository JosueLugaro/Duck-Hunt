import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDucksThunk } from '../store/Ducks';
import { useModal } from '../context/Modal';
import PostDetails from './PostDetails';
import './Home.css'

function Home() {
    let dispatch = useDispatch();

    const { toggleModal, setModalContent } = useModal();
    // const [loaded, setLoaded] = useState(false);
    let posts = useSelector(state => state.Ducks.allDucks)
    // let posts = ducks.allDucks;

    useEffect(() => {
        dispatch(getAllDucksThunk());
        // setLoaded(true);
    }, [dispatch])

    function openPostDetailsModal(postId) {
        setModalContent((
            <PostDetails postId={postId}/>
        ))
        toggleModal();
    }

    // if(!loaded) {
    //     console.log("<-------------------------------------")
    //     return null
    // } else {
    //     console.log("IN THE ELSE")
    // }

    return (
        <>
            {posts && (
                <div className="posts-container">
                    {Object.keys(posts).map(post => (
                        <div className="post-container">
                            <div className="post" onClick={() => openPostDetailsModal(posts[post].id)}>
                                <div className="post-image-container">
                                    <img src={posts[post].image} className="post-image" alt="beautiful duck"/>
                                </div>
                                <div className="post-text">
                                    <h2>{posts[post].name}</h2>
                                    <p>{posts[post].description}</p>
                                    <div className="comment-count">Comment count</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
     );
}

export default Home;
