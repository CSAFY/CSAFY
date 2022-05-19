package com.csafy.csafy_android.network.data.response

import com.google.gson.annotations.SerializedName

data class ResponseProfileTestData (
        val id: String,
        val examDone: String,
        val corrects: Corrects,
        val totals: Totals
)

data class Corrects (
        @SerializedName("네트워크")
        val network: Int?,
        @SerializedName("운영체제")
        val operatingSystem: Int?,
        @SerializedName("자료구조")
        val dataSystem: Int?,
        @SerializedName("기타")
        val etc: Int?,
        @SerializedName("데이터베이스")
        val database: Int?,
        @SerializedName("컴퓨터구조")
        val computerArchitecture: Int?,
)

data class Totals (
        @SerializedName("네트워크")
        val network: Int?,
        @SerializedName("운영체제")
        val operatingSystem: Int?,
        @SerializedName("자료구조")
        val dataSystem: Int?,
        @SerializedName("기타")
        val etc: Int?,
        @SerializedName("데이터베이스")
        val database: Int?,
        @SerializedName("컴퓨터구조")
        val computerArchitecture: Int?,
)