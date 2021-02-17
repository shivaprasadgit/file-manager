/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import FolderIcon from '@material-ui/icons/Folder';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import {Link, useParams } from 'react-router-dom'
import './folder.css'
import NewFolder from '../NewFolder'
import AddIcon from '@material-ui/icons/Add';
function App(params) {
  const [folders,setFolders] = useState([])
  const [mainData,setMainData]=useState([])
  const [parentId,setParentId] = useState()
  const [mainTitle,setMainTitle] = useState()
  const [createFolder,setCreateFolder] = useState(false)
  // const {urlId} = useParams()
  const getFolders = ()=>{
    axios.get('https://file-manager-mern.herokuapp.com/folders').then(({data}) => setMainData(data))
  }
  useEffect(() => {
    getFolders()
  }, [])
  
  useEffect(() => {
    parentId ? setFolders(mainData.filter(({parent_id})=> parent_id === parentId))
    : setFolders(mainData.filter(({parent_id})=> !parent_id))
  }, [mainData,parentId])

  useEffect(()=>{
    params.match.params.id ? setParentId(params.match.params.id) : setParentId(undefined)
    params.match.params.title ? setMainTitle(params.match.params.title) : setMainTitle('root')
  })
  // console.log('mainData')
  // console.log(mainData)
  // console.log('parentId')
  // console.log(parentId)

  return (
      <>
        {mainTitle ? <h2>{mainTitle}</h2>: null}
        <div className="mainContainer">
            {folders.map(({title,_id,parent_id}) => {
            console.log(parent_id)
              return (
                <>
                  <div className="folderContainer"
                    onClick={()=>setParentId(_id)}
                  >
                    <Link className="link" to={`/${title?.replace(' ','-')}/${_id}`} >
                      <div className="folder">
                        <FolderIcon size="large"/>
                        <span>{title}</span>
                      </div>
                    </Link>
                  </div>
                </>
              )
            })}
            <div className="addFolderContainer">
              {
                !createFolder ?( 
                  <Link className="link"
                    // to={`/${params.match.params.title}/${parentId}/new`}
                  >
                    <div 
                      className="folder" 
                      onClick={()=>setCreateFolder(true)}
                    >
                      <AddIcon size="small"/>
                    </div>
                  </Link>
                ) : null 
              }
            </div>
        </div>
        <div>
          {createFolder ?
            <NewFolder parentId={parentId} setCreateFolder={()=>setCreateFolder(false)} getFolders={getFolders} />:null
          }        
      </div>
    </>
  );
}
export default App;
