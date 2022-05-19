package com.csafy.csafy_android.fragment

import android.animation.AnimatorInflater
import android.animation.AnimatorSet
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.csafy.csafy_android.R
import com.csafy.csafy_android.activity.MainActivity
import com.csafy.csafy_android.databinding.FragmentStudyAutoBinding
import com.csafy.csafy_android.network.RequestToServer
import com.csafy.csafy_android.network.common.App
import com.csafy.csafy_android.network.data.request.RequestScoreData
import com.csafy.csafy_android.network.data.response.ResponseCardData
import com.csafy.csafy_android.network.data.response.ResponseCardData2
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import java.util.*


class StudyAutoFragment : Fragment() {
    private var _binding: FragmentStudyAutoBinding? = null
    private val binding get() = _binding!!

    val requestToServer = RequestToServer  // 싱글톤 그대로 가져옴.

    // 깜빡이 시간 체크용 (단위 0.1)
    private var time = 7
    private var timerTask: Timer? = null
    private var isTimerRunning = false
    private var timePhase = 1

    // 정답 관련
    private lateinit var score:Number
    private lateinit var studySubject:String
    private lateinit var cards:List<ResponseCardData2>
    private lateinit var cards_num:Number
    private lateinit var cards_now:Number

    private lateinit var mainActivity: MainActivity

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        _binding = FragmentStudyAutoBinding.inflate(inflater, container, false)
        val view = binding.root

        // 전단계 정보 받아오기
        var bundle = arguments
        studySubject = "과목 이름"
        if (bundle != null)
        {
            studySubject = bundle.getString("studySubject") ?: "과목 이름"
        }
        binding.textSubject.setText(studySubject)

        // 운영체제론만 따로
        if (studySubject == "운영체제론") {
            studySubject = "운영체제"
        }

        binding.cardBack.visibility = View.INVISIBLE

        // 세팅하기
        mainActivity = activity as MainActivity
        var correct:Int = 0
        var wrong:Int = 0
        score = 0
        cards = listOf(ResponseCardData2(key = "hi", explanation = "hi"))
        cards_now = 1
        cards_num = 1
        binding.textCards.setText(cards_now.toString() + " of " + cards_num.toString())
        getCards()

        // 정산 및 홈으로 이동 다음 단계 이동하기
        binding.btnEndStudy.setOnClickListener {
            isTimerRunning = false
            updateScores()
            mainActivity.changeStudyFragment()
        }

        binding.btnStop.setOnClickListener {
            if (isTimerRunning == false) {
                isTimerRunning = true
                studyAutoManager()
                binding.btnStop.text = "중지"
            } else {
                isTimerRunning = false
                binding.btnStop.text = "재개"
            }
        }

        binding.btnNext.setOnClickListener {
            studyAutoPhase2()
            // 다음 Phase
            timePhase = 1
            time = 20
        }

        studyAutoManager()

        return view
    }

    // http 보내서 OX 퀴즈 정보 받기
    fun getCards() {
        requestToServer.service.getCardList(studySubject, 999).enqueue(object : Callback<List<ResponseCardData2>> {  // 콜백 등록
            override fun onResponse(
                call: Call<List<ResponseCardData2>>,
                response: Response<List<ResponseCardData2>>
            ) {
                cards = response.body()!!

                cards_now = 1
                cards_num = cards.size
                binding.textCards.setText(cards_now.toString() + " of " + cards_num.toString())

                binding.cardFront.setText(cards[cards_now as Int -1].key)
                binding.cardBack.setText(cards[cards_now as Int -1].explanation)

                // 타이머 매니저 작동
                time = 20
                isTimerRunning = true
                studyAutoManager()
            }

            override fun onFailure(call: Call<List<ResponseCardData2>>, t: Throwable) {
            }

        })
    }

    // 0. 기본 매니저로 재생 관리 (0.1초 단위)
    private fun studyAutoManager() {
        timerTask = kotlin.concurrent.timer(period = 100) {
            time--
            if (isTimerRunning == false) {
                cancel()
            }
//            Log.d("타이머", time.toString())
            mainActivity.runOnUiThread{
                if (time < 0) {
                    if (timePhase == 1) {
                        studyAutoPhase1()
                        // 다음 Phase
                        timePhase = 2
                        time = 30
                    } else {
                        studyAutoPhase2()
                        // 다음 Phase
                        timePhase = 1
                        time = 20
                    }
                }
            }
        }
    }

    // 1. value도 보여주기
    fun studyAutoPhase1() {
        binding.cardBack.visibility = View.VISIBLE
    }

    // 2. cards_now 증가 후 key만 보여주기
    fun studyAutoPhase2() {
        binding.cardBack.visibility = View.INVISIBLE
        cards_now = cards_now as Int % cards_num as Int + 1

        binding.cardFront.setText(cards[cards_now as Int -1].key)
        binding.cardBack.setText(cards[cards_now as Int -1].explanation)
        binding.textCards.setText(cards_now.toString() + " of " + cards_num.toString())
    }

    // 해당 과목 점수 갱신
    fun updateScores() {
        requestToServer.service.updateScores(
            RequestScoreData(
                subject = studySubject,
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



}