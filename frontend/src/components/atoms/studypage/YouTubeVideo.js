import PropTypes from 'prop-types';
import React from 'react';

import axios from 'axios';


class YouTubeVideo extends React.PureComponent {
  
  static propTypes = {
    id: PropTypes.string.isRequired,
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
    console.log(this.props, "componentDidUpdate")
    this.player.cueVideoById({videoId:this.props.id,suggestedQuality:"highres" })
  }

  loadVideo = () => {
    const { id } = this.props;
    // the Player object is created uniquely based on the id in props
    this.player = new window.YT.Player("video", {
      videoId: id,
      width: "1158px;",
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
    console.log(event.data)
    // if(event.data ===  0){
    //   this.studyFinish()
    // }
  };
  
  studyFinish = () => {
    // axios({
    //   method: 'get',
    //   url: `https://csafy.com/api/v1/cs-service/study/${studySeq}/seen`,
    //   headers: {
    //     Authorization: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMTY2NzI5Mzg5NDI1NDU3NTg1NTgiLCJ1c2VyX3NlcSI6MzAsInVzZXJuYW1lIjoidGVzdGNjIiwidXNlcl9pZCI6IjExNjY3MjkzODk0MjU0NTc1ODU1OCIsInJvbGUiOiJST0xFX1VTRVIiLCJpYXQiOjE2NTIwNjkwODQsImV4cCI6MTY1MjI3MDY4NH0.L1pqHJcr43n107hOhz_9Hr_IwGxRPUl1-YD-I2ZbN6M"
    //   },
    // })
    // .then((res) => {
    //   console.log(res.data)
    // })
    // .catch(err =>{
    //   console.log(err)
    // })
  }

  render = () => {

    const { id } = this.props;
    
    return (
      <div >
        <div id="video" />
      </div>
    );
  };
}

export default YouTubeVideo;

