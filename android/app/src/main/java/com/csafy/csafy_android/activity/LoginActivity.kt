package com.csafy.csafy_android.activity

import android.content.Intent
import android.content.SharedPreferences
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.widget.Toast
import com.csafy.csafy_android.network.RequestToServer
import com.csafy.csafy_android.network.data.request.RequestLoginData
import com.csafy.csafy_android.network.data.response.ResponseLoginData
import com.csafy.csafy_android.databinding.ActivityLoginBinding
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class LoginActivity : AppCompatActivity() {

    private lateinit var binding: ActivityLoginBinding

    val requestToServer = RequestToServer  // 싱글톤 그대로 가져옴.

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityLoginBinding.inflate(layoutInflater)
        setContentView(binding.root)

        binding.txJoin.setOnClickListener() {
//            Toast.makeText(this, "회원가입하러가기", Toast.LENGTH_SHORT).show()
            val intent = Intent(this, JoinActivity::class.java)
            startActivity(intent)
        }

        binding.btnClose.setOnClickListener() {
            finish()
        }

        // 로그 진행
        binding.btnLogin.setOnClickListener() {
            if (binding.etId.text.isNullOrBlank() || binding.etPw.text.isNullOrBlank()) {
                Toast.makeText(this, "이메일과 비밀번호를 입력해주세요.", Toast.LENGTH_SHORT).show()
            }
            else {
//                Toast.makeText(this, "login 1", Toast.LENGTH_SHORT).show()

                // 기간 만료 토큰 보내기 방지를 위해 토큰 지우고 보내기
                val sharedPreference = getSharedPreferences("Login", MODE_PRIVATE)
                val editor: SharedPreferences.Editor = sharedPreference.edit()
                editor.clear()
                editor.apply()

                // 회원가입 요청
                requestToServer.service.requestLogin(
                    RequestLoginData(
                        email = binding.etId.text.toString(),
                        password = binding.etPw.text.toString()
                    ) // 회원 정보를 전달
                ).enqueue(object : Callback<ResponseLoginData> {  // 콜백 등록
                    override fun onResponse(  // 통신 성공
                        call: Call<ResponseLoginData>,
                        response: Response<ResponseLoginData>
                    ) {
                        // 통신 성공
                        if(response.isSuccessful){
                            Log.d("성공", response.toString())

                            // 토큰부터 저장해보자
//                            val sharedPreference = getSharedPreferences("Login", MODE_PRIVATE)
//                            val editor: SharedPreferences.Editor = sharedPreference.edit()
                            editor.putString("token", response.body()!!.token)
                            editor.commit()

//                            Toast.makeText(this@LoginActivity, "로그인을 진행할게요.", Toast.LENGTH_SHORT).show()
                            val intent = Intent(this@LoginActivity, MainActivity::class.java)
                            startActivity(intent)
                            finish()
                        }
                        else {
                            Toast.makeText(this@LoginActivity, "로그인 실패", Toast.LENGTH_SHORT).show()
                            when (response.code()) {
                                404 -> Log.d("실패", response.message())
//                                404 -> onFailure()
                                405 -> Log.d("문제가 뭐야", response.message())

                            }
                        }
                    }

                    override fun onFailure(call: Call<ResponseLoginData>, t: Throwable) {  // 통신 실패
//                        Toast.makeText(this@LoginActivity, "로그인 onFailure.", Toast.LENGTH_SHORT).show()
                    }
                })

            }
        }

    }
}