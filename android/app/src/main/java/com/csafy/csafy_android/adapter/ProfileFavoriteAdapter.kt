package com.csafy.csafy_android.adapter

import android.content.Context
import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.csafy.csafy_android.adapter.viewholder.ProfileFavoriteViewHolder
import com.csafy.csafy_android.databinding.ItemProfileFavoriteBinding
import com.csafy.csafy_android.network.data.response.ResponseProfileFavoriteData

class ProfileFavoriteAdapter(private val context: Context, private val dataSet: MutableList<ResponseProfileFavoriteData>) : RecyclerView.Adapter<ProfileFavoriteViewHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ProfileFavoriteViewHolder {
//        val view = LayoutInflater.from(context).inflate(R.layout.item_favorite, parent, false)
//        return FavoriteViewHolder(view)
        val binding = ItemProfileFavoriteBinding.inflate(LayoutInflater.from(parent.context), parent, false)
        return ProfileFavoriteViewHolder(binding)
    }

    override fun onBindViewHolder(holder: ProfileFavoriteViewHolder, position: Int) {
        holder.bind(dataSet[position])
    }

    override fun getItemCount(): Int {
        return dataSet.size
    }

}