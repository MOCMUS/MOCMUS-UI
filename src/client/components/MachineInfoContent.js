import React, { Component, Text, useState, useEffect } from 'react';
import { Icon, Grid, Button, Paper, TextField, RadioGroup } from '@material-ui/core';
import Axios from 'axios'
import { ChevronRight } from '@material-ui/icons';
import { styles } from './../styles/theme'

export default function MachineInfoContent () {

    const [machineState, setMachineState] = useState(sessionStorage.getItem('machine_state') ? sessionStorage.getItem('machine_state') : 'Idle')
    const [MposX, setMposX] = useState(sessionStorage.getItem('MposX') ? sessionStorage.getItem('MposX') : '0.000')
    const [MposY, setMposY] = useState(sessionStorage.getItem('MposY') ? sessionStorage.getItem('MposY') : '0.000')
    const [MposZ, setMposZ] = useState(sessionStorage.getItem('MposZ') ? sessionStorage.getItem('MposZ') : '0.000')
    const [MposB, setMposB] = useState(sessionStorage.getItem('MposB') ? sessionStorage.getItem('MposB') : '0.000')
    const [MposC, setMposC] = useState(sessionStorage.getItem('MposC') ? sessionStorage.getItem('MposC') : '0.000')

    const [WposX, setWposX] = useState(sessionStorage.getItem('WposX') ? sessionStorage.getItem('WposX') : '0.000')
    const [WposY, setWposY] = useState(sessionStorage.getItem('WposY') ? sessionStorage.getItem('WposY') : '0.000')
    const [WposZ, setWposZ] = useState(sessionStorage.getItem('WposZ') ? sessionStorage.getItem('WposZ') : '0.000')
    const [WposB, setWposB] = useState(sessionStorage.getItem('WposB') ? sessionStorage.getItem('WposB') : '0.000')
    const [WposC, setWposC] = useState(sessionStorage.getItem('WposC') ? sessionStorage.getItem('WposC') : '0.000')

    const [WCOX, setWCOX] = useState(sessionStorage.getItem('WCOX') ? sessionStorage.getItem('WCOX') : '0.000')
    const [WCOY, setWCOY] = useState(sessionStorage.getItem('WCOY') ? sessionStorage.getItem('WCOY') : '0.000')
    const [WCOZ, setWCOZ] = useState(sessionStorage.getItem('WCOZ') ? sessionStorage.getItem('WCOZ') : '0.000')
    const [WCOB, setWCOB] = useState(sessionStorage.getItem('WCOB') ? sessionStorage.getItem('WCOB') : '0.000')
    const [WCOC, setWCOC] = useState(sessionStorage.getItem('WCOC') ? sessionStorage.getItem('WCOC') : '0.000')

    const [feedrate, setFeedrate] = useState(sessionStorage.getItem('feedrate') ? sessionStorage.getItem('feedrate') : '0')
    const [spindleSpeed, setSpindleSpeed] = useState(sessionStorage.getItem('spindle_speed') ? sessionStorage.getItem('spindle_speed') : '0')

    const [feedOverride, setFeedOverride] = useState(sessionStorage.getItem('feed_override') ? sessionStorage.getItem('feed_override') : '100')
    const [rapidOverride, setRapidOverride] = useState(sessionStorage.getItem('rapid_override') ? sessionStorage.getItem('rapid_override') : '100')
    const [spindleSpeedOverride, setSpindleSpeedOverride] = useState(sessionStorage.getItem('spindle_speed_override') ? sessionStorage.getItem('spindle_speed_override') : '100')
    
    const getPositions = async () => {
        try {
      const currentPositions = await Axios.get('/current-positions')
      if (typeof currentPositions.data !== 'string')
        return
      
      const infoPositions = currentPositions.data.split('|')

      setMachineState(infoPositions[0])
      sessionStorage.setItem('machine_state', infoPositions[0])

      const MPosInfo = infoPositions.find(info => info.startsWith('MPos'))?.split(':')[1].split(',')
      if (MPosInfo) {
        setMposX(MPosInfo[0])
        sessionStorage.setItem('MposX', MPosInfo[0])
        setMposY(MPosInfo[1])
        sessionStorage.setItem('MposY', MPosInfo[1])
        setMposZ(MPosInfo[2])
        sessionStorage.setItem('MposZ', MPosInfo[2])
        setMposB(MPosInfo[3])
        sessionStorage.setItem('MposB', MPosInfo[3])
        setMposC(MPosInfo[4])
        sessionStorage.setItem('MposC', MPosInfo[4])
      }

      const FSInfo = infoPositions.find(info => info.startsWith('FS'))?.split(':')[1].split(',')
      if (FSInfo) {
        setFeedrate(FSInfo[0])
        sessionStorage.setItem('feedrate', FSInfo[0])
        setSpindleSpeed(FSInfo[1])
        sessionStorage.setItem('spindle_speed', FSInfo[1])
      }

      const WPosInfo = infoPositions.find(info => info.startsWith('WPos'))?.split(':')[1].split(',')
      if (WPosInfo) {
        setWposX(WPosInfo[0])
        sessionStorage.setItem('WposX', WPosInfo[0])
        setWposY(WPosInfo[1])
        sessionStorage.setItem('WposY', WPosInfo[1])
        setWposZ(WPosInfo[2])
        sessionStorage.setItem('WposZ', WPosInfo[2])
        setWposB(WPosInfo[3])
        sessionStorage.setItem('WposB', WPosInfo[3])
        setWposC(WPosInfo[4])
        sessionStorage.setItem('WposC', WPosInfo[4])
      }

      const WCOInfo = infoPositions.find(info => info.startsWith('WCO'))?.split(':')[1].split(',')
      if (WCOInfo) {
        setWCOX(WCOInfo[0])
        sessionStorage.setItem('WCOX', WCOInfo[0])
        setWCOY(WCOInfo[1])
        sessionStorage.setItem('WCOY', WCOInfo[1])
        setWCOZ(WCOInfo[2])
        sessionStorage.setItem('WCOZ', WCOInfo[2])
        setWCOB(WCOInfo[3])
        sessionStorage.setItem('WCOB', WCOInfo[3])
        setWCOC(WCOInfo[4])
        sessionStorage.setItem('WCOC', WCOInfo[4])
      }

      const OvInfo = infoPositions.find(info => info.startsWith('Ov'))?.split(':')[1].split(',')
      if (OvInfo) {
        setFeedOverride(OvInfo[0])
        sessionStorage.setItem('feed_override', OvInfo[0])
        setRapidOverride(OvInfo[1])
        sessionStorage.setItem('rapid_override', OvInfo[1])
        setSpindleSpeedOverride(OvInfo[2])
        sessionStorage.setItem('spindle_speed_override', OvInfo[2])
      }
      
      
        
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
        height: '0.8vh',
        textAlign: 'center'
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
                                <Paper style={{textAlign: 'center', alignSelf: 'center', fontSize: '3vh', marginBottom: 10, padding: 2, backgroundColor: 'rgb(187, 225, 250)'}}><b style={{marginLeft: 10, marginRight: 10}}>MPos</b></Paper>
                            </Grid>
                            <Grid item style={{display: 'flex', flex: 1, justifyContent: 'center', padding: 2}} >
                                <Paper style={{textAlign: 'center', alignSelf: 'center', padding: 2}}>
                                    <TextField
                                        id="home-X"
                                        type="text"
                                        value={MposX}
                                        inputProps={{readOnly: true, style: inputStyle}}
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
                                        inputProps={{readOnly: true, style: inputStyle}}
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
                                        inputProps={{readOnly: true, style: inputStyle}}
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
                                        inputProps={{readOnly: true, style: inputStyle}}
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
                                        inputProps={{readOnly: true, style: inputStyle}}
                                        variant='outlined'
                                    />
                                </Paper>
                            </Grid>
                        </Grid>
                        <Grid container style={{display: 'flex', flex: 2, flexDirection: 'column'}} >
                            <Grid item style={{display: 'flex', flex: 1, justifyContent: 'center'}} >
                                <Paper style={{textAlign: 'center', alignSelf: 'center', fontSize: '3vh', marginBottom: 10, padding: 2, backgroundColor: 'rgb(187, 225, 250)'}}><b style={{marginLeft: 10, marginRight: 10}}>WPos</b></Paper>
                            </Grid>
                            <Grid item style={{display: 'flex', flex: 1, justifyContent: 'center', padding: 2}} >
                                <Paper style={{textAlign: 'center', alignSelf: 'center', padding: 2}}>
                                    <TextField
                                        id="wcs-X"
                                        type="text"
                                        value={WposX}
                                        inputProps={{readOnly: true, style: inputStyle}}
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
                                        inputProps={{readOnly: true, style: inputStyle}}
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
                                        inputProps={{readOnly: true, style: inputStyle}}
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
                                        inputProps={{readOnly: true, style: inputStyle}}
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
                                        inputProps={{readOnly: true, style: inputStyle}}
                                        variant='outlined'
                                    />
                                </Paper>
                            </Grid>
                        </Grid>
                        <Grid container style={{display: 'flex', flex: 2, flexDirection: 'column'}} >
                            <Grid item style={{display: 'flex', flex: 1, justifyContent: 'center'}} >
                                <Paper style={{textAlign: 'center', alignSelf: 'center', fontSize: '3vh', marginBottom: 10, padding: 2, backgroundColor: 'rgb(187, 225, 250)'}}><b style={{marginLeft: 10, marginRight: 10}}>WCO</b></Paper>
                            </Grid>
                            <Grid item style={{display: 'flex', flex: 1, justifyContent: 'center', padding: 2}} >
                                <Paper style={{textAlign: 'center', alignSelf: 'center', padding: 2}}>
                                    <TextField
                                        id="wco-X"
                                        type="text"
                                        value={WCOX}
                                        inputProps={{readOnly: true, style: inputStyle}}
                                        variant='outlined'
                                    />
                                </Paper>
                            </Grid>
                            <Grid item style={{display: 'flex', flex: 1, justifyContent: 'center', padding: 2}} >
                                <Paper style={{textAlign: 'center', alignSelf: 'center', padding: 2}}>
                                    <TextField
                                        id="wco-Y"
                                        type="text"
                                        value={WCOY}
                                        inputProps={{readOnly: true, style: inputStyle}}
                                        variant='outlined'
                                    />
                                </Paper>
                            </Grid>
                            <Grid item style={{display: 'flex', flex: 1, justifyContent: 'center', padding: 2}} >
                                <Paper style={{textAlign: 'center', alignSelf: 'center', padding: 2}}>
                                    <TextField
                                        id="wco-Z"
                                        type="text"
                                        value={WCOZ}
                                        inputProps={{readOnly: true, style: inputStyle}}
                                        variant='outlined'
                                    />
                                </Paper>
                            </Grid>
                            <Grid item style={{display: 'flex', flex: 1, justifyContent: 'center', padding: 2}} >
                                <Paper style={{textAlign: 'center', alignSelf: 'center', padding: 2}}>
                                    <TextField
                                        id="wco-B"
                                        type="text"
                                        value={WCOB}
                                        inputProps={{readOnly: true, style: inputStyle}}
                                        variant='outlined'
                                    />
                                </Paper>
                            </Grid>
                            <Grid item style={{display: 'flex', flex: 1, justifyContent: 'center', padding: 2}} >
                                <Paper style={{textAlign: 'center', alignSelf: 'center', padding: 2}}>
                                    <TextField
                                        id="wco-C"
                                        type="text"
                                        value={WCOC}
                                        inputProps={{readOnly: true, style: inputStyle}}
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