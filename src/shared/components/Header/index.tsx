import React from 'react';
import { Avatar, InputBase } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

interface HeaderProps {
    search?: string;
    userName?: string;
    userAvatar?: string;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            width: 400,
        },
        input: {
            marginLeft: theme.spacing(1),
            flex: 1,
        },
        iconButton: {
            padding: 10,
        },
        divider: {
            height: 28,
            margin: 4,
        },
    }),
);

function Header(props: HeaderProps) {

    const classes = useStyles();

    return (
        <div className="p-4 flex flex-row items-center justify-between">
            <h1>LOGO</h1>
            <InputBase
                className="ml-5 mr-5"
                placeholder="Search Google Maps"
                inputProps={{ 'aria-label': 'search google maps' }} />
            <div>
                <Avatar src={props.userAvatar} />
                <span>{props.userName}</span>
            </div>
        </div>
    )
}

export default Header;