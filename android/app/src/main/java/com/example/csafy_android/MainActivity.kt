package com.example.csafy_android

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.MenuItem
import androidx.viewpager2.widget.ViewPager2
import com.example.csafy_android.databinding.ActivityMainBinding
import com.example.csafy_android.fragment.*

class MainActivity : AppCompatActivity() {

    // 전역 변수로 바인딩 객체 선언
    private lateinit var binding: ActivityMainBinding
    // 매번 null 체크를 할 필요 없이 편의성을 위해 바인딩 변수 재선언
//    private val binding get() = mBinding!!

    // fragment 처리 객체
    lateinit var homeFragment: HomeFragment
    lateinit var cardFragment: CardFragment
    lateinit var studyFragment: StudyFragment
    lateinit var testFragment: TestFragment
    lateinit var profileFragment: ProfileFragment


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        // inflate는 xml에 있는 뷰를 객체화함.
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        // viewPager에 어댑터 연결
        binding.mainViewPager.adapter = MainPagerAdapter(this)

        // 슬라이드하여 페이지가 변경되면, 바텀네비게이션의 탭도 그 페이지로 활성화
        binding.mainViewPager.registerOnPageChangeCallback(
            object : ViewPager2.OnPageChangeCallback() {

                override fun onPageSelected(position: Int) {
                    super.onPageSelected(position)
                    binding.bottomNavigationView.menu.getItem(position).isChecked = true
                }
            }
        )

        // 리스너 연결
        binding.bottomNavigationView.setOnNavigationItemSelectedListener { onNavgationItemSelected(it) }

        // fragment 객체 초기화
        homeFragment = HomeFragment()
        cardFragment = CardFragment()
        studyFragment = StudyFragment()
        testFragment = TestFragment()
        profileFragment = ProfileFragment()

        supportFragmentManager.beginTransaction().replace(R.id.main_activity_pager, homeFragment)
            .commit()

    }

    override fun onNavgationItemSelected(item: MenuItem): Boolean {
        when(item.itemId){
            R.id.menu_item_home -> {
                // ViewPager의 현재 item에 첫번째 화면을 대입
                binding.mainViewPager.currentItem = 0
                return true
            }
            R.id.menu_item_study -> {
                // ViewPager의 현재 item에 두번째 화면을 대입
                binding.mainViewPager.currentItem = 1
                return true
            }
            R.id.menu_item_card -> {
                // ViewPager의 현재 item에 세번째 화면을 대입
                binding.mainViewPager.currentItem = 2
                return true
            }
            R.id.menu_item_test -> {
                // ViewPager의 현재 item에 네번째 화면을 대입
                binding.mainViewPager.currentItem = 3
                return true
            }
            R.id.menu_item_profile -> {
                // ViewPager의 현재 item에 다섯번째 화면을 대입
                binding.mainViewPager.currentItem = 4
                return true
            }
            else -> {
                return false
            }
        }
    }
}