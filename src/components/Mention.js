import React from 'react'

import {Segment, Feed} from 'semantic-ui-react'

const Mention = props => {
    const {name, username, avatar} = props.mention.shoutout.user
    const {content, mentions} = props.mention.shoutout
    const mentionText = mentions.map(m => `@${m.user.username}`).join(' ')

    return <Segment>
        <Feed.Event>
            <Feed.Label image={avatar} />
            <Feed.Content>
                <Feed.Summary>
                    <Feed.User>{name}</Feed.User>
                </Feed.Summary>
                <Feed.Meta>{username}</Feed.Meta>
                <Feed.Extra as='h2'>
                    {mentionText} {content}
                </Feed.Extra>
            </Feed.Content>

        </Feed.Event>
    </Segment>
}

export default Mention