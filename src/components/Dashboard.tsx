import { FC, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const Data: FC<{}> = () => {

    interface Posts{
        userId:number,
        id:number,
        title:string,
        body:string
    }
    // var current_posts:Array<Posts>=[];
    const [current_posts,setPosts]=useState([])
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
          width: 500,
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
        <Box sx={{ height: 400, width: '100%' }}>
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
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
    </>
)
}
export default Data