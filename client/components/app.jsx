// Imports
import React from "react";
import {withSnackbar} from 'notistack';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from '@material-ui/core/Container';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import axios from "axios";

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

        // Component style
        this.styles = {
            buttonsMainWrapper : {
                display        : 'flex',
                justifyContent : 'center'
            },
            buttonWrapper      : {
                position  : 'relative',
                flexBasis : '20%',
                margin    : '0 16px',
            },
            button             : {
                width : '100%',
            },
            progress           : {
                position   : 'absolute',
                top        : '50%',
                left       : '50%',
                marginTop  : -12,
                marginLeft : -12
            }
        };

        // Initializes state variables of this component
        this.state = {
            firstName : '',
            lastName  : '',
            email     : '',
            disabled  : true,
            loading   : false
        };

        // New User certificate service instance
        this.userCertificateService = new UserCertificateService();
    }

    /**
     * Generates a certificate with the given form values
     * @return {void}
     */
    generateCertificate = () => {
        // Checks empty values
        if (
            this.state.firstName.trim() === ''
            || this.state.lastName.trim() === ''
            || this.state.email.trim() === ''
        ) {
            this.props.enqueueSnackbar('All fields are required', {
                autoHideDuration : 6000,
                variant          : 'warning',
            });
            return;
        }

        // Displays loader
        this.setState({disabled : true, loading : true});

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
                    const userCertificate = result.data.createUserCertificate || result.data.updateUserCertificate;

                    // Sends email to the user
                    const sendEmailUrl = process.env.NODE_SERVER_URL + '/send';
                    return axios({
                        method : 'POST',
                        url    : sendEmailUrl,
                        data   : {
                            firstName : userCertificate.firstName,
                            email     : userCertificate.email,
                            token     : userCertificate.token
                        }
                    });
                } else {
                    throw {message : 'An error occurred while trying to insert the new UserCertificate'};
                }
            })
            .then((response) => {
                if (
                    response.hasOwnProperty('data')
                    && response.data.hasOwnProperty('success')
                    && response.data.success
                ) {
                    this.props.enqueueSnackbar(`An email has just been sent to the address ${this.state.email}`, {
                        autoHideDuration : 6000,
                        variant          : 'success',
                    });

                    this.clearFormInputs();
                } else {
                    throw {message : 'An error occurred while trying to send email'};
                }
            })
            .catch((error) => {
                this.props.enqueueSnackbar(error.message || 'An unknown error occurred', {
                    autoHideDuration : 6000,
                    variant          : 'error',
                });
            })
            .finally(() => {
                this.setState({disabled : false, loading : false});
            });
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
            disabled  : true,
            loading   : false
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

            <div style={this.styles.buttonsMainWrapper}>
                <div style={this.styles.buttonWrapper}>
                    <Button variant="outlined" size="large" style={this.styles.button} onClick={this.clearFormInputs}>
                        Clear form
                    </Button>
                </div>
                <div style={this.styles.buttonWrapper}>
                    <Button variant="contained"
                            color="primary"
                            size="large"
                            style={this.styles.button}
                            onClick={this.generateCertificate}
                            disabled={this.state.disabled}>
                        Generate certificate
                    </Button>
                    {this.state.loading && <CircularProgress size={24} style={this.styles.progress}/>}
                </div>
            </div>
        </section>;
    }
};

export default withSnackbar(App);