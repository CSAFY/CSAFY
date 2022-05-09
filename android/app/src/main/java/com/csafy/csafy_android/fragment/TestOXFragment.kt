package com.example.csafy_android.fragment

import android.content.Intent
import android.os.Bundle
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import com.example.csafy_android.R
import com.example.csafy_android.activity.MainActivity
import com.example.csafy_android.databinding.FragmentTestOXBinding
import com.example.csafy_android.databinding.FragmentTestSubjectBinding
import com.example.csafy_android.network.RequestToServer
import com.example.csafy_android.network.data.request.RequestLoginData
import com.example.csafy_android.network.data.response.ResponseLoginData
import com.example.csafy_android.network.data.response.ResponseOXData
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class TestOXFragment : Fragment() {

    private var _binding: FragmentTestOXBinding? = null
    private val binding get() = _binding!!

    val requestToServer = RequestToServer  // 싱글톤 그대로 가져옴.

    // 정답 관련
    private lateinit var testOXFragment: TestOXFragment // 콜백용 자기 선언
    private lateinit var answer:String
    
//    override fun onCreate(savedInstanceState: Bundle?) {
//        super.onCreate(savedInstanceState)
//
//    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        _binding = FragmentTestOXBinding.inflate(inflater, container, false)
        val view = binding.root
        testOXFragment = TestOXFragment()

        // 전단계 정보 받아오기
        var bundle = arguments
        var quizSubject:String = "과목이름"
        if (bundle != null)
        {
            quizSubject = bundle.getString("quizSubject") ?: "과목 이름"
        }

        // 세팅하기
        var correct:Int = 0
        var wrong:Int = 0
        getOXQuiz()

        binding.btnO.setOnClickListener {
            if (answer == "O") {
                correct += 1
            } else {
                wrong += 1
            }
            val text = "정답 : " + correct + " / 오답 : "+ wrong
            binding.textCorrect.setText(text)
            getOXQuiz()
        }
        binding.btnX.setOnClickListener {
            if (answer == "X") {
                correct += 1
            } else {
                wrong += 1
            }
            val text = "정답 : " + correct + " / 오답 : "+ wrong
            binding.textCorrect.setText(text)
            getOXQuiz()
        }

        binding.textSubject.setText(quizSubject)
        Log.d("quizsubject", quizSubject)

        return view
    }

    // http 보내서 OX 퀴즈 정보 받기
    fun getOXQuiz() {
        requestToServer.service.quizOXSample().enqueue(object : Callback<ResponseOXData> {  // 콜백 등록

        override fun onResponse(
            call: Call<ResponseOXData>,
            response: Response<ResponseOXData>
        ) {
            // 통신 성공
            if(response.isSuccessful){
                binding.textQuiz.setText(response.body()!!.quiz)
                answer = response.body()!!.answer
            }
            else {
                when (response.code()) {
                    404 -> Log.d("실패", response.message())
                    405 -> Log.d("문제가 뭐야", response.message())

                }
            }
        }

        override fun onFailure(call: Call<ResponseOXData>, t: Throwable) {
            TODO("Not yet implemented")
        }
        })
    }

}