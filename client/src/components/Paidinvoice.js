import { Button, makeStyles, FormControl, Box, Typography } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import axios from 'axios';
import { paidinvoiceFailure, paidinvoiceStart, paidinvoiceSuccess } from "../redux/paidinvoiceRedux";
import { AddCircle as Add } from '@material-ui/icons';
import { useSelector, useDispatch } from 'react-redux';

const useStyle = makeStyles({
    button: {
        color: '#E1D9D1',
        border: '1px solid #00d5ff',
        marginRight: '10px',
        marginBottom: '10px',
        marginTop: '5px',
        padding: '8px',
        borderRadius: '10px',
        backgroundColor: '#2B547E',
        boxShadow: 'silver 3px 3px 3px 0',
    },
    create: {
        margin: 20,
        width: '85%',
        background: '#6495ED',
        color: '#fff',
    },
    table: {
        border: '1px solid rgba(224, 224, 224, 1)'
    },
    link: {
        textDecoration: 'none',
        color: 'inherit'
    },
    picture: {
        textAlign: 'center',
        display: 'block',
        width: "160px",
        height: "160px",
    },
    paidinvoice: {
        marginTop: 40,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center'
    }
})

const Paidinvoice = () => {
    const classes = useStyle();
    const dispatch = useDispatch();
    const [image, setImage] = useState('');
    const [imageurl, setImageurl] = useState('');
    const [imageurlbef, setImageurlbef] = useState('');
    const user = useSelector((state) => state.user.currentUser);
    const { isFetching, error } = useSelector((state) => state.paidinvoice);
    const url = imageurl ? imageurl : imageurlbef

    useEffect(() => {
        const getImage = async () => {
            if (image) {
                var reader = new FileReader();
                reader.onloadend = function () {
                    setImageurl(reader.result)
                }
                reader.readAsDataURL(image);
            }
        }
        getImage();
    }, [image])
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`v1/paidinvoice/getPaidinvoicebyClientId/${user.id}`)
            const responseimg = await axios.get(`v1/paidinvoice/getImg/${response.data.receipt}`)
            setImageurlbef(responseimg.config.url)
        }
        fetchData()
    }, [])
    const savePaidinvoice = async () => {
        await createPaidinvoice(dispatch, image);
    }
    const createPaidinvoice = async (dispatch, paidinvoice) => {
        dispatch(paidinvoiceStart());
        try {
            const data = new FormData();
            data.append("paidreceipts", image);
            const result = await axios.post(`v1/paidinvoice/upload/${user.id}`,
                data, {
                headers: {
                    Authorization: "Bearer " + JSON.parse(localStorage.getItem('currentUser')).jwt
                }
            }
            );
            dispatch(paidinvoiceSuccess(result.data));
            alert('Invoice Uploaded Successfully!')
        } catch (err) {
            dispatch(paidinvoiceFailure());
        }
    };
    return (
        <>
            <div className={classes.paidinvoice}>
                <div>
                    <img src={url} alt="Paid Receipt" className={classes.picture} />
                </div>
                <FormControl className={classes.form}>
                    <label htmlFor="fileInput">
                     <Typography>Upload Paid Receipt</Typography>
                        <Add className={classes.addIcon} fontSize="large" color="action" />
                    </label>
                    <Box>
                        <input
                            type="file"
                            id="fileInput"
                            style={{ display: "none" }}
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                    </Box>
                    <Button className={classes.button} onClick={() => savePaidinvoice()} disabled={isFetching} variant="contained" color="primary">Upload</Button>
                </FormControl>
                {error &&
                    <Alert severity="error">
                        <AlertTitle>Upload failed!</AlertTitle>
                        Receipt already uploaded or Something went wrong!
                    </Alert>
                }
            </div>
        </>
    )
}

export default Paidinvoice;