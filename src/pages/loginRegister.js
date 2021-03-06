/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
  Loader,
  Icon
} from 'semantic-ui-react';

import authRedirect from './../hocs/authRedirect'
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { LOGIN } from './../reducers/auth';
import axios from 'axios'
import GoogleAuthComp from '../components/googleAuth'
// eslint-disable-next-line react/prefer-stateless-function

const baseUrl = 'https://pomonatodo.herokuapp.com/auth'
class LoginRegisterPage extends Component {

  state = {
    input : {},
    isValidate: {
      
    },
    isLoading: false,
    error:null
  }

  validationCondition = this.props.match.path === '/login' ? {
    email: /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/,
    password:/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/ 
  } : {
    name: /[\w]{1,}/,
    email: /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/,
    password:/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/ 
  }

  componentDidMount() {
    const { isAuth, history } = this.props
    console.log(isAuth);
    if(isAuth){
      history.push('/')
    }
  }

  selectField = () =>{
    const {match} = this.props
    if(match.path === '/login'){
      return [
        {
          name : 'email',
          icon: 'mail',
          iconPosition: 'left',
          placeholder: 'Email Address',
        },
        {
          name : 'password',
          icon: 'lock',
          iconPosition: 'left',
          placeholder: 'Input Password',
          type: 'password'
        }
      ]
    }else{
      return [
        {
          name : 'name',
          icon : 'user',
          iconPosition : 'left',
          placeholder : 'Input Name'
        },
        {
          name : 'email',
          icon : 'mail',
          iconPosition : 'left',
          placeholder : 'Email Address'
        },
        {
          name : 'password',
          icon: 'lock',
          iconPosition: 'left',
          placeholder: 'Input Password',
          type: 'password'
        }
      ]
    }
  }

  _onFieldChange = (_, data) => {
    const {input, isValidate} = this.state
    const newInput = { ...input }
    const newIsValidate= {...isValidate}
    newInput[data.name] = data.value
    newIsValidate[data.name] = this.validationCondition[data.name].test(data.value)
    this.setState({ input: newInput, isValidate: newIsValidate, error:null })
  }

  _onFormSubmit = async (e) => {
    try {
      const { match } = this.props
      const { input, isValidate } = this.state
      const newIsValidate = { ...isValidate }
      const isValidateAll = this.selectField().reduce((acc, dat) => { 
        newIsValidate[dat.name] = !!isValidate[dat.name]
        return acc && !!isValidate[dat.name]
      }, true)
      if (isValidateAll) {
        this.setState({ isLoading: true })
        if (match.path === '/login') {
          const {data} = await axios.post(baseUrl + '/login', { ...input })
          // localStorage.setItem('token', response.data.data.token)
          this.props.LOGIN({token:data.data.token})
        } else {
          const {data} = await axios.post(baseUrl + '/register', { ...input })
          this.props.LOGIN({token:data.data.token})
        }
        this.setState({ isLoading: false })
        this.props.history.push('/')
      } else {
        this.setState({ isValidate: newIsValidate, error: 'masukan semua field', isLoading: false })
      }
    } catch (error) {
      this.setState({ error: error.message, isLoading: false })
    }

  }

  _onGoogleSuccess = (data) => {
    console.log(data);
  }

  render() {
    const { input, isValidate , error, isLoading} = this.state
    const { match } = this.props
    
    return (
      <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            Log-in to your account
          </Header>
          <Form size="large" onSubmit={this._onFormSubmit} error={error}>
            <Segment stacked>
              {this.selectField().map((field) => {
                return (
                  <Form.Input
                    fluid
                    {...field}
                    onChange={this._onFieldChange}
                    value={input[field.name]}
                    error={isValidate[field.name] !== undefined && !isValidate[field.name]}
                  />
                )
              })}
              <Message error header='error' content={error}/>
              {isLoading ? <Loader active inline /> : (
                <Button color='teal' type='submit' fluid size='large'>
                  {match.path === '/login' ? 'Login' : 'Sign up'}
                </Button>
              )}
            </Segment>
          </Form>
                <GoogleAuthComp appID= '166892355519-vld5jpe7dkdccmhi0ckuoh9q090jdr0v.apps.googleusercontent.com'
            onSuccess={this._onGoogleSuccess}
            component={
            (_props) => (
              <Button {..._props} icon fluid style={{margin:'12px 0px'}}><Icon  name='google' /> Sign In with Google</Button>
            )
          }/>
          <Message>
            New to us?
            <a href="#">Sign Up</a>
          </Message>
        </Grid.Column>
      </Grid>

    );
  }
}



const mapActionToProps = dispatch => bindActionCreators({
  LOGIN
}, dispatch)

const LoginPageWithAuthRedirect = authRedirect('/', LoginRegisterPage)

export default connect(null, mapActionToProps)(LoginPageWithAuthRedirect);
