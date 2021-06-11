import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { authorize, getRepos, getUserData, getBranches, getBranchContents } from '../service/gitHubApi';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Breadcrumbsgit from '../components/Breadcrumbsgit';
import DisplayItems from '../components/DisplayItems';
import { checkRightClick } from '../service/filters';
import RightClickMenu from '../components/RightClickMenu';
import EditRepo from '../components/EditRepo';

let displayObjects = {};
let currentRepo = null;
let rightClickArray = [];
let itemObjectToDisplay = {};

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      maxWidth: 752,
    },
    demo: {
      backgroundColor: theme.palette.background.paper,
    },
    title: {
      margin: theme.spacing(4, 0, 2),
    },
  }));

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}

const displayObjectInitial = {
    current: null,
    bc: [],
    array: []
};

const contextActionInitial = {
    rcElement : null,
    openRepoDialog : false
};

const LoggedIn = ({userDetails}) => {
    const query = useQuery();
    const classes = useStyles();
    const [displayObject, setDisplayObject] = useState(displayObjectInitial);
    const [contextAction, setContextAction] = useState(contextActionInitial);

    const openFile = (file) => {
        if(displayObject.current === 'Repos') {
            currentRepo = file;
            getBranches(file).then((response) => {
                displayObjects.Branches = response;
                setDisplayObject({
                    current: "Branches",
                    bc: ["Repos","Branches"],
                    array: response
                });
            })
        } else if (displayObject.current === 'Branches') {
            getBranchContents(currentRepo).then((response) => {
                displayObjects.Files = response;
                setDisplayObject({
                    current: "Files",
                    bc: ["Repos","Branches","Files"],
                    array: response
                });
            })
        }
    }

    useEffect( () => {
        const code = query.get('code');
        if (code) {
            authorize(code).then((response) => {
                if (response === 'success') {
                    getUserData().then((response) => {
                        if (response.login) {
                            userDetails({
                                login: response.login,
                                avatar: response.avatar_url
                            })
                            getRepos().then((response) => {
                                displayObjects.Repos = response;
                                setDisplayObject({
                                    current: "Repos",
                                    bc: ["Repos"],
                                    array: response
                                });
                            });
                        }
                    })
                }
            })
        }
    },[]);

    const updatePage = (newPage) => {
        if (newPage === "Repos") {
            displayObjects.Branches = null;
            setDisplayObject({
                current: newPage,
                bc: ["Repos"],
                array: displayObjects[newPage]
            });
        } else if (newPage === "Branches") {
            displayObjects.Files = null;
            setDisplayObject({
                current: newPage,
                bc: ["Repos","Branches"],
                array: displayObjects[newPage]
            });
        }
    }

    const rightClickElement = (event) => {
        if (displayObject.current === "Repos") {
            rightClickArray = ["New Repo"];
        } else if (displayObject.current === "Branches") {
            rightClickArray = ["New Branch"];
        } else if (displayObject.current === "Files") {
            rightClickArray = ["New File"];
        }
        const element = checkRightClick(event);
        setContextAction({...contextAction,rcElement:element});
    }

    const rightClickItem = (event,id) => {
        if (displayObject.current === "Repos") {
            // right click done on repos, fetching specific repo by id
            itemObjectToDisplay = displayObject.array.find((element) => element.id === id);
            rightClickArray = ["Delete Repo", "Get/Edit details"];
        } else if (displayObject.current === "Branches") {
            rightClickArray = ["Delete Branch", "Branch History"];
        } else if (displayObject.current === "Files") {
            rightClickArray = ["Download File"];
        }
        const element = checkRightClick(event);
        setContextAction({...contextAction,rcElement:element});
    }

    const closeRightClickElement = () => {
        setContextAction({...contextAction,rcElement:null});
    }

    const rightClickMenuOptionSelected = (option) => {
        if (displayObject.current === "Repos") {
            if (option === "Get/Edit details") {
                setContextAction({...contextAction,openRepoDialog:true,rcElement:null});
            } else if (option === "New Repo") {
                itemObjectToDisplay = {}
                setContextAction({...contextAction,openRepoDialog:true,rcElement:null});
            } else if (option === "Delete Repo") {
                itemObjectToDisplay = {}
                setContextAction({...contextAction,openRepoDialog:true,rcElement:null});
            }
        }
    }

    const closeDialog = () => {
        setContextAction({...contextAction,openRepoDialog:false});
    }

    const updateRepository = (repoObject) => {
        let currentArray = displayObject.array;
        const isPresent = currentArray.findIndex(element=>element.id === repoObject.id);
        if (isPresent >= 0) {
            currentArray = currentArray.map((element) => {
                if (element.id === repoObject.id) {
                    return repoObject;
                } else {
                    return element;
                }
            })
        } else {
            currentArray.push(repoObject);
        }
        setDisplayObject({...displayObject,array:currentArray})
    }


    return (
        <div onContextMenu={rightClickElement} >
            <RightClickMenu element={contextAction.rcElement} contents={rightClickArray} closing={closeRightClickElement} optionSelected={rightClickMenuOptionSelected} />
            {contextAction.openRepoDialog &&  <EditRepo repo={itemObjectToDisplay} closeDialog={closeDialog} updateRepoObj={updateRepository} />}
            <Grid item xs={12} md={12}>
                <Typography variant="h4" className={classes.title}>
                    {
                        displayObject && displayObject.bc && <Breadcrumbsgit bc={displayObject.bc} setCurrentPage={updatePage} ></Breadcrumbsgit>
                    }
                </Typography>
                <div className={classes.demo}>
                    <DisplayItems objectArray={displayObject.array} openSomething={openFile} rightClickItem={rightClickItem}></DisplayItems>
                </div>
        </Grid>
        </div>
    );
}

export default LoggedIn;