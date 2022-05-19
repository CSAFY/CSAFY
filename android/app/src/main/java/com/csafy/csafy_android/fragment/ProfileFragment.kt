package com.csafy.csafy_android.fragment

import android.content.Intent
import android.os.Bundle
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import com.bumptech.glide.Glide
import com.csafy.csafy_android.R
import com.csafy.csafy_android.adapter.ProfilePagerAdapter
import com.csafy.csafy_android.activity.LoginActivity
import com.csafy.csafy_android.activity.SettingActivity
import com.csafy.csafy_android.databinding.FragmentProfileBinding
import com.csafy.csafy_android.network.RequestToServer
import com.csafy.csafy_android.network.data.response.ResponseProfileData
import com.google.android.material.tabs.TabLayoutMediator
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class ProfileFragment : Fragment() {

    private var _binding: FragmentProfileBinding? = null
    private val binding get() = _binding!!

    val requestToServer = RequestToServer

    lateinit var profilePagerAdapter: ProfilePagerAdapter

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        _binding = FragmentProfileBinding.inflate(inflater, container, false)

        // 프로필 탭
        val viewPager = binding.viewpagerProfile
        val tabContent = binding.tabProfile

//        val imgIconList = arrayOf(R.drawable.ic_outline_star_24, R.drawable.ic_outline_star_24, R.drawable.ic_outline_star_24)
        val textList = arrayOf("즐겨찾는 학습", "최근 본 면접", "모의고사 결과")

        viewPager.adapter = ProfilePagerAdapter(childFragmentManager, lifecycle)

        TabLayoutMediator(tabContent, viewPager) { tab, position ->  // 탭 메뉴 설정
            tab.text = textList[position]
//            tab.setIcon(imgIconList[position])
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

        getProfileData()

        // 로그인 버튼 누름
        binding.btnLogin.setOnClickListener{
            activity?.let{
                val intent = Intent(context, LoginActivity::class.java)
//                Toast.makeText(context, "login btn 눌림", Toast.LENGTH_SHORT).show()
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

    private fun getProfileData() {
        requestToServer.service.getUserInfo()
            .enqueue(object : Callback<ResponseProfileData> {
                override fun onResponse(
                    call: Call<ResponseProfileData>,
                    response: Response<ResponseProfileData>
                ) {
                    if (response.isSuccessful) {
                        var imgUrl:String = "https://csafy-profile.s3.amazonaws.com/${response.body()!!.profile_image}"
                        // 프로필 사진
                        Glide.with(view!!.context).load(imgUrl).into(binding.imgProfile)
                        // 파일 처리
//                        if (response.body()!!.profile_image == null) {
//                            Glide.with(view!!.context).load(R.drawable.cute_dog).into(binding.imgProfile)
//                        } else {
//                            Glide.with(view!!.context).load(response.body()!!.profile_image).into(binding.imgProfile)
//                        }

                        // username, introduction
                        binding.txUsername.text = response.body()!!.username
                        binding.txComment.text = response.body()!!.introduction
                        Log.d("유저 데이터 조회", "${response.body()!!}")
                    }
                }

                override fun onFailure(call: Call<ResponseProfileData>, t: Throwable) {
                    Log.d("유저 데이터 통신 실패", "${t}")
                }

            })
    }

}

