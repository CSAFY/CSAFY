package com.example.csafy_android.network

import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory


object RequestToServer {
    var retrofit = Retrofit.Builder()
        .baseUrl("https://csafy.com/api/v1/")
        .addConverterFactory(GsonConverterFactory.create())
        .build()

    var service: RequestInterface = retrofit.create(RequestInterface::class.java)
}