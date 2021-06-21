import React from 'react';
import FolderIcon from '@material-ui/icons/Folder';
import DescriptionIcon from '@material-ui/icons/Description';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
      width: 200,
    },
  });

const DisplayItems = ({objectArray,openSomething,rightClickItem}) => {
    const classes = useStyles();

    const openFile = (repo) => {
        openSomething(repo);
    }

    return (
        <ul className="flexContainer" >
            {
                objectArray && objectArray.length > 0 && objectArray.map((object,index) => {
                    return (
                                <li key={index} onDoubleClick={() => { openFile(object.name) }} className="flexItem">
                                    <BottomNavigation
                                        showLabels={true}
                                        className={classes.root}
                                    > 
                                        <BottomNavigationAction label={object.name} icon={
                                                        (object.type && object.type === 'file')? 
                                                        <DescriptionIcon fontSize="large" onContextMenu={(event) => {rightClickItem(event,object.id)}} /> 
                                                        : 
                                                        <FolderIcon fontSize="large" onContextMenu={(event) => {rightClickItem(event,object.id)}} />
                                        } />
                                    </BottomNavigation>
                                </li>
                            );
                        })
            }
        </ul>
    );
}

export default DisplayItems;