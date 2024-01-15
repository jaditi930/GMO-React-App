import { FC, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, FormLabel } from '@mui/material';
import { useNavigate } from 'react-router';


const Form: FC<{}> = () => {
    const [username,setUsername]=useState("")
    const [email,setEmail]=useState("")
    const [phoneNo,setPhoneNo]=useState("")
    const navigate=useNavigate()

    function handleSubmit(e:React.MouseEvent<HTMLElement>):void{
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
    <h1>Login into GMO</h1>
<FormControl>
    <FormLabel>Enter Name</FormLabel>
    <TextField type="text" required value={username} onChange={(e)=>setUsername(e.target.value)}></TextField>

    <FormLabel>Enter Email</FormLabel>
    <TextField type="email" required value={email} onChange={(e)=>setEmail(e.target.value)}></TextField>

    <FormLabel>Enter Phone Number</FormLabel>
    <TextField type="number" required value={phoneNo} onChange={(e)=>setPhoneNo(e.target.value)}></TextField>

    <Button onClick={(e)=>handleSubmit(e)}>Submit</Button>
</FormControl>
    </>
  );
};

export default Form;