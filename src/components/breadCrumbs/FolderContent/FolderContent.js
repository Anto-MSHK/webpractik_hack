import React from 'react';
import { useSelector } from 'react-redux';
import { useGetFolderFilesQuery } from '../../../store/services/folderService';

const FolderContent = () => {
   const folderId = useSelector(state => state.folder.folderId)
    const {data: folder, isFetching} =  useGetFolderFilesQuery(folderId)
    return (
        
        <div>
   
            {
              
                    folder && folder.files
                    ?
                    folder.files.map(file => (
                        <span>{file.name}.{file.extension} </span>
                    ))

              :
              <span>Пусто</span>
            

                
            }

        </div>
    );
}

export default FolderContent;
