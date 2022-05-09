package com.csafy.csafy_android

import androidx.fragment.app.Fragment
import androidx.fragment.app.FragmentActivity
import androidx.viewpager2.adapter.FragmentStateAdapter
import com.csafy.csafy_android.fragment.*

class MainPagerAdapter (fragment : FragmentActivity) : FragmentStateAdapter(fragment) {
    override fun getItemCount(): Int = 5

    override fun createFragment(position: Int) : Fragment {
        return when(position) {
            0 -> HomeFragment()
            1 -> CardFragment()
            2 -> StudyFragment()
            3 -> TestFragment()
            else -> ProfileFragment()
        }
    }

}