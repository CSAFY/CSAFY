package com.csafy.csafy_android.fragment

import android.os.Bundle
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import com.csafy.csafy_android.R
import com.csafy.csafy_android.databinding.FragmentProfileInterviewBinding
import com.csafy.csafy_android.network.RequestToServer
import com.csafy.csafy_android.network.data.response.ResponseFavoriteData
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response


class ProfileInterviewFragment : Fragment() {

    private var _binding: FragmentProfileInterviewBinding? = null
    private val binding get() = _binding!!

    val requestToServer = RequestToServer  // 싱글톤 그대로 가져옴.

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        _binding = FragmentProfileInterviewBinding.inflate(inflater, container, false)
        val view = binding.root


        return view
    }







}