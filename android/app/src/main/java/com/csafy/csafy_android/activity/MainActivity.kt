package com.csafy.csafy_android.activity

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.MenuItem
import android.widget.Toast
import androidx.fragment.app.Fragment
import com.csafy.csafy_android.fragment.*
import com.csafy.csafy_android.R
import com.csafy.csafy_android.databinding.ActivityMainBinding
import com.csafy.csafy_android.network.RequestToServer
import com.google.android.material.bottomnavigation.BottomNavigationView

class MainActivity : AppCompatActivity(), BottomNavigationView.OnNavigationItemSelectedListener {

    // 전역 변수로 바인딩 객체 선언
    private lateinit var binding: ActivityMainBinding
    // 매번 null 체크를 할 필요 없이 편의성을 위해 바인딩 변수 재선언
//    private val binding get() = mBinding!!

    // 뒤로가기 버튼 눌렀던 시간 저장 ;두 번 눌러 나가기
    private var backKeyPressedTime: Long = 0

    // fragment 처리 객체
    private lateinit var homeFragment: HomeFragment
    private lateinit var interviewFragment: InterviewFragment
    private lateinit var studyFragment: StudyFragment
    private lateinit var testFragment: TestFragment
    private lateinit var profileFragment: ProfileFragment

    // 하위 fragment
    private lateinit var testSubjectFragment: TestSubjectFragment
    private lateinit var testOXFragment: TestOXFragment
    private lateinit var testMultipleFragment: TestMultipleFragment
    private lateinit var studySubjectFragment: StudySubjectFragment
    private lateinit var studyAutoFragment: StudyAutoFragment
    private lateinit var studyCardFragment: StudyCardFragment



    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        // inflate는 xml에 있는 뷰를 객체화함.
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)


        binding.bottomNavigationView.setOnNavigationItemSelectedListener(this)

        // fragment 처리 객체 : 없으면 FATAL EXCEPTION 남..
        homeFragment = HomeFragment()
        studyFragment = StudyFragment()
        interviewFragment = InterviewFragment()
        testFragment = TestFragment()
        profileFragment = ProfileFragment()

        // 하위 fragment
        testSubjectFragment = TestSubjectFragment()
        testOXFragment = TestOXFragment()
        testMultipleFragment = TestMultipleFragment()
        studySubjectFragment = StudySubjectFragment()
        studyAutoFragment = StudyAutoFragment()
        studyCardFragment = StudyCardFragment()

        supportFragmentManager.beginTransaction().replace(R.id.main_frame, homeFragment)
            .commit()

    }

    // 뒤로가기 두 번 눌러 나가기
    override fun onBackPressed() {
        // 기존의 뒤로가기 버튼의 기능
        //super.onBackPressed();

        // 2초 안에 한 번 더 누르면 나가게 하기
        if (System.currentTimeMillis() > backKeyPressedTime + 2000) {
            backKeyPressedTime = System.currentTimeMillis()
            Toast.makeText(this, "\'뒤로\' 버튼을 한번 더 누르시면 종료됩니다.", Toast.LENGTH_SHORT).show()
            return
        }

        // 2초이내에 뒤로가기 버튼을 한 번 더 누르면 finish() 앱 종료
        if (System.currentTimeMillis() <= backKeyPressedTime + 2000) {
            finish()
        }

    }

    // home으로 보내기
    fun changeHomeFragment() {
        supportFragmentManager
            .beginTransaction()
            .replace(R.id.main_frame, homeFragment)
            .commit()
    }

    // study으로 보내기
    fun changeStudyFragment() {
        supportFragmentManager
                .beginTransaction()
                .replace(R.id.main_frame, studyFragment)
                .commit()
    }

    // study으로 보내기
    fun goTestFragment() {
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
//                Toast.makeText(this, quizType + "로 진입", Toast.LENGTH_SHORT).show()
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

    // frag -> frag
    // 문제에서 OX, 사지선다 선택
    fun changeStudyFragment(index: Int, studyType: String){
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
                bundle.putString("studyType", studyType)

                studySubjectFragment.arguments = bundle

                // 이동
                supportFragmentManager
                    .beginTransaction()
                    .replace(R.id.main_frame, studySubjectFragment)
                    .commit()

                // 보낸 자료 안내
                Toast.makeText(this, studyType + "로 진입", Toast.LENGTH_SHORT).show()
            }
        }
    }

    // frag -> frag
    // 문제에서 과목 선택
    // 1:자료구조, 2: 컴퓨터구조, 3: 운영체제론, 4: 데이터베이스, 5: 네트워크, 6: 기타
    fun changeStudySubjectFragment(index: Int, studyType: String?){
        var nextFragment: Fragment
        if (studyType == "Auto") {
            nextFragment = studyAutoFragment
        } else {
            nextFragment = studyCardFragment
        }

        // 자료 보내기
        var bundle = Bundle()
        when(index){
            1 -> {bundle.putString("studySubject", "자료구조")}
            2 -> {bundle.putString("studySubject", "컴퓨터구조")}
            3 -> {bundle.putString("studySubject", "운영체제론")}
            4 -> {bundle.putString("studySubject", "데이터베이스")}
            5 -> {bundle.putString("studySubject", "네트워크")}
            6 -> {bundle.putString("studySubject", "기타")}
        }
        nextFragment.arguments = bundle

        // 이동
        supportFragmentManager
            .beginTransaction()
            .replace(R.id.main_frame, nextFragment)
            .commit()
    }

    // 바텀 네비게이션 기능
    override fun onNavigationItemSelected(item: MenuItem): Boolean {
        when (item.itemId) {
            R.id.menu_item_home -> {
                supportFragmentManager.beginTransaction().replace(R.id.main_frame, homeFragment)
                    .commit()
            }
            R.id.menu_item_card -> {
                supportFragmentManager.beginTransaction().replace(R.id.main_frame, interviewFragment)
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

