const checkRightClick = (event) => {
    event.stopPropagation();
    event.preventDefault();
    const position = {
        X:event.clientX,
        Y:event.clientY
    };
    // const element = event.currentTarget;
    return position
}

export {
    checkRightClick
}