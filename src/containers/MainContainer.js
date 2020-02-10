import React from 'react'

class MainContainer extends React.Component {

    state = {
        mentions: []
    }

    componentDidMount() {
        if (localStorage.getItem('token')) {
            //Fetch mentions
        }
    }

    renderHomeIfLoggedIn() {
        if (mentions.length > 0) {
            //Render Mentions
        } else {
            //Render Welcome Component
        }
    }
}

export default MainContainer