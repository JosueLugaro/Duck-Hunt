import { useSelector } from 'react-redux';
import Post from './Post';
import './Home.css'

function Home() {
    // const [loaded, setLoaded] = useState(false);
    let posts = useSelector(state => Object.values(state.Ducks.allDucks));

    // useEffect(() => {
    //     (async () => {
    //         await dispatch(getAllDucksThunk());
    //     })()
    //     setLoaded(true);
    // }, [dispatch])

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
