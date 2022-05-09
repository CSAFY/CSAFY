package com.csafy.csafy_android.fragment

import android.content.Intent
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import com.csafy.csafy_android.activity.LoginActivity
import com.csafy.csafy_android.databinding.ActivityMainBinding
import com.csafy.csafy_android.databinding.FragmentProfileBinding

class ProfileFragment : Fragment() {

    private var _binding: FragmentProfileBinding? = null
    private val binding get() = _binding!!

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        _binding = FragmentProfileBinding.inflate(inflater, container, false)

        binding.btnGoLogin.setOnClickListener{
            activity?.let{
                val intent = Intent(context, LoginActivity::class.java)
                Toast.makeText(context, "login btn 눌림", Toast.LENGTH_SHORT).show()
                startActivity(intent)
            }
        }
        return binding.root
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}

