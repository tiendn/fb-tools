import React from 'react';
import PropTypes from 'prop-types';
import './FBPostDetail.css';
import FbApi from '../fbmanager/FBApi';

export default class FBPostDetail extends React.Component {

    state = {
        detailData: null,
        disabled: false,
        isOpened: false
    }

    onClick() {
        this.setState((prevState) => ({
            isOpened: !prevState.isOpened
        }))

        if (!this.state.disabled) {
            this.setState({ disabled: true });
            FbApi.getPostDetail(this.props.postId, data => {
                this.setState({ detailData: data })
            })
        }
    }

    renderDetail = () => {
        if (this.state.isOpened) {
            if (this.state.detailData)
                return (
                    this.state.detailData.comments.data.map((comment) => {
                        if (comment.message)
                            return <h4 key = {comment.id} className = "post-detail-content">- {comment.message}</h4>
                    })
                )
            if (this.state.disabled)
                return <p>No data available</p>
        }
    }

    render() {
        const { postTitle } = this.props;

        return (
            <div className = "post-detail-wrapper">
                <p className = "post-detail-title" onClick = {() => this.onClick()}>
                    {postTitle}
                </p>
                {this.renderDetail()}
            </div>
        )
    }
}
