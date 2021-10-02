/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
} from 'semantic-ui-react';

// eslint-disable-next-line react/prefer-stateless-function
class LoginRegisterPage extends Component {

  state = {
    input : {},
    isValidate: {
      
    }
  }

  validationCondition = {
    email: /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,10}$/
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
    this.setState({ input: newInput, isValidate: newIsValidate },
      (state) => {
      console.log(this.state.isValidate);
    })
  }

  _onSubmit = () => {
    const {input, isValidate} = this.state
    const newInput = { ...input }
  }

  render() {
    return (
      <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            Log-in to your account
          </Header>
          <Form size="large">
            <Segment stacked>
              {this.selectField().map((field) => {
                return (
                  <Form.Input
                    fluid
                    {...field}
                    onChange={this._onFieldChange}
                  />
                )
              })}
              <Button color="teal" fluid size="large">
                Login
              </Button>
            </Segment>
          </Form>
          <Message>
            New to us?
            <a href="#">Sign Up</a>
          </Message>
        </Grid.Column>
      </Grid>

    );
  }
}

export default LoginRegisterPage;
