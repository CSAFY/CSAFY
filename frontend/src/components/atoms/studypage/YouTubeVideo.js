import PropTypes from 'prop-types';
import React from 'react';

import axios from 'axios';

import Swal from 'sweetalert2';


class YouTubeVideo extends React.PureComponent {
  
  static propTypes = {
    videoId: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    categoryId: PropTypes.string.isRequired
    
  };



  componentDidMount = () => {
    if (!window.YT) { 
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';

      
      window.onYouTubeIframeAPIReady = this.loadVideo;

      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    } else { 
      this.loadVideo();
    }
  };

  componentDidUpdate = (event) => {
    this.player.cueVideoById({videoId:this.props.videoId,suggestedQuality:"highres" })
  }

  loadVideo = () => {
    const { videoId } = this.props;
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
    
  };

  onPlayerStateChange = event => {
    if(event.data ===  0){
      this.studyFinish()
    }else if(event.data ===  1){
      this.studyPlay()
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
      console.log(res)
      // category: "기타"
      // certificatedAt: "2022-05-23"
      // id: 3
      // userSeq: 94
      const responseSeen = res.data
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
        
        // console.log(res)
        let checking = null
        
        if ( responseSeen.hasOwnProperty("category")){
          

          checking = Swal.fire({
            title: `${this.props.categoryId} 과목을 모두 학습하였습니다!`,
            text: `${res.data.prevScore}점에서 ${res.data.nowScore}점으로 상승했습니다`,
            imageUrl: 'images/endpaper.png',
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: 'Custom image',
          })
        } else {
          
          checking = Swal.fire({
            position: 'center',
            icon: 'success',
            title: `${this.props.categoryId}과목이 ${res.data.prevScore}점에서 ${res.data.nowScore}점으로 상승했습니다!!`,
            showConfirmButton: false,
            timer: 3000
          })
        }
        
        return checking

      })
      .catch(err =>{
        console.log(err)
      })

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
      // console.log(res)
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

