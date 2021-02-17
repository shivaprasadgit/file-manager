import React,{useState} from 'react';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Close';
import { Button} from '@material-ui/core';
import axios from 'axios'
import './index.css'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function InputWithIcon({setCreateFolder, parentId, getFolders}) {
  const [newFolderName,setNewFolderName] = useState()
  const createFolder = () =>{
    if(newFolderName !=='' && newFolderName){
      axios.post('https://file-manager-mern.herokuapp.com/folders',{"title":newFolderName,"parent_id":parentId}).then(({data}) => {
        console.log(data)
        setCreateFolder()
        getFolders();
      })
    }
    else{
      alert(`FolderName Can't Be empty`)
    }
  }

  console.log(newFolderName)
  return (
    <>
      <Dialog fullWidth
        maxWidth='sm' open={createFolder} onClose={setCreateFolder} aria-labelledby="form-dialog-title">
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            type="folder"
            fullWidth
            onChange={e=>setNewFolderName(e.target.value)} label="New FolderName"
          />
        </DialogContent>
        <DialogActions>
          <Button fullWidth variant="contained" color="primary" onClick={createFolder}>Create Folder</Button> 

        </DialogActions>
      </Dialog>
    </>
  );
}