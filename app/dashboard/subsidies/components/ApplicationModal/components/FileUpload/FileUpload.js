import {useRef, useState} from 'react';

import {FileUpload} from 'primereact/fileupload';

import styles from './FileUpload.module.css';

// import 'primeflex/primeflex.css';
// import 'primeicons/primeicons.css';
import {Dismiss16Regular} from '@fluentui/react-icons';
import {Button} from '@nextui-org/react';
import 'primereact/resources/primereact.css';
// import 'primereact/resources/themes/lara-light-indigo/theme.css';

export default function FileUploadComponent() {
  const [totalSize, setTotalSize] = useState(0);
  const fileUploadRef = useRef(null);

  const headerTemplate = options => {
    const {className, chooseButton, uploadButton, cancelButton} = options;

    return (
      <div
        className={className}
        style={{
          backgroundColor: 'transparent',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {chooseButton}
        {/* {uploadButton} */}
        {cancelButton}
      </div>
    );
  };

  const itemTemplate = (file, props) => {
    return (
      <div className="flex align-items-center flex-wrap" style={{padding: '8px 0'}}>
        <div className="flex align-items-center" style={{width: '80%', columnGap: 12}}>
          <p style={{color: 'black', textAlign: 'left'}}>{file.name}</p>
          <p style={{marginLeft: 'auto', textWrap: 'nowrap'}}>{props.formatSize}</p>
        </div>
        <Button variant="light" onPress={props.onRemove} isIconOnly style={{marginLeft: 'auto'}}>
          <Dismiss16Regular />
        </Button>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <FileUpload
        name="demo[]"
        // url="https://primefaces.org/primereact/showcase/upload.php"
        // onUpload={onUpload}
        headerTemplate={headerTemplate}
        headerClassName={styles.fileUploadHeader}
        multiple
        // accept="image/*"
        maxFileSize={1000000}
        emptyTemplate={<p className={styles.emptyTemplate}>lub przeciągnij i upuść tutaj</p>}
        cancelLabel="Usuń wszystkie"
        chooseLabel="Dodaj pliki"
        contentClassName={styles.fileUploadContent}
        itemTemplate={itemTemplate}
      />
    </div>
  );
}
