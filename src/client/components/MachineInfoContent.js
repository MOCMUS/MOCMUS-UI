import React, { Component, Text, useState } from 'react';
import { Icon, Grid, Button, Paper, TextField, RadioGroup } from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { ChevronRight } from '@material-ui/icons';
import { styles } from './../styles/theme'

export default function MachineInfoContent () {
    const [unit, setUnit] = useState('inch')
    const [step, setStep] = useState('inc')

    return (
      <div style={styles.divInitContent}>
          <Grid style={{flexDirection: 'row'}}
            container
            >
                <Grid container style={{display: 'flex', flex: 1, flexDirection: 'column'}} >
                    <Grid item style={{display: 'flex', flex: 1, justifyContent: 'center'}} >
                        <h1 style={styles.title}>Current Positions</h1>
                    </Grid>
                    <Grid container style={{display: 'flex', flex: 8}} >
                        <Grid container style={{display: 'flex', flex: 1, flexDirection: 'column'}} >
                            <Grid item style={{display: 'flex', flex: 1}} ></Grid>
                            <Grid item style={{display: 'flex', flex: 1, justifyContent: 'center'}} >
                                <Paper style={{textAlign: 'center', alignSelf: 'center', width: '40%', fontSize: 45, padding: 2, backgroundColor: 'rgb(187, 225, 250)'}}>X</Paper>
                            </Grid>
                            <Grid item style={{display: 'flex', flex: 1, justifyContent: 'center'}} >
                                <Paper style={{textAlign: 'center', alignSelf: 'center', width: '40%', fontSize: 45, padding: 2, backgroundColor: 'rgb(187, 225, 250)'}}>Y</Paper>
                            </Grid>
                            <Grid item style={{display: 'flex', flex: 1, justifyContent: 'center'}} >
                                <Paper style={{textAlign: 'center', alignSelf: 'center', width: '40%', fontSize: 45, padding: 2, backgroundColor: 'rgb(187, 225, 250)'}}>Z</Paper>
                            </Grid>
                        </Grid>
                        <Grid container style={{display: 'flex', flex: 2, flexDirection: 'column'}} >
                            <Grid item style={{display: 'flex', flex: 1, justifyContent: 'center'}} >
                                <Paper style={{textAlign: 'center', alignSelf: 'center', width: '80%', fontSize: 25, padding: 2, backgroundColor: 'rgb(187, 225, 250)'}}>Home</Paper>
                            </Grid>
                            <Grid item style={{display: 'flex', flex: 1, justifyContent: 'center', padding: 2}} >
                                <Paper style={{textAlign: 'center', alignSelf: 'center', padding: 2}}>
                                    <TextField
                                        id="home-X"
                                        type="text"
                                        inputProps={{readOnly: true}}
                                        InputProps={{style: {fontSize: 30, fontFamily: 'sans-serif'}}}
                                        variant='outlined'
                                    />
                                </Paper>
                            </Grid>
                            <Grid item style={{display: 'flex', flex: 1, justifyContent: 'center', padding: 2}} >
                                <Paper style={{textAlign: 'center', alignSelf: 'center', padding: 2}}>
                                    <TextField
                                        id="home-Y"
                                        type="text"
                                        inputProps={{readOnly: true}}
                                        InputProps={{style: {fontSize: 30, fontFamily: 'sans-serif'}}}
                                        variant='outlined'
                                    />
                                </Paper>
                            </Grid>
                            <Grid item style={{display: 'flex', flex: 1, justifyContent: 'center', padding: 2}} >
                                <Paper style={{textAlign: 'center', alignSelf: 'center', padding: 2}}>
                                    <TextField
                                        id="home-Z"
                                        type="text"
                                        inputProps={{readOnly: true}}
                                        InputProps={{style: {fontSize: 30, fontFamily: 'sans-serif'}}}
                                        variant='outlined'
                                    />
                                </Paper>
                            </Grid>
                        </Grid>
                        <Grid container style={{display: 'flex', flex: 2, flexDirection: 'column'}} >
                            <Grid item style={{display: 'flex', flex: 1, justifyContent: 'center'}} >
                                <Paper style={{textAlign: 'center', alignSelf: 'center', width: '80%', fontSize: 25, padding: 2, backgroundColor: 'rgb(187, 225, 250)'}}>WCS</Paper>
                            </Grid>
                            <Grid item style={{display: 'flex', flex: 1, justifyContent: 'center', padding: 2}} >
                                <Paper style={{textAlign: 'center', alignSelf: 'center', padding: 2}}>
                                    <TextField
                                        id="wcs-X"
                                        type="text"
                                        inputProps={{readOnly: true}}
                                        InputProps={{style: {fontSize: 30, fontFamily: 'sans-serif'}}}
                                        variant='outlined'
                                    />
                                </Paper>
                            </Grid>
                            <Grid item style={{display: 'flex', flex: 1, justifyContent: 'center', padding: 2}} >
                                <Paper style={{textAlign: 'center', alignSelf: 'center', padding: 2}}>
                                    <TextField
                                        id="wcs-Y"
                                        type="text"
                                        inputProps={{readOnly: true}}
                                        InputProps={{style: {fontSize: 30, fontFamily: 'sans-serif'}}}
                                        variant='outlined'
                                    />
                                </Paper>
                            </Grid>
                            <Grid item style={{display: 'flex', flex: 1, justifyContent: 'center', padding: 2}} >
                                <Paper style={{textAlign: 'center', alignSelf: 'center', padding: 2}}>
                                    <TextField
                                        id="wcs-Z"
                                        type="text"
                                        inputProps={{readOnly: true}}
                                        InputProps={{style: {fontSize: 30, fontFamily: 'sans-serif'}}}
                                        variant='outlined'
                                    />
                                </Paper>
                            </Grid>
                        </Grid>  

                    </Grid>
                </Grid>
                <Grid item style={{display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center'}} >
                <ToggleButtonGroup
                    value={unit}
                    exclusive
                    size={'large'}
                    style={{backgroundColor: 'rgb(187, 225, 250)'}}
                    onChange={(e, newunit) =>  {setUnit(newunit)}}
                    aria-label="unit"
                    >
                    <ToggleButton value='mm' style={{color: 'rgb(15, 76, 117)'}} aria-label="mm unit">
                        mm
                    </ToggleButton>
                    <ToggleButton value='inch' style={{color: 'rgb(15, 76, 117)'}} aria-label="inch unit">
                        inch
                    </ToggleButton>
                </ToggleButtonGroup>
                <ToggleButtonGroup
                    value={step}
                    exclusive
                    size={'large'}
                    style={{backgroundColor: 'rgb(15, 76, 117)'}}
                    onChange={(e, newstep) => setStep(newstep)}
                    aria-label="text alignment"
                    >
                    <ToggleButton value='abs' style={{color: 'rgb(187, 225, 250)'}} aria-label="left aligned">
                        abs
                    </ToggleButton>
                    <ToggleButton value='inc' style={{color: 'rgb(187, 225, 250)'}} aria-label="centered">
                        inc
                    </ToggleButton>
                </ToggleButtonGroup>
                </Grid>
            </Grid>

      </div>
    );
  }