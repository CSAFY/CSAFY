package com.csafy.csafy_android.adapter.viewholder

import androidx.recyclerview.widget.RecyclerView
import com.csafy.csafy_android.databinding.ItemFavoriteBinding
import com.csafy.csafy_android.databinding.ItemInterviewBinding
import com.csafy.csafy_android.network.data.response.ResponseInterviewData

class InterviewViewHolder(private val binding: ItemInterviewBinding) : RecyclerView.ViewHolder(binding.root) {
//
//    val category = itemView.findViewById<TextView>(R.id.tx_keyword)
//    val question = itemView.findViewById<TextView>(R.id.tx_interview_content)
//    val interviewLikes = itemView.findViewById<TextView>(R.id.tx_like_cnt)
//    val liked = itemView.findViewById<TextView>(R.id.tx_liked)
//
    fun bind(interviewData: ResponseInterviewData){
        binding.txKeyword.text = interviewData.category
//        binding.tx
//        category.text = interviewData.category
//        question.text = interviewData.question
//        interviewLikes.text = interviewData.interviewLikes.toString()
//        liked.text = interviewData.liked.toString()
    }
}

//class InterviewViewHolder(private val binding: ListItemBinding) : RecyclerView.ViewHolder(binding.root) {
//    fun bind(data:List<String>) {
//        binding.tvMain.text = data[0]
//        binding.tvSub.text = data[1]
//        }
//}