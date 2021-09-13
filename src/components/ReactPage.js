import React, { useState , useEffect } from 'react'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import DeleteIcon from '@material-ui/icons/Delete';
import {TextField, Card, CardContent, Typography, Button} from '@material-ui/core';

function UseStates() {
  let LIST = localStorage.getItem("LIST");
const getDataLC = () => {
  if(LIST){
    return JSON.parse(localStorage.getItem("LIST"));
  }
  else{
    return [];
  }
}

let [input, setInput] = useState("");
const [items, setItems] = useState(getDataLC);

const add = () => {
  if(!input){

  }
  else{
    setItems([...items, input]);
    setInput("");
  }
  
}

const remove = (ind) => {
  const updateItems = items.filter((e, index) => {
    return index !== ind;
  })
  setItems(updateItems);
}

const clearAllData = () => {
  setItems([]);
}

useEffect(() => {
  localStorage.setItem("LIST",JSON.stringify(items))
}, [items])
console.log(items);
  return (
    <div style={{textAlign: "center"}}>
    <Card variant="outlined">
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          rEACT-To-Do-List
        </Typography>
        <br/><br/><br/><br/>
    <TextField id="standard-basic"  value={input} onChange={(e) => setInput(e.target.value)}   label="Enter Task" style={{width: "18rem"}}/>
    <AddCircleIcon color="primary"  onClick={add}  style={{ fontSize: 50 }}>add_circle</AddCircleIcon>
    <br/><br/><br/><br/>
    <Button onClick={clearAllData} style={{width: "15%"}} variant="contained" color="secondary">
<DeleteIcon   style={{ fontSize: "50",color: "white" }}>delete_circle </DeleteIcon>
</Button>
<br/><br/><br/><br/>
      {
       !items?<></>:  items.map((elm,ind) => {
          return (
            <span key={ind} sm={12} md={6} lg={4} xl={3}>
          <Card style={{margin: "0 20%"}} sm={12} md={6} lg={4} xl={3} variant="outlined">
      <CardContent>
      <div className="row">
      <div className="col" style={{textAlign: "start"}}>{elm}</div>
      <div className="col" style={{textAlign: "end"}}>
      <CancelIcon color="primary" onClick={() =>remove(ind)}  style={{ fontSize: 25 }}>cancel_circle</CancelIcon>
      </div>
      </div>
      </CardContent>
    </Card>
          </span>
          )
        })
      }
      </CardContent>
    </Card>
    </div>
  )
}

export default UseStates
