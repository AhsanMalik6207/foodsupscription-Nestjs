import { makeStyles, Box, Typography } from "@material-ui/core";
import { Edit, Delete } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
const useStyle = makeStyles({
    container: {
        borderRadius: 5,
        margin: 10,
        display: "flex",
        marginTop: 16,
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        backgroundColor: 'white',
        alignItems: "center",
        flexDirection: "column",
        transition: '0.2s',
        height: 80,

        "& > *": {
            padding: "0 0px 0px 0px",
        },
        "&:hover": {
            boxShadow:
                "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px",
            transition: '0.2s',
            transform: " scale(0.9)",
            textDecoration: 'none'
        },
    },
    text: {
        textAlign: "center",
        fontSize: 12,
        textDecoration: 'none'
    },
    icon: {
        " &:hover": {
            backgroundColor: "#f2f2f2",
        },
    },
});

const WeeklymenuAdmin = ({ weeklymenu }) => {
    const classes = useStyle();
    let history = useHistory()
    const [flag, setFlag] = useState(false);
    const admin = useSelector((state) => state.admin.currentAdmin);
    console.log(weeklymenu)
    useEffect(() => {
        if (admin) {
            setFlag(true);
        }
    }, []);
    const deleteWeeklymenu = async (e) => {
        e.preventDefault();
        try {
            await axios.delete(
                `v1/weeklymenu/${weeklymenu.id}`,
                {
                    headers: {
                        Authorization:
                            "Bearer " +
                            JSON.parse(localStorage.getItem("currentAdmin")).jwt,
                    },
                }
            );
            history.push("/admindashboard");
        } catch (error) {
            console.log("Error while calling deleteWeeklymenu API ", error);
        }
    };
    return (
        <Box className={classes.container}>
            <Typography className={classes.text}>Day:{weeklymenu.day}</Typography>
            <Typography className={classes.text}>Date:{weeklymenu.date}</Typography>
            <Typography className={classes.text}>Items:{weeklymenu.items}</Typography>
            {flag ? (
                admin.id === weeklymenu.admin.id ? (
                    <Box>
                        <Link to={`/updateweeklymenu/${weeklymenu.id}`}>
                            <Edit className={classes.icon} color="primary" />
                        </Link>
                        <Link>
                            <Delete
                                onClick={deleteWeeklymenu}
                                className={classes.icon}
                                color="error"
                            />
                        </Link>
                    </Box>
                ) : null
            ) : null}
        </Box>
    );
};
export default WeeklymenuAdmin;