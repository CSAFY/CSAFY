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
import com.csafy.csafy_android.databinding.FragmentStudyCardBinding
import com.csafy.csafy_android.databinding.FragmentTestMultipleBinding
import com.csafy.csafy_android.network.RequestToServer
import com.csafy.csafy_android.network.common.App
import com.csafy.csafy_android.network.data.request.RequestScoreData
import com.csafy.csafy_android.network.data.response.ResponseCardData
import com.csafy.csafy_android.network.data.response.ResponseCardData2
import com.csafy.csafy_android.network.data.response.ResponseMultipleData
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import kotlin.math.max


class StudyCardFragment : Fragment() {
    private var _binding: FragmentStudyCardBinding? = null
    private val binding get() = _binding!!

    val requestToServer = RequestToServer  // 싱글톤 그대로 가져옴.

    // 정답 관련
    private lateinit var score:Number
    private lateinit var studySubject:String
    private lateinit var cards:List<ResponseCardData2>
    private lateinit var cards_num:Number
    private lateinit var cards_now:Number
    private lateinit var cards_page:Number

    // 애니메이션 관련
    lateinit var front_anim: AnimatorSet
    lateinit var back_anim: AnimatorSet

//    override fun onCreate(savedInstanceState: Bundle?) {
//        super.onCreate(savedInstanceState)
//
//    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        _binding = FragmentStudyCardBinding.inflate(inflater, container, false)
        val view = binding.root

        // 카드 뒤집기 카메라 설정용
        var scale = App.ApplicationContext().resources.displayMetrics.density
        binding.cardFront.cameraDistance = 8000 * scale
        binding.cardBack.cameraDistance = 8000 * scale
        cards_page = 0

        front_anim = AnimatorInflater.loadAnimator(App.ApplicationContext(), R.animator.front_animator) as AnimatorSet
        back_anim = AnimatorInflater.loadAnimator(App.ApplicationContext(), R.animator.back_animator) as AnimatorSet

        binding.cardFront.setOnClickListener {
            if (cards_page == 0) {
                cards_page = 1
                front_anim.setTarget(binding.cardFront)
                back_anim.setTarget(binding.cardBack)
                front_anim.start()
                back_anim.start()
            } else {
                cards_page = 0
                front_anim.setTarget(binding.cardBack)
                back_anim.setTarget(binding.cardFront)
                front_anim.start()
                back_anim.start()
            }
        }

        binding.cardBack.setOnClickListener {
            if (cards_page == 0) {
                cards_page = 1
                front_anim.setTarget(binding.cardFront)
                back_anim.setTarget(binding.cardBack)
                front_anim.start()
                back_anim.start()
            } else {
                cards_page = 0
                front_anim.setTarget(binding.cardBack)
                back_anim.setTarget(binding.cardFront)
                front_anim.start()
                back_anim.start()
            }
        }

        binding.btnPastCard.setOnClickListener {
            // 뒷면이면 뒤집기
            if (cards_page == 1) {
                cards_page = 0
                front_anim.setTarget(binding.cardBack)
                back_anim.setTarget(binding.cardFront)
                front_anim.start()
                back_anim.start()
                Handler(Looper.getMainLooper()).postDelayed({
                    cards_now = (cards_now as Int - 1)
                    if (cards_now == 0) {
                        cards_now = cards_num
                    }
                    binding.cardFront.setText(cards[cards_now as Int -1].key)
                    binding.cardBack.setText(cards[cards_now as Int -1].explanation)
                    binding.textCards.setText(cards_now.toString() + " of " + cards_num.toString())
                }, 700)
            } else {
                // 변수 설정
                cards_now = (cards_now as Int - 1)
                if (cards_now == 0) {
                    cards_now = cards_num
                }
                binding.cardFront.setText(cards[cards_now as Int -1].key)
                binding.cardBack.setText(cards[cards_now as Int -1].explanation)
                binding.textCards.setText(cards_now.toString() + " of " + cards_num.toString())
            }
        }

        binding.btnNextCard.setOnClickListener {
            // 뒷면이면 뒤집기
            if (cards_page == 1) {
                cards_page = 0
                front_anim.setTarget(binding.cardBack)
                back_anim.setTarget(binding.cardFront)
                front_anim.start()
                back_anim.start()
                Handler(Looper.getMainLooper()).postDelayed({
                    cards_now = (cards_now as Int) % (cards_num as Int) + 1
                    binding.cardFront.setText(cards[cards_now as Int -1].key)
                    binding.cardBack.setText(cards[cards_now as Int -1].explanation)
                    binding.textCards.setText(cards_now.toString() + " of " + cards_num.toString())
                }, 700)
            } else {
                // 변수 설정
                cards_now = (cards_now as Int) % (cards_num as Int) + 1
                binding.cardFront.setText(cards[cards_now as Int -1].key)
                binding.cardBack.setText(cards[cards_now as Int -1].explanation)
                binding.textCards.setText(cards_now.toString() + " of " + cards_num.toString())
            }
        }


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

        // 세팅하기
        var correct:Int = 0
        var wrong:Int = 0
        score = 0
        cards = listOf(ResponseCardData2(key = "hi", explanation = "hi"))
        cards_now = 1
        cards_num = 1
        binding.textCards.setText(cards_now.toString() + " of " + cards_num.toString())
        getCards()

        // 정산 및 홈으로 이동 다음 단계 이동하기
        val mainActivity = activity as MainActivity
        binding.btnEndStudy.setOnClickListener {
            updateScores()
            mainActivity.changeStudyFragment()
        }

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
//                Log.d("카드 확인", cards.toString())
//                Log.d("카드 확인2", cards[0].toString())

                cards_now = 1
                cards_num = cards.size
                cards_page = 0
                binding.textCards.setText(cards_now.toString() + " of " + cards_num.toString())

                binding.cardFront.setText(cards[cards_now as Int -1].key)
                binding.cardBack.setText(cards[cards_now as Int -1].explanation)
            }

            override fun onFailure(call: Call<List<ResponseCardData2>>, t: Throwable) {
            }

        })
    }

    // 해당 점수 갱신
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