import axios from 'axios';
let at = null;
let session = null;
let gitApi = 'https://api.github.com';

const authorize = (code) => {
    const data = new FormData();
    data.append("client_id", 'd9ac0753dcb7cfae87de');
    data.append("client_secret", '177c3bb99b418a80a1bc1f32bc9ec5e885e6f95e');
    data.append("code", code);
    data.append("redirect_uri", 'https://sidharth1993.github.io/gitter-repo/callback');
    return axios.post('login/oauth/access_token',data).then((response) => {
        const params = new URLSearchParams(response.data);
        const access_token = params.get("access_token");
        //sessionStorage.setItem('at',access_token);
        at = access_token;
        return "success";
    })
}

const getUserData = () => {
    return getWithAt(`${gitApi}/user`).then((response) => {
        if (response.login) {
            session = response;        
        }
        return response;
    }) 
}

const getRepos = () => {
    return getWithAt(`${session.repos_url}`).then((response) => {
        return response;
    })
}

const updateRepo = (repo,repoObj) => {
    return patchWithAt(`${gitApi}/repos/${session.login}/${repo}`,repoObj).then((response) => {
        return response;
    })
}

const createRepo = (repoObj) => {
    return postWithAt(`${gitApi}/user/repos`,repoObj).then((response) => {
        return response;
    })
}

const deleteRepo = (repo) => {
    return getWithAt(`${gitApi}/repos/${session.login}/${repo}`).then((response) => {
        return response;
    })
}

const getBranches = (repo) => {
    return getWithAt(`${gitApi}/repos/${session.login}/${repo}/branches`).then((response) => {
        return response;
    })
}

const getBranchContents = (repo) => {
    return getWithAt(`${gitApi}/repos/${session.login}/${repo}/contents`).then((response) => {
        return response;
    })
}

const getWithAt = (url) => {
    //const at = sessionStorage.getItem('at');
    return axios.get(url,{
        headers:{
            "Authorization" : `token ${at}`
        }
    }).then( (response) => {
        return response.data;
    }).catch( (error) => {
        return error;
    })
}

const postWithAt = (url,body) => {
    //const at = sessionStorage.getItem('at');
    return axios.post(url,body,{
        headers:{
            "Authorization" : `token ${at}`
        }
    }).then( (response) => {
        return response.data;
    }).catch( (error) => {
        return error;
    })
}

const patchWithAt = (url,body) => {
    //const at = sessionStorage.getItem('at');
    return axios.post(url,body,{
        headers:{
            "Authorization" : `token ${at}`
        }
    }).then( (response) => {
        return response.data;
    }).catch( (error) => {
        return error;
    })
}

export {
    authorize,
    getUserData,
    getRepos,
    getBranches,
    getBranchContents,
    updateRepo,
    createRepo,
    deleteRepo
}
