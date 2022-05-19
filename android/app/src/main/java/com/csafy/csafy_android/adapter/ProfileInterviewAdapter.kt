package com.csafy.csafy_android.adapter

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.csafy.csafy_android.adapter.viewholder.ProfileInterviewViewHolder
import com.csafy.csafy_android.databinding.ItemProfileInterviewBinding
import com.csafy.csafy_android.network.data.response.ResponseProfileInterviewData

class ProfileInterviewAdapter(private val dataSet: MutableList<ResponseProfileInterviewData>)
    : RecyclerView.Adapter<ProfileInterviewViewHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ProfileInterviewViewHolder {
        val binding = ItemProfileInterviewBinding.inflate(LayoutInflater.from(parent.context), parent, false)
        return ProfileInterviewViewHolder(binding)
    }

    override fun onBindViewHolder(holder: ProfileInterviewViewHolder, position: Int) {
        holder.bind(dataSet[position])
    }

    override fun getItemCount(): Int {
        return dataSet.size
    }

}