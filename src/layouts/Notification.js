import { Alert, Snackbar } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(theme => ({
    root: {
        top: '72px',
        '& .MuiAlert-root': {
            backgroundColor: '#f3b33d',
            color: '#000'
        },
        '& .MuiAlert-icon': {
            color: '#000'
        }
    }
}))

export default function Notification(props) {
    
    const {notify, setNotify} = props;
    const classes = useStyles();

    const handleClose = (event, reason) => {
        if(reason === 'clickaway') {
            return;
        }
        setNotify({
            ...notify,
            isOpen: false
        })
    }

    return (
        <Snackbar
            autoHideDuration={3000}
            className={classes.root}
            open={notify.isOpen}
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            onClose={handleClose}
        >
            <Alert
                onClose={handleClose}
            >
                {notify.message}
            </Alert>
        </Snackbar>
    )
}