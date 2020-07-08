import React, { useState } from 'react';
import { Tooltip, Button, Icon } from '@material-ui/core';
import UploadIcon from '@material-ui/icons/CloudUploadOutlined';
import { translate } from '../../util/translate';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    title: {
        color: theme.palette.primary.light,
    },
    titleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    button: {
        margin: theme.spacing(1),
    },
}));

export default ({uploaded, allowedExtensions, maxSize, multiple, accept,upload }) => {
    let fileUpload = null;
    const [thumbnails, setThumbnails] = useState([]);
    const allowedFileExtensions = allowedExtensions || ['png', 'jpg', 'jpeg'];
    const maxFileSize = maxSize || 8388608; //8 mb

    const isExtensionAllowed = (blobFile) => {
        var extension = blobFile.name.split('.').pop().toLowerCase();
        return (allowedFileExtensions.indexOf(extension) > -1)
    }
    const isSizeAllowed = (blobFile) => (blobFile.size <= maxFileSize)
    const fileInputChangeHandler = (e) => {
        const files = e.dataTransfer ? e.dataTransfer.files : e.currentTarget.files;
        let preUploadedFiles = [];
        Object.keys(files).forEach(key => {
            if (isSizeAllowed(files[key]) && isExtensionAllowed(files[key])) {
                preUploadedFiles.push(files[key]);
            }
        });
        setThumbnails(preUploadedFiles);
    }
    const deleteImage = (index) => {
        const arr = [...thumbnails];
        arr.splice(index, 1);
        setThumbnails([...arr]);
    }
    const classes = useStyles();

    return (
        <div >
            <Tooltip title={translate('common.upload')}>
                <IconButton onClick={(e) => { e.stopPropagation(); fileUpload.click() }} aria-label="delete">
                    <UploadIcon />
                </IconButton>
            </Tooltip>
            <input
                accept={accept || "image/x-png,image/jpeg,image/jpg"}
                multiple={true || false}
                type="file" ref={(file) => fileUpload = file}
                style={{ visibility: 'hidden' }}
                onChange={fileInputChangeHandler} />
            {thumbnails.length > 0 ? (
                <div>
                    <div className={classes.root}>
                        <GridList cellHeight={240} className={classes.gridList} cols={2.5}>
                            {thumbnails.map((tile, i) => (
                                <GridListTile key={i}>
                                    <img src={URL.createObjectURL(tile)} alt={i + 1} />
                                    <GridListTileBar
                                        title={i + 1}
                                        classes={{
                                            root: classes.titleBar,
                                            title: classes.title,
                                        }}
                                        actionIcon={
                                            <IconButton onClick={() => deleteImage(i)} aria-label={`star ${i + 1}`}>
                                                <CloseIcon className={classes.title} />
                                            </IconButton>
                                        }
                                    />
                                </GridListTile>
                            ))}
                        </GridList>

                    </div>
                    <Button
                        onClick={() => { upload(thumbnails); setThumbnails([]) }}
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        endIcon={<SaveIcon />}
                    >{translate('common.upload')}</Button>
                </div>
            ) : null}

        </div>
    );
}