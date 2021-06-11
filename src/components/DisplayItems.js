import React from 'react';
import FolderIcon from '@material-ui/icons/Folder';
import DescriptionIcon from '@material-ui/icons/Description';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';

const DisplayItems = ({objectArray,openSomething,rightClickItem}) => {

    const openFile = (repo) => {
        openSomething(repo);
    }
    return (
        <List dense={true}>
        {
            objectArray && objectArray.length > 0 && objectArray.map((object,index) => {
                return (
                    <ListItem key={index}>
                        <Grid item xs={4} md={4}>
                            <ListItemText onDoubleClick={() => { openFile(object.name) }} primary={
                                    <ListItemIcon onContextMenu={(event) => {rightClickItem(event,object.id)}}>
                                        {
                                        (object.type)? 
                                        (object.type === 'file')? <DescriptionIcon /> : <FolderIcon />
                                        :
                                        <FolderIcon /> 
                                        }
                                    </ListItemIcon>
                            } secondary={object.name} />
                        </Grid>
                        <Grid item xs={4} md={4}>
                            {object.created_at && <ListItemText primary={object.created_at} secondary="created on" />}
                        </Grid>
                        <Grid item xs={4} md={4}>
                            {object.created_at && <ListItemText primary={object.updated_at} secondary="updated on" />}
                        </Grid>
                    </ListItem>
                );
            })
        }
    </List>
    );
}

export default DisplayItems;