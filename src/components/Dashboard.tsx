import { FC, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import SideBar from "./SideBar"

const Data: FC<{}> = () => {

    interface Posts{
        userId:number,
        id:number,
        title:string,
        body:string
    }
    const [current_posts,setPosts]=useState<Array<Posts>>([])
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
        fetch("https://jsonplaceholder.typicode.com/posts")
        .then((response)=>response.json())
        .then((data)=>setPosts(data))
    },[])
return (
    <>
    <Box sx={{ width: '100%',display:'flex',justifyContent:'space-between' }}>
        <SideBar/>
        <DataGrid sx={{width:'60%'}}
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
    </>
)
}
export default Data