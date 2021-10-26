import { useState } from 'react';
import { getAllDucksThunk } from '../store/Ducks';
import { useModal } from '../context/Modal';
import { useDispatch } from 'react-redux';
import { addNewDuckThunk } from '../store/Ducks';
import './NewPostForm.css'


export default function NewPostForm() {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [mediaFile, setMediaFile] = useState('');
    const [description, setDesription] = useState('');
    const [errors, setErrors] = useState('');
    const [loading, setLoading] = useState(false);
    const { closeModal } = useModal();

    const updateFile = (e) => {
        const file = e.target.files[0];
        if (file) setMediaFile(file);
    }

    const submitPost = async (e) => {
        e.preventDefault();

        let errors = [];

        const acceptedTypes = ["pdf", "png", "jpg", "jpeg", "gif"];
        let fileArr = mediaFile ? mediaFile.name.split('.') : null;
        let fileType = mediaFile ? fileArr[fileArr.length - 1] : null;

        if (!mediaFile) errors.push("Please provide a media file.");
        if (mediaFile && !acceptedTypes.includes(fileType)) errors.push("The file submitted is not an accepted file type, \n please use pdf, png, jpg, jpeg, or gif.");
        if (name.length > 85) errors.push("Name must be 85 characters or less.");
        if (name.length === 0) errors.push("Please provide a name.");
        if (description.length === 0) errors.push("Please provide a description.");
        if (!mediaFile) errors.push ("Please provide media(image, video, or gif).");

        if (errors.length) {
            setErrors(errors);
            return null;
        }

        setErrors('');
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
            {errors &&
                <div>
                    {errors.map(e => (
                        <p>{e}</p>
                    ))}
                </div>
            }
        </div>
    )
}
