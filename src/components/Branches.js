import React from 'react';
import Grid from '@material-ui/core/Grid';
import FolderIcon from '@material-ui/icons/Folder';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';

const Branches = ({branches}) => {
    return (
        <List dense={true}>
        {
            branches && branches.map((branch,index) => {
                return (
                    <ListItem key={index}>
                        <Grid item xs={4} md={4}>
                            <ListItemText  primary={
                                    <ListItemIcon>
                                        <FolderIcon />
                                    </ListItemIcon>
                            } secondary={branch.name} />
                        </Grid>
                    </ListItem>
                );
            })
        }
    </List>
    );
}

export default Branches;