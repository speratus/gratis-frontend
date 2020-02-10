import React from 'react'
import {Redirect} from 'react-router-dom'

import WelcomeComponent from '../components/WelcomeComponent'
import MyMentionsList from './MyMentionsList'
import {baseURL} from '../index'

import {Loader, Container} from 'semantic-ui-react'

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
            return <MyMentionsList mentions={this.state.allData.mentions} />
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