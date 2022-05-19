package com.csafy.csafy_android.fragment

import android.os.Bundle
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.recyclerview.widget.DividerItemDecoration
import androidx.recyclerview.widget.LinearLayoutManager
import com.csafy.csafy_android.adapter.ProfileFavoriteAdapter
import com.csafy.csafy_android.databinding.FragmentProfileFavoriteBinding
import com.csafy.csafy_android.network.RequestToServer
import com.csafy.csafy_android.network.data.response.ResponseProfileFavoriteData
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response


class ProfileFavortieFragment : Fragment() {

    private var _binding: FragmentProfileFavoriteBinding? = null
    private val binding get() = _binding!!

    lateinit var profileFavoriteAdapter: ProfileFavoriteAdapter
    var datas = mutableListOf<ResponseProfileFavoriteData>()

    val requestToServer = RequestToServer

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        _binding = FragmentProfileFavoriteBinding.inflate(inflater, container, false)

        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        getfavoriteData()  // 즐겨찾기 학습 정보 불러오기

//        profileFavoriteAdapter = ProfileFavoriteAdapter(datas)  // 어댑터 초기화
        binding.rvFavorite.layoutManager = LinearLayoutManager(context)
//        binding.rvFavorite.adapter = ProfileFavoriteAdapter(datas)  // 리사이클러뷰의 어댑터를 profileAdapter로 지정해줌
//        binding.rvFavorite.addItemDecoration(DividerItemDecoration(context, DividerItemDecoration.VERTICAL))

    }


    // 즐겨찾기 학습 정보 불러오기
    private fun getfavoriteData() {
        requestToServer.service.getFavorite()
            .enqueue(object : Callback<List<ResponseProfileFavoriteData>> {
                override fun onResponse(
                        call: Call<List<ResponseProfileFavoriteData>>,
                        response: Response<List<ResponseProfileFavoriteData>>
                ) {
                    if (response.isSuccessful) {
                        // 즐겨찾는 학습 데이터가 아직 없는 유저에게 발생하는 nullPointException 해결
                        if (response.body() == null) {
                            binding.rvFavorite.layoutManager = LinearLayoutManager(context)
                        }

                        else {
                            Log.d("통신 성공", "${response.body()}")
                            profileFavoriteAdapter = ProfileFavoriteAdapter(view!!.context,
                                response.body()!! as MutableList<ResponseProfileFavoriteData>
                            )
                            binding.rvFavorite.adapter = profileFavoriteAdapter
                            profileFavoriteAdapter.notifyDataSetChanged()
                        }

                    } else {
                        binding.rvFavorite.layoutManager = LinearLayoutManager(context)
//                        val intent = Intent(context, LoginActivity::class.java)
//                        Toast.makeText(context, "login btn 눌림", Toast.LENGTH_SHORT).show()
//                        startActivity(intent)
                    }

//                    val temp = response.body()!!
//                    Log.d("temp", temp.toString())
//                    Toast.makeText(context, "통신 성공", Toast.LENGTH_SHORT).show()
                }

                override fun onFailure(call: Call<List<ResponseProfileFavoriteData>>, t: Throwable) {
                    Log.d("통신 실패", "${t}")
//                    Toast.makeText(context, "통신 실", Toast.LENGTH_SHORT).show()
                }

            })
    }

}