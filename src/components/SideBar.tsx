import React, { FC, useEffect, useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';


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
        fetch(`${import.meta.env.BASE_URL}/dept_data.json`)
        .then((response)=>response.json())
        .then((data)=>{
            let new_checkboxes=JSON.parse(JSON.stringify(checkboxes))

            for(let i=0;i<data.length;i++){

                let dept_name:string=data[i].department.replace("_"," ").capitalize()
                let sub_depts=data[i].sub_departments
                new_checkboxes[i].name=dept_name
                new_checkboxes[i].isChecked=false

                for(let j=0;j<sub_depts.length;j++){
                    new_checkboxes[i].sub_depts[j].name=sub_depts[j]
                    new_checkboxes[i].sub_depts[j].isChecked=false

                }
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

    let dept_array=checkboxes.map((dept:Dept,i)=>{

        let children=dept.sub_depts.map((sub_dept,j)=>{
        return    <FormControlLabel
        label={sub_dept.name}
        control={<Checkbox checked={sub_dept.isChecked} onChange={(e)=>handleChange(e,i,j,"child")} />}
      />
        })

        return <div>

        <FormControlLabel
        label={dept.name}
        control={<Checkbox checked={dept.isChecked} onChange={(e)=>handleChange(e,i,-1,"parent")} />}
      />
      
      {children}

        </div>
    })
    return (
        <>
        {dept_array}
        </>
    )
}
export default SideBar;