package com.csafy.csafy_android.fragment

import android.content.Intent
import android.content.SharedPreferences
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.csafy.csafy_android.R
import com.csafy.csafy_android.activity.MainActivity
import com.csafy.csafy_android.databinding.FragmentTestMultipleBinding
import com.csafy.csafy_android.databinding.FragmentTestOXBinding
import com.csafy.csafy_android.network.RequestToServer
import com.csafy.csafy_android.network.data.request.RequestScoreData
import com.csafy.csafy_android.network.data.response.ResponseLoginData
import com.csafy.csafy_android.network.data.response.ResponseMultipleData
import com.csafy.csafy_android.network.data.response.ResponseMultipleData2
import com.csafy.csafy_android.network.data.response.ResponseOXData
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import java.util.*
import kotlin.concurrent.schedule
import kotlin.math.max


class TestMultipleFragment : Fragment() {
    private var _binding: FragmentTestMultipleBinding? = null
    private val binding get() = _binding!!

    val requestToServer = RequestToServer  // 싱글톤 그대로 가져옴.

    // 정답 관련
    private lateinit var testMultipleFragment: TestMultipleFragment // 콜백용 자기 선언
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
        _binding = FragmentTestMultipleBinding.inflate(inflater, container, false)
        val view = binding.root
        testMultipleFragment = TestMultipleFragment()

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
        getMutipleQuiz()
        binding.imageViewResultX.visibility = View.GONE
        binding.imageViewResultO.visibility = View.GONE
        binding.textResultAnswer.visibility = View.GONE

        binding.btnExample1.setOnClickListener {
            if (answer == "1") {
                correct += 1
                resultCorrect()
            } else {
                wrong += 1
                resultWrong()
            }
            val text = "정답 : " + correct + " / 오답 : "+ wrong
            score = max((8 * correct - 3 * wrong) / 8, 0)
            binding.textCorrect.setText(text)
        }
        binding.btnExample2.setOnClickListener {
            if (answer == "2") {
                correct += 1
                resultCorrect()
            } else {
                wrong += 1
                resultWrong()
            }
            val text = "정답 : " + correct + " / 오답 : "+ wrong
            score = max((8 * correct - 3 * wrong) / 8, 0)
            binding.textCorrect.setText(text)
        }
        binding.btnExample3.setOnClickListener {
            if (answer == "3") {
                correct += 1
                resultCorrect()
            } else {
                wrong += 1
                resultWrong()
            }
            val text = "정답 : " + correct + " / 오답 : "+ wrong
            binding.textCorrect.setText(text)
            score = max((8 * correct - 3 * wrong) / 8, 0)
        }
        binding.btnExample4.setOnClickListener {
            if (answer == "4") {
                correct += 1
                resultCorrect()
            } else {
                wrong += 1
                resultWrong()
            }
            val text = "정답 : " + correct + " / 오답 : "+ wrong
            binding.textCorrect.setText(text)
            score = max((8 * correct - 3 * wrong) / 8, 0)
        }

        // 정산 및 홈으로 이동 다음 단계 이동하기
        val mainActivity = activity as MainActivity
        binding.btnEndQuiz.setOnClickListener {
            updateScores()
            mainActivity.goTestFragment()
        }

        return view
    }

    // http 보내서 OX 퀴즈 정보 받기
    fun getMutipleQuiz() {
        requestToServer.service.getQuizMultipleList(quizSubject, 3).enqueue(object : Callback<List<ResponseMultipleData2>> {  // 콜백 등록
            override fun onResponse(
                call: Call<List<ResponseMultipleData2>>,
                response: Response<List<ResponseMultipleData2>>
            ) {

                val quiz = response.body()!![0]

                Log.d("문제 정보", response.body()!!.toString() )
                Log.d("문제 정보2", quiz.toString() )
                binding.textQuiz.setText(quiz.question)
                answer = quiz.answer.toString()
                binding.btnExample1.setText(quiz.examples[0])
                binding.btnExample2.setText(quiz.examples[1])
                binding.btnExample3.setText(quiz.examples[2])
                binding.btnExample4.setText(quiz.examples[3])
            }

            override fun onFailure(call: Call<List<ResponseMultipleData2>>, t: Throwable) {
            }


        })
    }

    // http 보내서 OX 퀴즈 정보 받기
//    fun getSampleMutipleQuiz() {
//        requestToServer.service.quizMultipleSample().enqueue(object : Callback<ResponseMultipleData> {  // 콜백 등록
//
//            override fun onResponse(
//                call: Call<ResponseMultipleData>,
//                response: Response<ResponseMultipleData>
//            ) {
//                // 통신 성공
//                if(response.isSuccessful){
//                    Log.d("문제 정보", response.body()!!.toString() )
//                    binding.textQuiz.setText(response.body()!!.quiz)
//                    answer = response.body()!!.answer
//                    binding.btnExample1.setText("이것은 1번 문항")
//                    binding.btnExample2.setText("이것은 2번 문항입니다!")
//                    binding.btnExample3.setText("이것은 조금 긴 3번 문항입니다.")
//                    binding.btnExample4.setText("4번점심나가서먹을거같아4번점심나가서먹을거같아4번점심나가서먹을거같아4번점심나가서먹을거같아4번점심나가서먹을거같아4번점심나가서먹을거같아")
//                }
//                else {
//                    when (response.code()) {
//                        404 -> Log.d("실패", response.message())
//                        405 -> Log.d("문제가 뭐야", response.message())
//
//                    }
//                }
//            }
//            override fun onFailure(call: Call<ResponseMultipleData>, t: Throwable) {
//            }
//        })
//    }

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
            getMutipleQuiz()
            binding.imageViewResultO.visibility = View.GONE
            binding.textResultAnswer.visibility = View.GONE}, 2000)
    }

    fun resultWrong() {
        disableAnswerBtn()
        binding.imageViewResultX.visibility = View.VISIBLE
        binding.textResultAnswer.visibility = View.VISIBLE
        binding.textResultAnswer.setText("답은 "+ answer +"번입니다.")

        Handler(Looper.getMainLooper()).postDelayed({
            ableAnswerBtn()
            getMutipleQuiz()
            binding.imageViewResultX.visibility = View.GONE
            binding.textResultAnswer.visibility = View.GONE}, 2000)
    }

    // 버튼 비활성화
    fun disableAnswerBtn() {
        binding.btnExample1.isClickable = false
        binding.btnExample1.isEnabled = false
        binding.btnExample2.isClickable = false
        binding.btnExample2.isEnabled = false
        binding.btnExample3.isClickable = false
        binding.btnExample3.isEnabled = false
        binding.btnExample4.isClickable = false
        binding.btnExample4.isEnabled = false

    }

    // 버튼 활성화
    fun ableAnswerBtn() {
        binding.btnExample1.isClickable = true
        binding.btnExample1.isEnabled = true
        binding.btnExample2.isClickable = true
        binding.btnExample2.isEnabled = true
        binding.btnExample3.isClickable = true
        binding.btnExample3.isEnabled = true
        binding.btnExample4.isClickable = true
        binding.btnExample4.isEnabled = true
    }

}