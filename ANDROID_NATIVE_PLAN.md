# Myanmar Rate Native Android App Plan

User request: real native Android APK, not a website wrapper.

## App type
Native Android app using Kotlin + Jetpack Compose.

## Screens
1. Splash screen
2. Language select screen
3. Home rates screen
   - USD/MMK
   - THB/MMK
   - RMB/MMK
   - buy/sell values
   - refresh button
4. Calculator screen
5. Register/Login screen
   - email
   - phone
   - WeChat
   - username
   - password
   - guest mode
6. Profile screen
7. Contact/Cooperation screen

## Backend
Uses existing endpoints:
- https://myanmar-rate-v1.vercel.app/api/rates
- https://myanmar-rate-v1.vercel.app/api/user

## Package name
com.myanmarrate.app

## Next files needed
- settings.gradle
- build.gradle
- app/build.gradle
- AndroidManifest.xml
- MainActivity.kt
- RateApi.kt
- UserApi.kt
- UI screens
