package com.csafy.csafy_android.adapter.viewholder

import android.view.View
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.csafy.csafy_android.R
import com.csafy.csafy_android.databinding.ItemFavoriteBinding
import com.csafy.csafy_android.network.data.response.ResponseFavoriteData

class FavoriteViewHolder(private val binding: ItemFavoriteBinding) : RecyclerView.ViewHolder(binding.root) {

    fun bind(favoriteData: ResponseFavoriteData){
        binding.txCategory.text = favoriteData.categoryId
        binding.txCategory2.text = favoriteData.category2Id
        binding.txTitle.text = favoriteData.title
        binding.txVideoId.text = favoriteData.videoId
    }
}
