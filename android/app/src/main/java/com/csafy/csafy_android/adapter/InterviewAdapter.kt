package com.csafy.csafy_android.adapter

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.csafy.csafy_android.adapter.viewholder.InterviewViewHolder
import com.csafy.csafy_android.databinding.ItemInterviewBinding
import com.csafy.csafy_android.network.data.response.ResponseInterviewData

class InterviewAdapter(private val dataSet: MutableList<ResponseInterviewData>) : RecyclerView.Adapter<InterviewViewHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): InterviewViewHolder {
        val binding = ItemInterviewBinding.inflate(LayoutInflater.from(parent.context), parent, false)
        return InterviewViewHolder(binding)
    }

    override fun getItemCount(): Int {
        return dataSet.size
    }

    override fun onBindViewHolder(holder: InterviewViewHolder, position: Int) {
        holder.bind(dataSet[position])
    }

}