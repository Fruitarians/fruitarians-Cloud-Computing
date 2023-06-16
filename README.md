# Fruitarians - Cloud Computing

## Base URL

Fruitarians API Documentation (Bangkit Product Based Capstone Project - C23PS448)

```sh
https://capstone-project-387215.et.r.appspot.com/api-docs/
```

## Cloud Technology

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

<img src="https://cdn.cdnlogo.com/logos/f/45/firestore.svg" width="120" height="100"/>

This firestore service **`has been deployed`** on development environment.

Service details:

```YAML
Database Type   : NoSQL
Location        : asia-southeast2
Storage         : 10 GB
```

Docs: [firestore-docs](https://cloud.google.com/firestore/docs)

### App Engine

<img src="https://symbols.getvecta.com/stencil_4/8_google-app-engine.c22bd3c7a9.svg" width="100" height="50"/>

This app service **`has been deployed`**. on development environment.

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

<img src="https://symbols.getvecta.com/stencil_4/47_google-cloud-storage.fee263d33a.svg" width="100" height="50"/>

This storage service **`has been deployed`**. on development environment.

```YAML
Location Type   : Region
Location        : asia-southeast2
Storage Class   : Standard
```

Docs: [cloud-storage-docs](https://cloud.google.com/storage/docs)

### Cloud Run

<img src="https://www.vectorlogo.zone/logos/google_cloud_run/google_cloud_run-ar21.svg" width="150" height="150"/>

This cloud run service **`has been deployed`**. on development environment.

```YAML
Location        : asia-southeast2
CPU             : 4
Memory          : 8

```

Docs: [cloud-run-docs](https://cloud.google.com/run/docs)