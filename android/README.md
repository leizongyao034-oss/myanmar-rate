# Myanmar Rate Android APK

This folder contains a Trusted Web Activity (TWA) Android wrapper plan for Myanmar Rate.

Because the current environment cannot build a signed APK directly, use this official Bubblewrap flow:

1. Install Node.js and Android Studio.
2. Run:
   ```bash
   npm i -g @bubblewrap/cli
   bubblewrap init --manifest https://myanmar-rate-v1.vercel.app/manifest.json
   bubblewrap build
   ```
3. The APK/AAB will be generated in the Android project output.

App URL: https://myanmar-rate-v1.vercel.app/
Package suggestion: com.myanmarrate.app
App name: Myanmar Rate
