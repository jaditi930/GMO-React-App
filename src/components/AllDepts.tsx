import React, { FC, useEffect, useState } from 'react';    
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Box } from '@mui/material';
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const AllDepts: FC<{}> = () => {

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
    const [expanded,setExpanded]=useState<Array<boolean>>(Array(2).fill(false))

    useEffect(()=>{

        fetch("http://localhost:5173/dept_data.json")
        .then((response)=>response.json())
        .then((data)=>{

            let new_checkboxes:Array<Dept>=[...checkboxes]

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

        let parentDep:Dept=checkboxes[i]
        let subDeps:Array<SubDep>=parentDep.sub_depts

        if(type=="parent"){

            parentDep.isChecked=e.target.checked

            for (let i=0;i<subDeps.length;i++){
                subDeps[i].isChecked=e.target.checked
            }

        }
        else{
            let parentDep:Dept=checkboxes[i]
            parentDep.sub_depts[j].isChecked=e.target.checked

            let all_checked:boolean=true
            for (let i=0;i<subDeps.length;i++){
                if(! subDeps[i].isChecked){
                    all_checked=false
                    break
                }
            }
            if(all_checked)
            parentDep.isChecked=true
            else
            parentDep.isChecked=false

        }

        setCheckBoxes([
            ...checkboxes.slice(0,i),parentDep,...checkboxes.slice(i+1)
        ])
    }
    function format(name:string){

        let new_name:string=name.replace("_"," ")
        return new_name.charAt(0).toUpperCase()+new_name.slice(1)
    }
    function handleAccordian(isExpanded:boolean,i:number){

            setExpanded([...expanded.slice(0,i),isExpanded,...expanded.slice(i+1)])
    }

    let dept_array=checkboxes.map((dept:Dept,i)=>{

        let children=dept.sub_depts.map((sub_dept,j)=>{
            return  (  
                <FormControlLabel
                label={ format(sub_dept.name) }
                control={<Checkbox checked={sub_dept.isChecked} onChange={(e)=>handleChange(e,i,j,"child")} />}
                />
            )
        })

        return (
        <div>

<Accordion onChange={(_,expanded)=>handleAccordian(expanded,i)}>
        <AccordionSummary
          expandIcon={expanded[i] == false ? <AddIcon /> : <RemoveIcon/>}
          aria-controls="panel1-content"
          id="accordian"
          
        >
        <div>
          <FormControlLabel
            label={ format(dept.name)   }
            control={<Checkbox checked={dept.isChecked} onChange={(e)=>handleChange(e,i,-1,"parent")} />}
            />
            <span>({children.length})</span>
        </div>

        </AccordionSummary>

        <AccordionDetails>
            <Box id="children">
                {children}
            </Box>

        </AccordionDetails>
      </Accordion>

        </div>
        )
    })
    return (
            <Box id="parent">
            {dept_array}
            </Box>
    )
}
export default AllDepts;