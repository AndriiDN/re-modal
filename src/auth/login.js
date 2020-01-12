import React, {Component} from 'react';
import axios from 'axios';
import Modal from 'react-modal';

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };

export default class Login extends Component{
    constructor(props) {
        super(props);
        this.state = {
            formShow: false,
            email: '',
            password: '',
            errorStatus: false,
            errorText: ''
        }
        this.toggleForm = this.toggleForm.bind(this)
        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.loginUser = this.loginUser.bind(this)
        this.changeInput = this.changeInput.bind(this)
    }

    toggleForm() {
        this.setState({
            formShow: !this.state.formShow
        })
    }

    loginUser(e) {
        e.preventDefault()
        axios.post('http://127.0.0.1:3333/login',{
            email: this.state.email,
            password: this.state.password
        }, {})
            .then(response => {
                if(response.status === 200) {
                    localStorage.setItem('user', JSON.stringify(response.data))
                    this.setState({
                        errorStatus: false,
                        errorText: ''
                    })
                    this.props.loginUser();
                    this.props.setUser();
                } else {
                    this.setState({
                        errorStatus: true,
                        errorText: 'Пользователь не найден'
                    })
                    console.error('Пользователь не найден')
                }
                //console.log(response)
            })
            .catch(error => {
                console.error(error)
            })
    }

    openModal() {
        this.setState({
            formShow: true
        })
      }


    closeModal(){
        this.setState({
            formShow: false
        })
      }

    changeInput(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <div>
                <button className={'btn btn-primary'} onClick={this.openModal}>Sign In</button>
                <Modal
                isOpen={this.state.formShow}
                onRequestClose={this.closeModal}
                style={{
                    overlay: {
                      position: 'fixed',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: 'rgba(55, 255, 255, 0.75)'
                    },
                    content: {
                      position: 'absolute',
                      top: '40px',
                      left: '40px',
                      right: '40px',
                      bottom: '40px',
                      border: '1px solid #ccc',
                      background: '#fff',
                      overflow: 'auto',
                      WebkitOverflowScrolling: 'touch',
                      borderRadius: '4px',
                      outline: 'none',
                      padding: '80px'
                    }
                  }}
                contentLabel="Login Form"
                >
                    
                <div id="form">
                    <button className={'close-btn'} onClick={this.closeModal}>close</button>
                    {this.state.errorStatus &&
                    <div className='alert alert-danger'>{this.state.errorText}</div>
                    }

                    <form onSubmit={this.loginUser}>

                        <input type="email" name='email' value={this.state.email} placeholder='E-Mail' onChange={this.changeInput}/>
                        <input type="password" name='password' value={this.state.password} placeholder='Password' onChange={this.changeInput}/>
                        <button type='submit' className={'btn btn-success'}>Login</button>

                        

                    </form>
                </div>
                </Modal>
            </div>
        );
    }
}

