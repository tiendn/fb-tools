import React from 'react';
import PropTypes from 'prop-types';
import './FBPostDetail.css';
import FbApi from '../fbmanager/FBApi';
import {isEmail} from '../utils';

export default class FBPostDetail extends React.Component {

    static propTypes = {
        postId: PropTypes.string.isRequired
    }

    state = {
        detailData: null,
        disabled: false,
        isOpened: false,
        option: 'raw'
    }

    emailList = [];

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

    onOptionChange(value) {
        this.setState({ option: value });
    }
//  <select value={this.state.option} onChange={(event) => this.onOptionChange(event)}>
//                 <option value="raw" >Raw</option>
//                 <option value="email">Email</option>
//             </select> 
    renderFilterComponent = () => (
            <form className = "post-detail-filter">
                <label>
                    Raw data
                    <input
                        name="raw"
                        type="checkbox"
                        checked={this.state.option === 'raw'}
                        onChange={() => this.onOptionChange('raw')} 
                    />
                </label>
                <br />
                <label>
                    Email list
                    <input
                        name="email"
                        type="checkbox"
                        checked={this.state.option === 'email'}
                        onChange={() => this.onOptionChange('email')} 
                    />
                </label>
            </form>
    );

    renderRawMessage = (data) => (
        data.map((comment) => {
            if (comment.message)
                return <h4 key = {comment.id} className = "post-detail-content">- {comment.message}</h4>
        })
    );

    renderEmailList = (data) => {
        data.map((comment) => {
            if (comment && comment.message)
                if (isEmail(comment.message)) {
                    this.emailList.push(comment.message);
                    this.emailList.push("\n");
                }
        })
        // console.log(this.emailList)
        return (
            <textarea
                readOnly 
                className = "post-detail-content email" 
                defaultValue = {this.emailList.length >= 1 ? `${this.emailList}`.replace(/,/g, "") : 'No email data.'}
            />
        )
    }
        

    renderDetail = () => {
        const { renderFilterComponent, renderRawMessage, renderEmailList } = this;
        const { isOpened, detailData, disabled, option } = this.state;

        if (isOpened) {
            const emptyData = [{message: null}];
            const data = detailData ? detailData.comments ? detailData.comments.data : emptyData : emptyData;
            if (detailData && detailData.comments)
                return (
                    <div className = "post-detail-content-wrapper" >
                        {renderFilterComponent()}
                        <br />
                        {option === 'raw' ? renderRawMessage(data) : renderEmailList(data)}
                    </div>
                )
            else 
                if (disabled)
                    return <p className = "nodata">No data available</p>
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
