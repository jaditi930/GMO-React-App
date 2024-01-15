import { FC, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, FormLabel } from '@mui/material';
import { useNavigate } from 'react-router';


const Title: FC<{}> = () => {
    const [username,setUsername]=useState("")
    const [email,setEmail]=useState("")
    const [phoneNo,setPhoneNo]=useState("")
    const navigate=useNavigate()

    function handleSubmit(e):void{
        e.preventDefault()
        localStorage.setItem("user",
        JSON.stringify({
            username:username,
            email:email,
            phoneNo:phoneNo
        }))
        navigate("/dashboard")
    }

  return (
    <>
<FormControl>
    <FormLabel>Enter Name</FormLabel>
    <TextField required value={username} onChange={(e)=>setUsername(e.target.value)}></TextField>

    <FormLabel>Enter Email</FormLabel>
    <TextField required value={email} onChange={(e)=>setEmail(e.target.value)}></TextField>

    <FormLabel>Enter Phone Number</FormLabel>
    <TextField required value={phoneNo} onChange={(e)=>setPhoneNo(e.target.value)}></TextField>

    <Button onClick={(e)=>handleSubmit(e)}>Submit</Button>
</FormControl>
    </>
  );
};

export default Title;