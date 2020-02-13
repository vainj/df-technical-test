import React from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';

/**
 * Main application component
 * @param {String} title
 * @return {App}
 * @constructor
 */
const AppSection = ({title}) => (
    <section>
        <AppBar position="static">
            <Toolbar>
                <Icon fontSize="large">school</Icon>
                <Typography variant="h4">{title}</Typography>
            </Toolbar>
        </AppBar>
        {/*  inserts form template here!  */}
    </section>
);

export default AppSection;