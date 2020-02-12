import React from 'react'
import {Redirect} from 'react-router-dom'

import WelcomeComponent from '../components/WelcomeComponent'
import ShoutoutList from './ShoutoutList'
import SidebarList from './SidebarList'
import {baseURL} from '../index'

import {Container, Rail, Grid, Icon, Button} from 'semantic-ui-react'
import NewShoutoutForm from '../components/NewShoutoutForm'

class MainContainer extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            allData: {},
            shoutouts: [],
            mentions: [],
            addingNewShoutout: false,
            editingShoutout: false,
            shoutout: {
                content: "",
                mentions: []
            }
        }
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
                const {shoutouts, mentions} = data
                this.setState({allData: data, shoutouts: shoutouts, mentions: mentions})
            })
        }
    }

    addNewForm = () => {
        this.setState({addingNewShoutout: true})
    }

    hideModal = () => {
        this.setState({
            addingNewShoutout: false,
            shoutout: {
                content: "",
                mentions: []
            }
        })
    }

    replaceShoutout = shoutout => {
        const shoutouts = this.state.shoutouts.map(s => s.id === shoutout.id ? shoutout : s)
        this.setState({shoutouts: shoutouts})
    }

    shoutoutEditClicked = shoutout => {
        console.log(shoutout)
        this.setState({addingNewShoutout: true, shoutout: shoutout})
    }

    removeShoutout = shoutout => {
        const newShoutouts = this.state.shoutouts.filter(s => s.id !== shoutout.id)
        // console.log('deleted shoutout', shoutout, 'old shoutouts', this.state.shoutouts, 'new shoutouts', newShoutouts)
        this.setState({shoutouts: newShoutouts})
    }

    renderHomeIfLoggedIn() {
        if (this.props.loggedIn && this.state.allData.id) {
            return <React.Fragment>
                <Grid centered columns={3}>
                    <Grid.Column>
                        <Rail position='left'>
                            
                            <Button onClick={this.addNewForm}><Icon name="plus"/>New Shoutout</Button>
                        </Rail>
                        <ShoutoutList 
                            shoutouts={this.state.mentions} 
                            heading={"You've been thanked!"} 
                            />
                        <Rail position='right'>
                            <SidebarList 
                            shoutouts={this.state.shoutouts} 
                            heading={"Your Shoutouts"}
                            small
                            editable
                            onEdit={this.shoutoutEditClicked}
                            />
                        </Rail>
                    </Grid.Column>
                </Grid>
                <NewShoutoutForm 
                    open={this.state.addingNewShoutout} 
                    hideModal={this.hideModal} 
                    friends={this.state.allData.friends}
                    currentUserId={this.state.allData.id}
                    addShoutout={this.addShoutout}
                    replaceShoutout={this.replaceShoutout}
                    shoutout={this.state.shoutout}
                    removeShoutout={this.removeShoutout}
                />
            </React.Fragment>
        } else {
            return <WelcomeComponent />
        }
    }

    addShoutout = shoutout => {
        this.setState({
            shoutouts: [...this.state.shoutouts, shoutout]
        })
    }

    render() {
        return <Container style={{marginTop: '4em'}}>
            {this.renderHomeIfLoggedIn()}
        </Container>
    }
}

export default MainContainer