package com.csafy.csafy_android.adapter.viewholder

import androidx.recyclerview.widget.RecyclerView
import com.csafy.csafy_android.databinding.ItemProfileInterviewBinding
import com.csafy.csafy_android.network.data.response.ResponseProfileInterviewData

class ProfileInterviewViewHolder(private val binding: ItemProfileInterviewBinding) : RecyclerView.ViewHolder(binding.root) {

    fun bind(profileInterviewData : ResponseProfileInterviewData) {
        binding.txInterviewContent.text = profileInterviewData.interview.question
        binding.txKeyword.text = profileInterviewData.interview.category
        binding.txLikeCnt.text = profileInterviewData.interview.interviewLikes.toString()
    }
}