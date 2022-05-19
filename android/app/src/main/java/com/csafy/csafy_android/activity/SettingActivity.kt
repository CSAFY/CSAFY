package com.csafy.csafy_android.activity

import android.content.Intent
import android.content.SharedPreferences
import android.net.Uri
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
            Toast.makeText(this@SettingActivity, "로그아웃되었습니다", Toast.LENGTH_SHORT).show()
            finish()
        }

        // 회원 탈퇴
//        binding.txWithdraw.setOnClickListener {
//
//        }

        // 개인 정보 이용 약관
        binding.txPrivacy.setOnClickListener {
            var intent = Intent(Intent.ACTION_VIEW, Uri.parse("https://csafy.com/privacy"))
            startActivity(intent)
        }

        binding.btnClose.setOnClickListener() {
//            val intent = Intent(context, JoinActivity::class.java)
            finish()
//            startActivity(intent)
        }
    }

}