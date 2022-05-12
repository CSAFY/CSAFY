package com.csafy.csafy_android.fragment

import android.os.Bundle
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import com.csafy.csafy_android.R
import com.csafy.csafy_android.adapter.ProfileFavoriteAdapter
import com.csafy.csafy_android.adapter.viewholder.FavoriteViewHolder
import com.csafy.csafy_android.databinding.FragmentProfileStudyBinding
import com.csafy.csafy_android.network.RequestToServer
import com.csafy.csafy_android.network.data.response.ResponseFavoriteData
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response


class ProfileStudyFragment : Fragment() {

    private var _binding: FragmentProfileStudyBinding? = null
    private val binding get() = _binding!!

    lateinit var profileFavoriteAdapter: ProfileFavoriteAdapter
    var datas = mutableListOf<ResponseFavoriteData>()

    val requestToServer = RequestToServer

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_profile_study, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        getfavoriteData()  // 즐겨찾기 학습 정보 불러오기

        profileFavoriteAdapter = ProfileFavoriteAdapter(view.context)
        binding.rvFavorite.adapter = profileFavoriteAdapter  // 리사이클러뷰의 어댑터를 profileAdapter로 지정해줌
        loadDatas()  // 데이터 생성, 어댑터에 전달
    }

    // 데이터 생성
    private fun loadDatas(){
        datas.apply {
            add(
                ResponseFavoriteData(
                    id = 1,
                    title = "운영체제론을 배워보자",
                    categoryId = "1번 카테고리",
                    category2Id = "2번 카테고리",
                    videoId = "비디오 아이디 1"
            ))
            add(
                ResponseFavoriteData(
                    id = 2,
                    title = "운영체제론을 배워보자",
                    categoryId = "1번 카테고리",
                    category2Id = "2번 카테고리",
                    videoId = "비디오 아이디 1"
            ))
        }
        profileFavoriteAdapter.datas = datas
        profileFavoriteAdapter.notifyDataSetChanged()
    }

    // 즐겨찾기 학습 정보 불러오기
    private fun getfavoriteData() {
        requestToServer.service.getFavorite()
            .enqueue(object : Callback<List<ResponseFavoriteData>> {
                override fun onResponse(
                    call: Call<List<ResponseFavoriteData>>,
                    response: Response<List<ResponseFavoriteData>>
                ) {
                    if (response.isSuccessful) {
                        Log.d("통신 성공", "${response.body()}")
                    }
                    val temp = response.body()!!
                    Log.d("temp", temp.toString())
                    Toast.makeText(context, "통신 성공", Toast.LENGTH_SHORT).show()
                }

                override fun onFailure(call: Call<List<ResponseFavoriteData>>, t: Throwable) {
                    Log.d("통신 실패", "${t}")
                    Toast.makeText(context, "통신 실", Toast.LENGTH_SHORT).show()
                }

            })
    }

}