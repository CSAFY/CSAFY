package com.csafy.csafy_android.network.data.response

data class ResponseProfileInterviewData (
        val id: Int,
        val interview: InterviewData,
        val seenAt: String
)

data class InterviewData (
        val category: String,
        val question: String,
        val interviewLikes: Int?,
        val liked: Boolean
)