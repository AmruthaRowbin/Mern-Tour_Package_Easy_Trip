import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { useDispatch } from 'react-redux';
import { addReview } from '../../redux/features/reviewSlice';

export default function Review({ packageid, ownerid }) {
    console.log("packageid", packageid);
    console.log("ownerid", ownerid);
    const [open, setOpen] = React.useState(false);
    const [reviewText, setReviewText] = React.useState('');
    const dispatch=useDispatch()

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleReviewSubmit = async () => {
        console.log("Submitted Review:", reviewText);
        // axios.post(import.meta.env.VITE_USER_R_ADDREVIEW, { packageid, ownerid, reviewText }).then(() => {
        //     console.log('success');
        // })


        dispatch(addReview({ packageid, ownerid, reviewText }))
        handleClose();
    };

    return (
        <div>
            <Button variant="outlined" style={{ backgroundColor: 'yellow', color: 'black', border: 'none' }} onClick={handleClickOpen}>
                Add Review
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Review</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Enter your review"
                        type="email"
                        fullWidth
                        variant="standard"
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)} // Update the state as the user types
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleReviewSubmit}>Submit</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}