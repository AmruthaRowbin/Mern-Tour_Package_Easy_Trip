import React, { useState, useEffect } from 'react';
import {
    MDBCard,
    MDBCardBody,
    MDBValidation,
    MDBBtn,
    MDBInput,
    MDBValidationItem
} from 'mdb-react-ui-kit';
import ChipInput from 'material-ui-chip-input';
import FileBase from 'react-file-base64';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { createTour, editTours, getCategory } from '../../redux/features/tourSlice';

const initialState = {
    title: '',
    description: '',
    tags: [],
    city: '',
    price: '',
    dayone: '',
    daytwo: '',
    
    imageFile: null
};

const AddTour = () => {
    const [tourData, setTourData] = useState({
        ...initialState,
        category: ''  // Initialize category in your state
    });
    
    const { error, agentTours,categories } = useSelector((state) => ({ ...state.tour }));
    const { agent } = useSelector((state) => ({ ...state.auth }));
    const { id } = useParams();
    console.log(categories,"aaaaaaaaaaa")

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
        dispatch(getCategory())
    },[dispatch])

    const { title, description, tags, city, price, dayone, daytwo, category} = tourData;

    const [validation, setValidation] = useState({
        title: false,
        city: false,
        price: false,
        description: false,
        dayone: false,
        daytwo: false,
        imageFile: false
    });

    useEffect(() => {
        if (id) {
            const singleTour = agentTours.find((tour) => tour._id === id);
            setTourData({ ...singleTour });
        }
    }, [id, agentTours]);

    useEffect(() => {
        error && toast.error(error);
    }, [error]);

    const validateImage = () => {
        const isValid = !!tourData.imageFile;
        setValidation((prevState) => ({
            ...prevState,
            imageFile: !isValid
        }));
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const isImageValid = validateImage();

        if (
            title &&
            description &&
            tags.length > 0 &&
            city &&
            price &&
            dayone &&
            daytwo &&
            isImageValid
        ) {
            const updatedTourData = { ...tourData, name: agent?.result?.name };

            if (!id) {
                dispatch(createTour({ updatedTourData, navigate, toast }));
            } else {
                dispatch(editTours({ id, updatedTourData, toast, navigate }));
            }

            handleClear();
        } else {
            toast.error('Please fill in all required fields and select an image.');
        }
    };

    const onInputChange = (e) => {
        const { name, value } = e.target;
        setTourData({ ...tourData, [name]: value });
        setValidation((prevState) => ({
            ...prevState,
            [name]: value.trim() === ''
        }));
    };

    const handleAddTag = (tag) => {
        setTourData({ ...tourData, tags: [...tourData.tags, tag] });
    };

    const handleDeleteTag = (deleteTag) => {
        setTourData({
            ...tourData,
            tags: tourData.tags.filter((tag) => tag !== deleteTag)
        });
    };

    const handleClear = () => {
        setTourData(initialState);
        setValidation({
            title: false,
            city: false,
            price: false,
            description: false,
            dayone: false,
            daytwo: false,
            imageFile: false
        });
    };





    return (
        <div style={{
            margin: "auto",
            padding: "15px",
            maxWidth: "450px",
            alignContent: "center",
            marginTop: "120px"
        }} className='container'>

            <MDBCard alignment='center'>
                <h5>{id ? "Update Tour" : "Add Tour"}</h5>
                <MDBCardBody>
                    <MDBValidation onSubmit={handleSubmit} className='row g-3' noValidate>
                        <div className='col-md-12'>
                            <MDBValidationItem feedback="please enter the title" invalid>
                                <MDBInput
                                    placeholder='title'
                                    type='text'
                                    value={title}
                                    name='title'
                                    onChange={onInputChange}
                                    className='form-control'
                                    required
                                    invalid={validation.title}
                                    validation="please provide title"



                                />
                            </MDBValidationItem>

                        </div>
                        <div className='col-md-12'>
                            <MDBValidationItem feedback="please enter the city" invalid>
                                <MDBInput
                                    placeholder='city'
                                    type='text'
                                    value={city}
                                    name='city'
                                    onChange={onInputChange}
                                    className='form-control'
                                    required
                                    invalid={validation.city}
                                    validation="please provide title"



                                />
                            </MDBValidationItem>

                        </div>

                        <div className='col-md-12'>
                <MDBValidationItem feedback="please select a category" invalid={validation.category}>
                    <select
                        name="category"
                        value={category}
                        onChange={onInputChange}
                        className='form-select'
                        required
                    >
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                            <option key={category.title} value={category.title}>
                                {category.title}
                            </option>
                        ))}
                    </select>
                </MDBValidationItem>
            </div>

                        <div className='col-md-12'>
                            <MDBValidationItem feedback="please enter the price" invalid>
                                <MDBInput
                                    placeholder='price'
                                    type='text'
                                    value={price}
                                    name='price'
                                    onChange={onInputChange}
                                    className='form-control'
                                    required
                                    invalid={validation.price}
                                    validation="please provide title"



                                />
                            </MDBValidationItem>

                        </div>
                        <div className='col-md-12'>
                            <MDBValidationItem feedback="please enter the description" invalid>
                                <MDBInput
                                    placeholder='description'
                                    type='text'

                                    value={description}
                                    name='description'
                                    onChange={onInputChange}
                                    className='form-control'
                                    required
                                    invalid={validation.description}
                                    textarea
                                    rows={4}
                                    validation="please provide title"
                                />
                            </MDBValidationItem>

                        </div>
                        <div className='col-md-12'>
                            <MDBValidationItem feedback="please enter day1 description" invalid>
                                <MDBInput
                                    placeholder='dayone'
                                    type='text'

                                    value={dayone}
                                    name='dayone'
                                    onChange={onInputChange}
                                    className='form-control'
                                    required
                                    invalid={validation.dayone}
                                    textarea
                                    rows={4}
                                    validation="please provide title"
                                />
                            </MDBValidationItem>

                        </div>
                        <div className='col-md-12'>
                            <MDBValidationItem feedback="please enter day2 description" invalid>
                                <MDBInput
                                    placeholder='daytwo'
                                    type='text'

                                    value={daytwo}
                                    name='daytwo'
                                    onChange={onInputChange}
                                    className='form-control'
                                    required
                                    invalid={validation.daytwo}
                                    textarea
                                    rows={4}
                                    validation="please provide title"
                                />
                            </MDBValidationItem>

                        </div>

                        <div className='col-md-12'>
                            <MDBValidationItem feedback="please enter the tags" invalid>
                                <ChipInput
                                    name="tags"
                                    varient="outlined"
                                    placeholder='Enter tag'
                                    fullWidth
                                    value={tags}
                                    onAdd={(tag) => handleAddTag(tag)}
                                    onDelete={(tag) => handleDeleteTag(tag)}

                                />
                            </MDBValidationItem>
                        </div>



                        <div className='d-flex justify-content-start'>
                            <FileBase type='file' multiple={false} onDone={(({ base64 }) => setTourData({ ...tourData, imageFile: base64 }))} />
                        </div>
                        {tourData.imageFile && (
                            <div className='d-flex justify-content-center mt-3'>
                                <img src={tourData.imageFile} alt='Image Preview' style={{ maxWidth: '100%', maxHeight: '200px' }} />
                            </div>
                        )}

                        {validation.imageFile && (
                            <div className='text-danger'>Please select an image.</div>
                        )}
                        <div className='col-12'>
                            <MDBBtn style={{ width: "100%" }}>{id ? "Update" : "Submit"}</MDBBtn>
                            <MDBBtn style={{ width: "100%" }} className='mt-2' color='danger' onClick={handleClear}>Clear</MDBBtn>
                        </div>

                    </MDBValidation>
                </MDBCardBody>

            </MDBCard>


        </div>
    )
}

export default AddTour