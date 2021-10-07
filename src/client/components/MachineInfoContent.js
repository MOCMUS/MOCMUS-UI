import React, { Component, Text, useState, useEffect } from 'react';
import { Icon, Grid, Button, Paper, TextField, RadioGroup } from '@material-ui/core';
import Axios from 'axios'
import { ChevronRight } from '@material-ui/icons';
import { styles } from './../styles/theme'

export default function MachineInfoContent () {

    const [machineState, setMachineState] = useState('')
    const [MposX, setMposX] = useState('0.000')
    const [MposY, setMposY] = useState('0.000')
    const [MposZ, setMposZ] = useState('0.000')
    const [MposB, setMposB] = useState('0.000')
    const [MposC, setMposC] = useState('0.000')
    const [WposX, setWposX] = useState('0.000')
    const [WposY, setWposY] = useState('0.000')
    const [WposZ, setWposZ] = useState('0.000')
    const [WposB, setWposB] = useState('0.000')
    const [WposC, setWposC] = useState('0.000')

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

    // useEffect(() => {
    //     getPositions()
    //     const refreshInterval = setInterval(()=>{
    //         getPositions()
    //     },5000)
        
        
    //     return()=>clearInterval(refreshInterval)
    //   }, [])

    const inputStyle = {
        fontSize: 30,
        fontFamily: 'sans-serif',
        height: '5vh'
      }

      const axeCardStyle = {
        textAlign: 'center',
        alignSelf: 'center',
        width: '40%',
        fontSize: '3vh',
        padding: 2,
        backgroundColor: 'rgb(187, 225, 250)'
      }

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
                                <Paper style={axeCardStyle}> X </Paper>
                            </Grid>
                            <Grid item style={{display: 'flex', flex: 1, justifyContent: 'center'}} >
                                <Paper style={axeCardStyle}> Y </Paper>
                            </Grid>
                            <Grid item style={{display: 'flex', flex: 1, justifyContent: 'center'}} >
                                <Paper style={axeCardStyle}> Z </Paper>
                            </Grid>
                            <Grid item style={{display: 'flex', flex: 1, justifyContent: 'center'}} >
                                <Paper style={axeCardStyle}> B </Paper>
                            </Grid>
                            <Grid item style={{display: 'flex', flex: 1, justifyContent: 'center'}} >
                                <Paper style={axeCardStyle}> C </Paper>
                            </Grid>
                        </Grid>
                        <Grid container style={{display: 'flex', flex: 2, flexDirection: 'column'}} >
                            <Grid item style={{display: 'flex', flex: 1, justifyContent: 'center'}} >
                                <Paper style={{textAlign: 'center', alignSelf: 'center', fontSize: '3vh', padding: 2, backgroundColor: 'rgb(187, 225, 250)'}}><b style={{marginLeft: 10, marginRight: 10}}>Home</b></Paper>
                            </Grid>
                            <Grid item style={{display: 'flex', flex: 1, justifyContent: 'center', padding: 2}} >
                                <Paper style={{textAlign: 'center', alignSelf: 'center', padding: 2}}>
                                    <TextField
                                        id="home-X"
                                        type="text"
                                        value={MposX}
                                        inputProps={{readOnly: true}}
                                        InputProps={{style: inputStyle}}
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
                                        InputProps={{style: inputStyle}}
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
                                        InputProps={{style: inputStyle}}
                                        variant='outlined'
                                    />
                                </Paper>
                            </Grid>
                            <Grid item style={{display: 'flex', flex: 1, justifyContent: 'center', padding: 2}} >
                                <Paper style={{textAlign: 'center', alignSelf: 'center', padding: 2}}>
                                    <TextField
                                        id="home-B"
                                        type="text"
                                        value={MposB}
                                        inputProps={{readOnly: true}}
                                        InputProps={{style: inputStyle}}
                                        variant='outlined'
                                    />
                                </Paper>
                            </Grid>
                            <Grid item style={{display: 'flex', flex: 1, justifyContent: 'center', padding: 2}} >
                                <Paper style={{textAlign: 'center', alignSelf: 'center', padding: 2}}>
                                    <TextField
                                        id="home-C"
                                        type="text"
                                        value={MposC}
                                        inputProps={{readOnly: true}}
                                        InputProps={{style: inputStyle}}
                                        variant='outlined'
                                    />
                                </Paper>
                            </Grid>
                        </Grid>
                        <Grid container style={{display: 'flex', flex: 2, flexDirection: 'column'}} >
                            <Grid item style={{display: 'flex', flex: 1, justifyContent: 'center'}} >
                                <Paper style={{textAlign: 'center', alignSelf: 'center', fontSize: '3vh', padding: 2, backgroundColor: 'rgb(187, 225, 250)'}}><b style={{marginLeft: 10, marginRight: 10}}>WCS</b></Paper>
                            </Grid>
                            <Grid item style={{display: 'flex', flex: 1, justifyContent: 'center', padding: 2}} >
                                <Paper style={{textAlign: 'center', alignSelf: 'center', padding: 2}}>
                                    <TextField
                                        id="wcs-X"
                                        type="text"
                                        value={WposX}
                                        inputProps={{readOnly: true}}
                                        InputProps={{style: inputStyle}}
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
                                        InputProps={{style: inputStyle}}
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
                                        InputProps={{style: inputStyle}}
                                        variant='outlined'
                                    />
                                </Paper>
                            </Grid>
                            <Grid item style={{display: 'flex', flex: 1, justifyContent: 'center', padding: 2}} >
                                <Paper style={{textAlign: 'center', alignSelf: 'center', padding: 2}}>
                                    <TextField
                                        id="wcs-B"
                                        type="text"
                                        value={WposB}
                                        inputProps={{readOnly: true}}
                                        InputProps={{style: inputStyle}}
                                        variant='outlined'
                                    />
                                </Paper>
                            </Grid>
                            <Grid item style={{display: 'flex', flex: 1, justifyContent: 'center', padding: 2}} >
                                <Paper style={{textAlign: 'center', alignSelf: 'center', padding: 2}}>
                                    <TextField
                                        id="wcs-C"
                                        type="text"
                                        value={WposC}
                                        inputProps={{readOnly: true}}
                                        InputProps={{style: inputStyle}}
                                        variant='outlined'
                                    />
                                </Paper>
                            </Grid>
                        </Grid>  

                    </Grid>
                </Grid>
                
            </Grid>

      </div>
    );
  }