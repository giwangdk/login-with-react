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

  selectField = () =>{
    const {match} = this.props
    if(match.path === '/login'){
      return [
        {
          name : 'email',
          icon: 'user',
          iconPosition: 'left',
          placeholder: 'Email Address',
        },
        {
          name : 'password',
          icon: 'user',
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
          icon : 'user',
          iconPosition : 'left',
          placeholder : 'Email Address'
        },
        {
          name : 'password',
          icon: 'user',
          iconPosition: 'left',
          placeholder: 'Input Password',
          type: 'password'
        }
      ]
    }
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
