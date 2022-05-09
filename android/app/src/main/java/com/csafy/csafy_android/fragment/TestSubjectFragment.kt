package com.csafy.csafy_android.fragment

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.csafy.csafy_android.activity.MainActivity
import com.csafy.csafy_android.databinding.FragmentTestSubjectBinding

class TestSubjectFragment : Fragment() {
    private var _binding: FragmentTestSubjectBinding? = null

    private val binding get() = _binding!!

//    override fun onCreate(savedInstanceState: Bundle?) {
//        super.onCreate(savedInstanceState)
//
//    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        _binding = FragmentTestSubjectBinding.inflate(inflater, container, false)
        val view = binding.root

        // 전 단계 정보 받아오기
        var bundle = arguments
        var quizType:String? = "OX"
        if (bundle != null)
        {
            quizType = bundle.getString("quizType")
        }

        // 다음 단계 이동하기
        val mainActivity = activity as MainActivity
        binding.btn1.setOnClickListener {
            mainActivity.changeTestSubjectFragment(1, quizType)
        }
        binding.btn2.setOnClickListener {
            mainActivity.changeTestSubjectFragment(2, quizType)
        }
        binding.btn3.setOnClickListener {
            mainActivity.changeTestSubjectFragment(3, quizType)
        }
        binding.btn4.setOnClickListener {
            mainActivity.changeTestSubjectFragment(4, quizType)
        }
        binding.btn5.setOnClickListener {
            mainActivity.changeTestSubjectFragment(5, quizType)
        }
        binding.btn6.setOnClickListener {
            mainActivity.changeTestSubjectFragment(6, quizType)
        }

        return view

    }
}