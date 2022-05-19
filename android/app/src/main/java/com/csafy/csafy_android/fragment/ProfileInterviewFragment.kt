package com.csafy.csafy_android.fragment

import android.os.Bundle
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.DividerItemDecoration
import androidx.recyclerview.widget.LinearLayoutManager
import com.csafy.csafy_android.adapter.ProfileInterviewAdapter
import com.csafy.csafy_android.databinding.FragmentProfileInterviewBinding
import com.csafy.csafy_android.network.RequestToServer
import com.csafy.csafy_android.network.data.response.ResponseProfileInterviewData
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response


class ProfileInterviewFragment : Fragment() {

    private var _binding: FragmentProfileInterviewBinding? = null
    private val binding get() = _binding!!

    val requestToServer = RequestToServer  // 싱글톤 그대로 가져옴.

    lateinit var profileInterviewAdapter: ProfileInterviewAdapter

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        _binding = FragmentProfileInterviewBinding.inflate(inflater, container, false)

        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        getProfileInterviewData()

//        binding.rvProfileInterview.layoutManager = LinearLayoutManager(context, LinearLayoutManager.VERTICAL, false)
//        binding.rvProfileInterview.addItemDecoration(DividerItemDecoration(context, DividerItemDecoration.VERTICAL))  // item 마다 구분선 긋기
    }

    // 최근 본 면접 질문 data
    private fun getProfileInterviewData() {
        requestToServer.service.getProfileInterview()
                .enqueue(object: Callback<List<ResponseProfileInterviewData>>{
                    override fun onResponse(call: Call<List<ResponseProfileInterviewData>>, response: Response<List<ResponseProfileInterviewData>>) {
                        if (response.isSuccessful) {
                            // 최근 본 면접 데이터가 아직 없는 유저에게 발생하는 nullPointException 해결
                            if (response.body() == null) {
                                binding.rvProfileInterview.layoutManager = LinearLayoutManager(context)
                            }
                            else {
                                Log.d("최근 본 면접 질문 통신 성공", "${response.body()!!}")
                                profileInterviewAdapter = ProfileInterviewAdapter(response.body()!! as MutableList<ResponseProfileInterviewData>)
                                binding.rvProfileInterview.adapter = profileInterviewAdapter
                                profileInterviewAdapter.notifyDataSetChanged()
                            }
                        }
                    }

                    override fun onFailure(call: Call<List<ResponseProfileInterviewData>>, t: Throwable) {
                        Log.d("최근 본 면접 질문 통신 실패", "${t}")
                    }

                })
    }







}