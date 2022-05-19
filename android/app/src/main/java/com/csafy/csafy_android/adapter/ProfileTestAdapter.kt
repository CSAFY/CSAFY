package com.csafy.csafy_android.adapter

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.csafy.csafy_android.adapter.viewholder.ProfileTestViewHolder
import com.csafy.csafy_android.databinding.ItemProfileTestBinding
import com.csafy.csafy_android.network.data.response.ResponseProfileTestData

class ProfileTestAdapter(private val dataSet: MutableList<ResponseProfileTestData>): RecyclerView.Adapter<ProfileTestViewHolder>() {
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ProfileTestViewHolder {
        val binding = ItemProfileTestBinding.inflate(LayoutInflater.from(parent.context), parent, false)
        return ProfileTestViewHolder(binding)
    }

    override fun onBindViewHolder(holder: ProfileTestViewHolder, position: Int) {
        holder.bind(dataSet[position])
    }

    override fun getItemCount(): Int {
        return dataSet.size
    }
}