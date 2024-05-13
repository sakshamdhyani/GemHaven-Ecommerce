import { StepLabel,Step, Stepper, Typography } from '@mui/material'
import React, { Fragment } from 'react'
import { LocalShipping } from '@mui/icons-material';
import { LibraryAddCheck } from '@mui/icons-material';
import { AccountBalance } from '@mui/icons-material';
import "./CheckOutSteps.css"


const CheckoutSteps = ({activeStep}) => {

  const steps = [
    {
        label: <Typography>Shipping Details</Typography>,
        icon: <LocalShipping/>
    },
    {
        label: <Typography>Confirm Order</Typography>,
        icon: <LibraryAddCheck/>
    },
    {
        label: <Typography>Payment</Typography>,
        icon: <AccountBalance/>
    },
  ];

  const stepStyles = {
    boxSizing: "border-box",
  }

  return (
    <Fragment>
        <Stepper alternativeLabel activeStep={activeStep} style={stepStyles}>

            {steps.map((item , index) => (

                <Step key={index}
                active = {activeStep === index ? true : false}
                completed = {activeStep >= index ? true : false}
                >

                
                    <StepLabel 
                    icon={item.icon}
                    style={{
                        color: activeStep >= index ? "tomato" : "rgba(0,0,0,0.649)",
                    }}
                    > 
                        {item.label} 
                    
                    </StepLabel>
                
                
                </Step>
            
            ))}

        </Stepper>
    </Fragment>
  )
}

export default CheckoutSteps