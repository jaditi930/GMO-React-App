import { FC } from 'react';
import Alert from '@mui/material/Alert';


const AlertMsg: FC<{message:boolean}> = (props) => {
    return (
        <>
        { props.message ? (
            <Alert severity="info" sx={{width:"100%"}}>Please login to continue</Alert>
    
        ) :(
            <></>
        )
        }
    </>
    )
}

export default AlertMsg;
