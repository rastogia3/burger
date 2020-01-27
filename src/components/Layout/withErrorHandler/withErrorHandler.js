import React from 'react'
import Modal from '../UI/Modal/Modal'


const withErrorHandler = (WrappedComponent, axios) => {

    return class extends React.Component {
        constructor() {
            super();
            this.state = {
                error: null
            }
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({ error: null })
                return req;
            })
            this.reqResponse = axios.interceptors.response.use(null, error => {
                this.setState({ error: error })
            })
        }
        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.reqResponse);
        }
        errorConfirmHandler = () => {
            this.setState({ error: null })
        }
        render() {
            return (
                <>
                    <Modal show={this.state.error} clicked={this.errorConfirmHandler}>
                        {this.state.error ? this.state.error.message : null}</Modal>
                    <WrappedComponent />
                </>
            )
        }
    }

}

export default withErrorHandler;