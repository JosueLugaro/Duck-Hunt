import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../context/Modal';
import { updateDuckThunk, getAllDucksThunk } from '../store/Ducks';
import './UpdateForm.css';

export default function UpdateForm({ postId, postName, postDescription }) {
    const dispatch = useDispatch();
    const [name, setName] = useState(postName);
    const [description, setDesription] = useState(postDescription);
    const [errors, setErrors] = useState('');
    const { closeModal } = useModal();

    const submitPost = async (e) => {
        e.preventDefault();

        let errors = [];

        if (name.length > 85) errors.push("Name must be 85 characters or less.");
        if (name.length === 0) errors.push("Please provide a name.");
        if (description.length === 0) errors.push("Please provide a description.");

        if (errors.length) {
            setErrors(errors);
            return null;
        }

        setErrors('');
        const formData = new FormData();
        formData.append("description", description)
        formData.append("name", name);

        const data = await dispatch(updateDuckThunk(postId, formData));
        if (data) {
            setErrors(data)
        } else {
            await dispatch(getAllDucksThunk())
            closeModal();
        }
    }


    return (
        <div className="update-form-modal-container">
            <div className="form-container">
                <h1 className="new-post-label">Update post</h1>
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
        </div>
    )
}
