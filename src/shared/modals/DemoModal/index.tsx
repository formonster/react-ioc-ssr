import React, { useCallback, useState } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import BaseModal from '../BaseModal';

function Header() {

    const [open, setOpen] = useState(false);

    const onChangeOpen = useCallback(function () {
        setOpen(!open);
    }, [open])

    return (
        <BaseModal title="Hello" open={open} onClose={onChangeOpen} footer={(
            <div>
                <Button onClick={onChangeOpen}>保存</Button>
                <Button onClick={onChangeOpen}>取消</Button>
            </div>
        )}>
            <Typography gutterBottom>
                Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
                in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
            </Typography>
            <Typography gutterBottom>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
                lacus vel augue laoreet rutrum faucibus dolor auctor.
            </Typography>
            <Typography gutterBottom>
                Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
                scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus
                auctor fringilla.
            </Typography>
        </BaseModal>
    )
}

export default Header;