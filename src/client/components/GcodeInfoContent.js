import React, { Component, useState, useRef } from 'react';
import { Icon, Grid, Button, Paper, Container } from '@material-ui/core';
import {Box, Typography, CircularProgress} from '@mui/material'
import { Upload, UploadFile, CheckBoxOutlineBlank, CheckBox } from '@mui/icons-material';
import { styles } from './../styles/theme'
import Axios from 'axios'

export default function GcodeInfoContent () {
    const [selectedFile, setSelectedFile] = useState(null)
    const [fileLoading, setFileLoading] = useState(0)
    const hiddenFileInput = useRef(null)
    const acceptedFileTypes = '.nc, .cnc, .ngc, .gcode, .tap'

    const handleselectedFile = e => {
        setSelectedFile(e.target.files[0])
        setFileLoading(0)
    }

    const handleUpload = () => {
        const data = new FormData()
        data.append('file', selectedFile, selectedFile.name)
        Axios
          .post('/upload-gcode', data, {
            onUploadProgress: ProgressEvent => {
                setFileLoading((ProgressEvent.loaded / ProgressEvent.total*100))
            },
          })
          .then(res => {
            console.log(res.statusText)
            console.log(res.data.fileStatus)
          })
    }

    const CircularProgressWithLabel = (props) => {
        return (
            <Box sx={{ position: 'relative', display: 'inline-flex' }}>
              <CircularProgress variant="determinate" {...props} />
              <Box
                sx={{
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  position: 'absolute',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="caption" component="div" color='#BBE1FF'>
                  {`${Math.round(props.value)}%`}
                </Typography>
              </Box>
            </Box>
          );
    }

    const UploadStateComponent = () => {
        let uploadStateComponent
        switch (fileLoading) {
            case 100:
                uploadStateComponent = (<div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <CheckBox style={{color: 'rgb(30, 130, 76)', fontSize: '2vw'}} />
                    <b style={{color: 'rgb(30, 130, 76)'}}>Ready</b>
                </div>)
                break;
            case 0:
                uploadStateComponent = (<div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <CheckBoxOutlineBlank style={{color: '#BBE1FF', fontSize: '2vw'}} />
                    <b style={{color: '#BBE1FF'}}>waiting for upload</b>
                </div>)
                break;
            default:
                uploadStateComponent = (<>
                    <CircularProgressWithLabel value={Math.round(fileLoading,2)} />
                </>)
        }
        return (uploadStateComponent)
    }

    return (
      <div style={styles.divInitContent}>
          <Grid container style={{width: '100%', flexDirection: 'column', justifyContent: 'flex-end'}}>
              <Grid item style={{display: 'flex', width: '100%', height: '15vh', justifyContent: 'space-around', alignItems: 'center' }}>
                <Grid item style={{display: 'flex', height: '100%', justifyContent: 'space-evenly', flexDirection: 'column'}} >
                    <Button
                        variant="contained"
                        color="primary"
                        style={styles.button}
                        startIcon={<UploadFile style={styles.icon} />}
                        onClick={() => {hiddenFileInput.current.click()}}
                    >Select</Button>
                    <Button
                        variant="contained"
                        color="primary"
                        style={styles.button}
                        startIcon={<Upload style={styles.icon} />}
                        onClick={handleUpload}
                    >Upload</Button>
                    <input 
                        type='file'
                        ref={hiddenFileInput}
                        onChange={handleselectedFile}
                        style={{display:'none'}}
                        accept={acceptedFileTypes}/>

                </Grid>
                <Grid item style={{display: 'flex', height: '100%', justifyContent: 'space-evenly', flexDirection: 'column'}} >
                    <Paper variant='outlined' style={{height: '20%', maxWidth: '25vw', padding: 2, backgroundColor: 'rgb(187, 225, 250)'}}
                    > <b>File: </b>{(selectedFile ? selectedFile.name : 'no file selected')}</Paper>

                </Grid>
                <UploadStateComponent/>


              </Grid>

          </Grid>
        

      </div>
    );
  }