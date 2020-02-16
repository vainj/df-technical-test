// Imports
import React from "react";
import {withSnackbar} from 'notistack';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

// App imports
import UserCertificateService from "../services/user-certificate";

/**
 * Main application component
 */
class App extends React.Component {
    /**
     * Constructor
     * @param {Object} props
     */
    constructor(props) {
        super(props);

        this.buttonStyle = {flexBasis : '20%', margin : '0 16px'};

        // Initializes state variables of this component
        this.state = {
            firstName : '',
            lastName  : '',
            email     : '',
            disabled  : true
        };

        // New User certificate service instance
        this.userCertificateService = new UserCertificateService();
    }

    /**
     * Generates a certificate with the given form values
     * @return {void}
     */
    generateCertificate = () => {
        let snackbar = {
            message : 'An unknown error occurred',
            variant : 'error'
        };

        this.userCertificateService.save(
            this.state.firstName,
            this.state.lastName,
            this.state.email,
        )
            .then((result) => {
                if (
                    result.hasOwnProperty('data')
                    && (
                        result.data.hasOwnProperty('createUserCertificate')
                        || result.data.hasOwnProperty('updateUserCertificate')
                    )
                ) {
                    snackbar = {
                        message : `An email has just been sent to the address ${this.state.email}`,
                        variant : 'success'
                    };

                    this.clearFormInputs();
                } else {
                    if (
                        result.hasOwnProperty('errors')
                        && Array.isArray(result.errors)
                        && result.errors[0].hasOwnProperty('message')
                    ) {
                        snackbar.message = result.errors[0].message;
                    }
                }

                this.props.enqueueSnackbar(snackbar.message, {
                    autoHideDuration : 6000,
                    variant          : snackbar.variant,
                });
            })
            .catch((error) => {
                this.props.enqueueSnackbar(error.message || snackbar.message, {
                    autoHideDuration : 6000,
                    variant          : snackbar.variant,
                });
            });
        ;
    };

    /**
     * Resets `state` values on "Clear" button click
     * @return {void}
     */
    clearFormInputs = () => {
        this.setState({
            firstName : '',
            lastName  : '',
            email     : '',
            disabled  : true
        });
    };

    /**
     * Handles input type text changes
     * @param {Event} e
     * @return {void}
     */
    handleInputChanges = (e) => {
        const inputName       = e.target.name;
        this.state[inputName] = e.target.value;

        const disabled = (this.state.firstName === ''
            || this.state.lastName === ''
            || this.state.email === '');
        this.setState({disabled : disabled});
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
                           name="firstName"
                           value={this.state.firstName}
                           onChange={this.handleInputChanges}/>
                <TextField label="Enter your last name"
                           variant="outlined"
                           required
                           fullWidth
                           margin="normal"
                           value={this.state.lastName}
                           name="lastName"
                           onChange={this.handleInputChanges}/>
                <TextField label="Enter your email"
                           variant="outlined"
                           type="email"
                           required
                           fullWidth
                           margin="normal"
                           value={this.state.email}
                           name="email"
                           onChange={this.handleInputChanges}/>
            </Container>

            <Box display="flex" justifyContent="center">
                <Button variant="outlined" size="large" style={this.buttonStyle} onClick={this.clearFormInputs}>
                    Clear form
                </Button>
                <Button variant="contained"
                        color="primary"
                        size="large"
                        style={this.buttonStyle}
                        onClick={this.generateCertificate}
                        disabled={this.state.disabled}>
                    Generate certificate
                </Button>
            </Box>
        </section>;
    }
};

export default withSnackbar(App);