export const styles = {
    // Common styles
    title:{
        display: 'flex',
        alignItems: 'center',
        fontSize: '1.8vw',
        justifyContent: 'center',
        fontFamily: 'sans-serif',
        color: 'rgb(50, 130, 184)'
    },

    button:{
        height: '6vh',
        width: '12vw',
        fontSize: '1.5vw',
        backgroundColor: 'rgb(15, 76, 117)',
        color: 'rgb(187, 225, 250)'
    },

    startButton:{
        height: '6vh',
        width: '12vw',
        fontSize: '1.5vw',
        backgroundColor: 'rgb(30, 130, 76)',
        color: 'rgb(187, 225, 250)'
    },

    stopButton:{
        height: '6vh',
        width: '12vw',
        fontSize: '1.5vw',
        backgroundColor: 'rgb(240, 52, 52)',
        color: 'rgb(187, 225, 250)'
    },

    pauseButton:{
        height: '6vh',
        width: '12vw',
        fontSize: '1.5vw',
        backgroundColor: 'rgb(188,121,23)',
        color: 'rgb(187, 225, 250)'
    },

    textfield:{
        with: '12vw',
        alignSelf: 'center'
    },

    icon:{
        fontSize: '2vw'
    },

    // Layout styles

    layoutContainer:{
        width:'100vw',
        height:'100vh'
    },

    gridContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        width: '100%',
        height: 'calc(100vh - 62px)',
        backgroundColor: 'rgb(27, 38, 44)'
    },

    gridLeftItemLayer1:{
        flex: 1
    },

    gridRightItemLayer1:{
        flex: 1,
        flexDirection: 'column',
        borderLeft: 'solid'
    },

    gridTopItemLayer2:{
        flex: 1,
        borderBottom: 'solid'
    },

    gridBottomItemLayer2:{
        flex: 1
    },

    // InitializationControlsContent styles

    divInitContent:{
        display: 'flex',
        justifyContent: 'space-around',
        alignContent: 'center',
        width: '100%',
        height: '100%'
    },

    gridItemTitle:{
        flex: 1,
        display: 'flex',
        justifyContent: 'center'
    },



}