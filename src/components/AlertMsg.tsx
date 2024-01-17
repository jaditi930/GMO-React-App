import { FC } from 'react';
import Alert from '@mui/material/Alert';

// This component displays an error message if the user visits the home page without submitting the form.
const AlertMsg: FC<{message:boolean}> = (props) => {
    return (
        <>
        { props.message ? (
            <Alert severity="info" id="alert">Please login to continue</Alert>
    
        ) :(
            <></>
        )
        }
    </>
    )
}

export default AlertMsg;
