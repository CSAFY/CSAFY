package com.csafy.csafy_android.fragment

import android.os.Bundle
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.LinearLayoutManager
import com.csafy.csafy_android.R
import com.csafy.csafy_android.adapter.ProfileTestAdapter
import com.csafy.csafy_android.databinding.FragmentProfileTestBinding
import com.csafy.csafy_android.network.RequestToServer
import com.csafy.csafy_android.network.data.response.ResponseProfileTestData
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response


class ProfileTestFragment : Fragment() {

    private var _binding : FragmentProfileTestBinding? = null
    private val binding get() = _binding!!

    val requestToServer = RequestToServer

    lateinit var profileTestAdapter: ProfileTestAdapter

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        _binding = FragmentProfileTestBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        getTestData()

        binding.rvProfileTest.layoutManager = LinearLayoutManager(context, LinearLayoutManager.VERTICAL, false)
    }

    // 모의고사 결과 data
    private fun getTestData() {
        requestToServer.service.getProfileTest()
                .enqueue(object : Callback<List<ResponseProfileTestData>> {
                    override fun onResponse(call: Call<List<ResponseProfileTestData>>, response: Response<List<ResponseProfileTestData>>) {
                        if (response.isSuccessful) {
                            // 모의고사 결과 데이터가 아직 없는 유저에게 발생하는 nullPointException 해결
                            if (response.body() == null) {
                                binding.rvProfileTest.layoutManager = LinearLayoutManager(context)
                            }
                            else {
                                Log.d("모의고사 결과 통신 성공", "${response.body()!!}")
                                profileTestAdapter = ProfileTestAdapter(response.body()!! as MutableList<ResponseProfileTestData>)
                                binding.rvProfileTest.adapter = profileTestAdapter
                                profileTestAdapter.notifyDataSetChanged()
                            }

                        }
                    }

                    override fun onFailure(call: Call<List<ResponseProfileTestData>>, t: Throwable) {
                        Log.d("모의고사 결과 통신 실패", "${t}")
                    }

                })
    }


}