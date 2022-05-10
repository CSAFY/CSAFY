package com.csafy.csafy_android.network.common

import android.app.Application
import android.content.Context
import android.content.SharedPreferences

class App : Application() {

    init {
        instance = this
    }

    companion object {
        lateinit var prefs: PrefsManager
        lateinit var instance: App
        fun ApplicationContext() : Context {
            return instance.applicationContext
        }
    }

    override fun onCreate() {
        prefs = PrefsManager(applicationContext)
        super.onCreate()
    }
}

class PrefsManager(context: Context) {
    private val prefs = context.getSharedPreferences("Login", Context.MODE_PRIVATE)

    fun getString(key: String, defValue: String) : String {
        return prefs.getString(key, defValue).toString()
    }

    fun setString(key: String, value: String) {
        prefs.edit().putString(key, value).apply()
    }
}