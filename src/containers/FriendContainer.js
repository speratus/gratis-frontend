import React from 'react'

// import {useParams} from 'react-router-dom'
import {Container, Grid, Rail, Sticky} from 'semantic-ui-react'

import {baseURL} from '../index'
import SidebarList from './SidebarList'
import ShoutoutList from './ShoutoutList'
import UserCard from '../components/UserCard'

class FriendContainer extends React.Component {

    constructor(props) {
        super(props)

        const {userId} = props.match.params
        this.userId = userId
        this.state = {
            allData: {},
            shoutouts: [],
            mentions: []
        }
    }


    componentDidMount() {
        fetch(baseURL+`users/${this.userId}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Access-Token': localStorage.getItem('token')
            }
        }).then(res => res.json()).then(data => {
            console.log(data)
            this.setState({
                allData: data,
                shoutouts: data.shoutouts,
                mentions: data.mentions
            })
        })
    }

    render() {
        const {id, name, username, bio, tagline, avatar} = this.state.allData
        return <Container style={{marginTop: '4em'}}>
            <Grid centered columns={3}>
                <Grid.Column>
                    <Rail position='left'>
                        <SidebarList 
                            shoutouts={this.state.mentions} 
                            heading={`${this.state.allData.name} has been thanked by these people!`}
                            small
                            includeHeader
                        />
                    </Rail>
                    <ShoutoutList 
                        shoutouts={this.state.shoutouts}
                        heading={`${this.state.allData.name} has thanked these people`}
                        removeUser
                    />
                    <Rail position='right'>
                        <Sticky style={{marginTop: '5em'}}>
                            <UserCard user={{
                                id: id,
                                name: name,
                                username: username,
                                bio: bio,
                                tagline: tagline,
                                avatar: avatar
                            }}/>
                        </Sticky>
                    </Rail>
                </Grid.Column>
            </Grid>
        </Container>
    }

}

export default FriendContainer