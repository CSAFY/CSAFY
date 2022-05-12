package com.csafy.csafy_android.adapter

import android.content.Context
import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.csafy.csafy_android.R
import com.csafy.csafy_android.adapter.viewholder.FavoriteViewHolder
import com.csafy.csafy_android.network.data.response.ResponseFavoriteData

class ProfileFavoriteAdapter(private val context : Context) : RecyclerView.Adapter<FavoriteViewHolder>() {

    var datas = mutableListOf<ResponseFavoriteData>()

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): FavoriteViewHolder {
        val view = LayoutInflater.from(context).inflate(R.layout.item_favorite, parent, false)
        return FavoriteViewHolder(view)
    }

    override fun onBindViewHolder(holder: FavoriteViewHolder, position: Int) {
        holder.bind(datas[position])
    }

    override fun getItemCount(): Int {
        return datas.size
    }

}