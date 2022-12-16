import { FolderFilled, EditOutlined} from '@ant-design/icons'
import React from 'react'
import './Folder.css'

export const Folder = () => {
  return (
    <div className='folder-main'>
      <div><FolderFilled style={{fontSize: "200px", color: 'gray'}}/></div>
      <div className='content-folder' style={{display:"flex"}}>
        <div>Название</div>
       <div><EditOutlined  style={{fontSize: "20px"}}/></div>
      </div>
      <div>
        Дата
      </div>
    </div>
  )
}


