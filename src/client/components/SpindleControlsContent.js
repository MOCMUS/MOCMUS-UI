import React, { Component, useState } from 'react';
import { Icon, Grid, Button, TextField, Paper } from '@material-ui/core';
import { ChevronRight, Stop, PlayArrow } from '@material-ui/icons';
import { styles } from './../styles/theme'
import SwitchSelector from "react-switch-selector"
import Axios from 'axios'

export default function SpindleControlsContent () {
    const [spindleDirection, setSpindleDirection] = useState(sessionStorage.getItem('spindle_direction') ? sessionStorage.getItem('spindle_direction') : 'M3')
    const [spindleSpeed, setSpindleSpeed] = useState('')

    const handleSwitch = (value) => {
        setUnit(value)
        sessionStorage.setItem('spindle_direction', value)

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
                <Grid item style={{display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center'}}
                >
                  <h1 style={styles.title}>Spindle Controls</h1>  
                </Grid>
                <Grid item style={{display: 'flex', flex: 4, flexDirection: 'row'}}>
                <Grid item style={{display: 'flex', width: '50%', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center'}}
                >
                    <Grid item style={{width: '50%', height: '6.5vh'}}>
                    <SwitchSelector
                        onChange={newDirection => setSwitchesValue(newDirection, 'step')}
                        options={[{ label: "CW",
                                    value: 'M3',
                                    selectedBackgroundColor: 'rgb(15, 76, 117)',
                                    selectedFontColor: 'rgb(187, 225, 250)'},
                                {   label: "CCW",
                                    value: 'M4',
                                    selectedBackgroundColor: 'rgb(15, 76, 117)',
                                    selectedFontColor: 'rgb(187, 225, 250)'}]}
                        initialSelectedIndex={spindleDirection === 'M3' ? 0 : 1}
                        backgroundColor={'rgb(40, 50, 50)'}
                        fontColor={'rgb(187, 225, 250)'}
                        fontSize={'20vw'}
                    />
                    </Grid>
                    <Button
                        variant="contained"
                        color="primary"
                        style={styles.button}
                        startIcon={<Stop style={styles.icon} />}
                        onClick={() => {Axios.post('/spindle-speed', { command: 'M5' })}}
                    >
                        Stop
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        style={styles.button}
                        onClick={() => {if (spindleSpeed !== '') Axios.post('/spindle-speed', { command: `${spindleDirection} S${spindleSpeed}` })}}
                        endIcon={<ChevronRight style={styles.icon} />}
                    >
                        Set
                    </Button>
                </Grid>
                <Grid item style={{display: 'flex', width: '50%', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center'}}
                >
                    <Paper variant='outlined' style={{display: 'flex', alignItems: 'center', height: '6vh', paddingRight: '0.5vw', paddingLeft: '0.5vw', backgroundColor: 'rgb(187, 225, 250)', fontSize: '2.5vh'}}>
                        <b style={{marginRight: '0.5vw'}}>Spindle Speed:</b>{sessionStorage.getItem('spindle_speed') ? sessionStorage.getItem('spindle_speed') : '0'}
                    </Paper>
                    <Paper style={styles.textfield}>
                        <TextField
                            id="spindle-speed"
                            type="number"
                            inputProps={{min: '0', max: '20000', style: inputStyle}}
                            variant='outlined'
                            value={spindleSpeed}
                            onChange={(value) => setSpindleSpeed(event.target.value)}
                            InputLabelProps={{
                            shrink: true,
                            }}
                        />
                    </Paper>
                </Grid>
                </Grid>
            </Grid>

      </div>
    );
  }