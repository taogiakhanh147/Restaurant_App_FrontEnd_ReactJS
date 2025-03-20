import React, { useEffect, useState } from 'react'
import Form from '../../layouts/Form'
import { ButtonGroup, Grid, InputAdornment, Button as MuiButton } from '@mui/material'
import {Button, Select, Input} from "../../controls"
import { makeStyles } from "@mui/styles";
import ReplayIcon from '@mui/icons-material/Replay';
import RestaurantTwoToneIcon from '@mui/icons-material/RestaurantTwoTone';
import ReorderIcon from '@mui/icons-material/Reorder';
import { createAPIEndpoint, ENDPOINTS } from '../../api';
import { roundTo2DecimalPoint } from '../../utils';

const pMethods = [
  {id: 'none', title: 'Select'},
  {id: 'Cash', title: 'Cash'},
  {id: 'Card', title: 'Card'},
]

const useStyles = makeStyles(theme => ({
  adornmentText: {
    '& .MuiTypography-root': {
      color: '#1976d2',
      fontWeight: 'bolder',
      fontSize: '1.5em'
    }
  },
  submitButtonGroup: {
    margin: '8px',
    '& .MuiButton-label' : {
      textTransform: 'none'
    }
  }
}))

export default function OrderForm(props) {

  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange
  } = props;
  const classes = useStyles();
  const [customerList, setCustomerList] = useState([]);

  useEffect(() => {
    createAPIEndpoint(ENDPOINTS.CUSTOMER).fetchAll()
    .then(res => {
      let customerList = res.data.map(item => ({
        id: item.customerId,
        title: item.customerName
      }));
      customerList = [{id: 0, title: 'Select'}].concat(customerList);
      setCustomerList(customerList);
    })
    .catch(error => console.log(error))
  }, [])

  useEffect(() => {
    let gTotal = values.orderDetails.reduce((tempTotal, item) => {
      return tempTotal + (item.quantity * item.foodItemPrice);
    }, 0);
    setValues({
      ...values,
      gTotal: roundTo2DecimalPoint(gTotal)
    })
  }, [JSON.stringify(values.orderDetails)]);

  const validateForm = () => {
    let temp = {};
    temp.customerId = values.customerId !== 0 ? "" : "This field is required !";
    temp.pMethod = values.pMethod !== "none" ? "" : "This field is required !";
    temp.orderDetails = values.orderDetails.length !== 0 ? "" : "This field is required !";
    setErrors({...temp});
    return Object.values(temp).every(x => x === "");
  }

  const submitOrder = e => {
    e.preventDefault();
    if(validateForm()) {

    }
  }

  return (
    <Form onSubmit={submitOrder}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Input
            disabled
            label = "Order Number"
            name = "orderNumber"
            value = {values.orderNumber}
            InputProps = {{
              startAdornment : 
              <InputAdornment
                className={classes.adornmentText}
                position='start'
              >
                #
              </InputAdornment>
            }}
          />
          <Select
            label = "Customer"
            name = "customerId"
            value = {values.customerId}
            onChange = {handleInputChange}
            options = {customerList}
            error = {errors.customerId}
          />
        </Grid>
        <Grid item xs={6}>
          <Select
            label = "Payment Method"
            name = "pMethod"
            onChange = {handleInputChange}
            options = {pMethods}
            value = {values.pMethod}
            error = {errors.pMethod}
          />
          <Input
              disabled
              label = "Grand Total"
              name = "gTotal"
              value = {values.gTotal}
              InputProps = {{
                startAdornment : 
                <InputAdornment
                  className={classes.adornmentText}
                  position='start'
                >
                  $
                </InputAdornment>
              }}
            />
            <ButtonGroup className={classes.submitButtonGroup}>
              <MuiButton
                size="large"
                type="submit"
                endIcon={<RestaurantTwoToneIcon />}
              >
                Submit
              </MuiButton>
              <MuiButton
                size="small"
                startIcon={<ReplayIcon />}
              >
              </MuiButton>
            </ButtonGroup>
            <Button
              size="large"
              startIcon={<ReorderIcon />}
            >
              Order
            </Button>
        </Grid>
      </Grid>
    </Form>
  )
}
