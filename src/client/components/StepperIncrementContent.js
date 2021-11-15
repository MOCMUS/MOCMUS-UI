import React, { Component, useState } from 'react';
import { Icon, Grid, Button, Paper, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import { ChevronRight, Refresh } from '@material-ui/icons';
import { styles } from './../styles/theme'
import Axios from 'axios'

const useStyles = makeStyles({
    button:{
        height: '6vh',
        width: '8vw',
        fontSize: '1.2vw',
        backgroundColor: 'rgb(15, 76, 117)',
        color: 'rgb(187, 225, 250)'
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

export default function StepperIncrementContent () {
    const classes = useStyles()

    const [Xjog, setXjog] = useState(sessionStorage.getItem('Xjog') ? sessionStorage.getItem('Xjog') : '')
    const [Yjog, setYjog] = useState(sessionStorage.getItem('Yjog') ? sessionStorage.getItem('Yjog') : '')
    const [Zjog, setZjog] = useState(sessionStorage.getItem('Zjog') ? sessionStorage.getItem('Zjog') : '')
    const [Bjog, setBjog] = useState(sessionStorage.getItem('Bjog') ? sessionStorage.getItem('Bjog') : '')
    const [Cjog, setCjog] = useState(sessionStorage.getItem('Cjog') ? sessionStorage.getItem('Cjog') : '')

    const [unit, setUnit] = useState(sessionStorage.getItem('unit') ? sessionStorage.getItem('unit') : 'G21')
    const [step, setStep] = useState(sessionStorage.getItem('step') ? sessionStorage.getItem('step') : 'G91')
    const [feedrate, setFeedrate] = useState(sessionStorage.getItem('manual_feedrate') ? sessionStorage.getItem('manual_feedrate') : '200')

    const setTxtFieldValue = (value, axis) => {
        switch(axis) {
            case 'x':
              setXjog(value)
              sessionStorage.setItem('Xjog', value)
              break;
            case 'y':
              setYjog(value)
              sessionStorage.setItem('Yjog', value)
              break;
            case 'z':
              setZjog(value)
              sessionStorage.setItem('Zjog', value)
              break;
            case 'b':
              setBjog(value)
              sessionStorage.setItem('Bjog', value)
              break;
            case 'c':
              setCjog(value)
              sessionStorage.setItem('Cjog', value)
              break;
            case 'feedrate':
              value = value.replace(/[^\d.]/g, '')
              console.log('test:', value)
            //   if (!!value) {
            //     value = value.match(/\d|\./g).join('')
            //   }
              setFeedrate(value)
              sessionStorage.setItem('manual_feedrate', value)
              break;
            default:
              console.log('invalid axis')
          }
    }

    const sendJogValue = (value, axis) => {
        let jogCmd = ''

        switch(axis) {
            case 'x':
              if (!!value) jogCmd = jogCmd + ' X' + value
              break;
            case 'y':
              if (!!value) jogCmd = jogCmd + ' Y' + value
              break;
            case 'z':
              if (!!value) jogCmd = jogCmd + ' Z' + value
              break;
            case 'b':
              if (!!value) jogCmd = jogCmd + ' B' + value
              break;
            case 'c':
              if (!!value) jogCmd = jogCmd + ' C' + value
              break;
            default:
              console.log('invalid axis')
        }

        if (!feedrate) {
            setFeedrate('200')
            sessionStorage.setItem('manual_feedrate', '200')
        }
        if (!!jogCmd) {
            jogCmd = `$j=${step} ${unit}${jogCmd} F${!!feedrate ? feedrate : '200'}`
            Axios.post('/jog-command', { command: jogCmd })

        }

    }

    const sendAllJogValue = () => {
        let jogCmd = ''

        if (!!Xjog) jogCmd = jogCmd + ' X' + Xjog
        if (!!Yjog) jogCmd = jogCmd + ' Y' + Yjog
        if (!!Zjog) jogCmd = jogCmd + ' Z' + Zjog
        if (!!Bjog) jogCmd = jogCmd + ' B' + Bjog
        if (!!Cjog) jogCmd = jogCmd + ' C' + Cjog

        if (!feedrate) {
            setFeedrate('200')
            sessionStorage.setItem('manual_feedrate', '200')
        }
        if (!!jogCmd) {
            jogCmd = `$j=${step} ${unit}${jogCmd} F${!!feedrate ? feedrate : '200'}`
            Axios.post('/jog-command', { command: jogCmd })

        }
    }

    const resetJogValues = (value) => {
        setXjog(value)
        sessionStorage.setItem('Xjog', value)
        setYjog(value)
        sessionStorage.setItem('Yjog', value)
        setZjog(value)
        sessionStorage.setItem('Zjog', value)
        setBjog(value)
        sessionStorage.setItem('Bjog', value)
        setCjog(value)
        sessionStorage.setItem('Cjog', value)
    }

    const inputStyle = {
        textAlign: 'center',
        fontSize: '4vh',
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
                <Grid item style={styles.gridItemTitle}
                >
                  <h1 style={styles.title}>Manual</h1>  
                </Grid>
                <Grid item style={{display: 'flex', justifyContent: 'space-around'}}
                >
                    <Paper className={classes.axisCard}> X </Paper>
                    <Paper className={classes.axisCard}> Y </Paper>
                    <Paper className={classes.axisCard}> Z </Paper>
                    <Paper className={classes.axisCard}> B </Paper>
                    <Paper className={classes.axisCard}> C </Paper>
                </Grid>
                <Grid item style={{display: 'flex', flex: 1, justifyContent: 'space-around'}}
                >
                <Paper style={styles.textfield}>
                <TextField
                    id="increment-field-X"
                    type="number"
                    inputProps={{min: '-50', max: '50', style: inputStyle}}
                    variant='outlined'
                    value={Xjog}
                    onChange={(value) => setTxtFieldValue(event.target.value, 'x')}
                    InputLabelProps={{
                    shrink: true,
                    }}
                />
                </Paper>
                <Paper style={styles.textfield}>
                <TextField
                    id="increment-field-Y"
                    type="number"
                    inputProps={{min: '-50', max: '50', style: inputStyle}}
                    variant='outlined'
                    value={Yjog}
                    onChange={(value) => setTxtFieldValue(event.target.value, 'y')}
                    InputLabelProps={{
                    shrink: true,
                    }}
                />
                </Paper>
                <Paper style={styles.textfield}>
                <TextField
                    id="increment-field-Z"
                    type="number"
                    inputProps={{min: '-50', max: '50', style: inputStyle}}
                    variant='outlined'
                    value={Zjog}
                    onChange={(value) => setTxtFieldValue(event.target.value, 'z')}
                    InputLabelProps={{
                    shrink: true,
                    }}
                /> 
                </Paper>
                <Paper style={styles.textfield}>
                <TextField
                    id="increment-field-B"
                    type="number"
                    inputProps={{min: '-50', max: '50', style: inputStyle}}
                    variant='outlined'
                    value={Bjog}
                    onChange={(value) => setTxtFieldValue(event.target.value, 'b')}
                    InputLabelProps={{
                    shrink: true,
                    }}
                /> 
                </Paper>
                <Paper style={styles.textfield}>
                <TextField
                    id="increment-field-C"
                    type="number"
                    inputProps={{min: '-50', max: '50', style: inputStyle}}
                    variant='outlined'
                    value={Cjog}
                    onChange={(value) => setTxtFieldValue(event.target.value, 'c')}
                    InputLabelProps={{
                    shrink: true,
                    }}
                /> 
                </Paper>
                </Grid>
                <Grid item style={{display: 'flex', flex: 1, justifyContent: 'space-around'}}
                >
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={() => sendJogValue(Xjog, 'x')}
                    >
                        Send X
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={() => sendJogValue(Yjog, 'y')}
                    >
                        Send Y
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={() => sendJogValue(Zjog, 'z')}
                    >
                        Send Z
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={() => sendJogValue(Bjog, 'b')}
                    >
                        Send B
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={() => sendJogValue(Cjog, 'c')}
                    >
                        Send C
                    </Button>
                </Grid>
                <Grid item style={{display: 'flex', flex: 1, justifyContent: 'space-around'}} >
                    <Grid item style={{display: 'flex', flex: 1, justifyContent: 'space-evenly'}}>
                    <Paper className={classes.axisCard}> F </Paper>
                    <Paper style={styles.textfield}>
                    <TextField
                        id="feedrate-field"
                        type="number"
                        inputProps={{min: '100', max: '1500', style: inputStyle}}
                        variant='outlined'
                        value={feedrate}
                        onChange={(value) => setTxtFieldValue(event.target.value, 'feedrate')}
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />
                    </Paper>

                    </Grid>
                    <Grid item style={{display: 'flex', flex: 1, justifyContent: 'space-around', alignItems: 'center'}}>
                    <Button
                        variant="contained"
                        color="primary"
                        style={{height: '6vh', fontSize: '1.5vw', backgroundColor: 'rgb(15, 76, 117)', color: 'rgb(187, 225, 250)'}}
                        onClick={() => resetJogValues('')}
                    >
                        <Refresh style={styles.icon} />
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        style={{height: '6vh', width: '14vw', fontSize: '1.5vw', backgroundColor: 'rgb(15, 76, 117)', color: 'rgb(187, 225, 250)'}}
                        onClick={sendAllJogValue}
                        endIcon={<ChevronRight style={styles.icon} />}
                    >
                        Send All
                    </Button>
                    </Grid>
                </Grid>
            </Grid>

      </div>
    );
  }