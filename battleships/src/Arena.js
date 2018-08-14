import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Zones from './Zones';
import Button from '@material-ui/core/Button';

import { connect } from 'react-redux';

import { GenerateShips } from './ship/ShipServices';
import BATTLE_ACTIONS from './store/BattleAction';

const sides = ["Enemy", "Home"];

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        height: 450,
        width: 450,
    },
    arena: {
        height: 450,
        width: 450,
    },
    control: {
        padding: theme.spacing.unit * 2,
    },
});

class Arena extends React.Component {

    state = {
        spacing: '16',
    };

    componentWillMount() {
        this.initArena();
    }
    
    playAgainHandler = () => {
        this.props.onPlayAgain();
        this.initArena();
    }

    initArena = () => {
        sides.forEach(side => {
            let zone = side === "Enemy" ? this.props.enemyZones : this.props.homeZones;
            GenerateShips(zone)
            console.log(zone);
        })
    }

    render() {
        const { classes } = this.props;

        return (
            <React.Fragment>
                <Grid container className={classes.root} justify="center" spacing={32}>
                    {sides.map((value, index) => (
                    <Grid key={value} item>
                        <div className={classes.arena}>
                        {/* <Paper className={classes.paper}> */}
                            <Zones side={value} />
                        {/* </Paper> */}
                        </div>
                    </Grid>
                    ))}
                </Grid>
                <div style={{marginTop: 30}}>
                    <Button onClick={this.playAgainHandler} variant='extendedFab'>PLAY AGAIN</Button>
                </div>
            </React.Fragment>
        );
    }
}

Arena.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return {
        enemyZones: state.enemyZones,
        homeZones: state.homeZones
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onPlayAgain: () => dispatch({
            type: BATTLE_ACTIONS.RESET
        })
    }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Arena));