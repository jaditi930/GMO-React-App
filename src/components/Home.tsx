import { FC, useEffect, useState,Dispatch, SetStateAction } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import SideBar from "./SideBar"
import { useNavigate } from 'react-router';


interface HomeProps{
    showMessage: Dispatch<SetStateAction<boolean>>
}
const Home: FC<HomeProps> = (props) => {

    interface Posts{
        userId:number,
        id:number,
        title:string,
        body:string
    }
    const [current_posts,setPosts]=useState<Array<Posts>>([])
    const navigate=useNavigate()

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'userId', headerName: 'User ID', width: 90 },
        {
          field: 'title',
          headerName: 'Title',
          type: 'string',
          width: 200,
          editable: true,
        },
        {
          field: 'body',
          headerName: 'Body',
          type: 'string',
          width: 600,
          editable: true,
        }
      ];

    useEffect(()=>{

        // check if user is logged in otherwise redirect him to the login page
        if(localStorage.getItem("user")==null)
        {
            navigate("/")
            props.showMessage(true)
        }
        else{
            props.showMessage(false)
        }

        fetch("https://jsonplaceholder.typicode.com/posts")
        .then((response)=>response.json())
        .then((data)=>setPosts(data))
    },[])
return (
    <Box sx={{ display:'flex',width:'100%',padding:'20px'}}>
        <SideBar/>
        <DataGrid
            rows={current_posts}
            columns={columns}
            initialState={{
            pagination: {
                paginationModel: {
                pageSize: 10,
                },
            },
            }}
            pageSizeOptions={[10]}
            checkboxSelection
            disableRowSelectionOnClick
        />
    </Box>
)
}
export default Home