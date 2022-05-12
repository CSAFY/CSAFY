package com.csafy.csafy_android.network

import com.csafy.csafy_android.network.data.request.RequestJoinData
import com.csafy.csafy_android.network.data.request.RequestLoginData
import com.csafy.csafy_android.network.data.response.ResponseFavoriteData
import com.csafy.csafy_android.network.data.request.RequestScoreData
import com.csafy.csafy_android.network.data.response.ResponseJoinData
import com.csafy.csafy_android.network.data.response.ResponseLoginData
import com.csafy.csafy_android.network.data.response.ResponseMultipleData
import com.csafy.csafy_android.network.data.response.*
import com.csafy.csafy_android.network.data.response.ResponseOXData
import retrofit2.Call
import retrofit2.http.*

interface RequestInterface {
    /* 회원 정보 */
    // 회원가입
    @POST("user-service/signup")
    fun requestJoin(
        @Body body : RequestJoinData
    ) : Call<ResponseJoinData>

    // 로그인
    @POST("user-service/account/login")
    fun requestLogin(
        @Body body : RequestLoginData
    ) : Call<ResponseLoginData>

    // 즐겨찾는 학습
    @GET("cs-service/profile/study/favorites")
    fun responseFavorite(
        @Header("token") token: String?
    ) : Call<ResponseFavoriteData>


    /* 학습 탭 */
    // OX 퀴즈 받기
    // OX 퀴즈 받기 샘플
    @GET("cs-service/unity/quizsample")
    fun quizOXSample() : Call<ResponseOXData>

    // OX 퀴즈 리스트 받기
    @GET("cs-service/study/multiple/ox")
    fun quizOXList(
        @Query("category") category:String,
        @Query("questionNum") questionNum:Int
    ) : Call<List<ResponseOXData2>>

    // 4지선다 퀴즈 받기
    @GET("cs-service/test/quizsample")
    fun quizMultipleSample() : Call<ResponseMultipleData>

    // 점수 넣기
    @POST("cs-service/profile/scores/update")
    fun updateScores(
        @Body body : RequestScoreData
    ) : Call<Void>

    // 카드 받아오기
    @GET("cs-service/test/quizsample3")
    fun cardSample() : Call<List<ResponseCardData>>



    // 회원 탈퇴
    //위와 같이 @DELETE 어쩌구의 형식으로 가지고 가면
    // Non-body HTTP method cannot contain @Body or @TypedOutput
    // 이러한 오류가 난다 그래서
    // @HTTP(method = "DELETE", path = "/job/deletejob", hasBody = true)
    // 이렇게 사용해야 함
//    @HTTP(method = "DELETE", path = "/user-service/withdraw ", hasBody = true)
//    fun deleteUser(
//        @Header("token") token: String?,
//        @Body body : RequestDeleteUserData
//    ) : Call<ResponseDeleteUserData>
}