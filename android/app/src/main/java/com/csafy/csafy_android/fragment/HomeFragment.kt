package com.csafy.csafy_android.fragment

import android.annotation.SuppressLint
import android.graphics.Color
import android.os.Bundle
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.webkit.WebChromeClient
import android.webkit.WebView
import android.webkit.WebViewClient
import com.csafy.csafy_android.databinding.FragmentHomeBinding
import com.csafy.csafy_android.network.RequestToServer
import com.csafy.csafy_android.network.data.response.ResponseChartData
import com.csafy.csafy_android.network.data.response.ScoreData
import com.github.mikephil.charting.animation.Easing
import com.github.mikephil.charting.charts.BarChart
import com.github.mikephil.charting.charts.PieChart
import com.github.mikephil.charting.charts.RadarChart
import com.github.mikephil.charting.data.*
import com.github.mikephil.charting.formatter.IndexAxisValueFormatter
import com.github.mikephil.charting.interfaces.datasets.IBarDataSet
import com.github.mikephil.charting.utils.ColorTemplate
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import java.util.*
import kotlin.collections.ArrayList


class HomeFragment : Fragment() {

    private var _binding: FragmentHomeBinding? = null

    private val binding get() = _binding!!

    val requestToServer = RequestToServer

    var score: ScoreData? = null

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        _binding = FragmentHomeBinding.inflate(inflater, container, false)

        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        getChartData()  // 데이터 받아오기
        radarChart()  // 차트 그리기
        barChart()  // 차트 그리기

    }

    // 차트 데이터 받아오기
    private fun getChartData() {
        requestToServer.service.getChartData()
            .enqueue(object : Callback<ResponseChartData> {
                override fun onResponse(
                    call: Call<ResponseChartData>,
                    response: Response<ResponseChartData>
                ) {
                    if (response.isSuccessful) {
                        var chartData = response.body()!!
                        score = chartData.scores

                        Log.e("메인 차트 데이터 통신 성공", "${response.body()!!}")

                    }
                }

                override fun onFailure(call: Call<ResponseChartData>, t: Throwable) {
                    Log.d("메인 차트 데이터 통신 실패", "${t}")
                }

            })
    }

    // pie chart 생성
    private fun radarChart() {
        var radarChart: RadarChart = binding.radarChart

        val entries = ArrayList<RadarEntry>()
        var computerArchitectureData: Float = 0.0f
//        if (score!!.computerArchitecture == 0) {
//            computerArchitectureData = 0.0f
//        } else {
//        Log.d("확인", "${score!!.computerArchitecture}")
//        Log.d("확인", "${score!!.computerArchitecture}")
//        Log.d("확인2", "${score!!.computerArchitecture!!.toFloat()}")
//        computerArchitectureData = score!!.computerArchitecture!!.toFloat()
//        }
//        entries.add(RadarEntry(computerArchitectureData, "운영체제론"))
        entries.add(RadarEntry(1.8f, "데이터베이스"))
        entries.add(RadarEntry(1.8f, "데이터베이스"))
        entries.add(RadarEntry(2.2f, "컴퓨터구조론"))
        entries.add(RadarEntry(3.6f, "기타"))

        val colorItems = ArrayList<Int>()
        for (c in ColorTemplate.COLORFUL_COLORS) colorItems.add(c)
        for (c in ColorTemplate.JOYFUL_COLORS) colorItems.add(c)
        for (c in ColorTemplate.LIBERTY_COLORS) colorItems.add(c)
        for (c in ColorTemplate.PASTEL_COLORS) colorItems.add(c)
        colorItems.add(ColorTemplate.getHoloBlue())

        val radarDataSet = RadarDataSet(entries, "")
        radarDataSet.apply {
            colors = colorItems
            valueTextColor = Color.BLACK
            valueTextSize = 16f
        }

        radarChart.data = RadarData(radarDataSet)
        radarChart.invalidate()

    }

    // bar chart 생성
   private fun barChart() {
        var barChart: BarChart = binding.barChart

        val values = ArrayList<BarEntry>()
        val type = ArrayList<String>()
        val colorList = ArrayList<Int>()
        val set : BarDataSet

        values.add(BarEntry(1.0f, 38.0f))
        values.add(BarEntry(2.0f, 47.0f))
        values.add(BarEntry(3.0f, 43.0f))

        type.add(" ")
        type.add("a")
        type.add("b")
        type.add("c")

        colorList.add(Color.parseColor("#f5c700"))
        colorList.add(Color.parseColor("#ff8e7f"))
        colorList.add(Color.parseColor("#89a5ea"))

        if (barChart.data != null && barChart.data.dataSetCount > 1) {
            val chartData = barChart.data
            set = chartData?.getDataSetByIndex(0) as BarDataSet
            set.values = values
            chartData.notifyDataChanged()
            barChart.notifyDataSetChanged()
        } else {
            set = BarDataSet(values, " ")
            set.colors = colorList
            set.setDrawValues(true)

            val dataSets = ArrayList<IBarDataSet>()
            dataSets.add(set)

            val data = BarData(dataSets)
            barChart.data = data
            barChart.setVisibleXRange(1.0f, 3.0f)
            barChart.setFitBars(true)

            val xAxis = barChart.xAxis
            xAxis.apply {
                granularity = 1f
                isGranularityEnabled = true
                valueFormatter = IndexAxisValueFormatter(type)
            }
            barChart.invalidate()  // 그래프 그리기
        }

    }


}
