package com.csafy.csafy_android.fragment

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.csafy.csafy_android.activity.MainActivity
import com.csafy.csafy_android.databinding.FragmentStudyBinding

class StudyFragment : Fragment() {

    private var _binding: FragmentStudyBinding? = null

    private val binding get() = _binding!!

//    override fun onCreate(savedInstanceState: Bundle?) {
//        super.onCreate(savedInstanceState)
//
//    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        _binding = FragmentStudyBinding.inflate(inflater, container, false)
        val view = binding.root

        // 다음 단계로 이동
        val mainActivity = activity as MainActivity
        binding.btnAuto.setOnClickListener {
            mainActivity.changeStudyFragment(2, "Auto")
        }
        binding.btnKeyword.setOnClickListener {
            mainActivity.changeStudyFragment(2, "Card")
        }

        return view

    }
}