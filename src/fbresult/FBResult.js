import React from 'react';
import './FBResult.css';

export default class FBResult extends React.Component {

    render() {
        console.log(this.props);
        if (this.props.data && this.props.data !== {})
            return (
                <ul>
                    {this.props.data.feed.data.map((post) =>
                        <li className = "post-item" key={post.id}>{post.message}</li>
                    )}
                </ul>
            )
        return <p>No data available</p>
    }
}
