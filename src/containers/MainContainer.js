import React from 'react'
import {Redirect} from 'react-router-dom'

import WelcomeComponent from '../components/WelcomeComponent'
import {baseURL} from '../index'

class MainContainer extends React.Component {

    state = {
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
                this.setState({allData: data})
            })
        }
    }

    renderHomeIfLoggedIn() {
        console.log('Rendering main')
        if (this.state.allDatalength !== {}) {
            console.log('rendering mentions')
            //Render Mentions
            return null
        } else {
            console.log('rendering welcome')
            return <Redirect to='/login'/>
        }
    }

    render() {
        return <React.Fragment>
            {this.renderHomeIfLoggedIn()}
        </React.Fragment>
    }
}

export default MainContainer