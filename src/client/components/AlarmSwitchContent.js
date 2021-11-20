import React, { Component, useState } from 'react';
import { Icon, Grid, Button, TextField, Paper, Fade, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import { ChevronRight, Stop, PlayArrow } from '@material-ui/icons';
import { styles } from '../styles/theme'
import { description } from '../assets/errorlist'
import SwitchSelector from "react-switch-selector"
import Axios from 'axios'

const useStyles = makeStyles({
  button:{
      height: '6vh',
      width: '8vw',
      fontSize: '1.2vw',
      backgroundColor: 'rgb(15, 76, 117)',
      color: 'rgb(187, 225, 250)'
  },
  tooltip:{
    fontSize: '2vh'
  }
})

export default function AlarmSwitchContent () {
  const classes = useStyles()

  const [unit, setUnit] = useState(sessionStorage.getItem('unit') ? sessionStorage.getItem('unit') : 'G21')
  const [step, setStep] = useState(sessionStorage.getItem('step') ? sessionStorage.getItem('step') : 'G91')
  const [posType, setPosType] = useState(sessionStorage.getItem('pos_type') ? sessionStorage.getItem('pos_type') : '1')

  const [activeErrorList, setActiveErrorList] = useState([])
  const [activeAlarmList, setActiveAlarmList] = useState([])
  const [activeHoldList, setActiveHoldList] = useState([])
  const [activeDoorList, setActiveDoorList] = useState([])

  const setSwitchesValue = (value, switchName) => {
      switch(switchName) {
          case 'unit':
            changeUnitReport(value)
            setUnit(value)
            sessionStorage.setItem('unit', value)
            break;
          case 'step':
            setStep(value)
            sessionStorage.setItem('step', value)
            break;
          case 'postype':
            changePosReport(value)
            setPosType(value)
            sessionStorage.setItem('pos_type', value)
            break;
          default:
            console.log('invalid switch')
      }
  }

  const changeUnitReport = (unit) => {
      if (unit === 'G21') {
          Axios.post('/unit-report', { command: '$13=0' })
      }
      if (unit === 'G20') {
          Axios.post('/unit-report', { command: '$13=1' })
      }

  }

  const changePosReport = (posType) => {
    if (posType === '1') {
        Axios.post('/position-report', { command: '$10=1' })
    }
    if (posType === '2') {
        Axios.post('/position-report', { command: '$10=2' })
    }

  }

  const handleResetButton = () => {
    Axios.post('/reset-command', { command: '%' })

  }

  const ErrorComponent = (props) => {
    if (!activeErrorList.length) {
      return (<>no error</>)
    }
    return activeErrorList?.map((error, index) => (<React.Fragment key={index.toString()}>
        <Tooltip key={index.toString()} classes={{tooltip: classes.tooltip}} title={description.error[error]} TransitionComponent={Fade}>
          <Paper key={index.toString()} style={{textAlign: 'center', fontSize: '2.5vh', paddingRight: '0.5vw', paddingLeft: '0.5vw', color: 'rgb(187, 225, 250)', backgroundColor: 'rgb(240, 52, 52)'}}>
            {error}
          </Paper>
        </Tooltip> 
      </React.Fragment>));
  }

  const AlarmComponent = (props) => {
    if (!activeAlarmList.length) {
      return (<>no alarm</>)
    }
    return activeAlarmList?.map((alarm, index) => (<React.Fragment key={index.toString()}>
        <Tooltip key={index.toString()} classes={{tooltip: classes.tooltip}} title={description.alarm[alarm]} TransitionComponent={Fade}>
          <Paper key={index.toString()} style={{textAlign: 'center', fontSize: '2.5vh', paddingRight: '0.5vw', paddingLeft: '0.5vw', color: 'rgb(187, 225, 250)', backgroundColor: 'rgb(188,121,23)'}}>
            {alarm}
          </Paper>
        </Tooltip> 
      </React.Fragment>));
  }

  const HoldComponent = (props) => {
    if (!activeHoldList.length) {
      return (<>no hold</>)
    }
    return activeHoldList?.map((hold, index) => (<React.Fragment key={index.toString()}>
        <Tooltip key={index.toString()} classes={{tooltip: classes.tooltip}} title={description.hold[hold]} TransitionComponent={Fade}>
          <Paper key={index.toString()} style={{textAlign: 'center', fontSize: '2.5vh', paddingRight: '0.5vw', paddingLeft: '0.5vw', color: 'rgb(187, 225, 250)', backgroundColor: 'rgb(188,121,23)'}}>
            {hold}
          </Paper>
        </Tooltip> 
      </React.Fragment>));
  }

  const DoorComponent = (props) => {
    if (!activeDoorList.length) {
      return (<>door is ok</>)
    }
    return activeDoorList?.map((door, index) => (<React.Fragment key={index.toString()}>
        <Tooltip key={index.toString()} classes={{tooltip: classes.tooltip}} title={description.door[door]} TransitionComponent={Fade}>
          <Paper key={index.toString()} style={{textAlign: 'center', fontSize: '2.5vh', paddingRight: '0.5vw', paddingLeft: '0.5vw', color: 'rgb(187, 225, 250)', backgroundColor: 'rgb(188,121,23)'}}>
            {door}
          </Paper>
        </Tooltip> 
      </React.Fragment>));
  }

    return (
      <div style={styles.divInitContent}>
          <Grid style={{flexDirection: 'column'}}
            container
            >
                <Grid item style={{display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center'}}
                >
                  <h1 style={styles.title}>Alarm Info</h1>  
                </Grid>
                <Grid item style={{display: 'flex', flex: 5, flexDirection: 'row'}}
                >
                  <Grid item style={{display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center'}} >
                    <Grid item style={{width: '50%', height: '6.5vh'}}>
                        <SwitchSelector
                            onChange={newUnit => setSwitchesValue(newUnit, 'unit')}
                            options={[{ label: "Imperial",
                                        value: 'G20',
                                        selectedBackgroundColor: 'rgb(15, 76, 117)',
                                        selectedFontColor: 'rgb(187, 225, 250)'},
                                    {   label: "Metric",
                                        value: 'G21',
                                        selectedBackgroundColor: 'rgb(15, 76, 117)',
                                        selectedFontColor: 'rgb(187, 225, 250)'}]}
                            initialSelectedIndex={unit === 'G20' ? 0 : 1}
                            backgroundColor={'rgb(40, 50, 50)'}
                            fontColor={'rgb(187, 225, 250)'}
                            fontSize={'20vw'}
                        />
                    </Grid>
                    <Grid item style={{width: '50%', height: '6.5vh'}}>
                      <SwitchSelector
                          onChange={newStep => setSwitchesValue(newStep, 'step')}
                          options={[{ label: "Increment",
                                      value: 'G91',
                                      selectedBackgroundColor: 'rgb(15, 76, 117)',
                                      selectedFontColor: 'rgb(187, 225, 250)'},
                                  {   label: "Absolute",
                                      value: 'G90',
                                      selectedBackgroundColor: 'rgb(15, 76, 117)',
                                      selectedFontColor: 'rgb(187, 225, 250)'}]}
                          initialSelectedIndex={step === 'G91' ? 0 : 1}
                          backgroundColor={'rgb(40, 50, 50)'}
                          fontColor={'rgb(187, 225, 250)'}
                          fontSize={'20vw'}
                      />
                    </Grid>
                    <Grid item style={{width: '50%', height: '6.5vh'}}>
                      <SwitchSelector
                          onChange={newPosType => setSwitchesValue(newPosType, 'postype')}
                          options={[{ label: "MPos",
                                      value: '1',
                                      selectedBackgroundColor: 'rgb(15, 76, 117)',
                                      selectedFontColor: 'rgb(187, 225, 250)'},
                                  {   label: "WPos",
                                      value: '2',
                                      selectedBackgroundColor: 'rgb(15, 76, 117)',
                                      selectedFontColor: 'rgb(187, 225, 250)'}]}
                          initialSelectedIndex={posType === '1' ? 0 : 1}
                          backgroundColor={'rgb(40, 50, 50)'}
                          fontColor={'rgb(187, 225, 250)'}
                          fontSize={'20vw'}
                      />
                    </Grid>
                </Grid>
                <Grid item style={{display: 'flex', flex: 1}}>
                  <Paper variant='outlined' style={{display: 'flex', height: '36vh', width: '21vw', paddingRight: '0.5vw', paddingLeft: '0.5vw', backgroundColor: 'rgb(187, 225, 250)'}}>
                    <Grid container style={{display: 'flex', flexDirection: 'column', alignContent: 'flex-start', justifyContent: 'space-evenly'}}>
                      <Grid item style={{display: 'flex', flex: 1, width: '100%', flexDirection: 'row', alignItems: 'center'}}>
                        <Grid item style={{display: 'flex'}}>
                          <b style={{marginRight: '0.5vw'}}>Error:</b>
                        </Grid>
                        <Grid item style={{display: 'flex', flex: 1, justifyContent: 'space-around'}}>
                          <ErrorComponent/>
                        </Grid>
                      </Grid>
                      <Grid item style={{display: 'flex', flex: 1, width: '100%', flexDirection: 'row', alignItems: 'center'}}>
                        <Grid item style={{display: 'flex'}}>
                          <b style={{marginRight: '0.5vw'}}>Alarm:</b>
                        </Grid>
                        <Grid item style={{display: 'flex', flex: 1, justifyContent: 'space-around'}}>
                          <AlarmComponent/>
                        </Grid>
                      </Grid>
                      <Grid item style={{display: 'flex', flex: 1, width: '100%', flexDirection: 'row', alignItems: 'center'}}>
                        <Grid item style={{display: 'flex'}}>
                          <b style={{marginRight: '0.5vw'}}>Hold:</b>
                        </Grid>
                        <Grid item style={{display: 'flex', flex: 1, justifyContent: 'space-around'}}>
                          <HoldComponent/>
                        </Grid>
                      </Grid>
                      <Grid item style={{display: 'flex', flexDirection: 'row', flex: 1, width: '100%', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Grid item style={{display: 'flex', width: '100%'}}>
                          <Grid item style={{display: 'flex'}}>
                            <b style={{marginRight: '0.5vw'}}>Door:</b>
                          </Grid>
                          <Grid item style={{display: 'flex', flex: 1, justifyContent: 'space-around'}}>
                            <DoorComponent/>
                          </Grid>
                        </Grid>
                        <Grid item style={{display: 'flex'}}>
                          <Button
                              variant="contained"
                              color="primary"
                              className={classes.button}
                              onClick={() => handleResetButton()}
                          >
                              Reset
                          </Button>
                        </Grid>
                      </Grid>

                    </Grid>
                  </Paper>
                </Grid>
                </Grid>
            </Grid>

      </div>
    );
  }