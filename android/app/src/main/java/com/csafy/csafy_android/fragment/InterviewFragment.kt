package com.csafy.csafy_android.fragment

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.recyclerview.widget.DividerItemDecoration
import androidx.recyclerview.widget.LinearLayoutManager
import com.csafy.csafy_android.adapter.InterviewAdapter
import com.csafy.csafy_android.adapter.ProfileFavoriteAdapter
import com.csafy.csafy_android.databinding.FragmentCardBinding
import com.csafy.csafy_android.network.data.response.ResponseFavoriteData
import com.csafy.csafy_android.network.data.response.ResponseInterviewData


class InterviewFragment : Fragment() {

    private var _binding: FragmentCardBinding? = null

    private val binding get() = _binding!!

    lateinit var interviewAdapter: InterviewAdapter
    var datas = mutableListOf<ResponseInterviewData>()


    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        _binding = FragmentCardBinding.inflate(inflater, container, false)

        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        interviewAdapter = InterviewAdapter(datas)
        binding.rvInterview.layoutManager = LinearLayoutManager(context, LinearLayoutManager.VERTICAL, false)
        binding.rvInterview.adapter = InterviewAdapter(datas)
        binding.rvInterview.addItemDecoration(DividerItemDecoration(context, DividerItemDecoration.VERTICAL))
//        interviewAdapter = InterviewAdapter(view.context!!)
//        binding.rvInterview = interviewAdapter
        loadDatas()
    }

    // 데이터 생성
    private fun loadDatas() {
        datas.apply {
            add(
                ResponseInterviewData(
                    category = "인성",
                    question = "인성면접 질문입니다아아아아아아",
                    interviewLikes = 13,
                    liked = false
                )
            )
            add(
                ResponseInterviewData(
                    category = "기술",
                    question = "기술면접 질문입니다다아아아",
                    interviewLikes = 63,
                    liked = true
                )
            )
        }

    }

}
