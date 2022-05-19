package com.csafy.csafy_android.activity

import android.content.Intent
import android.net.Uri
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.widget.Toast
import com.csafy.csafy_android.network.RequestToServer
import com.csafy.csafy_android.network.data.request.RequestJoinData
import com.csafy.csafy_android.network.data.response.ResponseJoinData
import com.csafy.csafy_android.databinding.ActivityJoinBinding
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class JoinActivity : AppCompatActivity() {

    private lateinit var binding: ActivityJoinBinding

    val requestToServer = RequestToServer  // 싱글톤 그대로 가져옴.

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityJoinBinding.inflate(layoutInflater)
        setContentView(binding.root)

        // 회원가입 진행
        binding.btnJoin.setOnClickListener() {
            if (binding.etId.text.isNullOrBlank() || binding.etPw.text.isNullOrBlank() || binding.etPwCheck.text.isNullOrBlank()) {
                Toast.makeText(this, "이메일과 비밀번호를 다시 확인해주세요.", Toast.LENGTH_SHORT).show()
            }
            else {
//                Toast.makeText(this, "1", Toast.LENGTH_SHORT).show()

                // 회원가입 요청
                requestToServer.service.requestJoin(
                    RequestJoinData(
                        email = binding.etId.text.toString(), //email
                        password = binding.etPw.text.toString(),
                        nickname = "아무거나"
                    ) // 회원 정보를 전달
                ).enqueue(object : Callback<ResponseJoinData> {  // 콜백 등록
                    override fun onResponse(  // 통신 성공
                        call: Call<ResponseJoinData>,
                        response: Response<ResponseJoinData>
                    ) {
                        // 통신 성공
                        if(response.isSuccessful){
                            Log.d("성공", response.toString())
                            Toast.makeText(this@JoinActivity, "회원가입 완료", Toast.LENGTH_SHORT).show()
                            val intent = Intent(this@JoinActivity, MainActivity::class.java)
                            startActivity(intent)
                            finish()
                        }
                        else {
//                            Toast.makeText(this@JoinActivity, "회원가입 실패", Toast.LENGTH_SHORT).show()
                            when (response.code()) {
                                404 -> Log.d("실패", response.message())
//                                404 -> onFailure()

                            }
                        }
                    }

                    override fun onFailure(call: Call<ResponseJoinData>, t: Throwable) {  // 통신 실패
//                        Toast.makeText(this@JoinActivity, "회원가입 onFailure.", Toast.LENGTH_SHORT).show()
                        Log.d("실패", t.message.toString())
                    }
                })

            }
        }

        // 약관 동의 누르면
        binding.check1.setOnClickListener() {
            var intent = Intent(Intent.ACTION_VIEW, Uri.parse("https://csafy.com/privacy"))
            startActivity(intent)
        }

        binding.btnClose.setOnClickListener() {
//            val intent = Intent(context, JoinActivity::class.java)
//            Toast.makeText(this, "close btn 눌림", Toast.LENGTH_SHORT).show()
            finish()
//            startActivity(intent)
        }
    }
}