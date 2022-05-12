package com.csafy.csafy_android.network

import com.csafy.csafy_android.network.common.AuthInterceptor
import okhttp3.OkHttpClient
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory


object RequestToServer {
    val client = OkHttpClient.Builder()
        .addInterceptor(AuthInterceptor())
        .build()

    var retrofit = Retrofit.Builder()
        .baseUrl("https://csafy.com/api/v1/")
        .client(client)
        .addConverterFactory(GsonConverterFactory.create())
        .build()

    var service: RequestInterface = retrofit.create(RequestInterface::class.java)
}