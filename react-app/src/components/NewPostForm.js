import { useState } from 'react';
import { getAllDucksThunk } from '../store/Ducks';
import { useModal } from '../context/Modal'
import { useDispatch } from 'react-redux';
import { addNewDuckThunk } from '../store/Ducks';
import './NewPostForm.css'


export default function NewPostForm() {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [mediaFile, setMediaFile] = useState('');
    const [description, setDesription] = useState('');
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);
    const { closeModal } = useModal();

    const updateFile = (e) => {
        const file = e.target.files[0];
        if (file) setMediaFile(file);
    }

    const submitPost = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", mediaFile)
        formData.append("description", description)
        formData.append("name", name);

        setLoading(true);

        const data = await dispatch(addNewDuckThunk(formData));
        setLoading(false);
        if (data) {
            setErrors(data)
        } else {
            await dispatch(getAllDucksThunk())
            closeModal();
        }
    }

    return (
        <div className="form-container">
            <span className="new-post-label">New post</span>
            <form className="new-post-form" onSubmit={submitPost}>
                <label>
                    Name:
                    <input
                        type="text"
                        placeholder="What is the name of your duck?"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="name-input"
                    />
                </label>
                <label>
                    Description:
                    <textarea
                        value={description}
                        onChange={(e) => setDesription(e.target.value)}
                        placeholder="Describe this duck please"
                    />
                </label>
                <label htmlFor="media-file">
                    Duck pic:
                    <input
                        type="file"
                        id="media-file"
                        placeholder="Show me the duck"
                        className="media-file-input"
                        onChange={updateFile}
                        title=" "
                    />
                </label>

                <button>Submit!</button>
            </form>
        </div>
    )
}
