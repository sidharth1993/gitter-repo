import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function RightClickMenu({element,contents,closing,optionSelected}) {
  const classes = useStyles();

  return (

    <div>
        {
            element && 
            <Popover
                id='simple-popover'
                open={true}
                anchorReference="anchorPosition"
                anchorPosition={{ top: element.Y, left: element.X }}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                    }}
                onClose={closing}
                transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
                }}
            >
                <div className={classes.root}>
                    <List component="nav" aria-label="secondary mailbox folders">
                        {
                            contents && contents.map((content, index) => {
                            return (
                                <span key={index}>
                                    <ListItem button onClick={() => {optionSelected(content)}} >
                                        <ListItemText primary={content} />
                                    </ListItem>
                                    { index+1 !== contents.length && <Divider /> }
                                </span>
                        );
                        })
                        }
                    </List>
                </div>
            </Popover>
        }
    </div>
  );
}
