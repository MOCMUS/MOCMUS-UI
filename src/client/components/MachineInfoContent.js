import React, { Component, Text, useState, useEffect } from 'react';
import { Icon, Grid, Button, Paper, TextField, RadioGroup } from '@material-ui/core';
import Axios from 'axios'
import SwitchSelector from "react-switch-selector";
import { ChevronRight } from '@material-ui/icons';
import { styles } from './../styles/theme'

export default function MachineInfoContent () {
    const [unit, setUnit] = useState('imp')
    const [step, setStep] = useState('inc')
    const [machineState, setMachineState] = useState('')
    const [MposX, setMposX] = useState('0.000')
    const [MposY, setMposY] = useState('0.000')
    const [MposZ, setMposZ] = useState('0.000')
    const [WposX, setWposX] = useState('0.000')
    const [WposY, setWposY] = useState('0.000')
    const [WposZ, setWposZ] = useState('0.000')

    const getPositions = async () => {
        try {
      const currentPositions = await Axios.get('/current-positions')
      if (typeof currentPositions.data !== 'string')
        return
      
      const infoPositions = currentPositions.data.split(',')

      setMachineState(infoPositions[0])
      setMposX(infoPositions[1].split(':')[1])
      setMposY(infoPositions[2])
      setMposZ(infoPositions[3])
      setWposX(infoPositions[4].split(':')[1])
      setWposY(infoPositions[5])
      setWposZ(infoPositions[6])
      
      
        
        } catch (err) {
          console.error(err.message)
        }
      }

    useEffect(() => {
        getPositions()
        const refreshInterval = setInterval(()=>{
            getPositions()
        },5000)
        
        
        return()=>clearInterval(refreshInterval)
      }, [])

    return (
      <div style={styles.divInitContent}>
          <Grid style={{flexDirection: 'row'}}
            container
            >
                <Grid container style={{display: 'flex', flex: 1, flexDirection: 'column'}} >
                    <Grid item style={{display: 'flex', flex: 1, justifyContent: 'center'}} >
                        <h1 style={styles.title}>Current Positions</h1>
                        {/* <h1 style={styles.title}>{positions}</h1> */}
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
                                        value={MposX}
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
                                        value={MposY}
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
                                        value={MposZ}
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
                                        value={WposX}
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
                                        value={WposY}
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
                                        value={WposZ}
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
                    <div style={{width: '50%', height: 50}}>
                        <SwitchSelector
                            onChange={newUnit => setUnit(newUnit)}
                            options={[{ label: "Imperial",
                                        value: "imp",
                                        selectedBackgroundColor: 'rgb(15, 76, 117)',
                                        selectedFontColor: 'rgb(187, 225, 250)'},
                                    {   label: "Metric",
                                        value: "met",
                                        selectedBackgroundColor: 'rgb(15, 76, 117)',
                                        selectedFontColor: 'rgb(187, 225, 250)'}]}
                            initialSelectedIndex={unit}
                            backgroundColor={'rgb(27, 38, 44)'}
                            fontColor={'rgb(187, 225, 250)'}
                            fontSize={25}
                        />
                    </div>
                    <div style={{width: '50%', height: 50}}>
                        <SwitchSelector
                            onChange={newStep => setStep(newStep)}
                            options={[{ label: "Increment",
                                        value: "inc",
                                        selectedBackgroundColor: 'rgb(15, 76, 117)',
                                        selectedFontColor: 'rgb(187, 225, 250)'},
                                    {   label: "Absolute",
                                        value: "abs",
                                        selectedBackgroundColor: 'rgb(15, 76, 117)',
                                        selectedFontColor: 'rgb(187, 225, 250)'}]}
                            initialSelectedIndex={unit}
                            backgroundColor={'rgb(27, 38, 44)'}
                            fontColor={'rgb(187, 225, 250)'}
                            fontSize={25}
                        />
                    </div>
                </Grid>
            </Grid>

      </div>
    );
  }