import { FolderFilled, EditOutlined,CheckCircleTwoTone } from '@ant-design/icons'
import { Input } from 'antd'
import React, { useState } from 'react'
import './Folder.css'

export const Folder = () => {
  const [isEdit, setIsEdit] = useState(false)
  const [folderName, setFolderName] = useState('')
  const [date, setDate] = useState('')

  return (
    <div className='folder-main'>
      {

        isEdit
          ?

          <div>
            <div><FolderFilled style={{ fontSize: "200px", color: 'gray' }} /></div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div className='edit-folder'>
                <Input value={folderName} onChange={(e) => setFolderName(e.target.value)} placeholder="Название" />
                <Input value={date}  onChange={(e) => setDate(e.target.value)} placeholder='Дата' />
              </div>
              <CheckCircleTwoTone   twoToneColor='green' onClick={() => { setIsEdit(!isEdit) 
                }} style={{ fontSize: "20px" }} />
            </div>

          </div>
          :
          <div>

            <div><FolderFilled style={{ fontSize: "200px", color: 'gray' }} /></div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div className='content-folder'>
                  <div>
                    {
                      folderName 
                      ?
                      <span>{folderName}</span>
                      :
                      <span>Название</span>
                    }
                  
                    
                    </div>

                  <div>
                    {
                      date 
                      ?
                      <span>{date}</span>
                      :
                      <span>Дата</span>
                    }
                    </div>  
              </div>
              <EditOutlined  onClick={() => { setIsEdit(!isEdit) }} style={{ fontSize: "20px" }} />
            </div>

          </div>

      }

    </div>
  )
}


