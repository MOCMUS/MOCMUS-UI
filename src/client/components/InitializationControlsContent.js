import React, { Component, useState } from 'react';
import { Icon, Grid, Button, Paper, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import { Home, LocationSearching } from '@material-ui/icons';
import { styles } from './../styles/theme'
import Axios from 'axios'

const useStyles = makeStyles({
    inputStyle:{
        textAlign: 'center',
        fontSize: 30,
        fontFamily: 'sans-serif',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 5,
        paddingRight: 5
    },
    axisCard:{
        textAlign: 'center',
        alignSelf: 'center',
        width: '3.5vw',
        fontSize: '3vh',
        padding: 2,
        backgroundColor: 'rgb(187, 225, 250)'
    },
  })

export default function InitializationControlsContent () {
    const classes = useStyles()
    const [XWCS, setXWCS] = useState(sessionStorage.getItem('XWCS') ? sessionStorage.getItem('XWCS') : '')
    const [YWCS, setYWCS] = useState(sessionStorage.getItem('YWCS') ? sessionStorage.getItem('YWCS') : '')
    const [ZWCS, setZWCS] = useState(sessionStorage.getItem('ZWCS') ? sessionStorage.getItem('ZWCS') : '')
    const [BWCS, setBWCS] = useState(sessionStorage.getItem('BWCS') ? sessionStorage.getItem('BWCS') : '0')
    const [CWCS, setCWCS] = useState(sessionStorage.getItem('CWCS') ? sessionStorage.getItem('CWCS') : '0')

    const setTxtFieldValue = (value, axis) => {
        switch(axis) {
            case 'x':
              setXWCS(value)
              sessionStorage.setItem('XWCS', value)
              break;
            case 'y':
              setYWCS(value)
              sessionStorage.setItem('YWCS', value)
              break;
            case 'z':
              setZWCS(value)
              sessionStorage.setItem('ZWCS', value)
              break;
            case 'b':
              setBWCS(value)
              sessionStorage.setItem('BWCS', value)
              break;
            case 'c':
              setCWCS(value)
              sessionStorage.setItem('CWCS', value)
              break;
            default:
              console.log('invalid axis')
          }
    }

    const handleWCSButton = () => {
        let wcsCmd = ''

        if (!!XWCS) wcsCmd = wcsCmd + ' X' + XWCS
        if (!!YWCS) wcsCmd = wcsCmd + ' Y' + YWCS
        if (!!ZWCS) wcsCmd = wcsCmd + ' Z' + ZWCS
        if (!!BWCS) wcsCmd = wcsCmd + ' B' + BWCS
        if (!!CWCS) wcsCmd = wcsCmd + ' C' + CWCS

        if (!!wcsCmd) {
            wcsCmd = `G10 L20 P1 ${wcsCmd}`
            Axios.post('/wcs-command', { command: wcsCmd })

        }

    }

    const inputStyle = {
        textAlign: 'center',
        fontSize: 30,
        fontFamily: 'sans-serif',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 5,
        paddingRight: 5
    }

    return (
      <div style={styles.divInitContent}>
          <Grid style={{flexDirection: 'column'}}
            container
            >
                <Grid item style={{display: 'flex', flex: 1, justifyContent: 'space-around'}}
                >
                  <h1 style={styles.title}>WCS Offsets</h1>  
                </Grid>
                <Grid item style={{display: 'flex', paddingBottom: 10, justifyContent: 'space-around'}}
                >
                    <Paper className={classes.axisCard}> X </Paper>
                    <Paper className={classes.axisCard}> Y </Paper>
                    <Paper className={classes.axisCard}> Z </Paper>
                    <Paper className={classes.axisCard}> B </Paper>
                    <Paper className={classes.axisCard}> C </Paper>
                </Grid>
                <Grid item style={{display: 'flex', flex: 1, justifyContent: 'space-around', alignItems: 'center'}}
                >
                <Paper style={styles.textfield}>
                <TextField
                    id="wcs-field-X"
                    type="number"
                    inputProps={{min: '-50', max: '50', style: inputStyle}}
                    variant='outlined'
                    value={XWCS}
                    onChange={(value) => setTxtFieldValue(event.target.value, 'x')}
                    InputLabelProps={{
                    shrink: true,
                    }}
                />
                </Paper>
                <Paper style={styles.textfield}>
                <TextField
                    id="wcs-field-Y"
                    type="number"
                    inputProps={{min: '-50', max: '50', style: inputStyle}}
                    variant='outlined'
                    value={YWCS}
                    onChange={(value) => setTxtFieldValue(event.target.value, 'y')}
                    InputLabelProps={{
                    shrink: true,
                    }}
                />
                </Paper>
                <Paper style={styles.textfield}>
                <TextField
                    id="wcs-field-Z"
                    type="number"
                    inputProps={{min: '-50', max: '50', style: inputStyle}}
                    variant='outlined'
                    value={ZWCS}
                    onChange={(value) => setTxtFieldValue(event.target.value, 'z')}
                    InputLabelProps={{
                    shrink: true,
                    }}
                /> 
                </Paper>
                <Paper style={styles.textfield}>
                <TextField
                    id="wcs-field-B"
                    type="number"
                    inputProps={{min: '-50', max: '50', style: inputStyle}}
                    variant='outlined'
                    value={BWCS}
                    onChange={(value) => setTxtFieldValue(event.target.value, 'b')}
                    InputLabelProps={{
                    shrink: true,
                    }}
                /> 
                </Paper>
                <Paper style={styles.textfield}>
                <TextField
                    id="wcs-field-C"
                    type="number"
                    inputProps={{min: '-50', max: '50', style: inputStyle}}
                    variant='outlined'
                    value={CWCS}
                    onChange={(value) => setTxtFieldValue(event.target.value, 'c')}
                    InputLabelProps={{
                    shrink: true,
                    }}
                /> 
                </Paper>
                </Grid>
                <Grid item style={{display: 'flex', flex: 3, justifyContent: 'space-around', alignItems: 'center'}}
                >
                    <Button
                        variant="contained"
                        color="primary"
                        style={styles.button}
                        startIcon={<LocationSearching style={styles.icon} />}
                        onClick={() => handleWCSButton()}
                    >
                        WCS
                    </Button>
                </Grid>
            </Grid>

      </div>
    );
  }