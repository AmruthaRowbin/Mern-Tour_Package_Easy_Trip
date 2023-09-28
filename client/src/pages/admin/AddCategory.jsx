import React, { useState } from 'react';
import './AddCategory.scss';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { adminaddCategory } from '../../redux/features/categorySlice';

const AddCategory = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    const validationErrors = {};

    if (!title.trim()) {
      validationErrors.title = 'Title is required';
    }

    if (!description.trim()) {
      validationErrors.description = 'Description is required';
    }

   
    if (!/^[a-zA-Z\s]*$/.test(title)) {
      validationErrors.title = 'Title should not contain numbers or special characters';
    }


    if (!/^[a-zA-Z\s]*$/.test(description)) {
      validationErrors.description = 'Description should not contain numbers or special characters';
    }


    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const categoryData = { title, description };
    dispatch(adminaddCategory({ updatedTourData: categoryData, navigate, toast }));

    setTitle('');
    setDescription('');
    setErrors({});
  };

  return (
    <div className="add-category">
      <h2>Add Category</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
           
          />
          {errors.title && <div className="error" style={{ color: 'red' }}>{errors.title}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          
          />
          {errors.description && <div className="error" style={{ color: 'red' }}>{errors.description}</div>}
        </div>
        <button type="submit">Add Category</button>
      </form>
    </div>
  );
};

export default AddCategory;
