package com.csafy.csafy_android.fragment

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.csafy.csafy_android.activity.MainActivity
import com.csafy.csafy_android.databinding.FragmentTestBinding

class TestFragment : Fragment() {

    private var _binding: FragmentTestBinding? = null
    private val binding get() = _binding!!

    private lateinit var testSubjectFragment: TestSubjectFragment

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        _binding = FragmentTestBinding.inflate(inflater, container, false)
        val view = binding.root

        // 다음 단계로 이동
        val mainActivity = activity as MainActivity
        binding.btnOX.setOnClickListener {
            mainActivity.changeTestFragment(2, "OX")
        }
        binding.btnQuiz.setOnClickListener {
            mainActivity.changeTestFragment(2, "Quiz")
        }

        return view

    }

}