import React from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Button from '@material-ui/core/Button';

const Breadcrumbsgit = ({bc, setCurrentPage}) => {

    return (
        <Breadcrumbs aria-label="breadcrumb">
        {
            bc && bc.length > 0 && bc.map((b, index) => <Button key={index} color="inherit" onClick={()=>{setCurrentPage(b)}} >{b}</Button>)
        }
        </Breadcrumbs>
    );
}

export default Breadcrumbsgit;