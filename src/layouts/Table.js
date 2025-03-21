import { TableContainer } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
    table: {
        '& tbody td': {
            fontWeigth: '300'
        },
        '& tbody tr:hover': {
            backgroundColor: '#fffbf2',
            cursor: 'pointer'
        },
        '& .MuiTableCell-root': {
            border: 'none'
        }
    }
}));

export default function Table(props) {
    const classes = useStyles();  

    return (
        <TableContainer className={classes.table}>
            {props.children}
        </TableContainer>
    )
}