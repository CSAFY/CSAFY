package com.example.csafy_android.activity

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Toast
import com.example.csafy_android.R
import com.example.csafy_android.databinding.ActivityJoinBinding
import com.example.csafy_android.databinding.ActivityLoginBinding

class JoinActivity : AppCompatActivity() {

    private lateinit var binding: ActivityJoinBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityJoinBinding.inflate(layoutInflater)
        setContentView(binding.root)

        binding.btnClose.setOnClickListener() {
//            val intent = Intent(context, JoinActivity::class.java)
            Toast.makeText(this, "close btn 눌림", Toast.LENGTH_SHORT).show()
//            startActivity(intent)
        }
    }
}