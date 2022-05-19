package com.csafy.csafy_android.fragment

import android.os.Bundle
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.DividerItemDecoration
import androidx.recyclerview.widget.LinearLayoutManager
import com.csafy.csafy_android.adapter.InterviewAdapter
import com.csafy.csafy_android.databinding.FragmentInterviewBinding
import com.csafy.csafy_android.network.RequestToServer
import com.csafy.csafy_android.network.data.response.ResponseInterviewData
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response


class InterviewFragment : Fragment() {

    private var _binding: FragmentInterviewBinding? = null

    private val binding get() = _binding!!

    lateinit var interviewAdapter: InterviewAdapter

    val requestToServer = RequestToServer

    // 면접 리스트 params
    private lateinit var interviewSubject: String

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        _binding = FragmentInterviewBinding.inflate(inflater, container, false)

        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

//        interviewSubject = "(자료구조 컴퓨터구조 운영체제 네트워크 데이터베이스 기타)"
        interviewSubject = "all"

        getInterviewData()  // 면접 리스트 데이터 받아오기

//        interviewAdapter = InterviewAdapter(datas)
        binding.rvInterview.layoutManager = LinearLayoutManager(context, LinearLayoutManager.VERTICAL, false)
//        binding.rvInterview.adapter = InterviewAdapter(datas)
//        binding.rvInterview.addItemDecoration(DividerItemDecoration(context, DividerItemDecoration.VERTICAL))
//        interviewAdapter = InterviewAdapter(view.context!!)
//        binding.rvInterview = interviewAdapter
//        loadDatas()
    }

    // 면접 질문 리스트 데이터 받아오기
    private fun getInterviewData() {
        requestToServer.service.getInterviewList(interviewSubject)
                .enqueue(object: Callback<List<ResponseInterviewData>>{
                    override fun onResponse(call: Call<List<ResponseInterviewData>>, response: Response<List<ResponseInterviewData>>) {
                        if (response.isSuccessful) {
                            Log.d("면접 질문 리스트 통신 성공", "${response.body()!!}")
                            interviewAdapter = InterviewAdapter(response.body()!! as MutableList<ResponseInterviewData>)
                            binding.rvInterview.adapter = interviewAdapter
                            interviewAdapter.notifyDataSetChanged()
                        }
                    }

                    override fun onFailure(call: Call<List<ResponseInterviewData>>, t: Throwable) {
                        Log.d("면접 질문 리스트 통신 실", "${t}")

                    }

                })
    }


}
