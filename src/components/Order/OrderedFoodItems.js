import { Button, ButtonGroup, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, Paper } from '@mui/material';
import React from 'react'
import DeleteOutlineTwoToneIcon from '@mui/icons-material/DeleteOutlineTwoTone';
import { roundTo2DecimalPoint } from '../../utils';
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(theme => ({
  paperRoot: {
    margin: '15px 0px',
    '&:hover': {
      cursor: 'pointer'
    }
  },
  buttonGroup: {
    backgroundColor: '#E3E3E3',
    borderRadius: 8,
    '& .MuiButtonBase-root' : {
      border: 'none',
      minWidth: '25px',
      padding: '1px'
    },
    '& button:nth-child(2)': {
      fontSize: '1.2em',
      color: '#000'
    }
  },
  deleteButton: { 
    '& .MuiButtonBase-root': {
      color: '#E81719'
    }
  },
  totalPerItem: {
    fontWeight: 'bolder',
    fontSize: '1.2em',
    margin: '0px 10px'
  }
}))

export default function OrderedFoodItems(props) {

  const classes = useStyles();
  const {values, setValues} = props;

  let orderedFoodItems = values.orderDetails;

  const removeFoodItem = (index, id) => {
    let x = {...values};
    x.orderDetails = x.orderDetails.filter((_, i) => i !== index);
    if(id !== 0)
      x.deleteOrderItemIds += id + ',';
    setValues({...x});
  }

  const updateQuantity = (idx, value) => {
    let x = {...values};
    let foodItem = x.orderDetails[idx]
    if(foodItem.quantity + value > 0) {
      foodItem.quantity += value;
      setValues({...x});
    }
  }

  return (
    <List>
      {
        orderedFoodItems.length === 0 ?
        <ListItem>
          <ListItemText
            primary = "Please select food items"
            primaryTypographyProps={{
              style: {
                textAlign: 'center',
                fontStyle: 'italic'
              }
            }}
          />
        </ListItem>
        : orderedFoodItems.map((item,idx) => (
          <Paper key={idx} className={classes.paperRoot}>
            <ListItem>
              <ListItemText
                primary={item.foodItemName}
                primaryTypographyProps={{
                  component: 'h1',
                  style: {
                    fontWeight: '500',
                    fontSize: '1.2em'
                  }
                }}
                secondary = {
                  <>
                    <ButtonGroup 
                      size="small"
                      className={classes.buttonGroup}
                    >
                      <Button
                        onClick={e => updateQuantity(idx, -1)}
                      >
                        -
                      </Button>
                      <Button disabled>{item.quantity}</Button>
                      <Button
                        onClick={e => updateQuantity(idx, 1)}
                      >
                        +
                      </Button>
                    </ButtonGroup>
                    <span className={classes.totalPerItem}>
                      {'$' + roundTo2DecimalPoint(item.quantity * item.foodItemPrice)}
                    </span>
                  </>
                }
                secondaryTypographyProps = {{
                  component: 'div'
                }}
              />
              <ListItemSecondaryAction
                className={classes.deleteButton}
              >
                <IconButton 
                  disableRipple
                  onClick={e => removeFoodItem(idx, item.orderDetailsId)}
                >
                  <DeleteOutlineTwoToneIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </Paper>
        ))
      }
    </List>
  )
}
