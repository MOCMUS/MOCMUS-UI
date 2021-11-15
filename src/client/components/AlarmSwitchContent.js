import React, { Component, useState } from 'react';
import { Icon, Grid, Button, TextField, Paper } from '@material-ui/core';
import { ChevronRight, Stop, PlayArrow } from '@material-ui/icons';
import { styles } from '../styles/theme'
import SwitchSelector from "react-switch-selector"
import Axios from 'axios'

export default function AlarmSwitchContent () {
    const [unit, setUnit] = useState(sessionStorage.getItem('unit') ? sessionStorage.getItem('unit') : 'G21')
    const [step, setStep] = useState(sessionStorage.getItem('step') ? sessionStorage.getItem('step') : 'G91')
    const [posType, setPosType] = useState(sessionStorage.getItem('pos_type') ? sessionStorage.getItem('pos_type') : '1')

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
                    <div style={{width: '50%', height: '6.5vh'}}>
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
                    </div>
                    <div style={{width: '50%', height: '6.5vh'}}>
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
                    </div>
                </Grid>
                <Grid item style={{display: 'flex', flex: 1, flexDirection: 'column'}}>

                </Grid>
                </Grid>
            </Grid>

      </div>
    );
  }