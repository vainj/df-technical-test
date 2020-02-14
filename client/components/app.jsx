// Imports
import React from "react";
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

/**
 * Main application component
 */
export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.buttonStyle = {flexBasis : '20%', margin : '0 16px'};

        this.state = {
            firstName : '',
            lastName  : '',
            email     : '',
        };
    }

    /**
     * Resets `state` values on reset button click
     * @return {void}
     */
    clearFormInputs = () => {
        this.setState({
            firstName : '',
            lastName  : '',
            email     : '',
        });
    };

    /**
     * Renders main application component
     */
    render() {
        return <section>
            <AppBar position="static">
                <Toolbar>
                    <Icon fontSize="large">school</Icon>
                    <Box ml="16px">
                        <Typography variant="h4">Certificate generator</Typography>
                    </Box>
                </Toolbar>
            </AppBar>

            <Container maxWidth="xs">
                <TextField label="Enter your first name"
                           variant="outlined"
                           required
                           fullWidth
                           margin="normal"
                           value={this.state.firstName}
                           onChange={(e) => this.setState({firstName : e.target.value})}/>
                <TextField label="Enter your last name"
                           variant="outlined"
                           required
                           fullWidth
                           margin="normal"
                           value={this.state.lastName}
                           onChange={(e) => this.setState({lastName : e.target.value})}/>
                <TextField label="Enter your email"
                           variant="outlined"
                           type="email"
                           required
                           fullWidth
                           margin="normal"
                           value={this.state.email}
                           onChange={(e) => this.setState({email : e.target.value})}/>
            </Container>

            <Box display="flex" justifyContent="center">
                <Button variant="outlined" size="large" style={this.buttonStyle} onClick={this.clearFormInputs}>
                    Clear form
                </Button>
                <Button variant="contained" color="primary" size="large" style={this.buttonStyle}>
                    Generate certificate
                </Button>
            </Box>
        </section>;
    }
}
