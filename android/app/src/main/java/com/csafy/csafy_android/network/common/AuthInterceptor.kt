package com.csafy.csafy_android.network.common

import android.util.Log
import androidx.appcompat.app.AppCompatActivity
import okhttp3.Interceptor
import okhttp3.Response

class AuthInterceptor : Interceptor {
    override fun intercept(chain: Interceptor.Chain): Response {

        val token: String = App.prefs.getString("token","")!!

        val request = chain.request().newBuilder()
            .addHeader("Authorization", token)
            .build()

        return chain.proceed(request)
    }
}