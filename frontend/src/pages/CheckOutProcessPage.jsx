import { Stepper, Typography, Step, StepLabel } from '@material-ui/core'
import React, { Fragment } from 'react'
import LocalShippingIcon from "@material-ui/icons/LocalShipping"
import LibraryAddCheckIcon from "@material-ui/icons/LibraryAddCheck"
import AccountBalanceIcon from "@material-ui/icons/AccountBalance"

const CheckOutProcessPage = ({ activeStep }) => {
    const steps = [
        {
            label: <Typography>Shipping Details</Typography>,
            icon: <LocalShippingIcon />
        },
        {
            label: <Typography>Confirm Order</Typography>,
            icon: <LibraryAddCheckIcon />
        },
        {
            label: <Typography>Payment</Typography>,
            icon: <AccountBalanceIcon />
        }
    ]
    const stepStyle = {
        boxSizing: "border-box"
    }
    return (
        <Fragment>
            <div className='py-10'>
                <Stepper alternativeLabel activeStep={activeStep} >
                    {steps.map((item, index) => (
                        <Step key={index} active={activeStep === index ? true : false}
                            completed={activeStep >= index ? true : false}
                        >
                            <StepLabel
                                style={{ color: activeStep >= index ? "tomato" : "rgba(0,0,0,0.649)" }}
                                icon={item.icon}
                            >
                                {item.label}
                            </StepLabel>


                        </Step>
                    ))}

                </Stepper>
            </div>
        </Fragment>
    )
}

export default CheckOutProcessPage
