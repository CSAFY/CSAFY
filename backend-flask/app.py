from flask import Flask, make_response
# ORM
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String
# 환경변수
import os
from dotenv import load_dotenv
# json to dictionary
import json

app = Flask(__name__) 

'''
DB 관련 설정 + ENV 샘플 동봉, 원래는 gitgnore
'''
# Declare connection
# mysql_url = "mysql+pymysql://root:1234@localhost:3306/turtletube_test?charset=utf8"
load_dotenv()
mysql_url = "mysql+pymysql://" + os.environ.get('DB_USER') + ":"+ os.environ.get('DB_PASS') + "@" + os.environ.get('DB_URL') +"?charset=utf8"
engine = create_engine(mysql_url, echo=True, convert_unicode=True)
# Declare & create Session
db_session = scoped_session(sessionmaker(autocommit=False, autoflush=False, bind=engine))
# Create SqlAlchemy Base Instance
Base = declarative_base()
Base.query = db_session.query_property()

def init_database():
    Base.metadata.create_all(bind=engine)


'''
DB 시작/ 종료 설정
'''
@app.before_first_request
def beforeFirstRequest():
    init_database()

@app.teardown_appcontext
def teardownContext(exception):
    db_session.remove()

'''
DTO(Model 아님!) 설정 
'''
class User(Base):
    __tablename__ = 'user'

    user_seq = Column(Integer, primary_key=True)
    email = Column(String)
    username = Column(String)

    # playlist_info = Column(String)
    # recommend_playlists = Column(String)

class Statistic(Base):
    __tablename__ = 'statistic'

    id = Column(Integer, primary_key=True)
    scores = Column(String)  # 과목별 점수
    user_seq = Column(Integer)

class VideoSeen(Base):
    __tablename__ = 'video_seen'

    id = Column(Integer, primary_key=True)
    user_seq = Column(Integer)

class UserBadge(Base):
    __tablename__ = 'user_badge'

    id = Column(Integer, primary_key=True)
    user_seq = Column(Integer)


BACKGROUND_COLOR = {
    'Bronze': ['#F49347', '#984400', '#492000'],
    'Silver': ['#939195', '#6B7E91', '#1F354A'],
    'Gold': ['#FFC944', '#FFAF44', '#FF9632'],
    'Platinum': ['#8CC584', '#45B2D3', '#51A795'],
}

@app.route("/")
def ok():
    return "Flask Working!"

@app.route("/test") 
def hello():
    # MAX_LEN = 11
    # url_set = UrlSettings(request, MAX_LEN)
    # handle_set = BojDefaultSettings(request, url_set)
    svg = '''
    <!DOCTYPE svg PUBLIC
        "-//W3C//DTD SVG 1.1//EN"
        "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg height="170" width="350"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    xml:space="preserve">
    <style type="text/css">
        <![CDATA[
            @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=block');
            @keyframes delayFadeIn {{
                0%{{
                    opacity:0
                }}
                60%{{
                    opacity:0
                }}
                100%{{
                    opacity:1
                }}
            }}
            @keyframes fadeIn {{
                from {{
                    opacity: 0;
                }}
                to {{
                    opacity: 1;
                }}
            }}
            @keyframes rateBarAnimation {{
                0% {{
                    stroke-dashoffset: {bar_size};
                }}
                70% {{
                    stroke-dashoffset: {bar_size};
                }}
                100%{{
                    stroke-dashoffset: 35;
                }}
            }}
            .background {{
                fill: url(#grad);
            }}
            text {{
                fill: white;
                font-family: 'Noto Sans KR', sans-serif;
            }}
            text.boj-handle {{
                font-weight: 700;
                font-size: 1.45em;
                animation: fadeIn 0.8s ease-in-out forwards;
            }}
            text.tier-text {{
                font-weight: 700;
                font-size: 1.45em;
                opacity: 55%;
            }}
            text.tier-number {{
                font-size: 3.1em;
                font-weight: 700;
            }}
            .subtitle {{
                font-weight: 500;
                font-size: 0.9em;
            }}
            .value {{
                font-weight: 400;
                font-size: 0.9em;
            }}
            .percentage {{
                font-weight: 300;
                font-size: 0.8em;
            }}
            .progress {{
                font-size: 0.7em;
            }}
            .item {{
                opacity: 0;
                animation: delayFadeIn 1s ease-in-out forwards;
            }}
            .rate-bar {{
                stroke-dasharray: {bar_size};
                stroke-dashoffset: {bar_size};
                animation: rateBarAnimation 1.5s forwards ease-in-out;
            }}
        ]]>
    </style>
    <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="35%">
            <stop offset="10%" style="stop-color:{color1};stop-opacity:1"></stop>
            <stop offset="55%" style="stop-color:{color2};stop-opacity:1"></stop>
            <stop offset="100%" style="stop-color:{color3};stop-opacity:1"></stop>
        </linearGradient>
    </defs>
    <rect width="350" height="170" rx="10" ry="10" class="background"/>
    <text x="315" y="50" class="tier-text" text-anchor="end" >{tier_title}{tier_rank}</text>
    <text x="35" y="50" class="boj-handle">{boj_handle}</text>
    <g class="item" style="animation-delay: 200ms">
        <text x="35" y="79" class="subtitle">rate</text><text x="145" y="79" class="rate value">{rate}</text>
    </g>
    <g class="item" style="animation-delay: 400ms">
        <text x="35" y="99" class="subtitle">solved</text><text x="145" y="99" class="solved value">{solved}</text>
    </g>
    <g class="item" style="animation-delay: 600ms">
        <text x="35" y="119" class="subtitle">class</text><text x="145" y="119" class="class value">{boj_class}{boj_class_decoration}</text>
    </g>
    <g class="rate-bar" style="animation-delay: 800ms">
        <line x1="35" y1="142" x2="{bar_size}" y2="142" stroke-width="4" stroke="floralwhite" stroke-linecap="round"/>
    </g>
    <line x1="35" y1="142" x2="290" y2="142" stroke-width="4" stroke-opacity="40%" stroke="floralwhite" stroke-linecap="round"/>
    <text x="297" y="142" alignment-baseline="middle" class="percentage">{percentage}%</text>
    <text x="293" y="157" class="progress" text-anchor="end">{now_rate} / {needed_rate}</text>
</svg>
    '''.format(color1='#FFC944',
               color2='#FFAF44',
               color3='#FF9632',
               boj_handle='이름',
               tier_rank='랭크',
               tier_title='티어이름',
               solved='솔브드',
               boj_class='클래스',
               boj_class_decoration='+',
               rate='레이트',
               now_rate='현재레이트',
               needed_rate='필경',
               percentage=80, # %
               bar_size=239) # 35 + 2.55 * 퍼센트

    response = make_response(svg)
    response.content_type = 'image/svg+xml'

    return response

@app.route("/sample/<rank>")
def get_sample(rank):
    exp = 184
    badge_num = 20
    video_num = 39
    tier = rank
    rank = 3
    exp_calc = 184

    # 유저 이름 없거나, 길면 CSAFY로 변경

    color1=BACKGROUND_COLOR[tier][0]
    color2=BACKGROUND_COLOR[tier][1]
    color3=BACKGROUND_COLOR[tier][2]

    svg = '''
    <!DOCTYPE svg PUBLIC
        "-//W3C//DTD SVG 1.1//EN"
        "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg height="170" width="350"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    xml:space="preserve">
    <style type="text/css">
        <![CDATA[
            @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=block');
            @keyframes delayFadeIn {{
                0%{{
                    opacity:0
                }}
                60%{{
                    opacity:0
                }}
                100%{{
                    opacity:1
                }}
            }}
            @keyframes fadeIn {{
                from {{
                    opacity: 0;
                }}
                to {{
                    opacity: 1;
                }}
            }}
            @keyframes rateBarAnimation {{
                0% {{
                    stroke-dashoffset: {bar_size};
                }}
                70% {{
                    stroke-dashoffset: {bar_size};
                }}
                100%{{
                    stroke-dashoffset: 35;
                }}
            }}
            .background {{
                fill: url(#grad);
            }}
            text {{
                fill: white;
                font-family: 'Noto Sans KR', sans-serif;
            }}
            text.boj-handle {{
                font-weight: 700;
                font-size: 1.45em;
                animation: fadeIn 0.8s ease-in-out forwards;
            }}
            text.tier-text {{
                font-weight: 700;
                font-size: 1.45em;
                opacity: 55%;
            }}
            text.tier-number {{
                font-size: 3.1em;
                font-weight: 700;
            }}
            .subtitle {{
                font-weight: 500;
                font-size: 0.9em;
            }}
            .value {{
                font-weight: 400;
                font-size: 0.9em;
            }}
            .percentage {{
                font-weight: 300;
                font-size: 0.8em;
            }}
            .progress {{
                font-size: 0.7em;
            }}
            .item {{
                opacity: 0;
                animation: delayFadeIn 1s ease-in-out forwards;
            }}
            .rate-bar {{
                stroke-dasharray: {bar_size};
                stroke-dashoffset: {bar_size};
                animation: rateBarAnimation 1.5s forwards ease-in-out;
            }}
        ]]>
    </style>
    <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="35%">
            <stop offset="10%" style="stop-color:{color1};stop-opacity:1"></stop>
            <stop offset="55%" style="stop-color:{color2};stop-opacity:1"></stop>
            <stop offset="100%" style="stop-color:{color3};stop-opacity:1"></stop>
        </linearGradient>
    </defs>
    <rect width="350" height="170" rx="10" ry="10" class="background"/>
    <text x="315" y="50" class="tier-text" text-anchor="end" >{tier_title} {tier_rank}</text>
    <text x="35" y="50" class="boj-handle">{boj_handle}</text>
    <g class="item" style="animation-delay: 200ms">
        <text x="35" y="79" class="subtitle">exp</text><text x="145" y="79" class="rate value">{exp}</text>
    </g>
    <g class="item" style="animation-delay: 400ms">
        <text x="35" y="99" class="subtitle">배지</text><text x="145" y="99" class="solved value">{badge_num}</text>
    </g>
    <g class="item" style="animation-delay: 600ms">
        <text x="35" y="119" class="subtitle">강의</text><text x="145" y="119" class="class value">{video_num}</text>
    </g>
    <g class="rate-bar" style="animation-delay: 800ms">
        <line x1="35" y1="142" x2="{bar_size}" y2="142" stroke-width="4" stroke="floralwhite" stroke-linecap="round"/>
    </g>
    <line x1="35" y1="142" x2="290" y2="142" stroke-width="4" stroke-opacity="40%" stroke="floralwhite" stroke-linecap="round"/>
    <text x="297" y="142" alignment-baseline="middle" class="percentage">{percentage}%</text>
    <text x="293" y="157" class="progress" text-anchor="end">{now_rate} / {needed_rate}</text>
</svg>
    '''.format(color1=color1,
               color2=color2,
               color3=color3,
               boj_handle='CSAFY',
               tier_title=tier,
               tier_rank=rank,
               exp=exp,
               badge_num=badge_num,
               video_num=video_num,
               now_rate=exp_calc,
               needed_rate=300,
               percentage=exp_calc//3, # %
               bar_size=35+2.55*(exp_calc//3)) # 35 + 2.55 * 퍼센트

    response = make_response(svg)
    response.content_type = 'image/svg+xml'

    return response

@app.route("/card/<email>") 
def get_card(email):
    user = User.query.filter(User.email == email)[:1]
    # 검색 유저가 없으면 예외 처리
    if not user:
        return "없는 유저입니다."
    user_seq = user[0].user_seq
    username = user[0].username
    username = username[:7]

    # 경험치 가져오기
    statistics = Statistic.query.filter(Statistic.user_seq == user_seq)[:1]
    if statistics:
        statistics_dic = json.loads(statistics[0].scores)
    else:
        statistics_dic = dict()  # 경험치 0 일 경우
    
    exp = 0  # 총 경험치
    for subject, score in statistics_dic.items():
        exp += score

    # 본 영상(강의) 수 가져오기
    videos = VideoSeen.query.filter(VideoSeen.user_seq == user_seq)[:]
    video_num = len(videos)

    # 뱃지 수 가져오기
    badges = UserBadge.query.filter(UserBadge.user_seq == user_seq)[:]
    badge_num = len(badges)
    
    # 카드용 자료 계산
    exp_calc = exp
    
    # 티어 계산
    tier = 'Bronze'
    if exp_calc > 4500:
        exp_calc - 4500
        tier = 'Platinum'
    if exp_calc > 3000:
        exp_calc - 3000
        tier = 'Gold'
    if exp_calc > 1500:
        exp_calc - 1500
        tier = 'Silver'    

    # 랭크 계산
    rank = 5 - exp_calc // 300
    exp_calc = exp_calc % 300

    # 유저 이름 없거나, 길면 CSAFY로 변경

    color1=BACKGROUND_COLOR[tier][0]
    color2=BACKGROUND_COLOR[tier][1]
    color3=BACKGROUND_COLOR[tier][2]

    svg = '''
    <!DOCTYPE svg PUBLIC
        "-//W3C//DTD SVG 1.1//EN"
        "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg height="170" width="350"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    xml:space="preserve">
    <style type="text/css">
        <![CDATA[
            @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=block');
            @keyframes delayFadeIn {{
                0%{{
                    opacity:0
                }}
                60%{{
                    opacity:0
                }}
                100%{{
                    opacity:1
                }}
            }}
            @keyframes fadeIn {{
                from {{
                    opacity: 0;
                }}
                to {{
                    opacity: 1;
                }}
            }}
            @keyframes rateBarAnimation {{
                0% {{
                    stroke-dashoffset: {bar_size};
                }}
                70% {{
                    stroke-dashoffset: {bar_size};
                }}
                100%{{
                    stroke-dashoffset: 35;
                }}
            }}
            .background {{
                fill: url(#grad);
            }}
            text {{
                fill: white;
                font-family: 'Noto Sans KR', sans-serif;
            }}
            text.boj-handle {{
                font-weight: 700;
                font-size: 1.45em;
                animation: fadeIn 0.8s ease-in-out forwards;
            }}
            text.tier-text {{
                font-weight: 700;
                font-size: 1.45em;
                opacity: 55%;
            }}
            text.tier-number {{
                font-size: 3.1em;
                font-weight: 700;
            }}
            .subtitle {{
                font-weight: 500;
                font-size: 0.9em;
            }}
            .value {{
                font-weight: 400;
                font-size: 0.9em;
            }}
            .percentage {{
                font-weight: 300;
                font-size: 0.8em;
            }}
            .progress {{
                font-size: 0.7em;
            }}
            .item {{
                opacity: 0;
                animation: delayFadeIn 1s ease-in-out forwards;
            }}
            .rate-bar {{
                stroke-dasharray: {bar_size};
                stroke-dashoffset: {bar_size};
                animation: rateBarAnimation 1.5s forwards ease-in-out;
            }}
        ]]>
    </style>
    <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="35%">
            <stop offset="10%" style="stop-color:{color1};stop-opacity:1"></stop>
            <stop offset="55%" style="stop-color:{color2};stop-opacity:1"></stop>
            <stop offset="100%" style="stop-color:{color3};stop-opacity:1"></stop>
        </linearGradient>
    </defs>
    <rect width="350" height="170" rx="10" ry="10" class="background"/>
    <text x="315" y="50" class="tier-text" text-anchor="end" >{tier_title} {tier_rank}</text>
    <text x="35" y="50" class="boj-handle">{boj_handle}</text>
    <g class="item" style="animation-delay: 200ms">
        <text x="50" y="79" class="subtitle">exp</text><text x="145" y="79" class="rate value">{exp}</text>
    </g>
    <g class="item" style="animation-delay: 400ms">
        <text x="50" y="99" class="subtitle">배지</text><text x="145" y="99" class="solved value">{badge_num}</text>
    </g>
    <g class="item" style="animation-delay: 600ms">
        <text x="50" y="119" class="subtitle">강의</text><text x="145" y="119" class="class value">{video_num}</text>
    </g>
    <g class="rate-bar" style="animation-delay: 800ms">
        <line x1="35" y1="142" x2="{bar_size}" y2="142" stroke-width="4" stroke="floralwhite" stroke-linecap="round"/>
    </g>
    <line x1="35" y1="142" x2="290" y2="142" stroke-width="4" stroke-opacity="40%" stroke="floralwhite" stroke-linecap="round"/>
    <text x="300" y="142" alignment-baseline="middle" class="percentage">{percentage}%</text>
    <text x="293" y="160" class="progress" text-anchor="end">{now_rate} / {needed_rate} </text>
</svg>
    '''.format(color1=color1,
               color2=color2,
               color3=color3,
               boj_handle=username,
               tier_title=tier,
               tier_rank=rank,
               exp=exp,
               badge_num=badge_num,
               video_num=video_num,
               now_rate=exp_calc,
               needed_rate=300,
               percentage=exp_calc//3, # %
               bar_size=35+2.55*(exp_calc//3)) # 35 + 2.55 * 퍼센트

    response = make_response(svg)
    response.content_type = 'image/svg+xml'

    return response


if __name__ == "__main__" :
    # app.run(host='127.0.0.1', port=8080, debug=True)
    app.run(host='0.0.0.0')




# @app.route("/card/<email>") 
# def get_card(email):
#     user = User.query.filter(User.email == email)[:1]
#     # 검색 유저가 없으면 예외 처리
#     if not user:
#         return "없는 유저입니다."
#     user_seq = user[0].user_seq
#     username = user[0].username

#     # 경험치 가져오기
#     statistics = Statistic.query.filter(Statistic.user_seq == user_seq)[:1]
#     if statistics:
#         statistics_dic = json.loads(statistics[0].scores)
#     else:
#         statistics_dic = dict()  # 경험치 0 일 경우
    
#     exp = 0  # 총 경험치
#     for subject, score in statistics_dic.items():
#         exp += score

#     # 본 영상(강의) 수 가져오기
#     videos = VideoSeen.query.filter(VideoSeen.user_seq == user_seq)[:]
#     video_num = len(videos)

#     # 뱃지 수 가져오기
#     badges = UserBadge.query.filter(UserBadge.user_seq == user_seq)[:]
#     badge_num = len(badges)
    
#     # 카드용 자료 계산
#     exp_calc = exp
    
#     # 티어 계산
#     tier = 'Bronze'
#     if exp_calc > 4500:
#         exp_calc - 4500
#         tier = 'Platinum'
#     if exp_calc > 3000:
#         exp_calc - 3000
#         tier = 'Gold'
#     if exp_calc > 1500:
#         exp_calc - 1500
#         tier = 'Silver'    

#     # 랭크 계산
#     rank = 5 - exp_calc // 300
#     exp_calc = exp_calc % 300

#     # 유저 이름 없거나, 길면 CSAFY로 변경

#     color1=BACKGROUND_COLOR[tier][0]
#     color2=BACKGROUND_COLOR[tier][1]
#     color3=BACKGROUND_COLOR[tier][2]

#     svg = '''
#     <!DOCTYPE svg PUBLIC
#         "-//W3C//DTD SVG 1.1//EN"
#         "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
# <svg height="170" width="350"
#     version="1.1"
#     xmlns="http://www.w3.org/2000/svg"
#     xmlns:xlink="http://www.w3.org/1999/xlink"
#     xml:space="preserve">
#     <style type="text/css">
#         <![CDATA[
#             @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=block');
#             @keyframes delayFadeIn {{
#                 0%{{
#                     opacity:0
#                 }}
#                 60%{{
#                     opacity:0
#                 }}
#                 100%{{
#                     opacity:1
#                 }}
#             }}
#             @keyframes fadeIn {{
#                 from {{
#                     opacity: 0;
#                 }}
#                 to {{
#                     opacity: 1;
#                 }}
#             }}
#             @keyframes rateBarAnimation {{
#                 0% {{
#                     stroke-dashoffset: {bar_size};
#                 }}
#                 70% {{
#                     stroke-dashoffset: {bar_size};
#                 }}
#                 100%{{
#                     stroke-dashoffset: 35;
#                 }}
#             }}
#             .background {{
#                 fill: url(#grad);
#             }}
#             text {{
#                 fill: white;
#                 font-family: 'Noto Sans KR', sans-serif;
#             }}
#             text.boj-handle {{
#                 font-weight: 700;
#                 font-size: 1.45em;
#                 animation: fadeIn 0.8s ease-in-out forwards;
#             }}
#             text.tier-text {{
#                 font-weight: 700;
#                 font-size: 1.45em;
#                 opacity: 55%;
#             }}
#             text.tier-number {{
#                 font-size: 3.1em;
#                 font-weight: 700;
#             }}
#             .subtitle {{
#                 font-weight: 500;
#                 font-size: 0.9em;
#             }}
#             .value {{
#                 font-weight: 400;
#                 font-size: 0.9em;
#             }}
#             .percentage {{
#                 font-weight: 300;
#                 font-size: 0.8em;
#             }}
#             .progress {{
#                 font-size: 0.7em;
#             }}
#             .item {{
#                 opacity: 0;
#                 animation: delayFadeIn 1s ease-in-out forwards;
#             }}
#             .rate-bar {{
#                 stroke-dasharray: {bar_size};
#                 stroke-dashoffset: {bar_size};
#                 animation: rateBarAnimation 1.5s forwards ease-in-out;
#             }}
#         ]]>
#     </style>
#     <defs>
#         <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="35%">
#             <stop offset="10%" style="stop-color:{color1};stop-opacity:1"></stop>
#             <stop offset="55%" style="stop-color:{color2};stop-opacity:1"></stop>
#             <stop offset="100%" style="stop-color:{color3};stop-opacity:1"></stop>
#         </linearGradient>
#     </defs>
#     <rect width="350" height="170" rx="10" ry="10" class="background"/>
#     <text x="315" y="50" class="tier-text" text-anchor="end" >{tier_title} {tier_rank}</text>
#     <text x="35" y="50" class="boj-handle">{boj_handle}</text>
#     <g class="item" style="animation-delay: 200ms">
#         <text x="35" y="79" class="subtitle">exp</text><text x="145" y="79" class="rate value">{exp}</text>
#     </g>
#     <g class="item" style="animation-delay: 400ms">
#         <text x="35" y="99" class="subtitle">배지</text><text x="145" y="99" class="solved value">{badge_num}</text>
#     </g>
#     <g class="item" style="animation-delay: 600ms">
#         <text x="35" y="119" class="subtitle">강의</text><text x="145" y="119" class="class value">{video_num}</text>
#     </g>
#     <g class="rate-bar" style="animation-delay: 800ms">
#         <line x1="35" y1="142" x2="{bar_size}" y2="142" stroke-width="4" stroke="floralwhite" stroke-linecap="round"/>
#     </g>
#     <line x1="35" y1="142" x2="290" y2="142" stroke-width="4" stroke-opacity="40%" stroke="floralwhite" stroke-linecap="round"/>
#     <text x="297" y="142" alignment-baseline="middle" class="percentage">{percentage}%</text>
#     <text x="293" y="157" class="progress" text-anchor="end">{now_rate} / {needed_rate} </text>
# </svg>
#     '''.format(color1=color1,
#                color2=color2,
#                color3=color3,
#                boj_handle=username,
#                tier_title=tier,
#                tier_rank=rank,
#                exp=exp,
#                badge_num=badge_num,
#                video_num=video_num,
#                now_rate=exp_calc,
#                needed_rate=300,
#             #    percentage=exp_calc//3, # %
#                percentage=10, # %
#                bar_size=35+2.55*(exp_calc//3)) # 35 + 2.55 * 퍼센트

#     response = make_response(svg)
#     response.content_type = 'image/svg+xml'

#     return response
