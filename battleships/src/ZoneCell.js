import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import styles from'./ZoneCellStyles';
import { connect } from 'react-redux';

import BATTLE_ACTIONS from './store/BattleAction';

class ZoneCell extends React.Component {

    attackHandler = (e)=> {
        if (this.props.side === 'Enemy') {
            let coord = {
                row: this.props.row,
                col: this.props.col
            };
            // let before = this.props.zones[this.props.row][this.props.col];
            this.props.onAttack(coord);
            // let after = this.props.zones[this.props.row][this.props.col];
        }
    }

    cellStyle = (row, col) => {
        const { classes } = this.props;
        let zone = this.props.side === 'Enemy' ? this.props.enemyZones : this.props.homeZones
        return (zone[this.props.row][this.props.col] === 'W' ? 
            (this.props.side === 'Enemy' ? classes.enemyCell : classes.homeCell) : 
            zone[this.props.row][this.props.col] === 'S' ? classes.shipCell :
            zone[this.props.row][this.props.col] === 'H' ? classes.hitCell : classes.missedCell)
    };

    render() {

        const { classes } = this.props;
        const classStyle = (
            classes.cell + ' ' + this.cellStyle(this.props.row, this.props.col)
        );
        let zone = this.props.side === 'Enemy' ? this.props.enemyZones : this.props.homeZones

        console.log('rendering view');

        return (
            <Grid item>
                <Paper className={classes.paper}>
                    <Button variant="fab" id={this.props.side + ':' + this.props.row + ':' + this.props.col} 
                        onClick={this.attackHandler} className={classStyle}>
                        {zone[this.props.row][this.props.col]}
                    </Button>
                </Paper>
            </Grid>
        )
    }
}

const mapPropsToState = (state) => {
    return {
        enemyZones: state.enemyZones,
        homeZones: state.homeZones
    }
}

const mapDispatchToState = (dispatch) => {
    return {
        onAttack: (coord) => dispatch({
            type: BATTLE_ACTIONS.ATTACK,
            coord: coord
        }),
    }
}

ZoneCell.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect(mapPropsToState, mapDispatchToState)(ZoneCell));