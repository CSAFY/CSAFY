package com.csafy.csafy_android.fragment

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.csafy.csafy_android.R
import com.csafy.csafy_android.activity.MainActivity
import com.csafy.csafy_android.databinding.FragmentStudySubjectBinding
import com.csafy.csafy_android.databinding.FragmentTestSubjectBinding


class StudySubjectFragment : Fragment() {
    private var _binding: FragmentStudySubjectBinding? = null

    private val binding get() = _binding!!

//    override fun onCreate(savedInstanceState: Bundle?) {
//        super.onCreate(savedInstanceState)
//
//    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        _binding = FragmentStudySubjectBinding.inflate(inflater, container, false)
        val view = binding.root

        // 전 단계 정보 받아오기
        var bundle = arguments
        var studyType:String? = "Card"
        if (bundle != null)
        {
            studyType = bundle.getString("studyType")
        }

        // 다음 단계 이동하기
        val mainActivity = activity as MainActivity
        binding.btn1.setOnClickListener {
            mainActivity.changeStudySubjectFragment(1, studyType)
        }
        binding.btn2.setOnClickListener {
            mainActivity.changeStudySubjectFragment(2, studyType)
        }
        binding.btn3.setOnClickListener {
            mainActivity.changeStudySubjectFragment(3, studyType)
        }
        binding.btn4.setOnClickListener {
            mainActivity.changeStudySubjectFragment(4, studyType)
        }
        binding.btn5.setOnClickListener {
            mainActivity.changeStudySubjectFragment(5, studyType)
        }
        binding.btn6.setOnClickListener {
            mainActivity.changeStudySubjectFragment(6, studyType)
        }

        return view

    }
}