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
import EditIcon from '@material-ui/icons/Edit';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
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

  const add = () => {
    if (!title) {
      alert("Sorry, You can't add blank data!")
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
    }
    else {
      setItems([...items, { "id": new Date().getTime().toString(), "title": title, "description": description }]);
      setTitle("");
      setDescription("");
      setOpen(false);
      setOpenEditField(false);
    }
  }
  const remove = (id) => {
    if (window.confirm("Do you want to Delete it?") === true) {
      const updateItems = items.filter((element, index) => {
        return element.id !== id;
      })
      setItems(updateItems);
    }
  }

  const DeleteAll = () => {
    if (window.confirm("Do you want to Delete all item of List?") === true) {
      setItems([])
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
        <CssBaseline />
        <Paper square className={classes.paper}>
          <Typography className={classes.text} variant="h5" gutterBottom style={{ textAlign: "center" }}>
            Tasks List
          </Typography>
          <ListItemText style={{ textAlign: "center" }} primary="" secondary="Web deveoper : Rahul Mainwal" />
          <div style={{ textAlign: "center" }}>
            <Button onClick={DeleteAll} style={{ width: "20%" }} variant="contained" color="secondary">
              <DeleteSweepIcon />&nbsp;
            </Button>
          </div>
          <br />
          <br />
          {
            !items
              ?
              <></>
              :
              items.map((element, index) => (
                <div key={element.id} style={{ border: "1px solid black", marginBottom: "2px" }}>
                  <React.Fragment>
                    <ListItem button>
                      <Typography>{index + 1}</Typography>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <ListItemText primary={element.title} secondary={element.description} />
                      &nbsp;&nbsp;&nbsp;
                      <Button variant="outlined" color="primary" onClick={() => handleClickEditOpen(element.id)}>
                        <EditIcon />
                      </Button>
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
                            margin="dense"
                            id="name"
                            label="Title"
                            type="text"
                            fullWidth
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                          />
                          <br /><br />
                          <TextField
                            margin="dense"
                            id="name"
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
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <CancelIcon onClick={() => remove(element.id)} />
                    </ListItem>
                  </React.Fragment>
                </div>
              ))
          }
        </Paper>
        <AppBar position="fixed" color="primary" className={classes.appBar}>
          <Toolbar>
            <Fab color="secondary" aria-label="add" className={classes.fabButton} onClick={handleClickOpen}>
              <AddIcon />
            </Fab>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Do you want to add some tasks here?</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Title"
                  type="text"
                  fullWidth
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <br /><br /><br />
                <TextField
                  margin="dense"
                  id="name"
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
