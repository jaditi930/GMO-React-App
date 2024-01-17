import { FC, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl} from '@mui/material';
import { useNavigate } from 'react-router';
import {Link} from "react-router-dom"

const Form: FC<{}> = () => {
    const [username,setUsername]=useState("")
    const [email,setEmail]=useState("")
    const [phoneNo,setPhoneNo]=useState("")

    interface Error{
        error:boolean,
        errorMessage:string
    }
    let defaultError:Error={
        error:false,
        errorMessage:""
    }

    const [userError,showUserError]=useState<Error>(defaultError)
    const [emailError,showEmailError]=useState(defaultError)
    const [phoneNoError,showPhoneNoError]=useState(defaultError)


    const navigate=useNavigate()

    function handleSubmit(e:React.MouseEvent<HTMLElement>):void{
        e.preventDefault()

        if(username === "" || email === "" || phoneNo === ""){
            if(username === "" )
            showUserError({error:true,errorMessage:"Please enter your username"})

            if(email === "")
            showEmailError({error:true,errorMessage:"Please enter your email"})

            if(phoneNo === "")
            showPhoneNoError({error:true,errorMessage:"Please enter your phone number"})

            return
        }
        else{
            showUserError(defaultError)
            showEmailError(defaultError)
            showPhoneNoError(defaultError)
        }


        localStorage.setItem("user",
        JSON.stringify({
            username:username,
            email:email,
            phoneNo:phoneNo
        }))
        navigate("/home")
    }

  return (
    <>
        <h1>Login into GMO</h1>
        <div>Already logged in? Go directly to the <Link to="/home" id="link">home page</Link></div>

        <FormControl id="form">

                <TextField type="text" value={username} 
                    placeholder='Enter your name' 
                    onChange={(e)=> {setUsername(e.target.value); showUserError(defaultError)}} 
                    helperText={userError.errorMessage}
                    className="input_field"
                    error={userError.error}
                    />

                <TextField type="email" value={email} 
                    placeholder='Enter your email'
                    onChange={(e)=>{ setEmail(e.target.value); showEmailError(defaultError)}} 
                    helperText={emailError.errorMessage} 
                    className="input_field"
                    error={emailError.error}
                    />

                <TextField type="number" value={phoneNo} 
                    placeholder='Enter your phone number'
                    onChange={(e)=> {setPhoneNo(e.target.value); showPhoneNoError(defaultError) }} 
                    helperText={phoneNoError.errorMessage} 
                    className="input_field"
                    error={phoneNoError.error}
                    />

                <Button variant='contained' onClick={(e)=>handleSubmit(e)}>Submit</Button>
        </FormControl>
    </>
  );
};

export default Form;