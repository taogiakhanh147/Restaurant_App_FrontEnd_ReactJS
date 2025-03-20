import React from "react";
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiFormControl-root': {
            width: '90%',
            padding: '8px',
            margin: '8px'
        }
    }
}))

export default function Form(props) {
    const classes = useStyles();
    const { children, ...other} = props;
    return (
        <form className={classes.root} noValidate autoComplete="off" {...other}>
            {props.children}
        </form>
    )
}