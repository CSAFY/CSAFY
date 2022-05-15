package com.csafy.csafy_android.adapter.viewholder

import androidx.recyclerview.widget.RecyclerView
import com.csafy.csafy_android.databinding.ItemProfileFavoriteBinding
import com.csafy.csafy_android.network.data.response.ResponseProfileFavoriteData

class ProfileFavoriteViewHolder(private val binding: ItemProfileFavoriteBinding) : RecyclerView.ViewHolder(binding.root) {

    fun bind(profileFavoriteData: ResponseProfileFavoriteData){
        binding.txCategory.text = profileFavoriteData.categoryId
        binding.txCategory2.text = profileFavoriteData.category2Id
        binding.txTitle.text = profileFavoriteData.title
        binding.txVideoId.text = profileFavoriteData.videoId
    }
}
