import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Box from '@material-ui/core/Box';

import { Button } from '@material-ui/core';




const useStyles = makeStyles({
    root: {
      flexGrow: 1,
    },
  });
  
function Editor(props) {

    const classes = useStyles();

    const [showInConsole, setshowInConsole] = React.useState("");

  
 
    const getEditorValue = () => {
        console.log(showInConsole)
      };
  

    return (
        <div>   <Paper className={classes.root}>
    
    <Box textAlign='center'>
      
    <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
          <Button  onClick={getEditorValue} >Save</Button>
        {/* <Button>Two</Button>
        <Button>Three</Button> */}
      </ButtonGroup>
      </Box>
      </Paper>

        
               <h2>Using CKEditor 5 build in React</h2>
    <CKEditor
        editor={ ClassicEditor }
        data=""
      
        onChange={ ( event, editor ) => {
            const data = editor.getData();
            setshowInConsole(data)
            
        } }
  
    />
        </div>
    )
}


export default Editor;