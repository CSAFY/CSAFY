package com.csafy.csafy_android.adapter

import android.content.Context
import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.csafy.csafy_android.adapter.viewholder.FavoriteViewHolder
import com.csafy.csafy_android.adapter.viewholder.InterviewViewHolder
import com.csafy.csafy_android.databinding.ItemFavoriteBinding
import com.csafy.csafy_android.databinding.ItemInterviewBinding
import com.csafy.csafy_android.network.data.response.ResponseFavoriteData
import com.csafy.csafy_android.network.data.response.ResponseInterviewData

class ProfileFavoriteAdapter(private val context: Context, private val dataSet: MutableList<ResponseFavoriteData>) : RecyclerView.Adapter<FavoriteViewHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): FavoriteViewHolder {
//        val view = LayoutInflater.from(context).inflate(R.layout.item_favorite, parent, false)
//        return FavoriteViewHolder(view)
        val binding = ItemFavoriteBinding.inflate(LayoutInflater.from(parent.context), parent, false)
        return FavoriteViewHolder(binding)
    }

    override fun onBindViewHolder(holder: FavoriteViewHolder, position: Int) {
        holder.bind(dataSet[position])
    }

    override fun getItemCount(): Int {
        return dataSet.size
    }

}