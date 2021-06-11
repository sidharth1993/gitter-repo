import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import { createRepo, updateRepo } from '../service/gitHubApi';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }));

let isRepoName = false;

export default function EditRepo({repo,closeDialog,updateRepoObj}) {

    const classes = useStyles();

    isRepoName = Boolean(repo.name);

    const oldRepoName = repo.name;

    const [ values, setValues] = React.useState({
        has_downloads: repo.has_downloads || false,
        has_issues: repo.has_issues || false,
        default_branch: repo.default_branch || 'master',
        description: repo.description,
        disabled: repo.disabled || false,
        archived: repo.archived || false,
        private: repo.private || false,
        name: repo.name,
        homepage: repo.homepage,
        allow_squash_merge: repo.allow_squash_merge || false,
        allow_merge_commit: repo.allow_merge_commit || false,
        allow_rebase_merge: repo.allow_rebase_merge || false,
        delete_branch_on_merge: repo.delete_branch_on_merge || false,
        is_template: repo.is_template || false
    });

    const [success, setSuccess] = useState(null);

    const updateRepoValuesBoolean = (event) => {
        setValues({...values, [event.target.name]: event.target.checked});
    }

    const updateRepoValuesText = (event) => {
        setValues({...values, [event.target.name]: event.target.value});
    }

    const createRepository = () => {
        createRepo(values).then((response) => {
            if (response && response.name && response.name === values.name) {
                isRepoName = true;
                updateRepoObj(response);
                setSuccess("Created");
            }
        })
    }

    const updateRepository = () => {
        updateRepo(oldRepoName, values).then((response) => {
            if (response && response.name && response.name === values.name) {
                isRepoName = true;
                updateRepoObj(response);
                setSuccess("Updated");
            }
        })
    }

  return (
    <div>
      <Dialog
        open={true}
        onClose={closeDialog}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">{(isRepoName)?values.name:'New Repo'}</DialogTitle>
        <DialogContent dividers={true}>
            {success && 
                    <div className={classes.root}>
                    <Collapse in={Boolean(success)}>
                        <Alert
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setSuccess(null);
                                }}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                            }
                        >
                            {success} successfully!
                        </Alert>
                    </Collapse>
                    </div>
            }


    <FormControl component="fieldset">
      <FormGroup>
        <TextField name="name" value={values.name} onChange={updateRepoValuesText} label="Name" id="standard-size-small" placeholder="gitter-repo" size="small" />

        <TextField name="homepage" value={values.homepage} onChange={updateRepoValuesText} label="Homepage" id="standard-size-small" placeholder="http://localhost:3000" size="small" />

        <TextField name="description" value={values.description} onChange={updateRepoValuesText} label="Description" id="standard-size-small" placeholder="Repo created on gitter" size="small" multiline />

        <TextField name="default_branch" value={values.default_branch} onChange={updateRepoValuesText} label="Default Branch" id="standard-size-small" size="small" />

        <FormControlLabel
          control={<Switch checked={values.private} onChange={updateRepoValuesBoolean} name="private" />}
          label="Private repo?"
        />
        <FormControlLabel
          control={<Switch checked={values.archived} onChange={updateRepoValuesBoolean} name="archived" />}
          label="Archived repo?"
        />
        <FormControlLabel
          control={<Switch checked={values.disabled} onChange={updateRepoValuesBoolean} name="disabled" />}
          label="Disabled repo?"
        />
        <FormControlLabel
          control={<Switch checked={values.has_issues} onChange={updateRepoValuesBoolean} name="has_issues" />}
          label="Repo issues?"
        />
        <FormControlLabel
          control={<Switch checked={values.has_downloads} onChange={updateRepoValuesBoolean} name="has_downloads" />}
          label="Downloadable?"
        />
        <FormControlLabel
          control={<Switch checked={values.allow_squash_merge} onChange={updateRepoValuesBoolean} name="allow_squash_merge" />}
          label="Can squash merge?"
        />
        <FormControlLabel
          control={<Switch checked={values.allow_merge_commit} onChange={updateRepoValuesBoolean} name="allow_merge_commit" />}
          label="Can merge commit?"
        />
        <FormControlLabel
          control={<Switch checked={values.allow_rebase_merge} onChange={updateRepoValuesBoolean} name="allow_rebase_merge" />}
          label="Can rebase merge?"
        />
        <FormControlLabel
          control={<Switch checked={values.delete_branch_on_merge} onChange={updateRepoValuesBoolean} name="delete_branch_on_merge" />}
          label="Delete original branch on merge?"
        />
        <FormControlLabel
          control={<Switch checked={values.is_template} onChange={updateRepoValuesBoolean} name="is_template" />}
          label="Use as template to create repos in future?"
        />
      </FormGroup>
      <FormHelperText>Archived repo can only be unarchived on https://github.com </FormHelperText>

    </FormControl>

        </DialogContent>
        <DialogActions>
          {
             (isRepoName)? 
             <Button onClick={updateRepository} color="primary">Edit</Button> :
             <Button onClick={createRepository} color="primary">Create</Button>
          }  
        </DialogActions>
      </Dialog>
    </div>
  );
}
