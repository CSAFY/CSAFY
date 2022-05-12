package com.csafy.csafy_android.adapter.viewholder

import android.view.View
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.csafy.csafy_android.R
import com.csafy.csafy_android.network.data.response.ResponseFavoriteData

class FavoriteViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
    val categoryId = itemView.findViewById<TextView>(R.id.tx_category)
    val categoryId2 = itemView.findViewById<TextView>(R.id.tx_category2)
    val title = itemView.findViewById<TextView>(R.id.tx_title)
    val videoId = itemView.findViewById<TextView>(R.id.tx_videoId)

    fun bind(favoriteData: ResponseFavoriteData){
        categoryId.text = favoriteData.categoryId
        categoryId2.text = favoriteData.category2Id
        title.text = favoriteData.title
        videoId.text = favoriteData.videoId
    }
}