import React, { FC, useEffect, useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Box } from '@mui/material';


const SideBar: FC<{}> = () => {

    interface SubDep{
        name:string,
        isChecked:boolean
    }
    interface Dept{
        name:string,
        isChecked:boolean,
        sub_depts:Array<SubDep>
    }

    const [checkboxes,setCheckBoxes]=useState<Array<Dept>>([])

    useEffect(()=>{
        console.log()
        fetch("http://localhost:5173/public/dept_data.json")
        .then((response)=>response.json())
        .then((data)=>{

            let new_checkboxes:Array<Dept>=[...checkboxes]
            console.log(new_checkboxes)

            for(let i=0;i<data.length;i++){
                let new_dept:Dept={
                    name:data[i].department,
                    isChecked:false,
                    sub_depts:[]

                }

                let sub_depts:Array<string>=data[i].sub_departments

                for(let j=0;j<sub_depts.length;j++){
                    let new_sub_dept:SubDep={
                        name:sub_depts[j],
                        isChecked:false
                    }
                    new_dept.sub_depts.push(new_sub_dept)

                }
                new_checkboxes.push(new_dept)

            }

            setCheckBoxes(new_checkboxes)
        })
    },[])

    function handleChange(e:React.ChangeEvent<HTMLInputElement>, i:number,j:number,type:string):void{
        if(type=="parent"){
            console.log(e.target.checked)
        }
        else{
            let parentDep:Dept=checkboxes[i]
            parentDep.sub_depts[j].isChecked=e.target.checked
            setCheckBoxes([
                ...checkboxes.slice(0,i),parentDep,...checkboxes.slice(i+1)
            ])
        }
    }
    function format(name:string){
        let new_name:string=name.replace("_"," ")
        return new_name.charAt(0).toUpperCase()+new_name.slice(1)
    }

    let dept_array=checkboxes.map((dept:Dept,i)=>{

        let children=dept.sub_depts.map((sub_dept,j)=>{
        return    <FormControlLabel
        label={ format(sub_dept.name) }
        control={<Checkbox checked={sub_dept.isChecked} onChange={(e)=>handleChange(e,i,j,"child")} />}
      />
        })

        return <div>

        <FormControlLabel
        label={ format(dept.name)   }
        control={<Checkbox checked={dept.isChecked} onChange={(e)=>handleChange(e,i,-1,"parent")} />}
      />
      <Box sx={{display:'flex',flexDirection:'column',marginLeft:'34px'}}>
      {children}
      </Box>

        </div>
    })
    return (
        <Box sx={{display:'flex',flexDirection:'column',width:'20%',padding:'10px'}}>
        {dept_array}
        </Box>
    )
}
export default SideBar;