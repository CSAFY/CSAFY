package com.csafy.csafy_android.adapter.viewholder

import androidx.recyclerview.widget.RecyclerView
import com.csafy.csafy_android.databinding.ItemProfileTestBinding
import com.csafy.csafy_android.network.data.response.ResponseProfileTestData

class ProfileTestViewHolder(private val binding: ItemProfileTestBinding): RecyclerView.ViewHolder(binding.root) {

    fun bind(profileTestData: ResponseProfileTestData) {
        binding.txTestName.text = profileTestData.id
        binding.txTestDate.text = profileTestData.examDone
        binding.txNetworkCorrects.text = profileTestData.corrects.network.toString()
        binding.txNetworkTotals.text = profileTestData.totals.network.toString()
        binding.txOperatingSystemCorrects.text = profileTestData.corrects.operatingSystem.toString()
        binding.txOperatingSystemTotals.text = profileTestData.totals.operatingSystem.toString()
        binding.txDataSystemCorrects.text = profileTestData.corrects.dataSystem.toString()
        binding.txDataSystemTotals.text = profileTestData.totals.dataSystem.toString()
        binding.txDatabaseCorrects.text = profileTestData.corrects.database.toString()
        binding.txDatabaseTotals.text = profileTestData.totals.database.toString()
        binding.txComputerArchitectureCorrects.text = profileTestData.corrects.computerArchitecture.toString()
        binding.txComputerArchitectureTotals.text = profileTestData.totals.computerArchitecture.toString()
        binding.txEtcCorrects.text = profileTestData.corrects.etc.toString()
        binding.txEtcTotals.text = profileTestData.totals.etc.toString()
    }

}