import mongoose from 'mongoose'
const folderSchema = mongoose.Schema({
  title:String,
  parent_id:String,
  childrens:[]

});



const PostMessage = mongoose.model('folder', folderSchema)

export default PostMessage;