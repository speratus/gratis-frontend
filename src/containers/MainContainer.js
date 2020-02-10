import React from 'react'
import {Redirect} from 'react-router-dom'

import WelcomeComponent from '../components/WelcomeComponent'
import MyMentionsList from './MyMentionsList'
import ShoutoutList from './ShoutoutList'
import {baseURL} from '../index'

import {Container, Rail, Grid, Icon, Button} from 'semantic-ui-react'
import NewShoutoutForm from '../components/NewShoutoutForm'

class MainContainer extends React.Component {

    constructor(props) {
        super(props)

        this.formContainer = React.createRef()
        this.state = {
            allData: {},
            addingNewShoutout: false
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
                this.setState({allData: data})
            })
        }
    }

    addNewForm = () => {
        this.setState({addingNewShoutout: true})
    }

    hideModal = () => {
        this.setState({addingNewShoutout: false})
    }

    renderHomeIfLoggedIn() {
        if (this.props.loggedIn && this.state.allData.id) {
            return <React.Fragment>
                <Grid centered columns={3}>
                    <Grid.Column>
                        <Rail position='left'>
                            <Button onClick={this.addNewForm}><Icon name="plus"/>New Shoutout</Button>
                        </Rail>
                        <MyMentionsList mentions={this.state.allData.mentions} />
                        <Rail position='right'>
                            <ShoutoutList shoutouts={this.state.allData.shoutouts} />
                        </Rail>
                    </Grid.Column>
                </Grid>
                <NewShoutoutForm open={this.state.addingNewShoutout} hideModal={this.hideModal}/>
            </React.Fragment>
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