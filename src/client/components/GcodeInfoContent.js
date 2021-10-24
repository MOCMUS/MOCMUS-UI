import React, { Component, useState, useEffect, useRef } from 'react';
import { Icon, Grid, Button, Paper, Container } from '@material-ui/core';
import {Box, Typography, CircularProgress} from '@mui/material'
import { Upload, UploadFile, CheckBoxOutlineBlank, CheckBox, ChevronRight, PlayArrow, Stop, Pause } from '@mui/icons-material';
import { styles } from './../styles/theme'
import Axios from 'axios'

export default function GcodeInfoContent () {
    const [selectedFile, setSelectedFile] = useState(null)
    const [activeFileName, setActiveFileName] = useState(sessionStorage.getItem('selected_file') ? sessionStorage.getItem('selected_file') : 'no file selected')
    const [fileLoading, setFileLoading] = useState(0)
    const [isFileReadyToRun, setIsFileReadyToRun] = useState(sessionStorage.getItem('selected_file') ? true : false)
    const hiddenFileInput = useRef(null)
    const acceptedFileTypes = '.nc, .cnc, .ngc, .gcode, .tap'

    const handleselectedFile = e => {
        setSelectedFile(e.target.files[0])
        setActiveFileName(e.target.files[0].name)
        sessionStorage.removeItem('selected_file')
        setIsFileReadyToRun(false)
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
            sessionStorage.setItem('selected_file', selectedFile.name)
            setActiveFileName(selectedFile.name)
            setIsFileReadyToRun(true)
          })
    }

    const handleControlButton = (command) => {
        if (isFileReadyToRun) {
            Axios
            .post('/gcode-runner', { gcodeCommand: command, fileName: activeFileName })
            .then(res => {
              console.log(res.data.reqStatus)
            })
        }
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

    const UploadStateComponent1 = () => {
            let uploadStateComponent
            if (isFileReadyToRun) {
                uploadStateComponent = (<div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <CheckBox style={{color: 'rgb(30, 130, 76)', fontSize: '2vw'}} />
                <b style={{color: 'rgb(30, 130, 76)'}}>Ready</b>
                </div>)

            } else {
                uploadStateComponent = (<>
                    <CircularProgressWithLabel value={Math.round(fileLoading,2)} />
                </>)
            }
            
        return (uploadStateComponent)
    }

    return (
      <div style={styles.divInitContent}>
          <Grid container style={{width: '100%', flexDirection: 'column', justifyContent: 'flex-end'}}>
          <Grid item style={{display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center'}}
                >
                  <h1 style={styles.title}>Machining Controls</h1>  
                </Grid>
                <Grid item style={{display: 'flex', flex: 2, justifyContent: 'space-around'}}
                >
                <Button
                        variant="contained"
                        color='secondary'
                        style={{alignSelf: 'center', ...styles.startButton}}
                        startIcon={<PlayArrow style={styles.icon} />}
                        onClick={() => handleControlButton('run')}
                    >
                        Run
                </Button>
                </Grid>
                <Grid item style={{display: 'flex', flex: 2, justifyContent: 'space-around'}}
                >
                    <Button
                        variant="contained"
                        color="primary"
                        style={styles.pauseButton}
                        startIcon={<Pause style={styles.icon} />}
                        onClick={() => handleControlButton('pause')}
                    >
                        Pause
                    </Button>
                    <Button
                        variant="contained"
                        color='secondary'
                        style={styles.stopButton}
                        startIcon={<Stop style={styles.icon} />}
                        onClick={() => handleControlButton('stop')}
                    >
                        Stop
                    </Button>
                </Grid>

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
                    <Paper variant='outlined' style={{height: '4vh', maxWidth: '25vw', padding: 2, backgroundColor: 'rgb(187, 225, 250)', fontSize: '2.5vh'}}
                    > <b>File: </b>{((selectedFile || sessionStorage.getItem('selected_file')) ? activeFileName : 'no file selected')}</Paper>

                </Grid>
                <UploadStateComponent1/>
              </Grid>



          </Grid>
        

      </div>
    );
  }