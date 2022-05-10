package com.csafy.csafy_android.network

import com.csafy.csafy_android.network.data.request.RequestJoinData
import com.csafy.csafy_android.network.data.request.RequestLoginData
import com.csafy.csafy_android.network.data.request.RequestScoreData
import com.csafy.csafy_android.network.data.response.*
import okhttp3.ResponseBody
import retrofit2.Call
import retrofit2.Response
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

    // OX 퀴즈 받기
    @GET("cs-service/unity/quizsample")
    fun quizOXSample() : Call<ResponseOXData>

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