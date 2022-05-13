package com.csafy.csafy_android.adapter

import android.content.Context
import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.csafy.csafy_android.R
import com.csafy.csafy_android.adapter.viewholder.FavoriteViewHolder
import com.csafy.csafy_android.adapter.viewholder.InterviewViewHolder
import com.csafy.csafy_android.databinding.ItemFavoriteBinding
import com.csafy.csafy_android.databinding.ItemInterviewBinding
import com.csafy.csafy_android.network.data.response.ResponseInterviewData

class InterviewAdapter(private val context: Context) : RecyclerView.Adapter<InterviewViewHolder>() {

    var datas =mutableListOf<ResponseInterviewData>()

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): InterviewViewHolder {
//        val view = LayoutInflater.from(context).inflate(R.layout.item_interview, parent, false)
//        return InterviewViewHolder(view)
        val binding = ItemInterviewBinding.inflate(LayoutInflater.from(parent.context), parent, false)
        return InterviewViewHolder(binding)
    }

    override fun getItemCount(): Int {
        return datas.size
    }

    override fun onBindViewHolder(holder: InterviewViewHolder, position: Int) {
        holder.bind(datas[position])
    }

}