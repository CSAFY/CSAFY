package com.csafy.csafy_android.adapter.viewholder

import androidx.recyclerview.widget.RecyclerView
import com.csafy.csafy_android.databinding.ItemInterviewBinding
import com.csafy.csafy_android.network.data.response.ResponseInterviewData

class InterviewViewHolder(private val binding: ItemInterviewBinding) : RecyclerView.ViewHolder(binding.root) {

    fun bind(interviewData: ResponseInterviewData){
        binding.txKeyword.text = interviewData.category
        binding.txInterviewContent.text = interviewData.question
        binding.txLikeCnt.text = interviewData.interviewLikes.toString()
//        binding.txLiked.text = interviewData.liked.toString()
    }
}
