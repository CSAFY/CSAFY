package com.csafy.csafy_android.fragment

import android.annotation.SuppressLint
import android.graphics.Color
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.webkit.WebChromeClient
import android.webkit.WebView
import android.webkit.WebViewClient
import com.csafy.csafy_android.databinding.FragmentHomeBinding
import com.github.mikephil.charting.animation.Easing
import com.github.mikephil.charting.charts.BarChart
import com.github.mikephil.charting.charts.PieChart
import com.github.mikephil.charting.data.*
import com.github.mikephil.charting.formatter.IndexAxisValueFormatter
import com.github.mikephil.charting.interfaces.datasets.IBarDataSet
import com.github.mikephil.charting.utils.ColorTemplate


class HomeFragment : Fragment() {

    private var _binding: FragmentHomeBinding? = null

    private val binding get() = _binding!!

    private lateinit var webView : WebView

//    override fun onCreate(savedInstanceState: Bundle?) {
//        super.onCreate(savedInstanceState)
//
//    }

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        _binding = FragmentHomeBinding.inflate(inflater, container, false)

        pieChart()
        barChart()

        return binding.root
    }

    // pie chart 생성
    private fun pieChart() {
        var pieChart: PieChart = binding.pieChart

        pieChart.setUsePercentValues(true)

        val entries = ArrayList<PieEntry>()
        entries.add(PieEntry(1.2f, "운영체제론"))
        entries.add(PieEntry(1.8f, "데이터베이스"))
        entries.add(PieEntry(2.2f, "컴퓨터구조론"))
        entries.add(PieEntry(0.6f, "기타"))

        val colorItems = ArrayList<Int>()
        for (c in ColorTemplate.COLORFUL_COLORS) colorItems.add(c)
        for (c in ColorTemplate.JOYFUL_COLORS) colorItems.add(c)
        for (c in ColorTemplate.LIBERTY_COLORS) colorItems.add(c)
        for (c in ColorTemplate.PASTEL_COLORS) colorItems.add(c)
        colorItems.add(ColorTemplate.getHoloBlue())

        val pieDataSet = PieDataSet(entries, "")
        pieDataSet.apply {
            colors = colorItems
            valueTextColor = Color.BLACK
            valueTextSize = 16f
        }

        val pieData = PieData(pieDataSet)
        pieChart.apply {
            data = pieData  // 이 부분이 있어야 그래프가 그려짐. 나머지는 디자인 커스
            description.isEnabled = false
            isRotationEnabled = false
            centerText = "게스트님의\n학습현황"
            setEntryLabelColor(Color.BLUE)
            animateY(1400, Easing.EaseInOutQuad)
            animate()
        }
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
            barChart.invalidate()  // 그래프 그리
        }

    }


}
