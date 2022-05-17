import PropTypes from 'prop-types';
import React from 'react';

import axios from 'axios';
import BasicModal from '../intensivePage/BasicModal';


class YouTubeVideo extends React.PureComponent {
  
  static propTypes = {
    videoId: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    categoryId: PropTypes.string.isRequired,
  };


  componentDidMount = () => {
    // On mount, check to see if the API script is already loaded
    if (!window.YT) { // If not, load the script asynchronously
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';

      // onYouTubeIframeAPIReady will load the video after the script is loaded
      window.onYouTubeIframeAPIReady = this.loadVideo;

      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    } else { // If script is already there, load the video directly
      this.loadVideo();
    }
    
  };

  componentDidUpdate = (event) => {
    // console.log(this.props, "componentDidUpdate")
    this.player.cueVideoById({videoId:this.props.videoId,suggestedQuality:"highres" })
  }

  loadVideo = () => {
    const { videoId } = this.props;
    // the Player object is created uniquely based on the videoId in props
    this.player = new window.YT.Player("video", {
      videoId: videoId,
      width: "1200px;",
      height: "655px;",
      margin: "20px auto 0 auto;",
      events: {
        onReady: this.onPlayerReady,
        onStateChange: this.onPlayerStateChange,
      },
    });
  };

  onPlayerReady = event => {
    // event.target.playVideo();
  };

  onPlayerStateChange = event => {
    // console.log(event.data)
    
    if(event.data ===  0){
      this.studyFinish()
    }else if(event.data ===  1){
      this.studyPlay()
      // console.log("play")
    }
  };
  
  studyFinish = () => {
    const JWT = window.localStorage.getItem("jwt")
    axios({
      method: 'post',
      url: `https://csafy.com/api/v1/cs-service/study/${this.props.id}/seen`,
      headers: {
        Authorization: JWT
      },
    })
    .then((res) => {
    })
    .catch(err =>{
      console.log(err)
    })

    axios({
      method: 'post',
      url:  "https://csafy.com/api/v1/cs-service/profile/scores/update",
      headers: {
        Authorization: JWT
      },
      data: {
        "subject" : this.props.categoryId,
        "score" : 1
      },
    })
    .then((res) => {
      console.log(res)
    })
    .catch(err =>{
      console.log(err)
    })
  }

  studyPlay = () => {
    const JWT = window.localStorage.getItem("jwt")
    axios({
      method: 'post',
      url: `https://csafy.com/api/v1/cs-service/study/${this.props.id}/play`,
      headers: {
        Authorization: JWT
      },
    })
    .then((res) => {
      console.log(res)
    })
    .catch(err =>{
      console.log(err)
    })
  }

  render = () => {
    return (
      <div >
        <div id="video" />
      </div>
    );
  };
}

export default YouTubeVideo;

