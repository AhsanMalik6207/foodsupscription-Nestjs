import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { CSVLink } from "react-csv";
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { Typography, Button, Box, FormControl, Grid, Paper } from "@material-ui/core";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { weeklymenuFailure, weeklymenuStart, weeklymenuSuccess } from "../redux/weeklymenuRedux";
import { useDispatch, useSelector } from 'react-redux';
import WeeklymenuAdmin from "./WeeklymenuAdmin";

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

const useStyles = makeStyles({
    table: {
        minWidth: 650
    },
    tablecell: {
        border: "1px solid #dddddd"
    },
    tableheading: {
        marginTop: 85
    },
    text: {
        color: "#878787",
        fontSize: 10,
    },
    paddingadd: {
        padding: '10px 20px',
        borderBottom: "1px solid gray",
        border: "none",
        backgroundColor: "#F0F0F0",
        marginTop: 12
    },
    typo: {
        marginTop: 12
    }
});
const Admindashboard = () => {
    const history=useHistory();
    const classes = useStyles();
    const dispatch = useDispatch()
    const [usernames, setUsernames] = useState([]);
    const [weeklymenudata, setWeeklymenudata] = useState([]);
    const [day, setDay] = useState();
    const [date, setDate] = useState();
    const [items, setItems] = useState();
    const admin = useSelector((state) => state.admin.currentAdmin);
    const weeklymenu = useSelector((state) => state.weeklymenu.currentWeeklymenu);
    const { isFetching, error } = useSelector((state) => state.weeklymenu);
    const headers = [
        { label: "Full Name", key: "fullName" },
    ];
    const users = usernames.map(data => ({ fullName: data }))
    const csvReport = {
        data: users,
        headers: headers,
        filename: 'Subscribed_Users_Report.csv'
    };
    useEffect(() => {
        if (!admin) {
            history.push('/adminlogin')
        }
        const fetchData = async () => {
            const response = await axios.get(`v1/paidinvoice/getAll`)
            const object = {}
            let i = 0
            while (i < response.data.length) {
                const str1 = response.data[i].client.name
                object[`ptr` + i] = str1
                i++;
            }
            let usernames = Object.values(object);
            setUsernames(usernames)
        }
        fetchData()
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`v1/weeklymenu/getAll`)
            setWeeklymenudata(response.data);
        }
        fetchData()
    }, [weeklymenu])
    const saveWeeklymenu = async () => {
        await createWeeklymenu(dispatch, { day, date, items });
    }
    const createWeeklymenu = async (dispatch, { day, date, items }) => {
        dispatch(weeklymenuStart());
        try {
            const result = await axios.post(`v1/weeklymenu/upload/${admin.id}`,
                { day, date, items }, {
                headers: {
                    Authorization: "Bearer " + JSON.parse(localStorage.getItem('currentAdmin')).jwt
                }
            }
            );
            dispatch(weeklymenuSuccess(result.data));
        } catch (err) {
            alert('Weeklymenu not Created, Something went Wrong!')
            dispatch(weeklymenuFailure());
        }
    };
    return (
        <>
            <Typography variant="h4" className={classes.tableheading}>Admin Dashboard</Typography>
            <Typography variant="h6">
                List of Subscribed users
            </Typography>
            <TableContainer component={Paper}>
                <Table aria-label="simple table" className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell><b>Names</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {usernames.map((row) => (
                            <StyledTableRow key={row}>
                                <StyledTableCell component="th" scope="row">
                                    {row}
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Typography className={classes.typo} variant="h6">
                Export Subscribed Usernames to CSV
            </Typography>
            <CSVLink {...csvReport}>Download</CSVLink>
            <Typography className={classes.typo} variant="h6">
                Upload Weekly Menu
            </Typography>
            <Box className={classes.container}>
                <FormControl >
                    <input name='day' placeholder="Day" onChange={(e) => setDay(e.target.value)} className={classes.paddingadd} />
                    <input name='date' placeholder="yyyy-mm-dd" onChange={(e) => setDate(e.target.value)} className={classes.paddingadd} />
                    <input name='items' placeholder="Items" onChange={(e) => setItems(e.target.value)} className={classes.paddingadd} />
                    <Button onClick={() => saveWeeklymenu()} disabled={isFetching} variant="contained" color="primary" style={{ width: '100%', marginTop: 10 }}>Add</Button>
                </FormControl>
                {error &&
                    <Alert severity="error">
                        <AlertTitle>weeklymenu not Created</AlertTitle>
                        Something went Wrong!
                    </Alert>
                }
            </Box>
            {weeklymenudata.map((weeklymenu) => (
                <Grid item lg={3} sm={4} xs={12}>
                    <WeeklymenuAdmin weeklymenu={weeklymenu} />
                </Grid>
            ))
            }
        </>
    );
};

export default Admindashboard;
