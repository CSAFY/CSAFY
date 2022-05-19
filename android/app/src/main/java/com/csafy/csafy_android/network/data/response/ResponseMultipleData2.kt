package com.csafy.csafy_android.network.data.response

data class ResponseMultipleData2 (
    val question: String,
    val examples: List<String>,
    val answer: Int,
    val category: String,
    val categoryChapter: String
)