import React from 'react'

import {Segment, Item} from 'semantic-ui-react'

const SidebarShoutout = props => {
    const {content, mentions} = props.shoutout
    const mentionString = mentions.map(m => `@${m.user.username}`).join(' ')
    return <Segment>
        <Item>
            <Item.Content>
                {mentionString} {content}
            </Item.Content>
        </Item>
    </Segment>
}

export default SidebarShoutout