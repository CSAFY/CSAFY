package com.csafy.csafy_android.fragment

import android.content.Intent
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import android.widget.Toast
import com.csafy.csafy_android.R
import com.csafy.csafy_android.adapter.ProfilePagerAdapter
import com.csafy.csafy_android.activity.LoginActivity
import com.csafy.csafy_android.activity.SettingActivity
import com.csafy.csafy_android.databinding.FragmentProfileBinding
import com.google.android.material.tabs.TabLayout
import com.google.android.material.tabs.TabLayoutMediator

class ProfileFragment : Fragment() {

    private var _binding: FragmentProfileBinding? = null
    private val binding get() = _binding!!

    lateinit var profilePagerAdapter: ProfilePagerAdapter

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        _binding = FragmentProfileBinding.inflate(inflater, container, false)

        // 프로필 탭
        val viewPager = binding.viewpagerProfile
        val tabContent = binding.tabProfile

        val imgIconList = arrayOf(R.drawable.ic_outline_star_24, R.drawable.ic_outline_star_24, R.drawable.ic_outline_star_24)
        val textList = arrayOf("즐겨찾는 학습", "좋아요한 학습", "모의고사 결과")

        viewPager.adapter = ProfilePagerAdapter(childFragmentManager, lifecycle)

        TabLayoutMediator(tabContent, viewPager) { tab, position ->  // 탭 메뉴 설정
            tab.text = textList[position]
            tab.setIcon(imgIconList[position])
        }.attach()

//        val tabFirst : View = layoutInflater.inflate(R.layout.custom_profile_tab, null)
//        val tabSecond : View = layoutInflater.inflate(R.layout.custom_profile_tab, null)
//        val tabThird : View = layoutInflater.inflate(R.layout.custom_profile_tab, null)
//        val imgFirst : ImageView = tabFirst.findViewById(R.id.img_tab)
//        val imgSecond : ImageView = tabSecond.findViewById(R.id.img_tab)
//        val imgThird : ImageView = tabThird.findViewById(R.id.img_tab)
//        val textFirst : TextView = tabFirst.findViewById(R.id.tx_tab)
//        val textSecond : TextView = tabSecond.findViewById(R.id.tx_tab)
//        val textThird : TextView = tabThird.findViewById(R.id.tx_tab)
//
//        imgFirst.setImageResource(R.drawable.ic_outline_star_24)
//        imgSecond.setImageResource(R.drawable.ic_outline_star_24)
//        imgThird.setImageResource(R.drawable.ic_outline_star_24)
//
//        textFirst.setText("즐겨찾는 학습")
//        textSecond.setText("좋아요한 면접")
//        textThird.setText("모의고사 결과")
//
//        tabContent.setupWithViewPager(viewPager)
//
//        tabContent.getTabAt(0)!!.customView = tabFirst
//        tabContent.getTabAt(1)!!.customView = tabSecond
//        tabContent.getTabAt(2)!!.customView = tabThird

        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        // 로그인 버튼 누름
        binding.btnLogin.setOnClickListener{
            activity?.let{
                val intent = Intent(context, LoginActivity::class.java)
                Toast.makeText(context, "login btn 눌림", Toast.LENGTH_SHORT).show()
                startActivity(intent)
            }
        }

        // 설정으로 이동
        binding.btnSetting.setOnClickListener {
            activity?.let{
                val intent = Intent(context, SettingActivity::class.java)
                startActivity(intent)
            }
        }


    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }

    private fun setTabLayout(){

    }

}

