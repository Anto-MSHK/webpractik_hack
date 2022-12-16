import { FolderTwoTone, EditOutlined} from '@ant-design/icons'
import React from 'react'

import './Folder'

export const Folder = () => {
  return (
    <div className='folder-main'>
      <div><FolderTwoTone style={{fontSize: "100px"}}/></div>
      <div className='content-folder' style={{display:"flex"}}>
        <div>Название</div>
       <div style={{marginLeft: "10px"}}><EditOutlined  style={{fontSize: "20px"}}/></div>
      </div>
      <div>
        Дата
      </div>
    </div>
  )
}


