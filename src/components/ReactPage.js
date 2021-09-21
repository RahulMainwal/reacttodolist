import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CancelIcon from '@material-ui/icons/Cancel';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ReactPage() {

  const useStyles = makeStyles((theme) => ({
    text: {
      padding: theme.spacing(2, 2, 0),
    },
    paper: {
      paddingBottom: 50,
    },
    list: {
      marginBottom: theme.spacing(2),
    },
    subheader: {
      backgroundColor: theme.palette.background.paper,
    },
    appBar: {
      top: 'auto',
      bottom: 0,
    },
    grow: {
      flexGrow: 1,
    },
    fabButton: {
      position: 'absolute',
      zIndex: 1,
      top: -30,
      left: 0,
      right: 0,
      margin: '0 auto',
    },
  }));

  const classes = useStyles();

  let LIST = localStorage.getItem("LIST");
  const getDataLC = () => {
    if (LIST) {
      return JSON.parse(localStorage.getItem("LIST"));
    }
    else {
      return [];
    }
  }
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [items, setItems] = useState(getDataLC);
  const [isEditItem, setIsEditItem] = useState(null);
  const [search, setSearch] = useState("");

  const add = () => {
    if (!title) {
      toast.error("Sorry, You can't set blank Title!",{
        position: "top-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: 'colored'
      })
    }
    else if (title && openEditField) {
      setItems(
        items.map((element) => {
          if (element.id === isEditItem) {
            return { ...element, title: title, description: description }
          }
          return element;
        })
      )
      setOpenEditField(false);
      setTitle("");
      setDescription("");
      setSearch("")
      toast.success(`Your data has updated successful !`,{
        position: "top-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
      })
    }
    else {
      setItems([...items, { "id": new Date().getTime().toString(), "title": title, "description": description }]);
      setTitle("");
      setDescription("");
      setOpen(false);
      setOpenEditField(false);
      setSearch("")
      toast.success(`Your data has added successful !`,{
        position: "top-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: 'colored'
      })
    }
  }
  const remove = (id) => {
    if (window.confirm("Do you want to Delete it?") === true) {
      const updateItems = items.filter((element, index) => {
        return element.id !== id;
      })
      setItems(updateItems);
      setSearch("")
      toast.warn(`Your data has deleted successful !`,{
        position: "top-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: 'colored'
      })
    }
  }

  const DeleteAll = () => {
    if(items.length === 0 ){
      toast.error(`You can't delete all data because data is already Empty !`,{
        position: "top-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: 'colored'
      })
    }
    else{
      if (window.confirm("Do you want to Delete all item of List?") === true) {
        setItems([])
        toast.warn(`Empty data successfull !`,{
          position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'colored'
        })
      }
    }
  }


  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setTitle("");
    setDescription("");
    setOpen(false);
  };

  const [openEditField, setOpenEditField] = useState(false);

  const handleClickEditOpen = (id) => {
    const editedItems = items.find((element) => {
      return element.id === id;
    })
    setTitle(editedItems.title)
    setDescription(editedItems.description)
    setOpenEditField(true);
    setIsEditItem(editedItems.id)
  };

  const handleEditClose = () => {
    setTitle("");
    setDescription("");
    setOpenEditField(false);
  };

  useEffect(() => {
    localStorage.setItem("LIST", JSON.stringify(items))
  }, [items])


  return (
    <div>
      <React.Fragment>
      <ToastContainer />
        <CssBaseline />
        <Paper square className={classes.paper}>
          <Typography className={classes.text} variant="h5" gutterBottom style={{ textAlign: "center" }}>
            Tasks List
          </Typography>
          <ListItemText style={{ textAlign: "center" }} primary="" secondary="Web Developer : Rahul Mainwal" />
          <br />
          <div style={{height: "63vh",boxShadow: "1px 2px 10px 10px rgb(236, 234, 234)", borderRadius: "20px", margin: "0 5%",padding: "5vh 2%"}}>
           <div style={{width: "100%"}}>
          <div style={{ width: "50%", float: "left",textAlign: "start" }}>
            <TextField
            autoComplete="off"
            variant="outlined"
              margin="dense"
              label="Search "
              type="search"
              style={{ maxWidth: "100%", minWidth: "30%"}}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
              }}
            />
          </div>
          <div style={{ width: "50%", float: "right",textAlign: "end", marginTop: "1.3vh" }}>
            <Button onClick={DeleteAll} style={{ width: "50%" }} variant="contained" color="secondary">
              <DeleteSweepIcon />&nbsp;
            </Button>
          </div>
          </div>
          <br/>
          <br/>
          <br/>
          <hr/>
          <div id="items_list">
          {
            items.length === 0
              ?
              <div style={{textAlign: "center"}}>
              <br/>
              <br/>
                <h1>Your data will appear here.</h1>
                <p>Looks like you haven't saved a data yet.</p>
                <p>Try to saved your data and click "+" button to save.</p>
              </div>
              :
              items.filter((element) => {
                if(search === ""){
                  return element;
                }
                else if(Object.values(element).join("").toLowerCase().includes(search.toLowerCase())){
                  return element;
                }
                else{
                  return null;
                }
              }).map((element, index) => (
                <div key={element.id} style={{ marginBottom: "2px", borderBottom: "2px solid rgb(231, 231, 231)" }}>
                  <React.Fragment>
                    <ListItem>
                      <Typography>{index + 1}</Typography>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <ListItemText primary={element.title} secondary={element.description} />
                      &nbsp;&nbsp;&nbsp;
                        <i className="fas fa-edit" style={{fontSize: "20px"}} onClick={() => handleClickEditOpen(element.id)} />
                      <Dialog
                        open={openEditField}
                        onClose={handleEditClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                      >
                        <DialogTitle id="alert-dialog-title">{"Do you want to edit something Here?"}</DialogTitle>
                        <DialogContent>
                          <TextField
                            autoFocus
                            autoComplete="off"
                            margin="dense"
                            label="Title"
                            type="text"
                            fullWidth
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                          />
                          <br /><br />
                          <TextField
                          autoComplete="off"
                            margin="dense"
                            label="Description"
                            type="text"
                            fullWidth
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                          />
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleEditClose} color="primary">
                            Discard
                          </Button>
                          <Button color="primary" onClick={add} autoFocus>
                            Edit
                          </Button>
                        </DialogActions>
                      </Dialog>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <CancelIcon onClick={() => remove(element.id)} />
                    </ListItem>
                  </React.Fragment>
                </div>
              ))
          }
          </div>
        </div>
        </Paper>
        <AppBar position="fixed" style={{backgroundColor: "black"}} className={classes.appBar}>
          <Toolbar>
            <Fab color="secondary" aria-label="add" className={classes.fabButton} onClick={handleClickOpen}>
              <AddIcon />
            </Fab>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Do you want to add some tasks here?</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  autoComplete="off"
                  margin="dense"
                  placeholder="Title"
                  type="text"
                  fullWidth
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <br /><br /><br />
                <TextField
                autoComplete="off"
                  margin="dense"
                  label="Description"
                  type="text"
                  fullWidth
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={add} color="primary">
                  Add
                </Button>
              </DialogActions>
            </Dialog>
          </Toolbar>
        </AppBar>
      </React.Fragment>
    </div>
  )
}

export default ReactPage
