import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { paymentFailure, paymentStart, paymentSuccess } from "../redux/paymentRedux";
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles, FormControl, Typography, MenuItem, InputLabel, Select, Button } from '@material-ui/core';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));
const useStyle = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
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
}));

export default function Weeklymenu() {
    const classes = useStyle();
    const user = useSelector((state) => state.user.currentUser);
    const { isFetching, error } = useSelector((state) => state.payment);
    const history = useHistory();
    const dispatch = useDispatch()
    const [price, setPrice] = useState();
    const [paymenttype, setPaymenttype] = useState();
    const [postdata, setPostdata] = useState([]);
    const [success, setSuccess] = useState(false);
    const [paymentvariation, setPaymentvariation] = useState('');
    const [open, setOpen] = React.useState(false);
    const handleMenu = (event) => {
        setPaymentvariation(event.target.value);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };
    useEffect(() => {
        if (!user) {
            history.push('/login')
        }
        const fetchData = async () => {
            const response = await axios.get(`v1/weeklymenu/getAll`)
            setPostdata(response.data);
            console.log(response.data)
        }
        fetchData()
    }, [])
    useEffect(() => {
        if (paymentvariation === 1) {
            setPrice(1000);
            setPaymenttype("Weekly")
        } else if (paymentvariation === 2) {
            setPrice(2000);
            setPaymenttype("Bi-Weekly")
        } else if (paymentvariation === 3) {
            setPrice(4000);
            setPaymenttype("Monthly")
        }
    }, [paymentvariation])
    const savePayment = async () => {
        await createPayment(dispatch, { paymenttype, price });
    }
    const createPayment = async (dispatch, { paymenttype, price }) => {
        dispatch(paymentStart());
        try {
            const result = await axios.post(`v1/payment/create/${user.id}`,
                { paymenttype, price }, {
                headers: {
                    Authorization: "Bearer " + JSON.parse(localStorage.getItem('currentUser')).jwt
                }
            }
            );
            dispatch(paymentSuccess(result.data));
            setSuccess(true);
        } catch (err) {
            dispatch(paymentFailure());
        }
    };
    return (
        <>
            <Typography variant='h6'>
                <b>Weekly Lunch Menu</b>
            </Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Day</StyledTableCell>
                            <StyledTableCell align="right">Date</StyledTableCell>
                            <StyledTableCell align="right">Items</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {postdata.map((row) => (
                            <StyledTableRow key={row.day}>
                                <StyledTableCell component="th" scope="row">
                                    {row.day}
                                </StyledTableCell>
                                <StyledTableCell align="right">{row.date}</StyledTableCell>
                                <StyledTableCell align="right">{row.items}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <div>
                <br /><br />
                <Typography variant='h6'>
                    <b>Select Payment Variation to Subscribe</b>
                </Typography>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-controlled-open-select-label">Category</InputLabel>
                    <Select
                        labelId="demo-controlled-open-select-label"
                        id="demo-controlled-open-select"
                        open={open}
                        onClose={handleClose}
                        onOpen={handleOpen}
                        value={paymentvariation}
                        onChange={handleMenu}
                    >
                        <MenuItem value={1}>Weekly</MenuItem>
                        <MenuItem value={2}>Bi-Weekly</MenuItem>
                        <MenuItem value={3}>Monthly</MenuItem>
                    </Select>
                    <br />
                    <Typography align='center'>
                        <b>Payment Type:</b> {paymenttype ? paymenttype : "none"}
                    </Typography>
                    <Typography align='center'>
                        <b>Amount to Pay:</b> {price ? `${price} PKR` : "0 PKR"}
                    </Typography>
                    <Button className={classes.button} onClick={() => savePayment()} disabled={isFetching} variant="contained" color="primary">Subscribe</Button>
                </FormControl>
                {success &&
                    <Alert severity="success">
                        <AlertTitle>Subscription Succeed!</AlertTitle>
                        You have successfully Subscribed. Kindly upload Paid Receipt of the due amount with in 2 Days otherwise your Subscription will be cancelled.
                    </Alert>
                }
                {error &&
                    <Alert severity="error">
                        <AlertTitle>Subscription failed!</AlertTitle>
                        You have already Subscribed or Something went Wrong.
                    </Alert>
                }
            </div>
        </>
    );
}