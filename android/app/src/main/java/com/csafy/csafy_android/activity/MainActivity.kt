package com.csafy.csafy_android.activity

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.MenuItem
import android.widget.Toast
import androidx.fragment.app.Fragment
import com.csafy.csafy_android.fragment.*
import com.csafy.csafy_android.R
import com.csafy.csafy_android.databinding.ActivityMainBinding
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

    // 하위 fragment
    private lateinit var testSubjectFragment: TestSubjectFragment
    private lateinit var testOXFragment: TestOXFragment
    private lateinit var testMultipleFragment: TestMultipleFragment


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

        // 하위 fragment
        testSubjectFragment = TestSubjectFragment()
        testOXFragment = TestOXFragment()
        testMultipleFragment = TestMultipleFragment()

        supportFragmentManager.beginTransaction().replace(R.id.main_frame, homeFragment)
            .commit()

    }

    // home으로 보내기
    fun changeHomeFragment() {
        supportFragmentManager
            .beginTransaction()
            .replace(R.id.main_frame, testFragment)
            .commit()
    }

    // frag -> frag
    // 문제에서 OX, 사지선다 선택
    fun changeTestFragment(index: Int, quizType: String){
        when(index){
            1 -> {
                supportFragmentManager
                    .beginTransaction()
                    .replace(R.id.main_frame, testFragment)
                    .commit()
            }

            2 -> {
                // 자료 보내기
                var bundle = Bundle()
                bundle.putString("quizType", quizType)

                testSubjectFragment.arguments = bundle

                // 이동                
                supportFragmentManager
                    .beginTransaction()
                    .replace(R.id.main_frame, testSubjectFragment)
                    .commit()
                
                // 보낸 자료 안내
                Toast.makeText(this, quizType + "로 진입", Toast.LENGTH_SHORT).show()
            }
        }
    }

    // frag -> frag
    // 문제에서 과목 선택
    // 1:자료구조, 2: 컴퓨터구조, 3: 운영체제론, 4: 데이터베이스, 5: 네트워크, 6: 기타
    fun changeTestSubjectFragment(index: Int, quizType: String?){
        var nextFragment: Fragment
        if (quizType == "OX") {
            nextFragment = testOXFragment
        } else {
            nextFragment = testMultipleFragment
        }

        // 자료 보내기
        var bundle = Bundle()
        when(index){
            1 -> {bundle.putString("quizSubject", "자료구조")}
            2 -> {bundle.putString("quizSubject", "컴퓨터구조")}
            3 -> {bundle.putString("quizSubject", "운영체제론")}
            4 -> {bundle.putString("quizSubject", "데이터베이스")}
            5 -> {bundle.putString("quizSubject", "네트워크")}
            6 -> {bundle.putString("quizSubject", "기타")}
        }
        nextFragment.arguments = bundle

        // 이동
        supportFragmentManager
            .beginTransaction()
            .replace(R.id.main_frame, nextFragment)
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

