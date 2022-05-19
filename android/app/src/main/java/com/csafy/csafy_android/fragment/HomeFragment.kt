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
import android.widget.Toast
import com.csafy.csafy_android.databinding.FragmentHomeBinding
import com.csafy.csafy_android.network.RequestToServer
import com.csafy.csafy_android.network.data.response.ResponseChartData
import com.csafy.csafy_android.network.data.response.ScoreData
import com.github.mikephil.charting.animation.Easing
import com.github.mikephil.charting.charts.BarChart
import com.github.mikephil.charting.charts.HorizontalBarChart
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

    // 과목 별 경험치
    var network: Float = 0.0f
    var operatingSystem: Float = 0.0f
    var dataSystem: Float = 0.0f
    var computerArchitecture: Float = 0.0f
    var database: Float = 0.0f
    var etc: Float = 0.0f


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

//        radarChart()  // 차트 그리기
        barChart()  // 차트 그리기
        getChartData()  // 데이터 받아오기

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
                        if (response.body() == null) {
                            Toast.makeText(context, "활동을 하면 차트 데이터가 활성화됩니다 !", Toast.LENGTH_SHORT).show()
                        }
                        else {
                            var chartData = response.body()!!
                            score = chartData.scores

                            network = score!!.network!!.toFloat()
                            operatingSystem = score!!.network!!.toFloat()
                            dataSystem = score!!.dataSystem!!.toFloat()
                            etc = score!!.etc!!.toFloat()
                            database = score!!.etc!!.toFloat()
                            computerArchitecture = score!!.computerArchitecture!!.toFloat()


                            Log.e("메인 차트 데이터 통신 성공", "${response.body()!!}")
                            Log.e("메인 차트 데이터 통신 성공", "${computerArchitecture!!}")

//                        radarChart()
                            pieChart()
                            barChart()

                        }


                    }
                }

                override fun onFailure(call: Call<ResponseChartData>, t: Throwable) {
                    Log.d("메인 차트 데이터 통신 실패", "${t}")
                }

            })
    }

    // pie chart 생성
    private fun pieChart() {
//        getChartData()
        val pieChart: PieChart = binding.pieChart

        val entries_pie = ArrayList<PieEntry>()

        entries_pie.add(PieEntry(network, "네트워크"))
        entries_pie.add(PieEntry(operatingSystem, "운영체제"))
        entries_pie.add(PieEntry(dataSystem, "데이터구조"))
        entries_pie.add(PieEntry(etc, "기타"))
        entries_pie.add(PieEntry(database, "데이터베이스"))
        entries_pie.add(PieEntry(computerArchitecture, "컴퓨터구조"))

        val colorItems = ArrayList<Int>()
//        for (c in ColorTemplate.COLORFUL_COLORS) colorItems.add(c)
        for (c in ColorTemplate.JOYFUL_COLORS) colorItems.add(c)
//        for (c in ColorTemplate.LIBERTY_COLORS) colorItems.add(c)
//        for (c in ColorTemplate.PASTEL_COLORS) colorItems.add(c)
        colorItems.add(Color.GRAY)

        val pieDataSet = PieDataSet(entries_pie, "학습 데이터")
        pieDataSet.apply {
            colors = colorItems
            valueTextColor = Color.BLACK
            valueTextSize = 12f
        }
        val labels = mutableListOf<String>()
        labels.add("네트워크")
        labels.add("운영체제")
        labels.add("데이터구조")
        labels.add("기타")
        labels.add("데이터베이스")
        labels.add("컴퓨터구조")
//        pieChart.xAxis.valueFormatter=IndexAxisValueFormatter(labels)
        pieChart.data = PieData(pieDataSet)
        pieChart.invalidate()
    }


    // radar chart 생성
//    private fun radarChart() {
//        val radarChart: RadarChart = binding.radarChart
//
//        val entries = ArrayList<RadarEntry>()
//
//        entries.add(RadarEntry(network, "네트워크"))
//        entries.add(RadarEntry(operatingSystem, "운영체제"))
//        entries.add(RadarEntry(dataSystem, "데이터구조"))
//        entries.add(RadarEntry(etc, "기타"))
//        entries.add(RadarEntry(database, "데이터베이스"))
//        entries.add(RadarEntry(computerArchitecture, "컴퓨터구조"))
//
//        val colorItems = ArrayList<Int>()
////        for (c in ColorTemplate.COLORFUL_COLORS) colorItems.add(c)
////        for (c in ColorTemplate.JOYFUL_COLORS) colorItems.add(c)
////        for (c in ColorTemplate.LIBERTY_COLORS) colorItems.add(c)
////        for (c in ColorTemplate.PASTEL_COLORS) colorItems.add(c)
//        colorItems.add(Color.RED)
//
//        val radarDataSet = RadarDataSet(entries, "학습 데이터")
//        radarDataSet.apply {
//            colors = colorItems
//            valueTextColor = Color.BLACK
//            valueTextSize = 12f
//        }
//        val labels = mutableListOf<String>()
//        labels.add("네트워크")
//        labels.add("운영체제")
//        labels.add("데이터구조")
//        labels.add("기타")
//        labels.add("데이터베이스")
//        labels.add("컴퓨터구조")
//        radarChart.xAxis.valueFormatter=IndexAxisValueFormatter(labels)
//        radarChart.data = RadarData(radarDataSet)
//        radarChart.invalidate()
//    }


    // bar chart 생성
   private fun barChart() {
        val barChart: HorizontalBarChart = binding.barChart

        val values = ArrayList<BarEntry>()
        val type = ArrayList<String>()
        val colorList = ArrayList<Int>()
        val set : BarDataSet

        values.add(BarEntry(1.0f, network))
        values.add(BarEntry(2.0f, operatingSystem))
        values.add(BarEntry(3.0f, dataSystem))
        values.add(BarEntry(4.0f, etc))
        values.add(BarEntry(5.0f, database))
        values.add(BarEntry(6.0f, computerArchitecture))

        type.add(" ")
        type.add("네트워크")
        type.add("운영체제")
        type.add("데이터구조")
        type.add("기타")
        type.add("데이터베이스")
        type.add("컴퓨터구조")

        colorList.add(Color.parseColor("#f5c700"))
        colorList.add(Color.parseColor("#ff8e7f"))
        colorList.add(Color.parseColor("#89a5ea"))
        colorList.add(Color.parseColor("#b5fcca"))
        colorList.add(Color.parseColor("#6ccad0"))
        colorList.add(Color.parseColor("#ffe4e1"))

        if (barChart.data != null && barChart.data.dataSetCount > 1) {
            val chartData = barChart.data
            set = chartData?.getDataSetByIndex(0) as BarDataSet
            set.values = values
            chartData.notifyDataChanged()
            barChart.notifyDataSetChanged()
        } else {
            set = BarDataSet(values, "학습 경험치 차트")
            set.colors = colorList
            set.setDrawValues(true)

            val dataSets = ArrayList<IBarDataSet>()
            dataSets.add(set)

            val data = BarData(dataSets)
            barChart.data = data
            barChart.setVisibleXRange(0.0f, 6.0f)
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
