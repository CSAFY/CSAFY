package com.csafy.csafy_android.fragment

import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.csafy.csafy_android.activity.MainActivity
import com.csafy.csafy_android.network.RequestToServer
import com.csafy.csafy_android.network.data.response.ResponseOXData
import com.csafy.csafy_android.databinding.FragmentTestOXBinding
import com.csafy.csafy_android.network.data.request.RequestScoreData
import com.csafy.csafy_android.network.data.response.ResponseOXData2
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import kotlin.math.max

class TestOXFragment : Fragment() {

    private var _binding: FragmentTestOXBinding? = null
    private val binding get() = _binding!!

    val requestToServer = RequestToServer  // 싱글톤 그대로 가져옴.

    // 정답 관련
    private lateinit var testOXFragment: TestOXFragment // 콜백용 자기 선언
    private lateinit var answer:String
    private lateinit var score:Number
    private lateinit var quizSubject:String

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
        quizSubject = "과목 이름"
        if (bundle != null)
        {
            quizSubject = bundle.getString("quizSubject") ?: "과목 이름"
        }
        binding.textSubject.setText(quizSubject)

        // 운영체제론만 따로
        if (quizSubject == "운영체제론") {
            quizSubject = "운영체제"
        }

        // 세팅하기
        var correct:Int = 0
        var wrong:Int = 0
        score = 0
        getOXQuiz()
        binding.imageViewResultX.visibility = View.GONE
        binding.imageViewResultO.visibility = View.GONE
        binding.textResultAnswer.visibility = View.GONE

        binding.btnO.setOnClickListener {
            if (answer == "O") {
                correct += 1
                resultCorrect()
            } else {
                wrong += 1
                resultWrong()
            }
            val text = "정답 : " + correct + " / 오답 : "+ wrong
            binding.textCorrect.setText(text)
            score = max((2 * correct - 3 * wrong) / 2, 0)
        }
        binding.btnX.setOnClickListener {
            if (answer == "X") {
                correct += 1
                resultCorrect()
            } else {
                wrong += 1
                resultWrong()
            }
            val text = "정답 : " + correct + " / 오답 : "+ wrong
            binding.textCorrect.setText(text)
            score = max((2 * correct - 3 * wrong) / 2, 0)
        }

        // 정산 및 홈으로 이동 다음 단계 이동하기
        val mainActivity = activity as MainActivity
        binding.btnEndQuiz.setOnClickListener {
            updateScores()
            mainActivity.goTestFragment()
        }

        return view
    }

    // http 보내서 OX 퀴즈(샘플) 정보 받기
//    fun getOXSampleQuiz() {
//        requestToServer.service.quizOXSample().enqueue(object : Callback<ResponseOXData> {  // 콜백 등록
//
//        override fun onResponse(
//            call: Call<ResponseOXData>,
//            response: Response<ResponseOXData>
//        ) {
//            // 통신 성공
//            if(response.isSuccessful){
//                binding.textQuiz.setText(response.body()!!.quiz)
//                answer = response.body()!!.answer
//            }
//            else {
//                when (response.code()) {
//                    404 -> Log.d("실패", response.message())
//                    405 -> Log.d("문제가 뭐야", response.message())
//
//                }
//            }
//        }
//        override fun onFailure(call: Call<ResponseOXData>, t: Throwable) {
//        }
//        })
//    }

    // http로 OX 진짜 퀴즈 받기
    fun getOXQuiz() {
        requestToServer.service.getQuizOXList(quizSubject, 1)
            .enqueue(object : Callback<List<ResponseOXData2>> {  // 콜백 등록
                override fun onResponse(
                    call: Call<List<ResponseOXData2>>,
                    response: Response<List<ResponseOXData2>>
                ) {
                    val quiz = response.body()!![0]
                    // 질문
                    var text = ""
                    if (quiz.key != null) text += quiz.key + "\n"
                    binding.textQuiz.setText(text + quiz.explanation)

                    // 정답
                    if (quiz.answer == 1) {
                        answer = "X"
                    } else {
                        answer = "O"
                    }
                }

                override fun onFailure(call: Call<List<ResponseOXData2>>, t: Throwable) {
                }
            })
    }

    // 해당 점수 갱신
    fun updateScores() {
        requestToServer.service.updateScores(
            RequestScoreData(
                subject = quizSubject,
                score = score as Int
            )
        ).enqueue(object : Callback<Void> {  // 콜백 등록
            override fun onResponse(call: Call<Void>, response: Response<Void>) {
                Log.d("점수갱신", "good!")
            }

            override fun onFailure(call: Call<Void>, t: Throwable) {
                Log.d("점수갱신", "bad")
            }
        })
    }

    // 정답, 오답 여부 이미지 처리
    fun resultCorrect() {
        disableAnswerBtn()
        binding.imageViewResultO.visibility = View.VISIBLE
        binding.textResultAnswer.visibility = View.VISIBLE
        binding.textResultAnswer.setText("정답입니다!")

        Handler(Looper.getMainLooper()).postDelayed({
            ableAnswerBtn()
            getOXQuiz()
            binding.imageViewResultO.visibility = View.GONE
            binding.textResultAnswer.visibility = View.GONE}, 2000)
    }

    fun resultWrong() {
        disableAnswerBtn()
        binding.imageViewResultX.visibility = View.VISIBLE
        binding.textResultAnswer.visibility = View.VISIBLE
        binding.textResultAnswer.setText("답은 "+ answer +"입니다.")

        Handler(Looper.getMainLooper()).postDelayed({
            ableAnswerBtn()
            getOXQuiz()
            binding.imageViewResultX.visibility = View.GONE
            binding.textResultAnswer.visibility = View.GONE}, 2000)
    }

    // 버튼 비활성화
    fun disableAnswerBtn() {
        binding.btnO.isClickable = false
        binding.btnO.isEnabled = false
        binding.btnX.isClickable = false
        binding.btnX.isEnabled = false
    }

    // 버튼 활성화
    fun ableAnswerBtn() {
        binding.btnO.isClickable = true
        binding.btnO.isEnabled = true
        binding.btnX.isClickable = true
        binding.btnX.isEnabled = true
    }

}