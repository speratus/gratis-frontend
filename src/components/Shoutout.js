import React from 'react'

import {Segment, Feed, Item, Header} from 'semantic-ui-react'

const Shoutout = props => {
    const {name, username, avatar} = props.shoutout.user
    const {content, mentions} = props.shoutout
    const mentionText = mentions.map(m => `@${m.user.username}`).join(' ')

    const includeUser = () => {
        if (!props.removeUser) {
            return <React.Fragment>
                <Feed.Summary>
                    <Feed.User>{name}</Feed.User>
                </Feed.Summary>
                <Feed.Meta>{username}</Feed.Meta>
            </React.Fragment>
        } else {
            return null
        }
    }

    const correctRender = () => {
        if (props.small) {
            return <Item>
                {props.includeHeader ? <Header.Subheader>{name}</Header.Subheader> : null}
                <Item.Content>
                    {mentionText} {content}
                </Item.Content>
            </Item>
        } else {
            return <Feed.Event>
                <Feed.Label image={avatar} />
                <Feed.Content>
                    {includeUser()}
                    <Feed.Extra as='h2'>
                        {mentionText} {content}
                    </Feed.Extra>
                </Feed.Content>

            </Feed.Event>
        }
    }

    return <Segment>{correctRender()}</Segment>
}

export default Shoutout