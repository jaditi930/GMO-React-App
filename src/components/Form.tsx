import { FC, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, FormLabel } from '@mui/material';
import { useNavigate } from 'react-router';


const Form: FC<{}> = () => {
    const [username,setUsername]=useState("")
    const [email,setEmail]=useState("")
    const [phoneNo,setPhoneNo]=useState("")

    const [userWarning,showUserWarning]=useState("")
    const [emailWarning,showEmailWarning]=useState("")
    const [phoneNoWarning,showPhoneNoWarning]=useState("")


    const navigate=useNavigate()

    function handleSubmit(e:React.MouseEvent<HTMLElement>):void{
        e.preventDefault()

        if(username === "" || email === "" || phoneNo === ""){
            if(username === "" )
            showUserWarning("Please enter the username")

            if(email === "")
            showEmailWarning("Please enter your email")

            if(phoneNo === "")
            showPhoneNoWarning("Please enter your phone number")

            return
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

        <div id="form">
        <FormControl sx={{width:"80%"}}>

                <TextField type="text" value={username} 
                    placeholder='Enter your name' 
                    onChange={(e)=>setUsername(e.target.value)} 
                    helperText={userWarning}
                    sx={{marginBottom:"20px"}}/>

                <TextField type="email" value={email} 
                    placeholder='Enter your email'
                    onChange={(e)=>setEmail(e.target.value)} 
                    helperText={emailWarning} sx={{marginBottom:"20px"}}/>

                <TextField type="number" 
                    value={phoneNo} placeholder='Enter your phone number'
                    onChange={(e)=>setPhoneNo(e.target.value)} 
                    helperText={phoneNoWarning} sx={{marginBottom:"20px"}}/>

                <Button onClick={(e)=>handleSubmit(e)}>Submit</Button>
        </FormControl>
        </div>
    </>
  );
};

export default Form;