package com.csafy.csafy_android.activity

import android.content.SharedPreferences
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.LayoutInflater
import android.widget.Toast
import com.csafy.csafy_android.R
import com.csafy.csafy_android.databinding.ActivitySettingBinding
import com.csafy.csafy_android.network.RequestToServer

class SettingActivity : AppCompatActivity() {

    private lateinit var binding: ActivitySettingBinding

    val requestToServer = RequestToServer  // 싱글톤 그대로 가져옴.

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivitySettingBinding.inflate(layoutInflater)
        setContentView(binding.root)

        // 로그아웃
        binding.txLogout.setOnClickListener {
            val sharedPreferences = getSharedPreferences("Login", MODE_PRIVATE)
            val editor: SharedPreferences.Editor = sharedPreferences.edit()
//            editor.remove("token")
            editor.clear()  // 모든 데이터 삭제
            editor.commit()
            Toast.makeText(this@SettingActivity, "로그아웃을 진행할게요.", Toast.LENGTH_SHORT).show()
            finish()
        }

        // 회원 탈퇴
        binding.txWithdraw.setOnClickListener {

        }

    }

}