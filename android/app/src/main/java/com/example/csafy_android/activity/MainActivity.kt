package com.example.csafy_android.activity

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.MenuItem
import com.example.csafy_android.R
import com.example.csafy_android.databinding.ActivityMainBinding
import com.example.csafy_android.fragment.*
import com.google.android.material.bottomnavigation.BottomNavigationView

class MainActivity : AppCompatActivity(), BottomNavigationView.OnNavigationItemSelectedListener {

    // 전역 변수로 바인딩 객체 선언
    private lateinit var binding: ActivityMainBinding
    // 매번 null 체크를 할 필요 없이 편의성을 위해 바인딩 변수 재선언
//    private val binding get() = mBinding!!

    // fragment 처리 객체
    private lateinit var homeFragment: HomeFragment
    private lateinit var cardFragment: CardFragment
    private lateinit var studyFragment: StudyFragment
    private lateinit var testFragment: TestFragment
    private lateinit var profileFragment: ProfileFragment


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        // inflate는 xml에 있는 뷰를 객체화함.
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)


        binding.bottomNavigationView.setOnNavigationItemSelectedListener(this)

        // fragment 처리 객체 : 없으면 FATAL EXCEPTION 남..
        homeFragment = HomeFragment()
        studyFragment = StudyFragment()
        cardFragment = CardFragment()
        testFragment = TestFragment()
        profileFragment = ProfileFragment()

        supportFragmentManager.beginTransaction().replace(R.id.main_frame, homeFragment)
            .commit()

    }

    override fun onNavigationItemSelected(item: MenuItem): Boolean {
        when (item.itemId) {
            R.id.menu_item_home -> {
                supportFragmentManager.beginTransaction().replace(R.id.main_frame, homeFragment)
                    .commit()
            }
            R.id.menu_item_card -> {
                supportFragmentManager.beginTransaction().replace(R.id.main_frame, cardFragment)
                    .commit()
            }
            R.id.menu_item_test -> {
                supportFragmentManager.beginTransaction().replace(R.id.main_frame, testFragment)
                    .commit()
            }
            R.id.menu_item_study -> {
                supportFragmentManager.beginTransaction()
                    .replace(R.id.main_frame, studyFragment)
                    .commit()
            }
            R.id.menu_item_profile -> {
                supportFragmentManager.beginTransaction()
                    .replace(R.id.main_frame, profileFragment)
                    .commit()
            }
        }
        return true
    }
}

