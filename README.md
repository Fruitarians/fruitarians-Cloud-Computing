# Fruitarians - Cloud Computing

_The cloud technology used in Fruitarians_

**Powered by:**

<p style="text-align: center; background-color: #eee; display: inline-block; padding: 14px 20px; border-radius: 15px;">
<img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg" width="250"/>
</p>

Google Cloud Platform (GCP) is a Google-provided set of cloud computing services. It is a platform that offers computing infrastructure and services for running applications, storing and managing data, and developing software solutions.


The cloud technology that used in this project:

-   **Google Cloud Platform**: Suite of cloud computing services provided by Google.
-   **Firestore**: for the application database.
-   **App Engine**: For deploying Backend API.
-   **Cloud Storage**: For storing the assets.
-   **Cloud Run**: For deploying machine learning model.

## Technology Used

There are four applications of Google Cloud technologies in the **Fruitarians** application: Firestore, App Engine, Cloud Storage, and Cloud Run. On the cloud side, these three services are utilized to handle all requests and provide data services.

### Firestore

<svg width="64px" height="64px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <defs> <style>.cls-1{fill:#669df6;}.cls-2{fill:#aecbfa;}.cls-3{fill:#4285f4;}</style> </defs> <title>Icon_24px_Firestore_Color</title> <g data-name="Product Icons"> <g data-name="colored-32/firestore"> <g> <path class="cls-1" d="M21,13,12,9v4l9,4Zm0-7L12,2V6l9,4Z"></path> <polygon id="Rectangle-7" class="cls-2" points="3 6 12 2 12 6 3 10 3 6"></polygon> <polygon id="Rectangle-7-2" data-name="Rectangle-7" class="cls-2" points="3 13 12 9 12 13 3 17 3 13"></polygon> <polygon id="Rectangle-7-3" data-name="Rectangle-7" class="cls-3" points="12 18 15.37 16.5 19.88 18.5 12 22 12 18"></polygon> </g> </g> </g> </g></svg>

This firestore service **`has been deployed`** on devevelopment environment.

Service details:

```YAML
Database Type   : NoSQL
Location        : asia-southeast2
Storage         : 10 GB
```

Docs: [firestore-docs](https://cloud.google.com/firestore/docs)

### App Engine

<svg width="64px" height="64px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <defs> <style>.cls-1{fill:#4285f4;}.cls-1,.cls-2,.cls-3{fill-rule:evenodd;}.cls-2{fill:#aecbfa;}.cls-3{fill:#669df6;}</style> </defs> <title>Icon_24px_AppEngine_Color</title> <g data-name="Product Icons"> <g> <path class="cls-1" d="M14.3,10l-1.22,1.22A1.71,1.71,0,0,1,12,14.23a1.74,1.74,0,0,1-1.33-.64L9.45,14.81A3.43,3.43,0,1,0,14.3,10Z"></path> <path class="cls-2" d="M12,6.26a6.25,6.25,0,1,0,6.25,6.25A6.25,6.25,0,0,0,12,6.26M12,17a4.45,4.45,0,1,1,4.44-4.44A4.44,4.44,0,0,1,12,17"></path> <path class="cls-3" d="M21.62,11.9l-2.56-.81a7.1,7.1,0,0,1,.17,1.53,7.62,7.62,0,0,1-.08,1.08h2.47a.44.44,0,0,0,.38-.42v-1a.44.44,0,0,0-.38-.42"></path> <path class="cls-3" d="M12,5.52a7.48,7.48,0,0,1,1.5.15l-.92-2.55c-.07-.22-.21-.38-.42-.38h-.38a.45.45,0,0,0-.42.38l-.8,2.54A7.64,7.64,0,0,1,12,5.52"></path> <path class="cls-3" d="M4.77,12.62a7.1,7.1,0,0,1,.17-1.53l-2.56.81a.44.44,0,0,0-.38.42v1a.44.44,0,0,0,.38.42H4.85a7.62,7.62,0,0,1-.08-1.08"></path> <path class="cls-2" d="M12,10a2.5,2.5,0,1,0,2.5,2.5A2.5,2.5,0,0,0,12,10Zm0,3.75a1.25,1.25,0,1,1,1.25-1.25A1.25,1.25,0,0,1,12,13.76Z"></path> </g> </g> </g></svg>

This app service **`has been deployed`**.

Service details:

```YAML
Location          : asia-southeast2
Instance Type     : F1
Persintence disk  : 10
Runtime           : nodejs18
```

Docs:
[app-engine-docs](https://cloud.google.com/appengine/docs/standard/nodejs/runtime)

### Cloud Storage

<svg width="64px" height="64px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <defs> <style>.cls-1{fill:#aecbfa;}.cls-2{fill:#669df6;}.cls-3{fill:#4285f4;}.cls-4{fill:#ffffff;}</style> </defs> <title>Icon_24px_CloudStorage_Color</title> <g data-name="Product Icons"> <rect class="cls-1" x="2" y="4" width="20" height="7"></rect> <rect class="cls-2" x="20" y="4" width="2" height="7"></rect> <polygon class="cls-3" points="22 4 20 4 20 11 22 4"></polygon> <rect class="cls-2" x="2" y="4" width="2" height="7"></rect> <rect class="cls-4" x="6" y="7" width="6" height="1"></rect> <rect class="cls-4" x="15" y="6" width="3" height="3" rx="1.5"></rect> <rect class="cls-1" x="2" y="13" width="20" height="7"></rect> <rect class="cls-2" x="20" y="13" width="2" height="7"></rect> <polygon class="cls-3" points="22 13 20 13 20 20 22 13"></polygon> <rect class="cls-2" x="2" y="13" width="2" height="7"></rect> <rect class="cls-4" x="6" y="16" width="6" height="1"></rect> <rect class="cls-4" x="15" y="15" width="3" height="3" rx="1.5"></rect> </g> </g></svg>

This storage service **`has been deployed`**.

```YAML
Location Type   : Region
Location        : asia-southeast2
Storage Class   : Standard
```

Docs: [cloud-storage-docs](https://cloud.google.com/storage/docs)

### Cloud Run

<svg width="64px" height="64px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <defs> <style>.cls-1{fill:#aecbfa;}.cls-1,.cls-2{fill-rule:evenodd;}.cls-2{fill:#4285f4;}</style> </defs> <title>Icon_24px_CloudRun_Color</title> <g data-name="Product Icons"> <g> <polygon class="cls-1" points="8.9 2.63 12.02 12 21.38 12 8.9 2.63"></polygon> <polygon class="cls-2" points="21.38 12 12.02 12 8.9 21.38 21.38 12"></polygon> <polygon class="cls-2" points="3.44 21.38 6.57 19.81 8.9 12 5.78 12 3.44 21.38"></polygon> <polygon class="cls-1" points="3.44 2.63 5.78 12 8.9 12 6.57 4.19 3.44 2.63"></polygon> </g> </g> </g></svg>

This storage service **`has been deployed`**.

```YAML
Location        : asia-southeast2
CPU             : 4
Memory          : 8

```

Docs: [cloud-run-docs](https://cloud.google.com/run/docs)