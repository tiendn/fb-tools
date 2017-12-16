
export default class FBApi{

    constructor() {
        this.tokenListener();
    }

    static accessToken = null;

    static setToken = (token) => {
        this.accessToken = token;
    }

    static getListPosts = (pageName, callback) => {
        window.FB.api(`/${pageName}?fields=posts{message}&access_token=${this.accessToken}`, response => {
            callback(response);
        })
    }

    static getPostDetail = (postId, callback) => {
        window.FB.api(`/${postId}?fields=comments&access_token=${this.accessToken}`, response => {
            callback(response);
        })
    }

};
