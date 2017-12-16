import React from 'react';
import PropTypes from 'prop-types';
import './FBPost.css';
import PostDetail from '../fbpostdetail/FBPostDetail';

export default class FBPost extends React.Component {

    static propTypes = {
        data: PropTypes.object
    }

    render() {
        console.log(this.props);
        if (this.props.data && this.props.data !== {})
            return (
                <ul>
                    {this.props.data.posts.data.map((post) =>
                        <li 
                            className = "post-item" 
                            key={post.id}
                        >
                            <PostDetail postId = {post.id} postTitle = {post.message} />
                        </li>
                    )}
                </ul>
            )
        return <p>No data available</p>
    }
}
