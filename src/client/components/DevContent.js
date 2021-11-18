import React, { Component, useState } from 'react';
import { Icon, Grid, Button, TextField, Paper, Container } from '@material-ui/core';
import { ChevronRight, Stop } from '@material-ui/icons';
import { styles } from './../styles/theme'
import Axios from 'axios'

export default function DevContent () {
    const [command, setCommand] = useState('')
    const [machineLog, setMachineLog] = useState([])

    const handleSubmit = (inputValue) => {
        if (inputValue === '')
          return
        Axios.post('/console-command', { command: inputValue })
        .then(e => {
            setMachineLog(old => [...old, ...e.data.split('w5pl1t').splice(1)])
        })
        setCommand('')
    
      }

    return (
      <>
          <Container>
                <Grid item style={{display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center'}}
                >
                  <h1 style={styles.title}>Console Command</h1>  
                </Grid>
                <Grid container style={{display: 'flex', width: '100%', flexDirection: 'row', justifyContent: 'center'}}
                >
                <Grid item style={{display: 'flex', width: '60%', justifyContent: 'flex-end'}}>
                    <Paper style={{alignSelf: 'center'}}>
                        <TextField
                            id="console-cmd"
                            type="text"
                            style={{width: '35vw'}}
                            variant='outlined'
                            value={command}
                            onChange={(value) => setCommand(event.target.value)}
                        />
                    </Paper>
                </Grid>
                <Grid item style={{display: 'flex', width: '40%', alignItems: 'center'}}>
                    <Button
                            variant="contained"
                            style={{...styles.button, marginLeft: 15}}
                            endIcon={<ChevronRight style={styles.icon} />}
                            onClick={() => handleSubmit(command)}
                        >
                            Send
                    </Button>
                </Grid>
                </Grid>
                <Grid item style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', marginTop: 20}}>
                    <h1 style={styles.title}>Machine Responses</h1>
                    <div style={{marginTop: 10}}>
                            {machineLog?.map((i,key) => {
                        return <div style={{color: '#BBE1FF'}} key={key}>{i}</div>;
                        })}
                    </div>
                </Grid>
            </Container>

      </>
    );
  }