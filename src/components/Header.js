import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  avatar: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

function Header({user}) {
  const classes = useStyles();

  const loginClick = () => {
    window.location.href = 'https://github.com/login/oauth/authorize?scope=user,repo,delete_repo&client_id=d9ac0753dcb7cfae87de&redirect_uri=http://localhost:3000';
  }

  return (
    <header>
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        <Link to="/">Gitter</Link>
                    </Typography>
                    {
                        user ? 
                        <div className={classes.avatar} >
                            <Avatar alt={`${user.login} avatar`} src={user.avatar} />
                        </div> 
                        : 
                        <div>
                            <Typography variant="h6" className={classes.title}>
                                github.com /<Button color="inherit"  onClick={loginClick}>authorize</Button>
                            </Typography>
                        </div>
                    }
                                    
                </Toolbar>
            </AppBar>
        </div>
  </header>
  );
}

export default Header;
