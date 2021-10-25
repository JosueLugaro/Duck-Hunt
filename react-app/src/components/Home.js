import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDucksThunk } from '../store/Ducks';
import Post from './Post';
import './Home.css'

function Home() {
    let dispatch = useDispatch();

    // const [loaded, setLoaded] = useState(false);
    let posts = useSelector(state => state.Ducks.allDucks);

    useEffect(() => {
        dispatch(getAllDucksThunk());
        // setLoaded(true);
    }, [dispatch])

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
                        <Post postId={post}/>
                    ))}
                </div>
            )}
        </>
     );
}

export default Home;
