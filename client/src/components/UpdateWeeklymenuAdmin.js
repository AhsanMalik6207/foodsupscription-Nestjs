import React, { useState, useEffect } from 'react';
import { Box, makeStyles, Button, FormControl } from '@material-ui/core';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { weeklymenuFailure, weeklymenuStart, weeklymenuSuccess } from "../redux/weeklymenuRedux";
const useStyle = makeStyles(theme => ({
    container: {
        margin: '70px 100px',
        [theme.breakpoints.down('md')]: {
            marginTop:70 
        },
    },
    paddingadd: {
        padding: '10px 20px',
        borderBottom: "1px solid gray",
        border: "none",
        backgroundColor: "#F0F0F0",
        marginTop: 12
    },
    form: {
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row'
    },
}));
const UpdateWeeklymenu = ({ match }) => {
    const classes = useStyle();
    const dispatch = useDispatch();
    const history = useHistory();
    const [day, setDay] = useState();
    const [date, setDate] = useState();
    const [items, setItems] = useState();
    const admin = useSelector((state) => state.admin.currentAdmin);
    const { isFetching, error } = useSelector((state) => state.weeklymenu);
    const adminid = admin.id;
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`v1/weeklymenu/${match.params.id}`)
            setDay(response.data.day);
            setDate(response.data.date);
            setItems(response.data.items);
            if (response.data.admin.id !== adminid) {
                history.push('/admindashboard')
            }
        }
        fetchData()
    }, [])

    const saveWeeklymenu = async () => {
        await updateWeeklymenu(dispatch, { day, date, items });
    }
    const updateWeeklymenu = async (dispatch, { day, date, items }) => {
        dispatch(weeklymenuStart());
        try {
            const result = await axios.put(`v1/weeklymenu/${match.params.id}`,
                { day, date, items }, {
                headers: {
                    Authorization: "Bearer " + JSON.parse(localStorage.getItem('currentAdmin')).jwt
                }
            }
            );
            dispatch(weeklymenuSuccess(result.data));
            history.push('/admindashboard')
        } catch (err) {
            alert('Weeklymenu not Updated, Something went Wrong!')
            dispatch(weeklymenuFailure());
        }
    };
    return (
        <>
            <Box className={classes.container}>
                <FormControl >
                    <input name='day' defaultValue={day} placeholder="Day" onChange={(e) => setDay(e.target.value)} className={classes.paddingadd} />
                    <input name='date' defaultValue={date} placeholder="Date" onChange={(e) => setDate(e.target.value)} className={classes.paddingadd} />
                    <input name='items' defaultValue={items} placeholder="Items" onChange={(e) => setItems(e.target.value)} className={classes.paddingadd} />
                    <Button onClick={() => saveWeeklymenu()} disabled={isFetching} variant="contained" color="primary">Update</Button>
                </FormControl>
                {error && <Alert severity="error">
                    <AlertTitle>Weeklymenu not Updated</AlertTitle>
                    Something went Wrong!
                </Alert>
                }
            </Box>
        </>
    )
}

export default UpdateWeeklymenu;