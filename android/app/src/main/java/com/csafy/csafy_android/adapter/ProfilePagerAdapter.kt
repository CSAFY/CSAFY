package com.csafy.csafy_android.adapter

import androidx.fragment.app.Fragment
import androidx.fragment.app.FragmentManager
import androidx.lifecycle.Lifecycle
import androidx.viewpager2.adapter.FragmentStateAdapter
import com.csafy.csafy_android.fragment.*

class ProfilePagerAdapter (fragmentManager : FragmentManager, lifecycle: Lifecycle) :
    FragmentStateAdapter(fragmentManager, lifecycle) {

    override fun getItemCount(): Int = 3

    override fun createFragment(position: Int) : Fragment {
        return when(position) {
            0 -> ProfileFavortieFragment()
            1 -> ProfileInterviewFragment()
            else -> ProfileTestFragment()
        }
    }

}