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
    const [awsErrors, setAWSErrors] = useState('');
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);
    const { closeModal } = useModal();

    const updateFile = (e) => {
        const file = e.target.files[0];
        if (file) setMediaFile(file);
    }

    const submitPost = async (e) => {
        e.preventDefault();
        console.log(mediaFile, "<-------------------------------------------")
        let errors = [];

        const acceptedTypes = ["pdf", "png", "jpg", "jpeg", "gif"];
        let fileArr = mediaFile ? mediaFile.name.split('.') : null;
        let fileType = mediaFile ? fileArr[fileArr.length - 1] : null;

        if (mediaFile && !acceptedTypes.includes(fileType)) errors.push("The file submitted is not an accepted file type, \n please use pdf, png, jpg, jpeg, or gif.");
        if (name.length > 80) errors.push("Name must be 80 characters or less.");
        if (name.length === 0 || name.trim() === "") errors.push("Please provide a name.");
        if (description.length === 0 || description.trim() === "") errors.push("Please provide a description.");
        if (!mediaFile) errors.push ("Please provide a media file(image or gif).");

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
            setAWSErrors(data)
        } else {
            await dispatch(getAllDucksThunk())
            closeModal();
        }
    }

    return (
        <div className="form-container">
            <form className="new-post-form" onSubmit={submitPost}>
                <input
                    type="text"
                    placeholder="What is the name of your duck?"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="name-input"
                    maxLength="80"
                />
                <textarea
                    value={description}
                    onChange={(e) => setDesription(e.target.value)}
                    placeholder="Describe this duck please"
                    className="new-duck-description"
                />
                <div className="file-input-cover-button">
                    <span className="file-input-cover-text">{mediaFile ? `Selected` : "Upload"}</span>
                    <input
                        type="file"
                        id="media-file"
                        placeholder="Show me the duck"
                        className="media-file-input"
                        onChange={updateFile}
                        title=" "
                    />
                </div>
                <button className="new-post-submit-button">
                    <span>{loading ? "Loading" : "Submit"}</span>
                </button>
            </form>
            {errors &&
                <div>
                    {errors.map(e => (
                        <p>{e}</p>
                    ))}
                </div>
            }
            {awsErrors &&
                <div>
                    {awsErrors}
                </div>
            }
        </div>
    )
}
