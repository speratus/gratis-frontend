import React from 'react'
import {Redirect} from 'react-router-dom'

import WelcomeComponent from '../components/WelcomeComponent'
import MyMentionsList from './MyMentionsList'
import ShoutoutList from './ShoutoutList'
import {baseURL} from '../index'

import {Container, Rail, Grid} from 'semantic-ui-react'

class MainContainer extends React.Component {

    state = {
        loaded: false,
        allData: {}
    }

    componentDidMount() {
        if (localStorage.getItem('token')) {
            fetch(baseURL+'profile', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Access-Token': localStorage.getItem('token')
                }
            }).then(res => res.json()).then(data => {
                console.log(data)
                this.setState({allData: data})
            })
        }
    }

    renderHomeIfLoggedIn() {
        if (this.state.allData.id) {
            return <Grid centered columns={3}>
                <Grid.Column>
                    <MyMentionsList mentions={this.state.allData.mentions} />
                    <Rail position='right'>
                        <ShoutoutList shoutouts={this.state.allData.shoutouts} />
                    </Rail>
                </Grid.Column>
            </Grid>
        } else {
            return <WelcomeComponent />
        }
    }

    render() {
        return <Container style={{marginTop: '4em'}}>
            {this.renderHomeIfLoggedIn()}
        </Container>
    }
}

export default MainContainer