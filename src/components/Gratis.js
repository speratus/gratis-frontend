import React from 'react'

import {Segment, Feed} from 'semantic-ui-react'

const Gratis = props => {
    const {name, username, avatar} = props.mention.shoutout.user
    const {content} = props.mention.shoutout.content

    return <Segment>
        <Feed.Event>
            <Feed.Label image={avatar} />
            <Feed.Content>
                <Feed.Summary>
                    <Feed.User>{name}</Feed.User>
                </Feed.Summary>
                <Feed.Meta>{username}</Feed.Meta>
                <Feed.Extra as='h2'>
                    {content}
                </Feed.Extra>
            </Feed.Content>

        </Feed.Event>
    </Segment>
}

export default Gratis