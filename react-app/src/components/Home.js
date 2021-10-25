import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDucksThunk } from '../store/Ducks';
import Post from './Post';
import './Home.css'

function Home() {
    let dispatch = useDispatch();

    // const [loaded, setLoaded] = useState(false);
    let posts = useSelector(state => Object.values(state.Ducks.allDucks));

    // useEffect(() => {
    //     (async () => {
    //         await dispatch(getAllDucksThunk());
    //     })()
    //     setLoaded(true);
    // }, [dispatch])

    console.log(posts);

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
                    {posts.map(post => (
                        <Post post={post}/>
                    ))}
                </div>
            )}
        </>
     );
}

export default Home;
